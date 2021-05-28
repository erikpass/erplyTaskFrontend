import styled from "styled-components"

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 60px;
  background: rgba(255,255,255,1);
  justify-content: space-between;
  align-items: center;
`

export const Logo = styled.img`
  width: auto;
  height: 20px;
`

export const Text = styled.span`
  color: rgba(114, 121, 129, 1);
  margin-left: 40px;
`

export const NavGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const LogOutButton = styled.button`
  color: rgba(229, 48, 81, 1);
  background-color: white;
  padding: 8px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  font-family: 'SF Pro Display';

  :hover {
    cursor: pointer;
  }
`
