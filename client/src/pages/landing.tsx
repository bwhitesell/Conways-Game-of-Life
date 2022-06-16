import {
  Heading,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Fade,
} from "@chakra-ui/react";
import Particle from "../components/Particle";
import Register from "../components/Register";
import SignIn from "../components/SignIn";
import { SignedOutComponent } from "../components/SignedInProvider";

export default function Landing() {
  return (
    <SignedOutComponent>
      <Box
        h="calc(100vh)"
        overflow="hidden"
        position="relative"
        display="block"
        p={4}
      >
        <div id="hero">
          <div id="spritesheet" />
        </div>
        <Heading
          size="4xl"
          p={6}
          margin="auto"
          textAlign="center"
          color="#5e4126"
          fontFamily="Apple Chancery, cursive"
        >
          Conway's Game of Life
        </Heading>
        <Fade in={true}>
          <Box p={4} display="flex" justifyContent="center" margin="auto">
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab
                  _selected={{ backgroundColor: "teal", textColor: "white" }}
                >
                  Sign In
                </Tab>
                <Tab
                  _selected={{ backgroundColor: "teal", textColor: "white" }}
                >
                  Register
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SignIn />
                </TabPanel>
                <TabPanel>
                  <Register />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Fade>
        <Particle key="particle1" initialX={205} yDelay={243} />
        <Particle key="particle2" initialX={824} yDelay={150} />
        <Particle key="particle7" initialX={945} yDelay={674} />
      </Box>
    </SignedOutComponent>
  );
}
