import { Box, Button, FormControl, FormLabel, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch } from '@chakra-ui/react';
import { clear } from 'console';
import React from 'react';
import ConwayGrid from '../conwayGrid'
import Board from './Board'


interface GameCreatorProps {

  /**
   * How wide and long to make the game board.
   */
  nVerticalCells: number;
  nHorizontalCells: number;

}


interface GameState {

  /**
   * The grid data from a conway game object
   */
  boardState: boolean[][];

  /**
   * has the user closed the initial instruction modal?
   */
  receivedInstructions: boolean;

  /**
   * detect static board?
   */
   detectStaticBoard: boolean;

  /**
   * Should the board be performing iterative runs?
   */
  running: boolean;

}


class GameCreator extends React.Component<GameCreatorProps, GameState> {
 
  conwayGrid: ConwayGrid;
  nVerticalCells: number;
  nHorizontalCells: number;
  initialGridState?: boolean[][]
  intervalTask?: NodeJS.Timer

  constructor(props: GameCreatorProps) {
    super(props);

    this.nVerticalCells = props.nVerticalCells;
    this.nHorizontalCells = props.nHorizontalCells;
    this.conwayGrid = new ConwayGrid(this.generateGrid()),

    this.state = {
      boardState: this.conwayGrid.grid,
      running: false,
      receivedInstructions: false,
      detectStaticBoard: true,
    }
  }

  generateGrid() {
    return Array(
      this.nVerticalCells
    ).fill([]).map(
      x => Array(this.nHorizontalCells).fill(false)
    )
  }

  updateAndCheckForStaticGrid() {
    const lastGridState = [...this.conwayGrid.grid].map(x => x.slice());
    this.conwayGrid.updateGrid();
    const gridIsStatic = this.conwayGrid.checkIfGridIsIdentical(lastGridState);
    if (gridIsStatic) {
      this.setState({running: false})
    }
  }

  startGame() {
    this.initialGridState = this.conwayGrid.grid
    this.setState({running: true})
    this.intervalTask = setInterval(
      () => {
        if (this.state.running) {
          if (this.state.detectStaticBoard) {
            this.updateAndCheckForStaticGrid();
          } else {
            this.conwayGrid.updateGrid();
          }
          this.setState({boardState: this.conwayGrid.grid})
        }
      },
      400
    )
  }

  pauseGame() {
    this.setState({running: false})
    clearInterval(this.intervalTask)
  }

  clearGame() {
    this.conwayGrid.clearGrid();
    this.setState({running: false});
  }

  resetGame() {
    if (this.initialGridState) {
      this.conwayGrid.grid = this.initialGridState;
      this.conwayGrid.generation = 1;
    }
    this.setState({running: false, boardState: this.conwayGrid.grid})
    clearInterval(this.intervalTask)
  }

  handleSwitchStaticBoardDetection(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      detectStaticBoard: !this.state.detectStaticBoard
    })
  }

  renderEncapsulatedGrid() {
    return (
      <Box margin="auto" display="flex" justifyContent="center">
        <Box
          borderRadius="15px"
          marginTop={50}
          display="flex"
          flexDirection="column"
          alignContent="vertical"
          overflow="visible"
        >
          <Box display="flex" marginBottom={10} borderRadius={10}>
            {this.renderBoardControls()}
          </Box>
          <Box overflow="visible" display="block-inline">
            <Board 
              conwayGrid={this.conwayGrid}
              setter={(x) => this.setState({boardState: x})}
            />
          </Box>
        </Box>
      </Box>
    )
  }

  renderInstructionsModal() {
    const onClose = () => {this.setState({receivedInstructions: true})}
    return (
      <Modal isOpen={!this.state.receivedInstructions} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome to Conway's Game of Life!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <p>
              This page will let you create your own simulation of the
              game of life.
            </p>
            <br></br>
            <p>
              Go ahead and select the cells on the grid that you'd like to start the game out
              alive. Once you've chosen a set of starting cells, you
              can see how your choices affect how the game grows, lives and dies. You can also
              reset the board to your selected cells at any point.
            </p>
            <br></br>
            <p>
              When you find an initial configuration that produces something beautiful --
              you can go ahead and fill out the rest of the page to save it. Once it's saved
              you can share your creation with the world. 
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  renderBoardControls() {
    return (
        <Box display="flex" flexDirection="column" flexWrap="wrap" maxWidth={370}>
          <Heading  marginTop={3} size="lg" fontFamily="Apple Chancery, cursive">
            Board Controls
            </Heading>
          <Box backgroundColor="#d4d4d4" display="flex" borderRadius="10px" flexWrap="wrap">
            <Button
              isLoading={this.state.running}
              isDisabled={(this.conwayGrid.nLiveCells() <= 0)}
              margin="10px"
              onClick={() => this.startGame()}
            >
              <Heading>▶</Heading>
            </Button>
            <Button
              isDisabled={!this.state.running}
              margin="10px"
              onClick={() => this.pauseGame()}
            >
              <Heading size="sm">Pause</Heading>
            </Button>
            <Button
              isDisabled={this.conwayGrid.generation === 1}
              margin="10px"
              onClick={() => this.resetGame()}
              mb="0"
            >
              <Heading size="sm">Reset</Heading>
            </Button>
            <Button
              margin="10px"
              onClick={() => this.clearGame()}
              mb="0"
            >
              <Heading size="sm">Clear</Heading>
            </Button>
            <Box display="flex" alignItems="center" p={3}>
              <FormLabel mb='0'>
                End Game on Static States:
              </FormLabel>
              <Switch
                colorScheme='teal'
                size="lg"
                isChecked={this.state.detectStaticBoard}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleSwitchStaticBoardDetection(e)}
              />
            </Box>
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
        overflowX="hidden"
      >
        {this.renderInstructionsModal()}
        {this.renderEncapsulatedGrid()}
      </Box>

    )
  }
}

export default GameCreator