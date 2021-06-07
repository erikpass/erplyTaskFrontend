//to pass formik changes into the parent state since formik has no onChange

import { useEffect } from "react"
import * as _ from "lodash"



export const FormikCallback: React.FC<any> = (props) => {

  const successMessage = "Thank you! Your settings have been saved.";
  const errorMessage = "Oops! Something went wrong. Please review the form.";

  useEffect(() => {

    //hide message if no touched field has errors
    if (_.isEmpty(props?.errors)) {
      props.setMessageCallback({ contents: errorMessage, hide: true, type: "error" })
    }

    //show error message only if at least one field with an error has been touched
    if ((_.intersection(_.keys(props?.errors), _.keys(props?.touched)).length)) {
      props.setMessageCallback({ contents: errorMessage, hide: false, type: "error" })
    } else {
      props.setMessageCallback({ contents: errorMessage, hide: true, type: "error" })
    }


    //show success if no errors and success
    if (_.isEmpty(props?.errors) && props?.success) {
      props.setMessageCallback({ contents: successMessage, hide: false, type: "success" })
    }
    // eslint-disable-next-line
  }, [props?.errors, props?.touched, props?.success])


  useEffect(() => {
    if (_.isEmpty(props?.errors)) {
      props.setSuccessFalse()
    }
    // eslint-disable-next-line
  }, [props?.errors])

  return (
    <></>
  )
}



