import { Box, Button, Heading, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'
import Game from '../components/Game'
import { redirectLoggedOutUser } from '../utils'
import { BACKEND_URL } from '../config'
import BackendAPIWrapper from '../backendAPIWrapper'
import { Navbar } from '../components/Navbar'
import ValidatedInput from '../components/ValidatedInput'


interface GameProps {

  /**
   * How wide and long to make the game board.
   */
  nVerticalCells: number;
  nHorizontalCells: number;
  grid?: boolean[][]
}


const generateGrid = (nVerticalCells: number, nHorizontalCells: number){
  return Array(
    nVerticalCells
  ).fill([]).map(
    x => Array(nHorizontalCells).fill(false)
  )
}


class createGame extends Game {

  nVerticalCells: number;
  nHorizontalCells: number;
  initialGridState?: boolean[][]

  constructor(props: GameProps) {
    props.grid = generateGrid(props.nVerticalCells, props.nHorizontalCells);
    super(props)
}

  const nVerticalCells = 17;
  const nHorizontalCells = 30;


  return (
    <Box>
      <Navbar />
      <Game nHorizontalCells={30} nVerticalCells={17} />
    </Box>
  )
}

export default create 