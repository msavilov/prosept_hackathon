import React, { useCallback } from 'react';

export const useValidate = () => {
  const [formValue, setFormValue] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = e => {
    const input = e.target;
    const value = input.value;
    const name = input.name;

    setFormValue({ ...formValue, [name]: value });
    setErrorMessage({ ...errorMessage, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setFormValue(newValues);
      setErrorMessage(newErrors);
      setIsValid(newIsValid);
    },
    [setFormValue, setErrorMessage, setIsValid]
  );

  return { formValue, errorMessage, isValid, handleChange, resetForm };
};
