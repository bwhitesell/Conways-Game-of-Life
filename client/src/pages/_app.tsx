import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import AudioPlayer from "../components/AudioPlayer";
import { SignedInProvider } from "../components/SignedInProvider";
import "../styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SignedInProvider>
        <AudioPlayer audioURL="/bleed.mp3">
          <Component {...pageProps} />
        </AudioPlayer>
      </SignedInProvider>
    </ChakraProvider>
  );
}

export default MyApp;
