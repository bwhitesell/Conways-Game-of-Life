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
    <Box display="flex" backgroundColor="gray">
      <Box display="flex" backgroundColor="yellow">
        <p>
          This is some text that im writing here right now
          to test out some of the logic around flex and rows.
        </p>
      </Box>
    </Box>
  )
}

export default board