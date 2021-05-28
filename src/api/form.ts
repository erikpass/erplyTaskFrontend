import { API_BASE, API_GET, IGet } from "."
import axios from "axios";

const formRequestURL = ({ clientCode, sessionKey, request }: IGet): string => {
  const url = `${API_BASE}${API_GET}`;
  const urlParams = new URLSearchParams({
    clientCode,
    sessionKey,
    request
  })
  return `${url}${urlParams}`
}

export const formRequest = async ({ clientCode, request, sessionKey }: IGet) => {
  return axios.get(formRequestURL({ clientCode, request, sessionKey }))
}

