import { background, Box, Button, Heading, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react'
import { redirectLoggedOutUser } from '../utils'
import { SimulationCard } from '../components/SimulationCard'
import { Navbar } from '../components/Navbar';
import BackendAPIWrapper, { SimulationData } from '../backendAPIWrapper';
import { BACKEND_URL } from '../config'

interface HomeProps {

}

interface HomeState {
  loading: boolean;
  simulations: undefined | JSX.Element[];

}


class Home extends React.Component<HomeProps, HomeState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      simulations: undefined,
    }
  }

  async componentDidMount() {
    redirectLoggedOutUser("/");

    setTimeout( async() => {
      const simulations = await this.requestSimulationData();
      this.setState({
        loading: false,
        simulations: this.buildJSXfromSimulationData(simulations)
      })
    }, 1000)
    
  }

  buildJSXfromSimulationData(simulationData: SimulationData[]): JSX.Element[] {
    if (simulationData.length > 0){
      const simulations = [];
      for (let i = 0; i < simulationData.length; i++) {
        simulations.push(
          <SimulationCard
            simId={simulationData[i].id}
            simName={simulationData[i].name}
            simDescription={simulationData[i].description}
          />
        );
      }
      return simulations
    } else {
      return [<Heading 
        size="lg"
        color="#546960"
        textAlign="center"
        backgroundColor="#d1d1d1"
        p={5}
        borderRadius={10}
        margin={5}
      >
        No simulations created yet...
      </Heading>]
    }
  }

  async requestSimulationData(): Promise<SimulationData[]> {
    const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL);
    const simulations = await backendAPIWrapper.listSimulations();
    if ("error" in simulations) {
      console.log(`error retrieving simulation data: ${simulations.message}`);
      return []
    } else {
      return simulations
    }
  }

  simSkeleton() {
    return (
      <Stack margin={5}>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>
    )
  }

  render() {
    return (
      <Box>
        <Navbar />
        <Box id="homeBody" display="flex" justifyContent="center" p={5}>
          <Box id="mySimulations" display="flex" flexDirection="column">
            <Box id ="mySimulationsHeading" display="flex">
              <Heading
                margin={5}
                color="teal"
                size="4xl"
                fontFamily="Apple Chancery, cursive"
              >
                My Simulations
              </Heading>
              <Button
                color="teal"
                backgroundColor="#d1d1d1"
                borderRadius={5}
                margin={10}
                p={5}
                fontSize={20}
                fontFamily="Apple Chancery, cursive"
              >
                New Simulation + 
              </Button>
            </Box>
            {this.state.loading ? this.simSkeleton() : this.state.simulations}
          </Box>
          <Box display="flex" justifyContent="center">
           
          </Box>
        </Box>
      
      </Box>
    )
  }
}

export default Home



 