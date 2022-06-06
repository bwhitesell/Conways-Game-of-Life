import React from 'react';
import Router from 'next/router';

import BackendAPIWrapper from '../backendAPIWrapper';
import ValidatedInputForm from './ValidatedInputForm';
import { BACKEND_URL } from '../config';


const Register: React.FC = () => {

  const inputFieldValues = ["", ""]
 
  const validateUsername = async (username: string) => {
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
    return await backendAPIWrapper.checkUsernameValidity(username)
  }

  const validatePassword = async (password: string) => {
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
    return await backendAPIWrapper.checkPasswordValidity(password)
  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

    attemptUserRegistration();

    async function attemptUserRegistration() {
      const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
      const registrationStatus = await backendAPIWrapper.registerUser(
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
      submissionButtonName="Register"
      onSubmit={(e: React.MouseEvent<HTMLButtonElement>) => onSubmit(e)}
    />
  )
}

export default Register