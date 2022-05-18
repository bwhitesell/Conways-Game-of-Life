import React from 'react';
import BackendAPIWrapper from '../backendAPIWrapper';
import ValidatedInput from '../components/ValidatedInput';
import { BACKEND_URL } from '../config';
import { Box, Button } from '@chakra-ui/react';


const register: React.FC = () => {
 
  const [usernameState, setUsernameState] = React.useState(ValidatedInput.genInitState())
  const [passwordState, setPasswordState] = React.useState(ValidatedInput.genInitState())

  const disableSubmit = (
    usernameState.isPending ||
    passwordState.isPending ||
    usernameState.error ||
    passwordState.error
  )
  
  const validateUsername = async (username: string) => {
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
    return await backendAPIWrapper.checkUsernameValidity(username)
  }

  const validatePassword = async (password: string) => {
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
    return await backendAPIWrapper.checkPasswordValidity(password)
  }

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
    const registrationStatus = await backendAPIWrapper.registerUser(
      usernameState.value,
      passwordState.value,
    );
    const alertMsg = registrationStatus.error ? (
      registrationStatus.message
    ) : (
      "User created successfully!"
    );
    alert(alertMsg);
  }

  return (
    <Box display="flex" maxW="sm" justifyContent="center" margin="auto">
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
            marginLeft="auto"
            color="teal"
            isDisabled={disableSubmit}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default register