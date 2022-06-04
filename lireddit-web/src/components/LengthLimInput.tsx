import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, propNames } from '@chakra-ui/react';
import React from 'react';


interface LengthLimInputProps {
  name: string;
  size: string;
  maxCharLength: number;
}


const LengthLimInput: React.FC<LengthLimInputProps> = (props) => {
  let isUntouched: boolean = true;
  const [value, setValue] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isUntouched = false;
    setValue(e.target.value);
  }

  const isInputValid = (input: string): boolean => {
    if (input.length <= props.maxCharLength) {
      return true
    }
    return false
  }

  return (
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor='email'>Email</FormLabel>
      <Input 
        value={value}
        onChange={onChange}
        placeholder={props.name}
        size={props.size}
      />
      {!isError ? (
        <FormHelperText />
      ) : (
        <FormErrorMessage>
          {`Input must be ${props.maxCharLength} characters or less.`}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export default LengthLimInput