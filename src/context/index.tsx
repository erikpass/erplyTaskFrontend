import { createContext } from "react";

export interface IState {
  clientCode: string;
  sessionKey: string;
  warehouses: any[];
  paymentTypes: any[];
  paymentGateway: any[];
  jwt: string;
}


export const initialState: IState = {

  clientCode: "",
  sessionKey: "",
  warehouses: [],
  paymentTypes: [],
  paymentGateway: [{ value: "paypal", label: "Paypal" }],
  jwt: ""
}

export interface IContext {
  state: IState;
  setState: (input: IState) => void;
}

export const Context = createContext<IContext>({ state: initialState, setState: () => { } })