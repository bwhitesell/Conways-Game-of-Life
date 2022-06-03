import { Box, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import ConwayGrid from '../conwayGrid'
import Board from './Board'


interface GameProps {

  /**
   * name & description of the game
   */
  name: string;
  description: string;
  /**
   * Array of arrays containing booleans denoting the life state of each cell 
   *  This is stateful however -- we dont want to subject the component to
   *  rerenders on incremental updates to the skeleton's state
   */
  grid: boolean[][];
}


interface GameState {

  /**
   * The grid data from a conway game object 
   */
  boardState: boolean[][];

  /**
   * Should the board be performing iterative runs?
   */
  running: boolean;

}



class Game extends React.Component<GameProps, GameState> {
 
  generation: number;
  name: string;
  description: string;
  conwayGrid: ConwayGrid;
  initialGridState?: boolean[][]

  constructor(props: GameProps) {
    super(props);

    this.generation = 1;
    this.name = props.name;
    this.description = props.description;
    this.conwayGrid = new ConwayGrid(props.grid),

    this.state = {
      boardState: this.conwayGrid.grid,
      running: false,
    }
  }

  inInitMode() {
    return this.generation <= 1
  }

  startGame() {
    this.initialGridState = this.conwayGrid.grid
    this.setState({running: true})
    setInterval(
      () => {
        if (this.state.running) {
          this.generation += 1
          this.conwayGrid.updateGrid();
          this.setState({boardState: this.conwayGrid.grid})
        }
      },
      400
    )
  }

  renderEncapsulatedGrid() {
    return (
      <Box margin="auto" display="flex" justifyContent="center">
        <Box
          borderRadius="15px"
          display="block-inline"
          alignContent="vertical"
          overflow="visible"
        >
          <Board 
            conwayGrid={this.conwayGrid}
            setter={(x) => this.setState({boardState: x})}
          />
        </Box>
      </Box>
    )
  }

  renderPlayButton() {
    return (
      <Box display="flex">
        <Button
          isLoading={this.state.running}
          isDisabled={(this.conwayGrid.nLiveCells() <= 0)}
          margin="auto"
          marginTop="30px"
          marginBottom="15px"
          onClick={() => this.startGame()}
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
        No. Live Cells: {this.conwayGrid.nLiveCells()}
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
        No. Dead Cells: {this.conwayGrid.nDeadCells()}
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

        {this.renderEncapsulatedGrid()}
        {this.renderPlayButton()} 
      </Box>

    )
  }
}

export default Game