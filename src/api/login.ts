import { API_BASE, API_AUTH, IAuth } from "."
import axios from "axios";

const authRequestURL = ({ username, password, clientCode }: IAuth): string => {
  const url = `${API_BASE}${API_AUTH}`;
  const urlParams = new URLSearchParams({
    clientCode: clientCode,
    username: username,
    password: password
  })
  return `${url}${urlParams}`
}

export const authRequest = async ({ username, password, clientCode }: IAuth) => {
  return axios.get(authRequestURL({ username, password, clientCode }))
}