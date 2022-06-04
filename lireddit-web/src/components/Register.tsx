import React from 'react';
import BackendAPIWrapper from '../backendAPIWrapper';
import ValidatedInput from './ValidatedInput';
import { BACKEND_URL } from '../config';
import { Box, Button, Heading } from '@chakra-ui/react';
import Router from 'next/router';


const Register: React.FC = () => {
 
  const [usernameState, setUsernameState] = React.useState(ValidatedInput.genInitState());
  const [passwordState, setPasswordState] = React.useState(ValidatedInput.genInitState());
  const [isLoading, setIsLoading] = React.useState(false);

  const disableSubmit = (
    usernameState.isPending ||
    passwordState.isPending ||
    usernameState.error ||
    passwordState.error
  );
  
  const validateUsername = async (username: string) => {
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
    return await backendAPIWrapper.checkUsernameValidity(username)
  }

  const validatePassword = async (password: string) => {
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
    return await backendAPIWrapper.checkPasswordValidity(password)
  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

    setIsLoading(true)
    attemptUserRegistration()

    async function attemptUserRegistration() {
      const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
      const registrationStatus = await backendAPIWrapper.registerUser(
        usernameState.value,
        passwordState.value,
      );

      if (registrationStatus.error) {
        setIsLoading(false)
        alert(registrationStatus.message)
      } else {
        Router.push('/home')
      }
    }
  }

  return (
    <Box display="block" maxW="sm" margin="auto">
      <form style={{minWidth: "300px"}}>
        <ValidatedInput name="Username"
          state={usernameState}
          typingDelay={1000}
          validateInput={validateUsername}
        />
        <ValidatedInput
          name="Password"
          state={passwordState}
          typingDelay={1000}
          validateInput={validatePassword}
        />
        <Box display="flex" justifyContent="left" p={2}>
          <Button 
            isLoading={isLoading}
            marginLeft="auto"
            color="teal"
            isDisabled={disableSubmit}
            onClick={onSubmit}
          >Sign Up</Button>
        </Box>
      </form>
    </Box>
  )
}

export default Register