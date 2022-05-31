import React from 'react';
import { Box, Button, Heading } from "@chakra-ui/react";
import Router from 'next/router'
import BackendAPIWrapper from '../backendAPIWrapper';
import { BACKEND_URL } from '../config';


const Navbar: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);

  React.useEffect(() => {
    backendAPIWrapper.me().then((userDetails) => {
      if ("error" in userDetails) {
        setUsername("Anonymous");
      } else {
        setUsername(userDetails.username);
      }
    })
  })

  const signOut = async (e: React.MouseEvent) => {
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
    backendAPIWrapper.logout();
    Router.push('/');
  }

  return (
    <Box id="navbar " borderRadius={2} backgroundColor="teal" display="flex"  p={3}>
      <Box id="userIcon" display="flex" borderWidth={2} borderColor="black">
        <img style={{width: "50px", height: "50px"}} src="/userIcon.jpeg"></img>
      </Box>
      <Box id="username" display="flex" p={3}>
        <Heading color="white" size="sm">{username}</Heading>
      </Box>
      <Box display="flex" marginLeft="auto">
        <Button onClick={signOut} colorScheme="teal" marginTop={1}>Sign Out</Button>
      </Box>
    </Box>  
  )
}

export { Navbar }