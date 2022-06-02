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
import React from 'react';
import {ValidatedInputProps, ValidatedInputState} from './types'


export default class ValidatedInput extends React.Component<ValidatedInputProps> {

  props: ValidatedInputProps;
  validationCheck: NodeJS.Timeout;

  constructor(props: ValidatedInputProps) {
    super(props)
    this.props = props;
    this.validationCheck = setTimeout(() => {}, 0) ;
  }

  static genInitState(): ValidatedInputState {
    return {
      value: "",
      error: false,
      message: "",
      isPending: true ,
    };
  }

  async checkValue(value: string) {
    const statusMessage = await this.props.validateInput(value)
    this.props.setState({
      value: value,
      error: statusMessage.error,
      message: statusMessage.message,
      isPending: false,
    })
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    this.props.setState({value: newValue, error: false, message: "", isPending: true})
    clearTimeout(this.validationCheck)
    const newValidationCheck = setTimeout(
      () => this.checkValue(newValue), this.props.typingDelay
    )
    this.validationCheck = newValidationCheck
  }

  validityIcon() {
    const shouldHideValidityIcon = (
      this.props.state.isPending ||
      this.props.state.value === "" ||
      this.props.hideValidityIcon
    )

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

  helperTextMessage() {
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
        <FormLabel htmlFor={this.props.name}>{this.props.name}</FormLabel>
        <InputGroup>
          {this.validityIcon()}
          <Input
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