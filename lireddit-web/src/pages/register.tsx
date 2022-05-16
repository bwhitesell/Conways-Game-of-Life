import React from 'react';
import { Box, ComponentWithAs, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react';
import { BACKEND_URL } from '../config'

interface UsernameValidityStatus {
  username: string;
  error: boolean;
  message: string;
}
interface RegisterProps {
}

async function validateUsername(username: string, usernameValiditySetter: React.Dispatch<React.SetStateAction<UsernameValidityStatus>>) {
  const rawUsernameValidityMsg = await fetch(
    BACKEND_URL + '/validateUsername',
    {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username}),
    }
  )

  const usernameValidityMsg = await rawUsernameValidityMsg.json()

  usernameValiditySetter(
    {
      username: username,
      error: usernameValidityMsg.error,
      message: usernameValidityMsg.message,
    }
  )
}

const register: React.FC<RegisterProps> = () => {

  const [validityMessage, setValdidityMessage] = React.useState({username: '', error: false, message: ''})
  const handleUsername = async (e: React.ChangeEvent<HTMLInputElement>) => validateUsername(e.target.value, setValdidityMessage)
  console.log(validityMessage)
  return (
    <FormControl isInvalid={validityMessage.error}>
      <FormLabel htmlFor='username'>Username</FormLabel>
      <Input id='username' type='username' value={validityMessage.username} onChange={handleUsername}/>
      {validityMessage.error ?
        (
          <FormErrorMessage>{validityMessage.message}</FormErrorMessage>
        ) : (
          <FormHelperText>Enter a username.</FormHelperText>
        )
      }
    </FormControl>

    )
}

export default register