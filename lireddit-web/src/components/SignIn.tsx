import React from 'react';
import BackendAPIWrapper from '../backendAPIWrapper';
import ValidatedInput from './ValidatedInput';
import { BACKEND_URL } from '../config';
import { Box, Button, Heading } from '@chakra-ui/react';
import Router from 'next/router';


const SignIn: React.FC = () => {
 
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
    const error = username === "";
    const message = error ? "Username can't be blank." : "Username is valid.";
    return {error: error, message: message}
  }

  const validatePassword = async (password: string) => {
    const error = password === "";
    const message = error ? "Password can't be blank." : "Password is valid.";
    return {error: error, message: message}

  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

    setIsLoading(true);
    attemptSignIn();

    async function attemptSignIn() {
      const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
      const registrationStatus = await backendAPIWrapper.loginUser(
        usernameState.value,
        passwordState.value,
      );

      if (registrationStatus.error) {
        setIsLoading(false)
        alert(registrationStatus.message)
      } else {
        Router.push('/board')
      }
    }
  }

  return (
    <Box display="block" maxW="sm" margin="auto">
      <form style={{minWidth: "300px"}}>
        <ValidatedInput name="Username"
          state={usernameState}
          setState={setUsernameState}
          typingDelay={1000}
          validateInput={validateUsername}
          hideValidityIcon={true}
        />
        <ValidatedInput
          name="Password"
          state={passwordState}
          setState={setPasswordState}
          typingDelay={1000}
          validateInput={validatePassword}
          hideValidityIcon={true}
        />
        <Box display="flex" justifyContent="left" p={2}>
          <Button 
            isLoading={isLoading}
            marginLeft="auto"
            color="teal"
            isDisabled={disableSubmit}
            onClick={onSubmit}
          >Login</Button>
        </Box>
      </form>
    </Box>
  )
}

export default SignIn 