export const API_BASE = 'http://localhost:4000'
export const API_AUTH = '/api/auth?'
export const API_GET = '/api/getRequest?'

export interface IAuth {
  clientCode: string,
  username: string,
  password: string
}

export interface IGet {
  clientCode: string,
  sessionKey: string,
  request: "getPaymentTypes" | "getWarehouses"
}