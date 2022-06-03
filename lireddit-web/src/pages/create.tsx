import { Box, Button, Heading, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'
import GameCreator from '../components/GameCreator'
import { redirectLoggedOutUser } from '../utils'
import { BACKEND_URL } from '../config'
import BackendAPIWrapper from '../backendAPIWrapper'
import { Navbar } from '../components/Navbar'
import ValidatedInput from '../components/ValidatedInput'


const create: React.FC = () => {
  redirectLoggedOutUser("/");

  const nVerticalCells = 17;
  const nHorizontalCells = 30;


  return (
    <Box>
      <Navbar />
      <GameCreator nHorizontalCells={30} nVerticalCells={17} />
    </Box>
  )
}

export default create 