import { StyledForm, FormContainer, FormTitle } from "../elements/form"
import { FormSubmitButton } from "../elements/form/formSubmitButton"
import { FormInputField } from "../elements/form/formInputField"
import { Formik } from "formik"
import React, { useContext, useState } from "react"
import * as yup from "yup"
import FormMessageField from "../elements/form/formMessageField"
import { authRequest } from "../../api/login"
import { Context } from "../../context"


interface loginValuesType {
  clientCode: string,
  username: string,
  password: string
}

const initialLoginValues: loginValuesType = {
  clientCode: "",
  username: "",
  password: ""
}

const validationSchema = yup.object({
  clientCode: yup.number().required().label("Account Number"),
  username: yup.string().required().label("Email"),
  password: yup.string().required().label("Password")
})


export const LoginForm: React.FC = () => {

  const { state, setState } = useContext(Context)
  const [error, setError] = useState(false)

  const handleSubmit = (data: loginValuesType, setSubmitting: (isSubmitting: boolean) => void) => {
    setSubmitting(true)
    const clientCode = data.clientCode
    authRequest(data)
      .then(data => {
        if (data?.data?.records?.length) { //valid login
          setError(false)
          setSubmitting(false)
          setState({ ...state, sessionKey: data?.data?.records[0].sessionKey, clientCode: clientCode, jwt: data?.data?.records[0].identityToken })
        }
        else { //invalid login
          setError(true)
        }
      })
      .catch(error => {
        console.log(error)
        setError(true)
      })

    setSubmitting(false)
  }


  return (
    <FormContainer>
      <FormMessageField hide={!error} type={"error"}>
        Oops! Something went wrong. Please review the form.
      </FormMessageField>

      <Formik
        initialValues={initialLoginValues}
        validationSchema={validationSchema}

        onSubmit={(data, { setSubmitting }) => handleSubmit(data, setSubmitting)}

      >
        {({ isSubmitting }) => (
          <StyledForm style={{ alignItems: "center" }}>
            <FormTitle position="center">
              Login to Erply
            </FormTitle>
            <FormInputField type="number" name="clientCode" placeholder="Insert Account Number" />
            <FormInputField type="text" name="username" placeholder="Insert Email" />
            <FormInputField type="password" name="password" placeholder="Insert Password" />
            <FormSubmitButton disabled={isSubmitting} position="center" type="submit">
              Login
            </FormSubmitButton>
          </StyledForm>
        )}
      </Formik>

    </FormContainer>
  )
}

export default LoginForm