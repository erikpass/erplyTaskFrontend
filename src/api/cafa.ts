import { API_BASE } from "."
import axios from "axios";

const API_CAFA_LOAD = "/api/loadCafa?"
const API_CAFA_SAVE = "/api/saveCafa?"

const loadURL = `${API_BASE}`;

const params = new URLSearchParams({
  application: "test-assignment",
  level: "warehouse",
  level_id: "1",
  name: "Front-End Test Assignment 2021"
})


interface ICafa {
  jwt: string;
  value?: any;
}


export const cafaGetRequest = async ({ jwt }: ICafa) => {
  return axios.get(`${loadURL}${API_CAFA_LOAD}${params}`, {
    headers: {
      jwt: jwt,
      'Content-Type': 'application/json'
    }
  })
}


export const cafaPostRequest = async ({ jwt, value }: ICafa) => {

  const postJson = {
    application: "test-assignment",
    level: "Warehouse",
    level_id: "1",
    name: "Front-End Test Assignment 2021",
    type: "test",
    value: value
  }

  return axios.post(`${loadURL}${API_CAFA_SAVE}${params}`, postJson, {
    headers: {
      jwt: jwt
    }
  })
}