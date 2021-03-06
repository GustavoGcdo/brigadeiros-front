import TextField, { TextFieldProps } from '@material-ui/core/TextField/TextField';
import { useField } from '@unform/core';
import React, { FunctionComponent, useEffect, useRef } from 'react';

interface Props {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props & TextFieldProps;

const InputForm: FunctionComponent<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <TextField
      error={error != null}
      id={name}
      label={label}
      className="input-form"
      size="small"
      helperText={error}
      defaultValue={defaultValue}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputRef: inputRef,
      }}
      {...rest}
    />
  );
};

export default InputForm;
