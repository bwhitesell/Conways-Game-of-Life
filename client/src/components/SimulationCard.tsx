import React from 'react'
import Router from 'next/router'
import { Box, Heading } from '@chakra-ui/react'

interface SimulationCardProps {
  simId: number;
  simName: string,
  simDescription: string,
}

const SimulationCard: React.FC<SimulationCardProps> = (props: SimulationCardProps ) => {

  const redirectToSimPage = (e: React.MouseEvent) => {
    Router.push(`/board/${props.simId}`)
  }

  return (
    <a className="simCard" onClick={redirectToSimPage} style={{cursor: "pointer"}}>
      <Box margin={5} display="flex" backgroundColor="#546960" borderRadius={5} p={2} boxShadow="7px 7px 30px 5px #888888">
        <Box display="flex" flexDirection="column">
          <Heading
            p={3}
            fontFamily="Apple Chancery, cursive"
            size="lg"
            color="#ebebab"
          > {props.simName}
          </Heading>
          <p style={{color: "#ebebab", padding: "5px"}}>{props.simDescription}</p>
        </Box>
      </Box>
    </a>
  )
}

export { SimulationCard }