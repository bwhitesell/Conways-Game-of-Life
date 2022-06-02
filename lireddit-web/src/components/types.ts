import { StatusMessage } from '../backendAPIWrapper';

export interface ValidatedInputState {
    value: string;
    error: boolean;
    message: string;
    isPending: boolean;
  }
  
  export interface ValidatedInputProps {
    name: string;
    state: ValidatedInputState;
    setState: React.Dispatch<React.SetStateAction<any>>
    typingDelay: number;
    hideValidityIcon?: boolean;
    validateInput: (input: string) => Promise<StatusMessage>;
  }