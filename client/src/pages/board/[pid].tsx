import React from 'react';
import { Box, Skeleton, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Game from '../../components/Game';
import BackendAPIClient from '../../backendAPIClient';
import { BACKEND_URL } from '../../config';
import { Navbar } from '../../components/Navbar';
import { FlexCol } from '../../components/Layout';
import { SignedInComponent } from '../../components/SignedInProvider';


const gamePage: React.FC = () => {

  const initPageState = {
    name: "",
    description: "",
    data: [[false]],
    isLoaded: false,
  };

  const [gameData, setGameData] = React.useState(initPageState);
  const router = useRouter();
  const { pid } = router.query;

  if (!pid) {
    return (<div><h1>Page Not Found: 404</h1></div>)
  }

  const getBoardData = async () => {
    const backendAPIClient = new BackendAPIClient(BACKEND_URL);
    const simulationData = await backendAPIClient.getSimulation(Number(pid));
    if (!("error" in simulationData)) {
      setGameData({...simulationData, isLoaded: true});
    } else {
      alert(`Unable to load board. Error Message: ${simulationData.message}`);
    }
  }

  if (!gameData.isLoaded) {
    // show off skeleton animation
    setTimeout(getBoardData, 350);
  }

  return (
    <SignedInComponent>
      <FlexCol>
        <Navbar />
      {gameData.isLoaded ? (
        <Game 
          initGridState={gameData.data}
        />
      ) : (
        <Stack margin={20}>
          <Skeleton height='100px' />
          <Skeleton height='100px' />
          <Skeleton height='100px' />
        </Stack>
      )}
      </FlexCol>
    </SignedInComponent>
  )
}

export default gamePage