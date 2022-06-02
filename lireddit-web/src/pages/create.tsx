import { Box, Button, Heading, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'
import Board from '../components/Board'
import { redirectLoggedOutUser } from '../utils'
import { BACKEND_URL } from '../config'
import BackendAPIWrapper from '../backendAPIWrapper'
import { Navbar } from '../components/Navbar'
import ValidatedInput from '../components/ValidatedInput'


const create: React.FC = () => {
  redirectLoggedOutUser("/");
  const [simName, setSimName] = React.useState(ValidatedInput.genInitState());
  const [simDescription, setSimDescription] = React.useState(ValidatedInput.genInitState());

  const validateSimName = async (simName: string) => {
    if (simName.length < 25) {
      return {error: false, message: "valid sim name."}
    }
    return {error: true, message: "Name must be fewer than 25 characters."}
  }

  const validateSimDescription = async (simDescription: string) => {
    if (simDescription.length < 90) {
      return {error: false, message: "valid sim description."}
    }
    return {error: true, message: "Description must be fewer than 90 characters."}


  }

  return (
    <Box>
      <Navbar />
      <Board nHorizontalCells={30} nVerticalCells={17} creationMode={true}/>
    </Box>
  )
}

export default create 