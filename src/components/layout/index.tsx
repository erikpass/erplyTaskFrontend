import { useState, useEffect } from "react"
import Navbar from "../navbar"
import LoginForm from "../forms/loginForm"
import UserForm from "../forms/userForm"
import { Context, IState, initialState } from "../../context"



export const Layout: React.FC<{}> = () => {
  const [state, setState] = useState<IState>(initialState)

  useEffect(() => {
    const clientCode = localStorage.getItem('clientCode');
    const sessionKey = localStorage.getItem('sessionKey');
    const jwt = localStorage.getItem('jwt');

    if (!!clientCode && !!sessionKey && !!jwt) {
      setState({ ...state, clientCode: clientCode, sessionKey: sessionKey, jwt: jwt })
    }
    // eslint-disable-next-line
  }, [])

  /* useEffect(() => {
    console.log(state)
  }, [state]) */

  useEffect(() => {
    const clientCode = localStorage.getItem('clientCode');
    const sessionKey = localStorage.getItem('sessionKey');
    const jwt = localStorage.getItem('jwt');
    if (!!clientCode && !!sessionKey && !!jwt) return

    localStorage.setItem("clientCode", state.clientCode);
    localStorage.setItem("sessionKey", state.sessionKey);
    localStorage.setItem("jwt", state.jwt);
  }, [state.clientCode, state.sessionKey, state.jwt])

  return (
    <Context.Provider value={{ state, setState }}>
      <Navbar loggedIn={!!state.sessionKey && !!state.clientCode} />
      {!!state.sessionKey && !!state.clientCode ? <UserForm /> : <LoginForm />}
    </Context.Provider>
  )
}

export default Layout
