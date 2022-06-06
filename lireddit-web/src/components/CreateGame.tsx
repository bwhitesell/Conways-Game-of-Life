import React from 'react';
import Router from 'next/router';
import Game from './Game';
import ValidatedInputForm from './ValidatedInputForm';
import BackendAPIWrapper from '../backendAPIWrapper';
import { GameProps, GameState } from './Game';
import { FlexCol } from './Layout';
import { generateGrid } from '../utils'
import { BACKEND_URL } from '../config';


interface CreateGameProps {
  /**
   * How wide and long to make the game board.
   */
  nVerticalCells: number;
  nHorizontalCells: number;
}
  
type CreateGameState = {name: string, description: string} & GameState;


class CreateGame extends Game<CreateGameProps, CreateGameState> {

  initialGridState: boolean[][];
  gameMetadata: string[];

  constructor(props: CreateGameProps) {

    const gameProps: GameProps = {
      grid: generateGrid(props.nVerticalCells, props.nHorizontalCells),
      name: "",
      description: "",
    }
    super(gameProps);
    this.gameMetadata= ["", ""];
    this.initialGridState = gameProps.grid;
  }

  async onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
    const simCreationStatus = await backendAPIWrapper.createSimulation(
      this.gameMetadata[0],
      this.gameMetadata[1],
      this.initialGridState,
    )

    if (simCreationStatus.error) {
      alert(`Unable to save game. Error Message: ${simCreationStatus.message}`);
    } else {
      Router.push('/home')
    }
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

  override render() {
    return (
      <FlexCol>
        {this.renderEncapsulatedGrid()}
        <ValidatedInputForm
          inputFieldNames={["Name", "Description"]}
          inputFieldValues={this.gameMetadata}
          fieldNameFontFamily="Apple Chancery, cursive"
          fieldNameFontSize="25px"
          formMaxWidth='700px'
          inputFieldValidations={[this.validateNameInput, this.validateDescriptionInput]}
          submissionButtonName="Save Board"
          onSubmit={(e: React.MouseEvent<HTMLButtonElement>) => this.onSubmit(e)}
        />
      </FlexCol>
    )
  }
}

export default CreateGame