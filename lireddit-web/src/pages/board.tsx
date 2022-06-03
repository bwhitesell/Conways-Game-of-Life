import { Box } from '@chakra-ui/react'
import React from 'react'
import Game from '../components/Game'
import { redirectLoggedOutUser } from '../utils'
import { BACKEND_URL } from '../config'
import BackendAPIWrapper from '../backendAPIWrapper'


const board: React.FC = () => {
  redirectLoggedOutUser("/");

  const nVerticalCells = 17;
  const nHorizontalCells = 30;

  const newGrid = Array(
     nVerticalCells 
    ).fill([]).map(
      x => Array(nHorizontalCells).fill(false)
    )

  return (
    <Box display="flex" justifyContent="center">
      <Game grid={newGrid} name="test game" description="this is a test game." />
    </Box>
  )
}

export default board