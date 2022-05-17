import React from 'react'

export interface ValidatedInputData {
  value: string;
  error: boolean;
  message: string;
}

export interface ValidatedInputArgs {
  inputName: string;
  inputData: ValidatedInputData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}