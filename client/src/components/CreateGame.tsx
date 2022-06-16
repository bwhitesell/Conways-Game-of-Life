import React from "react";
import Router from "next/router";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import ValidatedInputForm from "./ValidatedInputForm";
import BackendAPIClient from "../backendAPIClient";
import siteCopy from "../textContents";
import { FlexCol } from "./Layout";
import { generateGrid } from "../utils";
import { BACKEND_URL } from "../config";
import Game from "./Game";
import ConwayGrid from "../conwayGrid";

interface CreateGameProps {
  /**
   * How wide and long to make the game board.
   */
  nVerticalCells: number;
  nHorizontalCells: number;
}

type CreateGameState = {
  // has the user been fed the instructions modal?
  receivedInstructions: boolean;
};

class CreateGame extends React.Component<CreateGameProps, CreateGameState> {
  props: CreateGameProps;
  initBoardConfig: boolean[][];

  constructor(props: CreateGameProps) {
    super(props);
    this.props = props;
    this.state = { receivedInstructions: false };
    this.initBoardConfig = generateGrid(
      this.props.nVerticalCells,
      this.props.nHorizontalCells
    );
  }

  async submitNewGameToBackendAndRedir(fieldValues: string[]) {
    const boardName = fieldValues[0];
    const boardDescription = fieldValues[1];

    console.log(this.initBoardConfig);
    const backendAPIClient = new BackendAPIClient(BACKEND_URL);
    const simCreationStatus = await backendAPIClient.createSimulation(
      boardName,
      boardDescription,
      this.initBoardConfig
    );
    if (simCreationStatus.error) {
      alert(`Unable to save game. Error Message: ${simCreationStatus.message}`);
    } else {
      await Router.push("/home");
    }
  }

  private async validateNameInput(input: string) {
    if (input.length < 25) {
      return { error: false, message: "Name is valid." };
    } else {
      return { error: true, message: "Name is too long." };
    }
  }

  private async validateDescriptionInput(input: string) {
    if (input.length < 80) {
      return { error: false, message: "Description is valid." };
    } else {
      return { error: true, message: "Description is too long." };
    }
  }

  private renderInstructionsModal() {
    /**
     * Render the JSX elements that provide an instruction modal
     */

    const onClose = () => {
      this.setState({ receivedInstructions: true });
    };
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
    );
  }

  private renderInputForm() {
    return (
      <ValidatedInputForm
        inputFieldNames={["Name", "Description"]}
        fieldNameFontFamily="Apple Chancery, cursive"
        fieldNameFontSize="25px"
        formMaxWidth="700px"
        inputFieldValidations={[
          this.validateNameInput,
          this.validateDescriptionInput,
        ]}
        submissionButtonName="Save Board"
        onSubmit={(fieldValues: string[]) =>
          this.submitNewGameToBackendAndRedir(fieldValues)
        }
      />
    );
  }

  private renderGame() {
    return <Game initGridState={this.initBoardConfig} />;
  }

  public override render() {
    return (
      <FlexCol>
        {this.renderInstructionsModal()}
        {this.renderGame()}
        {this.renderInputForm()}
      </FlexCol>
    );
  }
}

export default CreateGame;
