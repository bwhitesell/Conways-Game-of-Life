import React from "react";
import { Box, Button } from "@chakra-ui/react";

import { StatusMessage } from "../backendAPIClient";
import ValidatedInput from "./ValidatedInput";
import { ValidatedInputState } from "./ValidatedInput";

interface ValidatedInputsState {
  isLoading: boolean;
  inputFieldStates: ValidatedInputState[];
}

interface ValidatedInputFormProps {
  inputFieldNames: string[];
  formMaxWidth: string;
  inputFieldValidations: ((input: string) => Promise<StatusMessage>)[];
  submissionButtonName: string;
  onSubmit?: (fieldValues: string[]) => void;
  fieldNameFontFamily?: string;
  fieldNameFontSize?: string;
}

class ValidatedInputForm extends React.Component<
  ValidatedInputFormProps,
  ValidatedInputsState
> {
  props: ValidatedInputFormProps;

  constructor(props: ValidatedInputFormProps) {
    super(props);

    this.props = props;

    this.state = {
      isLoading: false,
      inputFieldStates: this.props.inputFieldNames.map((x) => {
        const initInputState = ValidatedInput.genInitState();
        initInputState.value = "";
        return initInputState;
      }),
    };
  }

  private onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState({ isLoading: true });
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.inputFieldStates.map((x) => x.value));
    }
    this.setState({ isLoading: false });
  }

  private isDisabled() {
    let isDisabled = false;
    for (let idx = 0; idx < this.state.inputFieldStates.length; idx++) {
      const fieldHasError = this.state.inputFieldStates[idx].error;
      const fieldIsPending = this.state.inputFieldStates[idx].isPending;
      isDisabled = isDisabled || fieldHasError || fieldIsPending;
    }
    return isDisabled;
  }

  private setStateOnField(fieldIdx: number, state: ValidatedInputState) {
    const inputFieldStates = [...this.state.inputFieldStates];
    inputFieldStates[fieldIdx] = state;
    this.setState({ inputFieldStates: inputFieldStates });
  }

  private renderValidatedFields() {
    const validatedFields = [];
    for (let idx = 0; idx < this.state.inputFieldStates.length; idx++) {
      validatedFields.push(
        <ValidatedInput
          key={idx}
          name={this.props.inputFieldNames[idx]}
          fontFamily={this.props.fieldNameFontFamily}
          fontSize={this.props.fieldNameFontSize}
          state={this.state.inputFieldStates[idx]}
          setState={(state: ValidatedInputState) =>
            this.setStateOnField(idx, state)
          }
          typingDelay={750}
          validateInput={this.props.inputFieldValidations[idx]}
        />
      );
    }
    return validatedFields;
  }

  public override render() {
    return (
      <Box display="block" justifyContent="center" margin="auto" marginTop={10}>
        <form
          style={{
            width: "50vw",
            margin: "auto",
            padding: "10px",
            borderRadius: "10px",
            display: "flex",
            flexWrap: "wrap",
            maxWidth: this.props.formMaxWidth,
          }}
        >
          {this.renderValidatedFields()}
          <Box display="flex" justifyContent="left" p={2}>
            <Button
              isLoading={this.state.isLoading}
              marginLeft="auto"
              color="#770091"
              isDisabled={this.isDisabled()}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                this.onSubmit(e)
              }
            >
              {this.props.submissionButtonName}
            </Button>
          </Box>
        </form>
      </Box>
    );
  }
}

export default ValidatedInputForm;
