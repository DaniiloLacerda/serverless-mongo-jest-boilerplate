import { StatusCodes } from 'http-status-codes';

export const indexFakeEvent = { headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFjdGl2ZSI6dHJ1ZSwibmFtZSI6IkRhbmlsbyBMYWNlcmRhIiwidXNlcm5hbWUiOiJkYW5pbG8iLCJjb21wYW55SWQiOiI1ZmRkNjcyMDhkN2EzYTRkY2EwZTAzODciLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTE5VDIyOjMwOjQ2LjY0NFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTAzLTE5VDIyOjMwOjQ2LjY0NFoiLCJpZCI6IjYwNTUyNjE2NDBjNWFhMDAwODM5MjE1NSJ9LCJleHAiOjE2MjA2NzAwNDMsImlhdCI6MTYyMDY1OTI0M30.OufB18y5mSpwrubrHfr4URnK1rieBXHIwIH6yUx9Ix0' } };
export const showFakeEvent = { ...indexFakeEvent, ...{ pathParameters: { id: '60830b1184b8f20008c6d3fc' } } };
export const fakeResponse = { success: true };
export const fakeError = {
  response: {
    statusCode: StatusCodes.BAD_REQUEST,
    contentType: 'application/json',
    message: { success: false },
  },
};
