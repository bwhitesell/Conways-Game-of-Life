import { Box } from '@chakra-ui/react'
import React from 'react'
import Board from '../components/Board'
import { redirectLoggedOutUser } from '../utils'
import { BACKEND_URL } from '../config'
import BackendAPIWrapper from '../backendAPIWrapper'


const board: React.FC = () => {
  redirectLoggedOutUser("/");

  return (
    <Box display="flex" justifyContent="center">
      <Board nHorizontalCells={30} nVerticalCells={17} />
    </Box>
  )
}

export default board