import React, { ButtonHTMLAttributes } from "react"
import styled from "styled-components"

interface ButtonPositionProps {
  position?: "left" | "center" | "right"
}

const handleButtonPosition = (props: ButtonPositionProps) => {
  switch (props?.position) {
    case "left": return "8px auto 8px 12px"
    case "center": return "8px auto 8px auto"
    case "right": return "8px 12px 8px auto"
    default: return "8px auto 8px 12px"
  }
}

export const FormButton = styled.button<ButtonPositionProps>`
  position: relative;
  width: 185px;
  height: 44px;
  background: #0737A0;
  border-radius: 6px;
  margin: ${(props) => handleButtonPosition(props)};
  box-shadow: none;
  border: none;

  & span{
    color: white;
    font-family: 'SF Pro Display';
    font-size: 16px;
    transition: all 0.2s;
  }

  :hover {
    cursor: pointer;
  }

  :disabled {
    background: #05266d;

    & span {
      visibility: hidden;
      opacity: 0;
    }

    &::after {
      opacity: 1;
      visibility: visible;
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 4px solid transparent;
      border-top-color: white;
      border-radius: 50%;
      animation: button-loading-spinner 1s ease infinite;
    }

    @keyframes button-loading-spinner {
      from {
        transform: rotate(0turn);
      }
      to {
        transform: rotate(1turn);
      }
    }
  }
`

interface FormSubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps & ButtonPositionProps> = ({ children, ...props }) => {
  return (
    <FormButton {...props} type="submit">
      <span>{children}</span>
    </FormButton>
  )
}

export default FormSubmitButton
