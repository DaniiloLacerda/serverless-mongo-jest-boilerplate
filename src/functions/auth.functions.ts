import { Database } from '@config/db';
import { Environment } from '@config/environment';
import { UserFactory } from '@factories/user.factory';
import { authValidator } from '@middlewares/validations/authValidator';
import { handlerValidator } from '@middlewares/validations/base/handlerValidator';
import { JWTHelper } from '@utils/jwtHelper';
import { Password } from '@utils/password';
import { Policy } from '@utils/policy';
import { StatusHandler } from '@utils/responseHandler';
import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

export const token = handlerValidator({
  validate: authValidator,
  handler: async event => {
    try {
      const database = new Database();
      await database.createConnection();

      const userService = UserFactory.createInstance();
      const { username, password } = event.body;

      const user = await userService.findOne({
        username: username.toLocaleLowerCase(),
        password: Password.encode(password),
        active: true
      });

      if (!user) {
        if (JWTHelper.isUserDefault(username, password)) {
          await userService.create({ body: { name: 'userDefault', username, password } });
          return StatusHandler.handlerSuccess({
            statusCode: StatusCodes.OK,
            data: JWTHelper.encode({ username, _id: 'idUserDefault' })
          });
        }
        return StatusHandler.handleError({
          statusCode: StatusCodes.NOT_FOUND,
          data: 'Dados de login inválidos'
        });
      }

      const { password: pwd, ...dataUser } = user.toJSON();

      return StatusHandler.handlerSuccess({
        statusCode: StatusCodes.OK,
        data: JWTHelper.encode(dataUser)
      });
    } catch (error) {
      return StatusHandler.handleError({ data: error });
    }
  }
});

export async function validate(
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> {
  const isValidToken = JWTHelper.isValid(event.authorizationToken);

  const effect = isValidToken ? 'Allow' : 'Deny';

  const tokenData = JWTHelper.decode(event.authorizationToken);
  const data = tokenData && tokenData.data ? tokenData.data : {};
  return Policy.generate('user', effect, event.methodArn, data);
}
