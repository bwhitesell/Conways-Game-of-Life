import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { Props } from 'framer-motion/types/types';
import React from 'react'


interface ValidatedInputArgs {
  fieldName: string;
  validityCallback: (value: string) => Promise<{error: boolean, message: string}>
}


const ValidatedInput: React.FC<ValidatedInputArgs> = (props) => {

  // Input field validation logic
  const [validityMessage, setValidityMessage] = React.useState({fieldValue: '', error: false, message: ''})
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) =>  {
    const newFieldValue = e.target.value
    const cbValidityMessage = await props.validityCallback(newFieldValue)
    setValidityMessage({
      fieldValue: newFieldValue,
      error: cbValidityMessage.error,
      message: cbValidityMessage.message
    })
  }

  // Construted JSX
  return (
    <FormControl isInvalid={validityMessage.error}>
      <FormLabel htmlFor={props.fieldName}>{props.fieldName}</FormLabel>
      <Input id={props.fieldName} type={props.fieldName} value={validityMessage.fieldValue} onChange={handleChange}/>
      {validityMessage.error ?
        (
          <FormErrorMessage>{validityMessage.message}</FormErrorMessage>
        ) : (
          <FormHelperText></FormHelperText>
        )
      }
    </FormControl>
  )
}

export default ValidatedInput