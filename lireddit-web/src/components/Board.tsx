import { Box, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import GridCell  from '../components/GridCell'


interface BoardProps {
  /**
   * Number of cells tall to make the board
   */
  nVerticalCells: number;
  /**
   * Number of cells wide to make the board
   */
  nHorizontalCells: number;
}

interface BoardState {
  /**
   * rendered jsx element hierarchy for the board
   */
  grid: JSX.Element[] | void;
  /**
   * Should the board be performing iterative runs?
   */
  running: boolean;
}

class Board extends React.Component<BoardProps, BoardState> {
  /**
   * Number of horizontal and vertical cells that compose the board
   * The board size is stateless and thusly the data is
   * not stored as part of the state.
   */
  nVerticalCells: number;
  nHorizontalCells: number;
  /**
   * Array of arrays containing booleans denoting the life state of each cell 
   * This is stateful however -- we dont want to subject the component to
   * rerenders on incremental updates to the skeleton's state
   */
  cellSkeleton: boolean[][];
  /**
   * The number of times the board has performed a full iteration of its
   * "event loop"
   */
  generation: number;

  constructor(props: BoardProps) {
    super(props)

    this.nVerticalCells = props.nVerticalCells;
    this.nHorizontalCells = props.nHorizontalCells;
    this.cellSkeleton = this.generateGrid()
    this.generation = 1;

    this.state = {
      grid: this.renderGrid(true),
      running: false,
    }
  }

  nBoardCells() {
    return this.nVerticalCells * this.nHorizontalCells
  }

  nLiveCells() {
    return this.cellSkeleton.map(
      (x: boolean[]) => x.filter(Boolean).length
    ).reduce((a, b) => a + b)
  }

  nDeadCells() {
    return this.nBoardCells() - this.nLiveCells()
  }

 generateGrid() {
    return Array(
      this.nVerticalCells
    ).fill([]).map(
      x => Array(this.nHorizontalCells).fill(false)
    )
  }

  isBorderCell(x:number, y: number) {
    const xAtEdge = (0 >= x || x >= this.nHorizontalCells - 1)
    const yAtEdge = (0 >= x || x >= this.nVerticalCells - 1)
    return xAtEdge || yAtEdge
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
        const isTree = ((rowNum + colNum) % 2 === 0)
        const isBorderCell = this.isBorderCell(rowNum, colNum)
        renderedGridRow.push(
          <GridCell
            key={cellKey}
            alive={cellIsAlive}
            onClick={cellOnClickCB}
            animate={!returnGrid}
            isTree={isTree}
            isBorderCell={isBorderCell}
          />
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
      this.setState({
        grid: grid,
        running: (this.state.running && this.nLiveCells() > 0)
      })
    }
  }
 
  getNumNeighbors(x: number, y: number) {
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
    return neighbors.filter(Boolean).length
  }

  coordinatesInBounds(x: number, y: number) {
    const xInBounds = x >= 0 && x < this.nVerticalCells
    const yInBounds = y >= 0 && y < this.nHorizontalCells
    if (xInBounds && yInBounds) {
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

  startBoard() {
    this.setState({running: true})
    setInterval(
      () => {
        if (this.state.running) {
          this.generation += 1
          this.updateGrid();
        }
      },
      300
    )
  }

  cellShouldLive(cellIsAlive: boolean, nNeighbors: number) {
    // Conway's Rules
    if (cellIsAlive && [2, 3].includes(nNeighbors)) {
      return true
    } else if ((!cellIsAlive) && nNeighbors === 3) {
      return true
    }
    return false
  }

  updateGrid() {
    this.updateGridSkeleton();
    this.renderGrid();
  }

  updateGridSkeleton() {
    let liveCells = 0;
    const newCellSkeleton = []
    for (let rowNum = 0; rowNum < this.nVerticalCells; rowNum ++) {
      const newRow = []
      for (let colNum = 0; colNum < this.nHorizontalCells; colNum++) {
        const nNeighbors = this.getNumNeighbors(rowNum, colNum)
        const cellIsAlive = this.cellSkeleton[rowNum][colNum];
        liveCells += Number(cellIsAlive)
        newRow.push(this.cellShouldLive(cellIsAlive, nNeighbors))
      }
      newCellSkeleton.push(newRow)
    }
    this.cellSkeleton = newCellSkeleton
  }

  render() {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignContent="vertical"
        justifyContent="center"
      >
        <Box display="flex">
          <Button
            isLoading={this.state.running}
            margin="auto"
            marginTop="30px"
            marginBottom="15px"
            onClick={() => this.startBoard()}
          >
            <Heading fontFamily="Apple Chancery, cursive">Play</Heading>
          </Button>
        </Box>
        <Box margin="auto" display="flex" justifyContent="center">
          <Box
            backgroundColor="rgba(0, 0, 0, 0)"
            borderRadius="15px"
            display="block-inline"
            alignContent="vertical"
            overflow="visible"
          >
            {this.state.grid!}
          </Box>
        </Box>
        <Box
          display="flex"
          margin="auto"
          justifyContent="center"
          backgroundImage="/scroll.png"
          p={10}
          backgroundSize="cover"
          width="400px"
          height="195px"
        >
          <Box
            display="flex"
            alignContent="vertical"
            flexDirection="column" 
            borderRadius={10}
          >
            <Heading
              marginRight="auto"
              textAlign="center"
              fontFamily="Apple Chancery, cursive"
              size="lg"
            >
              Generations: {this.generation}
            </Heading>
            <Heading
              marginRight="auto"
              textAlign="center"
              fontFamily="Apple Chancery, cursive"
              size="lg"
            >
              No. Live Cells: {this.nLiveCells()}
            </Heading>
            <Heading
              marginRight="auto"
              textAlign="center"
              fontFamily="Apple Chancery, cursive"
              size="lg"
            >
              No. Dead Cells: {this.nDeadCells()}
            </Heading>
          </Box>
        </Box>
      </Box>

    )
  }
}

export default Board