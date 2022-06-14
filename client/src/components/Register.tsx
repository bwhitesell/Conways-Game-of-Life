import React from 'react';
import Router from 'next/router';

import BackendAPIClient from '../backendAPIClient';
import ValidatedInputForm from './ValidatedInputForm';
import { SignedInContext } from '../components/SignedInProvider'
import { BACKEND_URL } from '../config';


const Register: React.FC = () => {

  const inputFieldValues = ["", ""];
  const signedInContext = React.useContext(SignedInContext);
 
  const validateUsername = async (username: string) => {
    const backendAPIClient = new BackendAPIClient(BACKEND_URL);
    return await backendAPIClient.checkUsernameValidity(username)
  }

  const validatePassword = async (password: string) => {
    const backendAPIClient = new BackendAPIClient(BACKEND_URL);
    return await backendAPIClient.checkPasswordValidity(password)
  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

    attemptUserRegistration();

    async function attemptUserRegistration() {
      const backendAPIClient = new BackendAPIClient(BACKEND_URL);
      const registrationStatus = await backendAPIClient.registerUser(
        inputFieldValues[0],
        inputFieldValues[1],
      );

      if (registrationStatus.error) {
        alert(registrationStatus.message)
      } else {
        signedInContext.update();
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