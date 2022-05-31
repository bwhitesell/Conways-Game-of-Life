import { Box, Button, Heading } from '@chakra-ui/react'
import React from 'react'
import Router from 'next/router'

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
    <a className="simCard" href={`/board/${props.simId}`}>
      <Box margin={5} display="flex" backgroundColor="#546960" borderRadius={5} p={2} maxWidth="600px" boxShadow="7px 7px 30px 5px #888888">
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