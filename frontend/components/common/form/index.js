import { useState } from "react";
import styled from "styled-components";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

export function useForm(initialValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

export default function Form(props) {
  const { children, ...other } = props;
  return (
    <FormWrapper autoComplete="off" {...other}>
      {children}
    </FormWrapper>
  );
}
