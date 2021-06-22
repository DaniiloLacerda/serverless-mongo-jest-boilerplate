export interface SuccessParams {
  statusCode: number;
  data?: {};
}

export interface ErrorParams {
  statusCode?: number;
  contentType?: string;
  data?: {};
  code?: number;
}
