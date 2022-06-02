import { Box, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import GridCell  from '../components/GridCell'
import { ValidatedInputState } from './types';
import ValidatedInput from './ValidatedInput';


interface BoardProps {

  /**
   * An initial configuration for the board.
   * If the configuration does not match the board
   * shape an exception will be thrown.
   */
  initState?: undefined | boolean[][];

  /**
   * Number of cells tall to make the board
   */
  nVerticalCells: number;

  /**
   * Number of cells wide to make the board
   */
  nHorizontalCells: number;

  /**
   * Should be board leverage creation mode logic
   */
  creationMode?: boolean | undefined;

  /**
   * name & description of the board
   */
  name?: string | undefined;
  description?: string | undefined;
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

  /**
   * name & description of the board
   */
  boardNameState: ValidatedInputState;
  boardDescriptionState: ValidatedInputState;
}


class Board extends React.Component<BoardProps, BoardState> {
  /**
   * nVerticalCells & nHorizontalCells:
   *  Number of horizontal and vertical cells that compose the board
   *  The board size is stateless and thusly the data is
   *  not stored as part of the state.
   * cellSkeleton:
   *  Array of arrays containing booleans denoting the life state of each cell 
   *  This is stateful however -- we dont want to subject the component to
   *  rerenders on incremental updates to the skeleton's state
   * generation:
   *  The number of passes through the game loop have taken place.
   */

  nVerticalCells: number
  nHorizontalCells: number;
  cellSkeleton: boolean[][];
  generation: number;
  creationMode: boolean | undefined;

  constructor(props: BoardProps) {
    super(props)

    this.nVerticalCells = props.nVerticalCells;
    this.nHorizontalCells = props.nHorizontalCells;
    this.cellSkeleton = (props.initState) ? props.initState : this.generateGrid()
    this.generation = 1;
    this.creationMode = props.creationMode;

    this.validateCellSkeleton();

    const boardNameState = ValidatedInput.genInitState();
    const boardDescriptionState = ValidatedInput.genInitState();

    if (!this.creationMode) {
      boardNameState.value = props.name ? props.name : ""
      boardDescriptionState .value = props.description ? props.description : ""
    }

    this.state = {
      grid: this.renderGrid(true),
      running: false,
      boardNameState: boardNameState,
      boardDescriptionState: boardDescriptionState,
    }
  }

  validateCellSkeleton() {
    if (this.cellSkeleton.length !== this.nVerticalCells) {
      throw "Number of Board Cells do not match cell configuration."
    }
    if (this.cellSkeleton[0].length !== this.nHorizontalCells) {
      throw "Number of Board Cells do not match cell configuration."
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
    console.log(this.nHorizontalCells)
    const xAtEdge = (0 >= x || x >= this.nHorizontalCells - 1)
    const yAtEdge = (0 >= y || y >= this.nVerticalCells - 1)
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
        const isBorderCell = this.isBorderCell(colNum, rowNum)
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
      400
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

  async validateBoardName(boardName: string) {
    if (boardName.length < 25) {
      return {error: false, message: "valid board name."}
    }
    return {error: true, message: "Name must be fewer than 25 characters."}
  }

  async validateBoardDescription(boardDescription: string) {
    if (boardDescription.length < 90) {
      return {error: false, message: "valid board description."}
    }
    return {error: true, message: "Description must be fewer than 90 characters."}
  }

  renderCreationForm() {
    return (
      <Box display="flex" justifyContent="center" margin="auto" flexDirection="column" width="100%" maxWidth={700} p={4}>
        <ValidatedInput
          name="Name"
          state={this.state.boardNameState}
          setState={(x) => {this.setState({boardNameState: x})}}
          typingDelay={500}
          validateInput={this.validateBoardName}
        />
        <ValidatedInput
          name="Description"
          state={this.state.boardDescriptionState}
          setState={(x) => {this.setState({boardDescriptionState: x})}}
          typingDelay={500}
          validateInput={this.validateBoardDescription}
        />
      </Box>
    )
  }

  renderInitStateInstructions() {
    return (
      <Box display="flex" justifyContent="center" p={10}>
        <Heading fontFamily="Apple Chancery, cursive">Select the cells you'd like to live...</Heading>
      </Box>
    )
  }

  renderEncapsulatedGrid() {
    const backgroundColor = this.creationMode ? "rgba(82, 47, 14, .1)" : "rgba(0, 0, 0, 0)" 
    return (
      <Box margin="auto" display="flex" justifyContent="center">
        <Box
          backgroundColor={backgroundColor}
          borderRadius="15px"
          display="block-inline"
          alignContent="vertical"
          overflow="visible"
        >
          {this.state.grid!}
        </Box>
      </Box>
    )
  }

  renderPlayButton() {
    return (
      <Box display="flex">
        <Button
          isLoading={this.state.running}
          isDisabled={(this.nLiveCells() <= 0)}
          margin="auto"
          marginTop="30px"
          marginBottom="15px"
          onClick={() => this.startBoard()}
        >
          <Heading fontFamily="Apple Chancery, cursive">Play</Heading>
        </Button>
      </Box>
    )
  }

  renderLiveCells() {
    return (
      <Heading
        marginRight="auto"
        textAlign="center"
        fontFamily="Apple Chancery, cursive"
        size="lg"
      >
        No. Live Cells: {this.nLiveCells()}
      </Heading>
    )
  }

  renderDeadCells() {
    return (
      <Heading
        marginRight="auto"
        textAlign="center"
        fontFamily="Apple Chancery, cursive"
        size="lg"
      >
        No. Dead Cells: {this.nDeadCells()}
      </Heading>
    )
  }

  renderGenerations() {
    return (
      <Heading
        marginRight="auto"
        textAlign="center"
        fontFamily="Apple Chancery, cursive"
        size="lg"
      >
        Generations: {this.generation}
      </Heading>
    )
  }

  renderStatusScroll() {
    return (
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
          {this.renderGenerations()}
          {this.renderLiveCells()}
          {this.renderDeadCells()}
      </Box>
    </Box>
    )
  }

  render() {

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignContent="vertical"
        justifyContent="center"
      >

        {this.renderInitStateInstructions()}
        {this.renderEncapsulatedGrid()}
        {this.renderPlayButton()} 
        {this.renderCreationForm()}
      </Box>

    )
  }
}

export default Board