import { Box, Button, Heading, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'
import Game from '../components/Game'
import { redirectLoggedOutUser } from '../utils'
import { BACKEND_URL } from '../config'
import BackendAPIWrapper from '../backendAPIWrapper'
import { Navbar } from '../components/Navbar'
import ValidatedInput from '../components/ValidatedInput'


const create: React.FC = () => {
  redirectLoggedOutUser("/");

  const nVerticalCells = 17;
  const nHorizontalCells = 30;

  const newGrid = Array(
      nHorizontalCells
    ).fill([]).map(
      x => Array(nVerticalCells).fill(false)
    )

  return (
    <Box>
      <Navbar />
    </Box>
  )
}

export default create 