import { Box } from '@chakra-ui/react';
import React from 'react';


interface FlexBoxProps {
  children: JSX.Element | JSX.Element[];
  [otherOptions: string]: unknown;
}

const FlexCol: React.FC<FlexBoxProps> = (props) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" {...props}>
      {props.children}
    </Box>
  )
}

const FlexRow: React.FC<FlexBoxProps> = (props) => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" {...props}>
      {props.children}
    </Box>
  )
}


export { FlexCol, FlexRow}