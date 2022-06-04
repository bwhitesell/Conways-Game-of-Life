import { Box, Button, FormLabel, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch } from '@chakra-ui/react';
import React from 'react';
import ConwayGrid from '../conwayGrid'
import Board from './Board'
import CuteSubHeading from './CuteSubHeading';
import ValidatedInput, { ValidatedInputState } from './ValidatedInput'
import { FlexCol, FlexRow } from './Layout';
import siteCopy from '../textContents'
import StatCellBtn from './StatCellBtn';


export interface GameProps {

  /**
   * How wide and long to make the game board.
   */
  grid: boolean[][];
  /**
   * The name of the game instance
   */
  name: string;

  /**
   * A description of the game instance
   */
  description: string;
}


export interface GameState {

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


class Game<P, S> extends React.Component<GameProps | P, GameState> {

  conwayGrid: ConwayGrid;
  initialGridState?: boolean[][]
  intervalTask?: NodeJS.Timer
  name: string;
  description: string;

  constructor(props: GameProps) {
    super(props);

    this.conwayGrid = new ConwayGrid(props.grid);
    this.name = props.name;
    this.description = props.description;

    this.state = {
      boardState: this.conwayGrid.grid,
      running: false,
      receivedInstructions: false,
      detectStaticBoard: true,
    }
  }

  private updateAndCheckForStaticGrid() {
    const lastGridState = [...this.conwayGrid.grid].map(x => x.slice());
    this.conwayGrid.updateGrid();
    const gridIsStatic = this.conwayGrid.checkIfGridIsIdentical(lastGridState);
    if (gridIsStatic) {
      this.setState({running: false})
    }
  }

  private startGame() {
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

  private pauseGame() {
    this.setState({running: false})
    clearInterval(this.intervalTask)
  }

  private clearGame() {
    this.conwayGrid.clearGrid();
    this.setState({running: false});
  }

  private resetGame() {
    if (this.initialGridState) {
      this.conwayGrid.grid = this.initialGridState;
      this.conwayGrid.generation = 1;
    }
    this.setState({running: false, boardState: this.conwayGrid.grid})
    clearInterval(this.intervalTask)
  }

  private handleSwitchStaticBoardDetection(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      detectStaticBoard: !this.state.detectStaticBoard
    })
  }

  public renderEncapsulatedGrid() {
    return (
      <FlexCol>
        <FlexRow marginBottom={10} borderRadius={10}>
          <FlexRow
            color="#752071"
            backgroundColor="#ededed"
            borderRadius={10}
            marginTop={10}
          >
            {this.renderBoardControls()}
            {this.renderBoardTelemetry()}
          </FlexRow>
        </FlexRow>
        <FlexRow overflow="hidden" width="100vw">
          <Board 
            conwayGrid={this.conwayGrid}
            setter={(x) => this.setState({boardState: x})}
          />
        </FlexRow>
      </FlexCol>
    )
  }

  private renderBoardTelemetry() {
    return (
      <FlexCol margin={2}>
        <CuteSubHeading text="Board Status" />
        <FlexRow backgroundColor="#d4d4d4" borderRadius="10px" p={5}>
          <FlexCol margin={1}>
            <StatCellBtn desc="No. Alive Cells" value={this.conwayGrid.nLiveCells()} />
          </FlexCol>
          <FlexCol margin={1}>
            <StatCellBtn desc="No. Dead Cells" value={this.conwayGrid.nDeadCells()} />
          </FlexCol>
          <FlexCol margin={1}>
            <StatCellBtn desc="Generations" value={this.conwayGrid.generation} />
          </FlexCol>
        </FlexRow>
      </FlexCol>
    )
  }

  public renderInstructionsModal() {
    /**
     * Render the JSX elements that provide an instruction modal
     */

    const onClose = () => {this.setState({receivedInstructions: true})}
    return (
      <Modal isOpen={!this.state.receivedInstructions} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
            borderRadius={5}
            backgroundColor="lightgray"
            textColor="#ff03e2"
          >
            {siteCopy.creationModal.heading}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{siteCopy.creationModal.bodyPar1}</p>
            <br></br>
            <p>{siteCopy.creationModal.bodyPar2}</p>
            <br></br>
            <p>{siteCopy.creationModal.bodyPar3}</p>
          </ModalBody>

          <ModalFooter>
            <Button backgroundColor="#ff03e2" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  private renderBoardControls() {
    /**
     * Render the JSX elements to control the board's state
     */

    return (
        <Box
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          maxWidth={370}
          margin={2}
        >
          <CuteSubHeading text="Board Controls" />
          <Box
            backgroundColor="#d4d4d4"
            display="flex"
            borderRadius="10px"
            flexWrap="wrap"
          >
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
                size="lg"
                colorScheme="purple"
                isChecked={this.state.detectStaticBoard}
                onChange={
                  (e: React.ChangeEvent<HTMLInputElement>) => {
                    this.handleSwitchStaticBoardDetection(e)
                  }
                }
              />
            </Box>
          </Box>
        </Box>
    )
  }

  render() {
    return (
      <FlexCol>
          {this.renderInstructionsModal()}
          {this.renderEncapsulatedGrid()}
      </FlexCol>

    )
  }
}

export default Game