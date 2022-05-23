import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import GridCell  from '../components/GridCell'


interface BoardProps {
  nVerticalCells: number;
  nHorizontalCells: number;
}

interface BoardState {
  grid: JSX.Element[] | void;
}

class Board extends React.Component<BoardProps, BoardState> {
  nVerticalCells: number;
  nHorizontalCells: number;
  cellSkeleton: boolean[][];

  constructor(props: BoardProps) {
    super(props)

    this.nVerticalCells = props.nVerticalCells;
    this.nHorizontalCells = props.nHorizontalCells;
    this.cellSkeleton = this.generateGrid()
    this.state = {
      grid: this.renderGrid(true),
    }
  }

  nBoardCells() {
    return this.nVerticalCells * this.nHorizontalCells
  }

 generateGrid() {
    return Array(
      this.nVerticalCells
    ).fill([]).map(
      x => Array(this.nHorizontalCells).fill(false)
    )
  }

    renderGrid(returnGrid: boolean = false): JSX.Element[] | void {
    // init new grid obj
    const grid = [];

    // construct grid obj from skeleton
    for (let rowNum = 0; rowNum < this.nVerticalCells; rowNum++) {
      const renderedGridRow = [];
      for (let colNum = 0; colNum < this.nHorizontalCells; colNum ++) {
        const cellIsAlive = this.cellSkeleton[rowNum][colNum]
        const cellOnClickCB = this.buildSetGridCellCB(rowNum, colNum);
        const cellKey =`${rowNum}_${colNum}_${cellIsAlive})` 
        renderedGridRow.push(
          <GridCell key={cellKey} alive={cellIsAlive} onClick={cellOnClickCB} animate={!returnGrid}/>
        )
      }
      grid.push(
        <Box key={rowNum} display="flex">{renderedGridRow}</Box>
      )
    }

    // return grid or update grid state?
    if (returnGrid) {
      return grid
    } else {
      this.setState({grid: grid})
    }
  }
 
  getNeighbors(x: number, y: number) {
    const neighbors = []
    for (let i = -1; i <= 1; i ++) {
      for (let j = -1; j <= 1; j ++) {
        if (i !== 0 || j !== 0) {
          if (this.coordinatesInBounds(x + i, y + j)) {
              neighbors.push(this.cellSkeleton[x + i][y + j])
            }
        }
      }
    }
    return neighbors
  }

  coordinatesInBounds(x: number, y: number) {
    if (x >= 0 && x < this.nVerticalCells && y >= 0 && y < this.nHorizontalCells) {
      return true
    }
    return false
  }

  buildSetGridCellCB(x: number, y: number) {
    return () => {
      this.cellSkeleton[x][y] = !this.cellSkeleton[x][y]
      this.renderGrid()
    }
  }

  startGame() {
    setInterval(
      () => this.updateGridSkeleton(),
      1000,
    )
  }

  updateGridSkeleton() {
    // update skeleton
    const newCellSkeleton = []
    for (let rowNum = 0; rowNum < this.nVerticalCells; rowNum ++) {
      const newRow = []
      for (let colNum = 0; colNum < this.nHorizontalCells; colNum++) {
        const nNeighbors = this.getNeighbors(rowNum, colNum).filter(Boolean).length
        const cellIsAlive = this.cellSkeleton[rowNum][colNum];
        if (cellIsAlive && [2, 3].includes(nNeighbors)) {
          newRow.push(true)
        } else if ((!cellIsAlive) && nNeighbors === 3) {
          newRow.push(true)
        } else {
          newRow.push(false)
        }
      }
      newCellSkeleton.push(newRow)
    }
    this.cellSkeleton = newCellSkeleton
    // rerender the grid
    this.renderGrid();
  }

  render() {
    return (
      <Box display="flex" justifyContent="center">
        <Box margin="auto" marginTop="70px" display="flex" justifyContent="center">
          <Box boxShadow="0 0 90px 100px #f7fffe" backgroundColor="#f7fffe" borderRadius="15px" margin="50px" display="block" alignContent="vertical" overflow="hidden" position="absolute">
            {this.state.grid}
          </Box>
        </Box>
        <Button margin="auto" onClick={() => this.startGame()}>Start</Button>
      </Box>

    )
  }
}

export default Board