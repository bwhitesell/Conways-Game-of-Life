import React from 'react';
import { BACKEND_URL } from '../config'
import BackendAPIWrapper from '../backendAPIWrapper'
import ValidatedInput from '../components/ValidatedInput'
import { Box, Button } from '@chakra-ui/react';
import { ValidatedInputData } from '../components/types'
import { StatusMessage } from '../backendAPIWrapper'


const register: React.FC = () => {

  // Initialize data
  const initInputData = {value: "", error: false, message: ""}
  const [usernameData, setUsernameData] = React.useState(initInputData)
  const [passwordData, setPasswordData] = React.useState(initInputData)
  const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL)

  // can form be submitted?
  const canSubmit = (
    usernameData.error ||
    passwordData.error ||
    usernameData.value === ""
    || passwordData.value === ""
  )

  // form submission handler
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('hey')
    const validityMsg = await backendAPIWrapper.registerUser(usernameData.value, passwordData.value)
    alert(validityMsg.error ? "Uhoh.. this shouldn't happen" : "User successfuly registered.")
  }

  // render JSX
  return (
    <Box display="flex" maxW="sm" justifyContent="center" margin="auto">
      <form style={{minWidth: "300px"}}>
        <ValidatedInput
          inputName='Username'
          inputData={usernameData}
          handleChange={constructUsernameChangeHandler(setUsernameData)}
        />
        <ValidatedInput
          inputName='Password'
          inputData={passwordData}
          handleChange={constructPasswordChangeHandler(setPasswordData)}
        />
        <Box display="flex" justifyContent="left" p={2}>
          <Button marginLeft="auto" color="teal" isDisabled={canSubmit} onClick={onSubmit}>Submit</Button>
        </Box>
      </form>
    </Box>
  )
}

// constructors for change event handlers on validated inputs
const constructUsernameChangeHandler = (usernameDataSetter: React.Dispatch<React.SetStateAction<ValidatedInputData>>) => {
  return async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL)
    const validityMsg = await backendAPIWrapper.checkUsernameValidity(newValue)
    usernameDataSetter({
      value: newValue,
      error: validityMsg.error,
      message: validityMsg.message,
    })
  }
}

const constructPasswordChangeHandler = (passwordDataSetter: React.Dispatch<React.SetStateAction<ValidatedInputData>>) => {
  return async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL)
    const validityMsg = await backendAPIWrapper.checkPasswordValidity(newValue)
    passwordDataSetter({
      value: newValue,
      error: validityMsg.error,
      message: validityMsg.message,
    })
  }
}



export default register