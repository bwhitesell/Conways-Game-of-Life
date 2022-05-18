import { Box, Image } from '@chakra-ui/react'
import Register from '../components/Register'

export default function Home() {
  return (
    <Box display="block" p={4}>
      <Image maxWidth={700} margin="auto" p={12} src='/logo.png' />
      <Register />
    </Box>
  )
}
