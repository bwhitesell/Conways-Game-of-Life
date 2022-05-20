import { Heading, Box, Image } from '@chakra-ui/react'
import AudioPlayer from '../components/AudioPlayer'
import Particle from '../components/Particle'
import Register from '../components/Register'

export default function Home() {
  return (
    <Box h='calc(100vh)' overflow="hidden" position="relative" display="block" p={4}>
      <div id="hero">
        <div id="spritesheet" />
      </div>
      <Heading size="4xl" p={6} margin="auto" textAlign="center" color="#5e4126" fontFamily="Apple Chancery, cursive">Conway's Game of Life</Heading>
      <Register />
      <AudioPlayer audioURL="/bleed.mp3" />
      <Particle initialX={205} yDelay={243}/>
      <Particle initialX={824} yDelay={150}/>
      <Particle initialX={1254} yDelay={375}/>
      <Particle initialX={133} yDelay={482}/>
      <Particle initialX={84} yDelay={512}/>
      <Particle initialX={945} yDelay={582}/>
      <Particle initialX={945} yDelay={674}/>
    </Box>
  )
}
