import React from 'react';
import Router from 'next/router';

import BackendAPIClient from '../backendAPIClient';
import ValidatedInputForm from './ValidatedInputForm';
import { SignedInContext } from './SignedInProvider'
import { BACKEND_URL } from '../config';


const SignIn: React.FC = () => {

  const inputFieldValues = ["", ""];
  const signedInContext = React.useContext(SignedInContext);
  
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
      const backendAPIClient = new BackendAPIClient(BACKEND_URL);
      const registrationStatus = await backendAPIClient.loginUser(
        inputFieldValues[0],
        inputFieldValues[1],
      );

      if (registrationStatus.error) {
        console.log(registrationStatus)
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
      submissionButtonName="Sign In"
      onSubmit={(e: React.MouseEvent<HTMLButtonElement>) => onSubmit(e)}
    />
  )
}

export default SignIn 