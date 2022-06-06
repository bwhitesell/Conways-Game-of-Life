import React from 'react';
import BackendAPIWrapper from '../backendAPIWrapper';
import ValidatedInput from './ValidatedInput';
import { BACKEND_URL } from '../config';
import { Box, Button, Heading } from '@chakra-ui/react';
import Router from 'next/router';
import ValidatedInputForm from './ValidatedInputForm';


const SignIn: React.FC = () => {

  const inputFieldValues = ["", ""]
  
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

    attemptSignIn();

    async function attemptSignIn() {
      const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
      const registrationStatus = await backendAPIWrapper.loginUser(
        inputFieldValues[0],
        inputFieldValues[1],
      );

      if (registrationStatus.error) {
        alert(registrationStatus.message)
      } else {
        Router.push('/home')
      }
    }
  }

  return (
    <ValidatedInputForm
      inputFieldNames={["Username", "Password"]}
      inputFieldValues={inputFieldValues}
      fieldNameFontFamily="Apple Chancery, cursive"
      fieldNameFontSize="30px"
      formMaxWidth='500px'
      inputFieldValidations={[validateUsername, validatePassword]}
      submissionButtonName="Sign In"
      onSubmit={(e: React.MouseEvent<HTMLButtonElement>) => onSubmit(e)}
    />
  )
}

export default SignIn 