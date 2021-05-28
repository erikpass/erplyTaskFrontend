import { useContext } from "react"
import { Context } from "../../context"
import { Nav, LogOutButton, Logo, NavGroup, Text } from "../elements/navbar"

type NavbarProps = {
  loggedIn?: boolean
}

export const Navbar = ({ loggedIn }: NavbarProps) => {

  const { state, setState } = useContext(Context);

  function handleLogout() {
    localStorage.setItem("clientCode", "");
    localStorage.setItem("sessionKey", "");
    localStorage.setItem("jwt", "");
    setState({ ...state, clientCode: "", sessionKey: "", jwt: "" })
  }

  return (
    <Nav>
      <NavGroup style={{ marginLeft: "20px" }}>
        <Logo src={process.env.PUBLIC_URL + '/Logo1.svg'} alt="logo1" />
        <Logo src={process.env.PUBLIC_URL + '/Logo2.svg'} alt="logo2" />
        <Text>Test Assignement 2021 v1.0</Text>
      </NavGroup>
      {loggedIn && (
        <NavGroup style={{ marginRight: "30px" }}>
          <LogOutButton onClick={handleLogout}>Log out</LogOutButton>
        </NavGroup>
      )}
    </Nav>
  )
}

export default Navbar
