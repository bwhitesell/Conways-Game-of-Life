import React from "react";
import Router from "next/router";
import { Box, Button, Heading } from "@chakra-ui/react";

import BackendAPIClient from "../backendAPIClient";
import { BACKEND_URL } from "../config";
import { SignedInComponent, SignedInContext } from "./SignedInProvider";

const Navbar: React.FC = () => {
  const signedInContext = React.useContext(SignedInContext);

  const signOut = async (e: React.MouseEvent) => {
    const backendAPIClient = new BackendAPIClient(BACKEND_URL);
    await backendAPIClient.logout();
    signedInContext.update();
    await Router.push("/landing");
  };

  return (
    <SignedInComponent>
      <Box>
        <Box
          id="navbar"
          borderRadius={2}
          backgroundColor="teal"
          display="flex"
          p={3}
          position="fixed"
          top={0}
          width="100%"
          zIndex="10"
        >
          <Box id="userIcon" display="flex" borderWidth={2} borderColor="black">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => Router.push("/home")}
            >
              <img
                style={{ width: "50px", height: "50px" }}
                src="/userIcon.jpeg"
              ></img>
            </a>
          </Box>
          <Box id="username" display="flex" p={3}>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => Router.push("/home")}
            >
              <Heading color="white" size="sm">
                {signedInContext.get.username}
              </Heading>
            </a>
          </Box>
          <Box display="flex" marginLeft="auto">
            <Button onClick={signOut} colorScheme="teal" marginTop={1}>
              Sign Out
            </Button>
          </Box>
        </Box>
        <Box id="navbar-spacer" width="100%" top={0} height="80px"></Box>
      </Box>
    </SignedInComponent>
  );
};

export { Navbar };
