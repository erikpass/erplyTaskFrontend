import { useState, useEffect } from "react"
import styled from "styled-components"


interface ErrorProps {
  hide?: boolean,
  type?: "error" | "success"
}

export const ErrorContainer = styled.div<ErrorProps>`
  display: flex;
  visibility: ${props => props.hide ? "hidden" : "visible"};
  flex-direction: row;
  width: 866px;
  height: 44px;
  margin-bottom: 25px;
  margin-top: 47px;
  border: ${props => props?.type === "error" ? "1px solid rgba(229, 48, 81, 1)" : "1px solid rgba(0, 126, 90, 1)"};
  background: #FFFFFF; 
  align-items: center;
`

interface MessageTextProps {
  type?: "error" | "success"
}

export const ErrorMessage = styled.p<MessageTextProps>`
  color: ${props => props?.type === "error" ? "rgba(229, 48, 81, 1)" : "#007E5A"};
  opacity: .5;
  font-family: 'SF Pro Display';
  font-size: 16px;
  margin-left: 14px;
`

interface MessageFieldProps {
  children?: string,
  hide?: boolean,
  type?: "error" | "success"
}



export const FormMessageField: React.FC<MessageFieldProps> = ({ children, hide, type }) => {
  const [state, setState] = useState<MessageFieldProps>({ children, hide, type })

  useEffect(() => {
    //console.log(hide, type, children)
    setState({ children, hide, type })
  }, [hide, type, children])

  return (
    <>
      <ErrorContainer hide={state.hide || false} type={state.type || "success"}>
        <ErrorMessage type={state.type || "success"}>
          {state.children}
        </ErrorMessage>
      </ErrorContainer>
    </>
  )
}

export default FormMessageField