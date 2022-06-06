import React from 'react';

import { Heading } from '@chakra-ui/react';


interface CuteSubHeadingProps {
  text: string;
}

const CuteSubHeading: React.FC<CuteSubHeadingProps> = (props) => {
  return (
    <Heading
      marginTop={1}
      size="lg"
      fontFamily="Apple Chancery, cursive"
      textColor="#ff03e2"
    >
      {props.text}
    </Heading>
  )
}

export default CuteSubHeading