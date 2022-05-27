import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import AudioPlayer from '../components/AudioPlayer'
import '../styles.css'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AudioPlayer audioURL="/bleed.mp3">
        <Component {...pageProps} />
      </AudioPlayer>
    </ChakraProvider>
  )
}

export default MyApp
