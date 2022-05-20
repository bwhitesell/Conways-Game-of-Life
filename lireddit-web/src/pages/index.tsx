import { Heading, Box, Image } from '@chakra-ui/react'
import AudioPlayer from '../components/AudioPlayer'
import Particle from '../components/Particle'
import Register from '../components/Register'

export default function Home() {
  return (
    <Box h='calc(100vh)' position="relative" display="block" p={4}>
      <div id="hero">
        <div id="spritesheet" />
      </div>
      <Heading size="4xl" p={6} margin="auto" textAlign="center" color="Orange 500" fontFamily="Apple Chancery, cursive">Conway's Game of Life</Heading>
      <Register />
      <AudioPlayer audioURL="/bleed.mp3" />
      <Particle />
    </Box>
  )
}
