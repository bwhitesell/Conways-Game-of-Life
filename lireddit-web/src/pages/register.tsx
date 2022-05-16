import React from 'react';
import { BACKEND_URL } from '../config'
import BackendAPIWrapper from '../backendAPIWrapper'
import ValidatedInput from '../components/ValidatedInput'




const register: React.FC = () => {

  const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL)

  const usernameValidityCB = async (username: string) => {
    return await backendAPIWrapper.checkUsernameValidity(username)
  }
  const passwordValidityCB = async (password: string) => {
    return await backendAPIWrapper.checkPasswordValidity(password)
  }

  return (
    <div>
      <ValidatedInput fieldName='username' validityCallback={usernameValidityCB}/>
      <ValidatedInput fieldName='password' validityCallback={passwordValidityCB}/>
   </div>
  )
}

export default register