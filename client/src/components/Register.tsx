import React from "react";
import Router from "next/router";

import BackendAPIClient from "../backendAPIClient";
import ValidatedInputForm from "./ValidatedInputForm";
import { SignedInContext } from "../components/SignedInProvider";
import { BACKEND_URL } from "../config";

const Register: React.FC = () => {
  const inputFieldValues = ["", ""];
  const signedInContext = React.useContext(SignedInContext);

  const validateUsername = async (username: string) => {
    const backendAPIClient = new BackendAPIClient(BACKEND_URL);
    return await backendAPIClient.checkUsernameValidity(username);
  };

  const validatePassword = async (password: string) => {
    const backendAPIClient = new BackendAPIClient(BACKEND_URL);
    return await backendAPIClient.checkPasswordValidity(password);
  };

  const attemptUserRegistration = async (fieldValues: string[]) => {
    const username = fieldValues[0];
    const password = fieldValues[1];

    const backendAPIClient = new BackendAPIClient(BACKEND_URL);
    const registrationStatus = await backendAPIClient.registerUser(
      username,
      password
    );

    if (registrationStatus.error) {
      alert(registrationStatus.message);
    } else {
      signedInContext.update();
      Router.push("/home");
    }
  };

  return (
    <ValidatedInputForm
      inputFieldNames={["Username", "Password"]}
      fieldNameFontFamily="Apple Chancery, cursive"
      fieldNameFontSize="30px"
      formMaxWidth="500px"
      inputFieldValidations={[validateUsername, validatePassword]}
      submissionButtonName="Register"
      onSubmit={attemptUserRegistration}
    />
  );
};

export default Register;
