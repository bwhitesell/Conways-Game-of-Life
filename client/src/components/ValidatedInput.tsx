import React from 'react';
import { 
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Hide,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

import { StatusMessage } from '../backendAPIClient';



export interface ValidatedInputState {
    value: string;
    error: boolean;
    message: string;
    isPending: boolean;
  }
  

  export interface ValidatedInputProps {
    name: string;
    state: ValidatedInputState;
    typingDelay: number;
    hideValidityIcon?: boolean;
    validateInput: (input: string) => Promise<StatusMessage>;
    setState: React.Dispatch<React.SetStateAction<any>>
    isDisabled?: boolean;
    fontFamily?: string;
    fontSize?: string;

  }


class ValidatedInput extends React.Component<ValidatedInputProps, ValidatedInputState> {

  props: ValidatedInputProps;
  validationCheck: NodeJS.Timeout;

  constructor(props: ValidatedInputProps) {
    super(props);

    this.props = props;
    this.validationCheck = setTimeout(() => {}, 0);
  }

  public static genInitState(): ValidatedInputState {
    return {
      value: "",
      error: false,
      message: "",
      isPending: true,
    }
  }

  private setStateAndUpdateReference(state: ValidatedInputState) {
    this.props.setState(state);
  }

  private async checkValue(value: string) {
    const statusMessage = await this.props.validateInput(value);
    this.setStateAndUpdateReference({
      value: value,
      error: statusMessage.error,
      message: statusMessage.message,
      isPending: false,
    });
  }

  private onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    this.setStateAndUpdateReference(
      {value: newValue, error: false, message: "", isPending: true}
    );
    clearTimeout(this.validationCheck);
    const newValidationCheck = setTimeout(
      () => this.checkValue(newValue), this.props.typingDelay
    );
    this.validationCheck = newValidationCheck;
  }

  private validityIcon() {
    const shouldHideValidityIcon = (
      this.props.state.isPending ||
      this.props.state.value === "" ||
      this.props.hideValidityIcon
    );

    if (shouldHideValidityIcon) {
      return undefined
    } else {
      return this.props.state.error ? (
        <InputRightElement children={<CloseIcon color='red.500'/>}/>
      ) : (
        <InputRightElement children={<CheckIcon color='green.500'/>}/>
      )
    }
  }

  private helperTextMessage() {
    if (this.props.state.isPending && this.props.state.value !== "") {
      return <FormHelperText>Checking...</FormHelperText>
    } else if (this.props.state.error) {
      return <FormErrorMessage>{this.props.state.message}</FormErrorMessage>
    } else {
      return
    }
  }

  render() {
    return (
      <FormControl display="flex" justifyContent="center" flexDirection="column" isInvalid={this.props.state.error} p={1}>
        <FormLabel fontFamily={this.props.fontFamily} fontSize={this.props.fontSize} textColor="#770091" htmlFor={this.props.name}>{this.props.name}</FormLabel>
        <InputGroup>
          {this.validityIcon()}
          <Input
            borderColor="#ff03e2"
            focusBorderColor="#770091"
            isDisabled={this.props.isDisabled ? this.props.isDisabled : false}
            id={this.props.name}
            type={this.props.name}
            value={this.props.state.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.onChange(e)}}
          />
        </InputGroup>
        {this.helperTextMessage()}
      </FormControl>
    )
  }
}

export default ValidatedInput