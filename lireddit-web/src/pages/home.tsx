import { Box, Heading } from '@chakra-ui/react';
import React from 'react'
import { redirectLoggedOutUser } from '../utils'

const home: React.FC = () => {
  redirectLoggedOutUser("/");

  return (
    <Box>
      <Heading>HI THERE</Heading>
    </Box>
  )
}

export default home