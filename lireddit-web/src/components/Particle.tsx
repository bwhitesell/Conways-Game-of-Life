import React from 'react';
import BackendAPIWrapper from '../backendAPIWrapper';
import ValidatedInput from './ValidatedInput';
import { BACKEND_URL } from '../config';
import { Box, Button, Heading } from '@chakra-ui/react';

interface ParticleState {
  x: number;
  y: number;
  xHeading: number;
  yHeading: number;
}

interface ParticleProps {
}

class Particle extends React.Component<ParticleProps, ParticleState> {

  stopMovementUpdates: () => void;
  position: {x: number, y: number, xHeading: number, yHeading: number}

  constructor(props: ParticleProps) {
    super(props)
    this.stopMovementUpdates = () => {}

    this.position = {
      x: 250,
      y: 250,
      xHeading: 1,
      yHeading: -2,
    }
  }

  updateHeading() {
    this.position.xHeading = Math.random();
    this.position.yHeading = 10 * Math.random();

  }

  updatePosition() {
    
    let particle = document.getElementById("particle");
    let particleRect = particle?.getBoundingClientRect();
    particle!.style.left = particleRect!.left + this.position.xHeading + 'px';
    particle!.style.top =  particleRect!.top + this.position.yHeading + 'px';

    if (particleRect!.top < -50) {
      this.stopMovementUpdates();
    }
  }

  componentDidMount() {
    const updateMovement = setInterval(() => this.updatePosition(), 25)
    this.stopMovementUpdates = () => {clearInterval(updateMovement);}
  }

  render() {
    return (
      <Box id="particle" position="absolute" top={this.position.y} left={this.position.x} backgroundColor="yellow" width="25px" height="25px"> </Box>
    )
  }
} 

export default Particle