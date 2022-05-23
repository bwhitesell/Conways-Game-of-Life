import { Box } from '@chakra-ui/react'
import React from 'react'
import Board from '../components/Board'
import Particle from '../components/Particle'


const board: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Board nHorizontalCells={20} nVerticalCells={15} />
      <Particle initialX={50} yDelay={50}/>
      <Particle initialX={945} yDelay={120}/>
    </Box>
  )
}

export default board