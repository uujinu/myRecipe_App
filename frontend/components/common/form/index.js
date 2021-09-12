import { useState } from "react";

export function useForm(initialValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    if (validateOnChange) {
      validate({ [name]: value })
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
    resetForm
  };
};

export default function Form(props) {
  const { children, ...other } = props;
  return (
    <form autoComplete="off" {...other}>
      {children}
    </form>
  )
};
