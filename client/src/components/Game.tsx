import { Box, Button, FormLabel, Heading, Switch } from "@chakra-ui/react";
import React from "react";

import ConwayGrid from "../conwayGrid";
import Board from "./Board";
import CuteSubHeading from "./CuteSubHeading";
import StatCellBtn from "./StatCellBtn";
import { FlexCol, FlexRow } from "./Layout";

export interface GameProps {
  /**
   * A conway grid with the initial state
   */
  initGridState: boolean[][];
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

class Game extends React.Component<GameProps, GameState> {
  initGridState: boolean[][];
  activeConwayGrid: ConwayGrid;
  intervalTask?: NodeJS.Timer;

  constructor(props: GameProps) {
    super(props);
    this.initGridState = props.initGridState;
    this.activeConwayGrid = new ConwayGrid(this.initGridState);

    this.state = {
      boardState: this.activeConwayGrid.grid,
      running: false,
      receivedInstructions: false,
      detectStaticBoard: true,
    };
  }

  private updateAndCheckForStaticGrid() {
    const lastGridState = this.activeConwayGrid.deepCopy().grid;
    this.activeConwayGrid.updateGrid();
    const gridIsStatic =
      this.activeConwayGrid.checkIfGridIsIdentical(lastGridState);
    if (gridIsStatic) {
      this.setState({ running: false });
    }
  }

  private startGame() {
    this.setState({ running: true });
    this.intervalTask = setInterval(() => {
      if (this.state.running) {
        if (this.state.detectStaticBoard) {
          this.updateAndCheckForStaticGrid();
        } else {
          this.activeConwayGrid.updateGrid();
        }
        this.forceUpdate();
      }
    }, 400);
  }

  private pauseGame() {
    this.setState({ running: false });
    clearInterval(this.intervalTask);
  }

  private resetGame() {
    this.activeConwayGrid.resetGrid(this.initGridState);
    this.setState({ running: false });
    clearInterval(this.intervalTask);
  }

  private handleSwitchStaticBoardDetection() {
    this.setState({
      detectStaticBoard: !this.state.detectStaticBoard,
    });
  }

  onCellClick(rowNum: number, colNum: number) {
    this.activeConwayGrid.grid[rowNum][colNum] =
      !this.activeConwayGrid.grid[rowNum][colNum];
    this.initGridState = this.activeConwayGrid.deepCopy().grid;
    this.forceUpdate();
  }

  public renderBoard() {
    return (
      <Board
        conwayGrid={this.activeConwayGrid}
        onCellClick={(rowNum, colNum) => this.onCellClick(rowNum, colNum)}
      />
    );
  }

  private renderBoardTelemetry() {
    return (
      <FlexCol margin={2}>
        <CuteSubHeading text="Board Status" />
        <FlexRow
          backgroundColor="#d4d4d4"
          borderRadius="10px"
          p={5}
          flexWrap="wrap"
        >
          <FlexCol margin={1}>
            <StatCellBtn
              desc="No. Alive Cells"
              value={this.activeConwayGrid.nLiveCells()}
            />
          </FlexCol>
          <FlexCol margin={1}>
            <StatCellBtn
              desc="No. Dead Cells"
              value={this.activeConwayGrid.nDeadCells()}
            />
          </FlexCol>
          <FlexCol margin={1}>
            <StatCellBtn
              desc="Generations"
              value={this.activeConwayGrid.generation}
            />
          </FlexCol>
        </FlexRow>
      </FlexCol>
    );
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
            isDisabled={this.activeConwayGrid.nLiveCells() <= 0}
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
            isDisabled={this.activeConwayGrid.generation === 1}
            margin="10px"
            onClick={() => this.resetGame()}
            mb="0"
          >
            <Heading size="sm">Reset</Heading>
          </Button>
          <Box display="flex" alignItems="center" p={3}>
            <FormLabel mb="0">End Game on Static States:</FormLabel>
            <Switch
              size="lg"
              colorScheme="purple"
              isChecked={this.state.detectStaticBoard}
              onChange={() => {
                this.handleSwitchStaticBoardDetection();
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  public override render() {
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
          {this.renderBoard()}
        </FlexRow>
      </FlexCol>
    );
  }
}

export default Game;
