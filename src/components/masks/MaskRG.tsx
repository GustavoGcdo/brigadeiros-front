import React, { FunctionComponent } from 'react';
import MaskedInput from 'react-text-mask';

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const MaskRG: FunctionComponent<TextMaskCustomProps> = (props: TextMaskCustomProps) => {
  const { inputRef, ...other } = props;

  const mask = [/[0-9]/, /\d/, /\d/,".", /\d/, /\d/, /\d/,".", /\d/, /\d/, /\d/];

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      placeholderChar={'\u2000'}
    />
  );
};

export default MaskRG;
