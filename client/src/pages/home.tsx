import { Box, Button, Heading, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import Router from "next/router";
import { SimulationCard } from "../components/SimulationCard";
import { Navbar } from "../components/Navbar";
import { SignedInComponent } from "../components/SignedInProvider";
import BackendAPIClient, { SimulationData } from "../backendAPIClient";
import { BACKEND_URL } from "../config";
import { FlexCol, FlexRow } from "../components/Layout";

interface HomeProps {}

interface HomeState {
  loading: boolean;
  simulations: undefined | SimulationData[];
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      simulations: undefined,
    };
  }

  async componentDidMount() {
    const simulations = await this.requestSimulationData();
    this.setState({
      loading: false,
      simulations: simulations,
    });
  }

  private renderSimulationsList(): JSX.Element[] | undefined {
    const simulationData = this.state.simulations;
    if (simulationData) {
      const simulations = [];
      for (let i = 0; i < simulationData.length; i++) {
        simulations.push(
          <SimulationCard
            key={simulationData[i].id}
            simId={simulationData[i].id}
            simName={simulationData[i].name}
            simDescription={simulationData[i].description}
            updateSimState={this.genRemoveSimFromStateCB(i)}
          />
        );
      }
      return simulations;
    }
    return undefined;
  }

  private renderNoSimsHeading(): JSX.Element {
    return (
      <Heading
        size="lg"
        color="#546960"
        textAlign="center"
        backgroundColor="#d1d1d1"
        p={5}
        borderRadius={10}
        margin={5}
      >
        No simulations created yet...
      </Heading>
    );
  }

  private genRemoveSimFromStateCB(simulationIdx: number) {
    return () => {
      if (this.state.simulations) {
        const newSimulations = [...this.state.simulations];
        newSimulations.splice(simulationIdx, 1); // drop the ith idx
        this.setState({ simulations: newSimulations });
      }
    };
  }

  private async requestSimulationData(): Promise<SimulationData[]> {
    const backendAPIClient = new BackendAPIClient(BACKEND_URL);
    const simulations = await backendAPIClient.listSimulations();
    if ("error" in simulations) {
      console.log(`error retrieving simulation data: ${simulations.message}`);
      return [];
    } else {
      return simulations;
    }
  }

  private simSkeleton() {
    return (
      <Stack margin={5}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  render() {
    return (
      <SignedInComponent>
        <FlexCol>
          <Navbar />
          <FlexCol
            marginTop={20}
            marginBottom={20}
            borderRadius={8}
            backgroundColor="#f2f2f2"
          >
            <FlexRow p={5}>
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <FlexCol>
                  <Heading
                    display="flex"
                    margin="auto"
                    color="teal"
                    size="4xl"
                    fontFamily="Apple Chancery, cursive"
                  >
                    My Games
                  </Heading>
                  <Button
                    color="teal"
                    backgroundColor="#d1d1d1"
                    borderRadius={5}
                    margin={10}
                    p={5}
                    fontSize={20}
                    fontFamily="Apple Chancery, cursive"
                    onClick={() => Router.push("create")}
                  >
                    New Game +
                  </Button>
                </FlexCol>
                {this.state.loading
                  ? this.simSkeleton()
                  : this.state.simulations!.length > 0
                  ? this.renderSimulationsList()
                  : this.renderNoSimsHeading()}
              </Box>
            </FlexRow>
            <Box display="flex" justifyContent="center" />
          </FlexCol>
        </FlexCol>
      </SignedInComponent>
    );
  }
}

export default Home;
