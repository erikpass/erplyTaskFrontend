import { FieldMetaProps, FormikTouched, FormikErrors } from "formik";
import { useEffect, useState } from "react";
import Select, { StylesConfig, ActionMeta } from "react-select";
import styled from "styled-components";



type OptionType = {
  label: string;
  value: string;
};

type IsMulti = false;

const FormSelectStyles: StylesConfig<OptionType, IsMulti> = {
  control: (provided,) => ({
    ...provided,
    backgroundColor: 'white',
    border: '1px solid #EFF1F3',
    width: "409px",
    height: "44px",
    margin: '10px 12px 10px 12px',
    paddingLeft: "4px",
  }),
  placeholder: (provided,) => ({
    ...provided,
    color: 'rgba(114, 121, 129, 1)',
    opacity: ".5",
  }),
  indicatorSeparator: (provided,) => ({
    ...provided,
    display: "none"
  })
}

const FormSelectStylesError: StylesConfig<OptionType, IsMulti> = {
  control: (provided,) => ({
    ...provided,
    backgroundColor: 'white',
    border: '1px solid #E53051',
    width: "409px",
    height: "48px",
    margin: '8px 12px 8px 12px',
    paddingLeft: "4px",
    borderRadius: 0,
  }),
  placeholder: (provided,) => ({
    ...provided,
    color: 'rgba(114, 121, 129, 1)',
    opacity: ".5",
  }),
  indicatorSeparator: (provided,) => ({
    ...provided,
    display: "none"
  })
}

const FormSelectContainer = styled.div`
  position: relative;
`

const ErrorLabel = styled.span`
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

interface SelectFieldInputs {
  options?: OptionType[];
  placeholder?: React.ReactNode;
  getFieldMeta: <Value>(name: string) => FieldMetaProps<Value>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  setTouched: any;
  name: string;
  errors: FormikErrors<unknown>;
  touched: FormikTouched<unknown>;
  values: any;
}

export const FormSelectField: React.FC<SelectFieldInputs> = (props) => {
  const { options, placeholder, getFieldMeta, setFieldValue, setTouched, touched, name, errors, values } = props

  const [meta, setMeta] = useState<any>()
  const [errorText, setErrorText] = useState<string>()
  const [selectValue, setSelectValue] = useState<OptionType | null>(null)

  useEffect(() => {
    setMeta(getFieldMeta(name))
    // eslint-disable-next-line
  }, [errors, touched])

  useEffect(() => {
    if (meta?.error && meta?.touched) return setErrorText(meta?.error)
    setErrorText("")
    // eslint-disable-next-line
  }, [meta])

  useEffect(() => {
    if (values.hasOwnProperty(name) && !!values[name] && options !== undefined) {
      const defaultOption = options.find(x => x.value === values[name])
      if (defaultOption) setSelectValue(defaultOption);
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (options) {
      const getOption = options.find(x => x.value === values[name])
      if (getOption !== undefined) {
        setSelectValue(getOption)
      }
    }
  }, [values[name]])


  type valueType = {
    value: OptionType | null, actionMeta: ActionMeta<OptionType>
  }

  const handleChange: Function = (value: valueType) => {
    setFieldValue(name, value?.value)
  }

  const handleBlur: Function = (value: valueType) => {
    setTouched({ ...touched, [name]: true }, true)
  }

  return (
    <FormSelectContainer>
      <ErrorLabel>{errorText}</ErrorLabel>
      <Select
        value={selectValue}
        options={options}
        onChange={value => handleChange(value)}
        onBlur={value => handleBlur(value)}
        styles={!!errorText ? FormSelectStylesError : FormSelectStyles}
        placeholder={placeholder}
        key={name}
      />
    </FormSelectContainer>
  )
}

export default FormSelectField