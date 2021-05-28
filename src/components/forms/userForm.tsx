import { StyledForm, FormContainer, FormTitle, FormCol, FormRow } from "../elements/form"
import { FormSubmitButton } from "../elements/form/formSubmitButton"
import { FormInputField } from "../elements/form/formInputField"
import { FormSelectField } from "../elements/form/formSelectField"
import { FormMessageField } from "../elements/form/formMessageField"
import { FormikCallback } from "../elements/form/utilComponents"
import { Formik } from "formik"
import * as yup from "yup"
import { useCallback, useContext, useEffect, useState } from "react"
import { Context } from "../../context"
import { formRequest } from "../../api/form"
import { cafaGetRequest, cafaPostRequest } from "../../api/cafa"

const urlRegExp = new RegExp("^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$", "i");
const emailRegExp = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$", 'i');

interface formValuesType {
  companyName: string,
  websiteURL: string,
  selectWarehouse: string,
  email: string,
  paymentGateway: string,
  paymentMethod: string,
}

const initialFormValues: formValuesType = {
  companyName: "",
  email: "",
  paymentGateway: "",
  paymentMethod: "",
  selectWarehouse: "",
  websiteURL: ""
}

const validationSchema = yup.object({
  companyName: yup.string().required().label("Company Name"),
  websiteURL: yup.string().required().label("Website URL").matches(urlRegExp, "Invalid URL"),
  selectWarehouse: yup.string().required().label("Warehouse"),
  email: yup.string().required().label("Email").matches(emailRegExp, "Invalid Email"),
  paymentGateway: yup.string().required().label("Payment Gateway"),
  paymentMethod: yup.string().required().label("Payment Type"),
})

interface IMEssage {
  contents: string;
  type: "error" | "success";
  hide: boolean;
}

export const UserForm: React.FC = () => {
  const { state, setState } = useContext(Context);
  const [initialValues, setInitialValues] = useState<formValuesType>(initialFormValues);
  const [ready, setReady] = useState<boolean>(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState<IMEssage>({ contents: "", type: "error", hide: true })

  function logout() {
    localStorage.setItem("clientCode", "");
    localStorage.setItem("sessionKey", "");
    localStorage.setItem("jwt", "");
    setState({ ...state, clientCode: "", sessionKey: "", jwt: "" })
  }

  function saveSettings(jwt: string, value: any) {
    cafaPostRequest({ jwt, value })
      .then((response) => console.log("cafa post", response?.data))
  }

  async function loadSettings(jwt: string) {
    const loadedValues = cafaGetRequest({ jwt })
    if (!(await loadedValues).data.length) {
      console.log("No saved values found.")
      setReady(true)
    } else if ((await loadedValues).data[0]?.value) {
      setInitialValues((await loadedValues).data[0].value)
      setReady(true)
    } else {
      logout()
    }
  }



  //get fields data from server
  useEffect(() => {
    //get payment types
    const formPaymentsPromise = formRequest({ clientCode: state.clientCode, sessionKey: state.sessionKey, request: "getPaymentTypes" })
    //get warehouses
    const formWarehousesPromise = formRequest({ clientCode: state.clientCode, sessionKey: state.sessionKey, request: "getWarehouses" })

    Promise.all([formPaymentsPromise, formWarehousesPromise]).then(([formpayments, formwarehouses]: Array<any>) => {
      //console.log(values)
      if (!!formpayments?.data?.records && !!formwarehouses?.data?.records) {
        const paymentsData: Array<any> = formpayments.data.records.map((record: any) => {
          const capitalizedName = record.name.charAt(0).toUpperCase() + record.name.slice(1)
          return { value: record.type, label: capitalizedName }
        })
        const warehousesData: Array<any> = formwarehouses.data.records.map((record: any) => {
          return { value: record.name, label: record.name }
        })

        setState({ ...state, warehouses: warehousesData, paymentTypes: paymentsData })
        //console.log("Form selects api success.")
        loadSettings(state.jwt)

      } else {
        //console.log("Form selects api fail.")
        logout()
      }

    })
    // eslint-disable-next-line
  }, [])


  const setSuccessFalse = useCallback(() => {
    setSuccess(false)
  }, [])
  const setMessageCallback = useCallback((props) => {
    setMessage(props)
  }, [])

  const handleSubmit = (data: any, setSubmitting: (isSubmitting: boolean) => void) => {
    setSubmitting(true)
    saveSettings(state.jwt, data)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
    }, 2000);
  }


  return (
    <>
      {ready && (
        <FormContainer>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}

            onSubmit={(data, { setSubmitting }) => handleSubmit(data, setSubmitting)}
          >

            {({ values, errors, setFieldValue, setTouched, getFieldMeta, touched, isSubmitting }) => (
              <StyledForm style={{ alignItems: "center" }}>

                <FormMessageField hide={message.hide} type={message.type} key={"messagefield"}>
                  {message.contents}
                </FormMessageField>

                <FormikCallback setSuccessFalse={setSuccessFalse} errors={errors} setMessageCallback={setMessageCallback} touched={touched} success={success} />

                <FormTitle>Basic Information</FormTitle>

                <FormRow>
                  <FormCol>
                    <FormInputField type="text" name="companyName" placeholder="Insert Company Name" spellCheck="false" key={"companyNameField"} />
                    <FormSelectField
                      values={values}
                      options={state.warehouses}
                      placeholder={"Select Warehouse"}
                      setFieldValue={setFieldValue}
                      setTouched={setTouched}
                      getFieldMeta={getFieldMeta}
                      touched={touched}
                      name={"selectWarehouse"}
                      errors={errors}
                      key={"selectWarehouseField"}
                    />
                  </FormCol>
                  <FormCol>
                    <FormInputField type="text" name="websiteURL" placeholder="Insert Website URL" spellCheck="false" key={"websiteURLField"} />
                    <FormInputField type="text" name="email" placeholder="Insert Email" spellCheck="false" key={"emailField"} />
                  </FormCol>
                </FormRow>

                <FormTitle>Payment Types Mapping</FormTitle>

                <FormRow>

                  <FormSelectField
                    values={values}
                    options={state.paymentGateway}
                    placeholder={"Select Payment Gateway"}
                    setFieldValue={setFieldValue}
                    setTouched={setTouched}
                    getFieldMeta={getFieldMeta}
                    touched={touched}
                    name={"paymentGateway"}
                    errors={errors}
                    key={"paymentGatewayField"}
                  />

                  <FormSelectField
                    values={values}
                    options={state.paymentTypes}
                    placeholder={"Select Erply Payment Type"}
                    setFieldValue={setFieldValue}
                    setTouched={setTouched}
                    getFieldMeta={getFieldMeta}
                    touched={touched}
                    name={"paymentMethod"}
                    errors={errors}
                    key={"paymentMethodField"}
                  />

                </FormRow>

                <FormSubmitButton position="right" disabled={isSubmitting} key={"submitButton"}>
                  Save Settings
                </FormSubmitButton>

              </StyledForm>
            )}
          </Formik>

        </FormContainer>
      )}

    </>
  )
}

export default UserForm