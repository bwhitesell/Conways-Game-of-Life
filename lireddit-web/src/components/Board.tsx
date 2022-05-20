import { Box } from '@chakra-ui/react';
import React from 'react';
import GridCell  from '../components/GridCell'


interface BoardProps {
  nVerticalCells: number;
  nHorizontalCells: number;
}

interface BoardState {
  cells: undefined;
}

class Board extends React.Component<BoardProps, BoardState> {
  nVerticalCells: number;
  nHorizontalCells: number;

  constructor(props: BoardProps) {
    super(props)

    this.nVerticalCells = props.nVerticalCells;
    this.nHorizontalCells = props.nHorizontalCells;
    this.state = {
      cells: undefined
    }

  }

  nBoardCells() {
    return this.nVerticalCells * this.nHorizontalCells
  }

  generateGrid() {
    const grid = [];
    for (let i = 0; i < this.nVerticalCells; i++) {
      const row = [];
      for (let j = 0; j < this.nHorizontalCells; j++) {
        row.push(<GridCell x={i} y={j} />)
      }
      grid.push(<Box margin="auto" flex={1}>{row}</Box>)
    }
    return grid
  }

  render() {

    return (
      <Box display="block" justifyContent="center" alignContent="vertical">
        {this.generateGrid()}
      </Box>
    )
  }
}

export default Board