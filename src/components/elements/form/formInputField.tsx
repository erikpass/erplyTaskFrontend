import { FieldHookConfig, useField } from "formik"
import { InputHTMLAttributes } from "react"
import styled from "styled-components"

interface FormInputProps {
  isError: boolean
}

export const FormInput = styled.input<FormInputProps>`
  width: 391px;
  height: 44px;
  background: white;
  border: ${props => props.isError ? "1px solid #E53051" : "1px solid #EFF1F3"} ;
  font-size: 16px;
  font-family: 'SF Pro Display';
  margin: 8px 12px 8px 12px;
  padding-left: 14px;
  ::placeholder {
    color: #727981;
    opacity: .5;
  }

  outline-color: #5f88c7;

  /* Chrome, Safari, Edge, Opera */
  *::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
`

export const ErrorLabel = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 14px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  color: #E53051;
  font-size: 10px;
  transform: translateY(-4px);
`

export const FormInputContainer = styled.div`
  position: relative;
`

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  showError?: boolean
}

export const FormInputField = (props: FieldHookConfig<string>) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <FormInputContainer>
      <ErrorLabel>{errorText}</ErrorLabel>
      <FormInput {...field} {...props} isError={!!errorText} />
    </FormInputContainer>
  )
}

export default FormInputField
