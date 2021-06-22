export interface TokenDecodeData {
  active?: boolean;
  name?: string;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}
export interface TokenDecode {
  exp: number;
  iat: number;
  data: TokenDecodeData;
}
