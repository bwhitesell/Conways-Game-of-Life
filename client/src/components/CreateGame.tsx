import React from 'react';
import Router from 'next/router';
import Game from './Game';
import { 
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader, 
  ModalOverlay,
} from '@chakra-ui/react';

import ValidatedInputForm from './ValidatedInputForm';
import BackendAPIClient from '../backendAPIClient';
import siteCopy from '../textContents';
import Board from './Board';
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


class CreateGame extends Game<CreateGameProps> {

  initialGridState: boolean[][];
  gameMetadata: string[];

  constructor(props: CreateGameProps) {

    const gameProps: GameProps = {
      grid: generateGrid(props.nVerticalCells, props.nHorizontalCells),
      name: "",
      description: "",
    }
    super(gameProps);
    this.gameMetadata = ["", ""];
    this.initialGridState = gameProps.grid;
  }

  async onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    const backendAPIClient = new BackendAPIClient(BACKEND_URL);
    const simCreationStatus = await backendAPIClient.createSimulation(
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

  public renderBoard() {
    return (
      <Board conwayGrid={this.conwayGrid} setter={(x: any) => this.setState(x)} />
    )
  }
  private renderInstructionsModal() {
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

  override render() {
    return (
      <FlexCol>
        {this.renderInstructionsModal()}
        {this.renderEncapsulatedBoard()}
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