import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { Props } from 'framer-motion/types/types';
import React from 'react'
import {ValidatedInputArgs} from './types'


const ValidatedInput: React.FC<ValidatedInputArgs> = (props) => {

  return (
    <FormControl isInvalid={props.inputData.error}>
      <FormLabel htmlFor={props.inputName}>{props.inputName}</FormLabel>
      <Input id={props.inputName} type={props.inputName} value={props.inputData.value} onChange={props.handleChange}/>
      {props.inputData.error ?
        (
          <FormErrorMessage>{props.inputData.message}</FormErrorMessage>
        ) : (
          <FormHelperText></FormHelperText>
        )
      }
    </FormControl>
  )
}

export default ValidatedInput
