import React from 'react';
import BackendAPIWrapper from '../backendAPIWrapper';
import ValidatedInput from './ValidatedInput';
import { BACKEND_URL } from '../config';
import { Box, Button, ChakraComponent, Heading } from '@chakra-ui/react';

interface ParticleProps {
  initialX: number;
  yDelay: number;
}

interface ParticleState {
  x: number;
  y: number;
  bearing: {xBearing: number, yBearing: number};
}

class Particle extends React.Component<ParticleProps, ParticleState> {

  stopMovementUpdates: () => void;
  initialX: number;
  yDelay: number;
  particleWidth: number;      
  particleHeight: number;

  constructor(props: ParticleProps) {
    super(props)

    this.stopMovementUpdates = () => {}
    this.particleWidth = 15;
    this.particleHeight = 15;
    this.initialX = props.initialX;
    this.yDelay = props.yDelay;
    this.state = {
      x: this.initialX,
      y: 0,
      bearing: {
        xBearing: 1,
        yBearing: -0.5
      },
    };
  }

  updateHeading() {
    console.log(window.innerHeight);
    this.setState({
      bearing: {
        xBearing: (Math.random() - .5),
        yBearing: (Math.random() <.05) ? -0.5:-0.35,
      }
    })
  }

  updatePosition() {
    if (Math.random() > 0.97) {
      this.updateHeading()
    }
    this.setState({
      x: this.state.x + this.state.bearing.xBearing,
      y: this.state.y + this.state.bearing.yBearing,
    })

    if (this.state.y < -50) {
      this.setState({
        x: this.initialX,
        y: (window.innerHeight + this.yDelay),
      })
    }
  }

  componentDidMount() {
    this.setState({y: (window.innerHeight + this.yDelay)})
    const updateMovement = setInterval(() => this.updatePosition(), 25)
    this.stopMovementUpdates = () => {clearInterval(updateMovement);}
  }

  render() {
    return (
      <Box
        position="absolute"
        top={this.state.y}
        left={this.state.x}
        backgroundColor="#FFEA14"
        width={this.particleWidth}
        height={this.particleHeight}
        zIndex={-1}
      />
    )
  }
} 

export default Particle