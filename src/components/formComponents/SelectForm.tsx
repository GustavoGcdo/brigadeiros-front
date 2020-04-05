import { MenuItem } from '@material-ui/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from '@unform/core';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { OptionSelect } from '../../models/types/component.types';

interface Props {
  name: string;
  label?: string;
  options: OptionSelect[];
}

type SelectProps = JSX.IntrinsicElements['input'] & Props & TextFieldProps;

const SelectForm: FunctionComponent<SelectProps> = ({ name, label, options, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  const [valueSelect, setValueSelect] = useState(defaultValue);

  const handleChange = (event: any) => {
    setValueSelect(event.target.value);
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'node.value',
      setValue: (ref: any, value: any) => {
        setValueSelect(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <TextField
      error={error != null}
      label={label}
      select
      className="input-form"
      size="small"
      defaultValue={defaultValue}
      value={valueSelect}
      onChange={handleChange}
      helperText={error}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        id: name,
        inputRef: inputRef,
      }}
      {...rest}
    >
      <MenuItem value=''>Selecione</MenuItem>
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectForm;
