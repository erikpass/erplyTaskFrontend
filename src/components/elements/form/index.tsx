import styled from "styled-components"
import { Form } from "formik"

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: auto auto auto auto;
`

interface TitlePositionProps {
  position?: "left" | "center" | "right"
}

const handleTitlePosition = (props: TitlePositionProps) => {
  switch (props?.position) {
    case "left": return "17px auto 17px 0"
    case "center": return "17px auto 17px auto"
    case "right": return "17px 0 17px auto"
    default: return "17px auto 17px 0"
  }
}

export const FormTitle = styled.p<TitlePositionProps>`
  font-family: 'SF Pro Display';
  font-size: 24px;
  font-weight: bold;
  color: black;
  //margin: 17px auto 17px auto;
  margin: ${(props) => handleTitlePosition(props)};
`

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const FormCol = styled.div`
  display: flex;
  flex-direction: column;
`