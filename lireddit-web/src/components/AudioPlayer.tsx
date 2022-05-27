import React from 'react';
import BackendAPIWrapper from '../backendAPIWrapper';
import ValidatedInput from './ValidatedInput';
import { BACKEND_URL } from '../config';
import { Box, Button, Heading } from '@chakra-ui/react';


interface AudioPlayerProps {
  audioURL: string;
  children: JSX.Element;
}

interface AudioPlayerState {
  audio?: HTMLAudioElement | undefined;
}


class AudioPlayer extends React.Component<AudioPlayerProps, AudioPlayerState> {
  removeMoveMousePlayAudioListener: () => void;

  constructor(props: AudioPlayerProps) {
    super(props);

    if(typeof Audio != "undefined") {
      this.state = {audio: new Audio(props.audioURL)}
    } else {
      this.state = {audio: undefined}
    }

    this.removeMoveMousePlayAudioListener = () => {}

  }

  addMoveMousePlayAudioListener() {
    const playAudio = () => this.play()
    const removeMoveMousePlayAudioListener = () => {
      document.removeEventListener('mousemove', playAudio)
    }
    document.addEventListener('mousemove', playAudio);
    return removeMoveMousePlayAudioListener
  }

  componentDidMount() {
    this.removeMoveMousePlayAudioListener = this.addMoveMousePlayAudioListener();
  }

  componentWillUnmount() {
    this.removeMoveMousePlayAudioListener();
  }

  play() {
    this.state.audio?.play();
    if (!this.state.audio?.paused) {
      this.removeMoveMousePlayAudioListener();
    }
  }

  pause() {
    this.removeMoveMousePlayAudioListener();
    this.state.audio?.pause();
  }

  render() {
    return (
      <div {...this.props}>
        {this.props.children}
        <Box display="flex" flexDirection="column" position="absolute" bottom={0}>
          <Heading margin="auto" size="md">Music</Heading>
          <Box p={3} marginLeft="auto">
            <Button backgroundColor="#546960" colorScheme="teal" margin={1} onClick={() => this.pause()}>||</Button>
            <Button backgroundColor="#546960" colorScheme="teal" margin={1} onClick={() => this.play()}>▶</Button>
          </Box>
        </Box>
      </div>
    )
  }
} 

export default AudioPlayer