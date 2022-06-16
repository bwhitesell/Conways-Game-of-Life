import React from "react";
import Router from "next/router";
import { Box, Heading, Icon } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FlexCol, FlexRow } from "./Layout";
import BackendApiClient from "../backendAPIClient";
import { BACKEND_URL } from "../config";

interface SimulationCardProps {
  simId: number;
  simName: string;
  simDescription: string;
  updateSimState: () => void;
}

const SimulationCard: React.FC<SimulationCardProps> = (
  props: SimulationCardProps
) => {
  const redirectToSimPage = () => {
    Router.push(`/board/${props.simId}`);
  };

  const deleteSimulation = () => {
    const backendAPIClient = new BackendApiClient(BACKEND_URL);
    backendAPIClient.deleteSimulation(props.simId);
    props.updateSimState();
  };

  return (
    <FlexRow justifyContent="center">
      <a
        className="simCard"
        onClick={redirectToSimPage}
        style={{ cursor: "pointer" }}
      >
        <Box
          margin={5}
          display="flex"
          backgroundColor="#546960"
          borderRadius={5}
          p={2}
          boxShadow="7px 7px 30px 5px #888888"
          minWidth={300}
        >
          <FlexCol>
            <FlexRow>
              <Heading
                display="flex"
                p={3}
                fontFamily="Apple Chancery, cursive"
                size="lg"
                color="#ebebab"
                overflowWrap="anywhere"
              >
                {" "}
                {props.simName}
              </Heading>
            </FlexRow>
            <p
              style={{
                display: "flex",
                color: "#ebebab",
                padding: "5px",
                overflowWrap: "anywhere",
              }}
            >
              {props.simDescription}
            </p>
          </FlexCol>
        </Box>
      </a>
      <DeleteIcon
        marginTop={6}
        _hover={{ color: "red" }}
        onClick={() => deleteSimulation()}
      ></DeleteIcon>
    </FlexRow>
  );
};

export { SimulationCard };
