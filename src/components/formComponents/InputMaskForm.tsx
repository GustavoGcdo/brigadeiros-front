import React, { FunctionComponent, useRef, useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import MaskPhone from '../masks/MaskPhone';
import MaskCPF from '../masks/MaskCPF';
import MaskRG from '../masks/MaskRG';
import MaskCEP from '../masks/MaskCEP';
import { useField } from '@unform/core';
import MaskCurrency from '../masks/MaskCurrency';

interface InputMaskProps {
  name: string;
  label?: string;
  typeMask: TypeMasks;
}

type TypeMasks = 'phone' | 'cpf' | 'rg' | 'cep' | 'currency';

const InputMaskForm: FunctionComponent<InputMaskProps> = ({ name, label, typeMask }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [value, setValue] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      getValue: (ref: any) => {
        return value;
      },
      setValue: (ref: any, value: any) => {
        setValue(value);
      },
    });
  }, [fieldName, registerField, value, setValue]);

  const handleChange = (event: any) => {
    const newValue = event.target.value;    
    setValue(newValue);
  };

  const getMask = (type?: TypeMasks) => {
    switch (type) {
      case 'phone':
        return MaskPhone;
      case 'cpf':
        return MaskCPF;
      case 'rg':
        return MaskRG;
      case 'cep':
        return MaskCEP;
      case 'currency':
        return MaskCurrency;
      default:
        return MaskPhone;
    }
  };

  return (
    <TextField
      label={label}
      id={name}
      size="small"
      variant="outlined"
      value={value}
      onChange={handleChange}
      error={error != null}
      helperText={error}
      defaultValue={defaultValue}      
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputComponent: getMask(typeMask) as any,
      }}
    />
  );
};

export default InputMaskForm;
