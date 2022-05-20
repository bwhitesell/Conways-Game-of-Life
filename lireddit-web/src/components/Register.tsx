import React from 'react';
import BackendAPIWrapper from '../backendAPIWrapper';
import ValidatedInput from './ValidatedInput';
import { BACKEND_URL } from '../config';
import { Box, Button, Heading } from '@chakra-ui/react';


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

      setIsLoading(false)
      if (!registrationStatus.error) {
        alert("User Created Successfully! Reloading Page.")
        setTimeout(() => window.location.reload(), 100);
      } else {
        alert(registrationStatus.message)
      }
    }
  }

  return (
    <Box display="block" maxW="sm" margin="auto">
      <Heading margin="auto" textAlign="center" size="md" p={3}>Sign Up</Heading>
      <form style={{minWidth: "300px"}}>
        <ValidatedInput name="Username"
          state={usernameState}
          setState={setUsernameState}
          typingDelay={1000}
          validateInput={validateUsername}
        />
        <ValidatedInput
          name="Password"
          state={passwordState}
          setState={setPasswordState}
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