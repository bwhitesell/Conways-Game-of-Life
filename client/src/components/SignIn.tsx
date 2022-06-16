import React from 'react';
import Router from 'next/router';

import BackendAPIClient, { StatusMessage } from '../backendAPIClient';
import ValidatedInputForm from './ValidatedInputForm';
import { SignedInContext } from './SignedInProvider'
import { BACKEND_URL } from '../config';


const SignIn: React.FC = () => {

  const inputFieldValues = ["", ""];
  const signedInContext = React.useContext(SignedInContext);
  
  const validateUsername = async (username: string): Promise<StatusMessage> => {
    if (username === "") {
      return {error: true, message: "Username can't be blank."}
    } else if (username.includes(" ")) {
      return {error: true, message: "Username can't contain spaces."}
    } else {
      return {error: false, message: "Username is valid."}
    };
  }

  const validatePassword = async (password: string) => {
    if (password === "") {
      return {error: true, message: "Password can't be blank."}
    } else if (password.includes(" ")) {
      return {error: true, message: "Password can't contain spaces."}
    } else {
      return {error: false, message: "Password is valid."}
    };
  }

  const attemptUserCreation = async (fieldValues: string[]) => {
    const username = fieldValues[0];
    const password = fieldValues[1];

    const backendAPIClient = new BackendAPIClient(BACKEND_URL);
    const registrationStatus = await backendAPIClient.loginUser(
      username,
      password,
    );

    if (registrationStatus.error) {
      console.log(registrationStatus)
      alert(registrationStatus.message)
    } else {
      signedInContext.update();
      Router.push('/home')
    }
  }

  return (
    <ValidatedInputForm
      inputFieldNames={["Username", "Password"]}
      fieldNameFontFamily="Apple Chancery, cursive"
      fieldNameFontSize="30px"
      formMaxWidth='500px'
      inputFieldValidations={[validateUsername, validatePassword]}
      submissionButtonName="Sign In"
      onSubmit={attemptUserCreation}
    />
  )
}

export default SignIn 