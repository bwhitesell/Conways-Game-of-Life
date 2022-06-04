import { Box, Button, Heading, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import React from 'react';
import Game from '../components/Game';
import { GameProps, GameState } from '../components/Game';
import { redirectLoggedOutUser } from '../utils';
import { BACKEND_URL } from '../config';
import BackendAPIWrapper, { StatusMessage } from '../backendAPIWrapper';
import { Navbar } from '../components/Navbar';
import ValidatedInput, { ValidatedInputState } from '../components/ValidatedInput';
import { FlexCol } from '../components/Layout';


interface CreateGameProps {

  /**
   * How wide and long to make the game board.
   */
  nVerticalCells: number;
  nHorizontalCells: number;
}

type CreateGameState = {name: string, description: string} & GameState



const generateGrid = (nVerticalCells: number, nHorizontalCells: number): boolean[][] => {
  return Array(
    nVerticalCells
  ).fill([]).map(
    x => Array(nHorizontalCells).fill(false)
  )
}

class CreateGame extends Game<CreateGameProps, CreateGameState> {

  initialGridState?: boolean[][];
  nameInputData: ValidatedInputState;
  descriptionInputData: ValidatedInputState;

  constructor(props: CreateGameProps) {
    const gameProps: GameProps = {
      grid: generateGrid(props.nVerticalCells, props.nHorizontalCells),
      name: "",
      description: "",
    }
    super(gameProps);
    this.nameInputData = ValidatedInput.genInitState();
    this.descriptionInputData = ValidatedInput.genInitState();

  }

  private async validateNameInput(input: string) {
    if (input.length < 25) {
      return {error: false, message: "Name is valid."}
    } else {
      return {error: true, message: "Name is too long."}
    }
  }

  private async validateDescriptionInput(input: string) {
    if (input.length < 80) {
      return {error: false, message: "Description is valid."}
    } else {
      return {error: true, message: "Description is too long."}
    }
  }


  private renderMetadataForm() {
    return (
      <FlexCol>
        <ValidatedInput isDisabled={this.state.running} name="Name"
          state={this.nameInputData} typingDelay={1000}
          validateInput={this.validateNameInput}
        />
        <ValidatedInput isDisabled={this.state.running} name="description"
          state={this.descriptionInputData} typingDelay={1000}
          validateInput={this.validateDescriptionInput}
        />
      </FlexCol>
    )
  }

  override render() {
    return (
      <FlexCol>
          {this.renderEncapsulatedGrid()}
          {this.renderMetadataForm()}
      </FlexCol>
    )
  }

}

const create: React.FC = () => {
  return (
    <div>
      <Navbar />
      <CreateGame nHorizontalCells={30} nVerticalCells={17} />
    </div>
  )
}


export default create 