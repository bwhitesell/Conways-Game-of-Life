import { Box, Button } from '@chakra-ui/react';
import React from 'react';


interface GridCellProps {
  alive: boolean;
  animateToState: boolean;
  onClick: () => void;
}

interface GridCellState {
  backgroundPositionX: string;
}


class GridCell extends React.Component<GridCellProps, GridCellState> {
  onClick: () => void;
  alive: boolean;
  cellSize: number
  animation: () => void

  constructor(props: GridCellProps) {
    super(props);
    this.alive = props.alive;
    this.onClick = props.onClick;

    this.animation = this.alive ? this.animateBirth : this.animateDeath
    this.cellSize = 64;

    this.state = {
      backgroundPositionX: this.cellSizeInPixels(this.alive ? 0 : -33),
    }
  }

  cellSizeInPixels(multiple: number = 1) {
    return String(this.cellSize * multiple) + 'px'
  }

  alivePosition() {
    return this.cellSizeInPixels(33)
  }

  deadPosition() {
    return this.cellSizeInPixels(0)
  }

  componentDidMount() {
    this.animation()
  }

  async animateBirth() {
    for (let i = 0; i < 34; i++) {
      await new Promise(resolve => setTimeout(
        () => {
          this.setState({backgroundPositionX: this.cellSizeInPixels(-i)});
          resolve('');
        },
        50,
      ));
    }
  }

  async animateDeath() {
    for (let i = -33; i < 1; i++) {
      await new Promise(resolve => setTimeout(
        () => {
          this.setState({backgroundPositionX: this.cellSizeInPixels(i)});
          resolve('');
        },
        50,
      ));
    }
  }


  render() {
    return (
      <Box w={this.cellSizeInPixels()} h={this.cellSizeInPixels()} overflow="hidden">
        <Button
          width={this.cellSizeInPixels(34)}
          height={this.cellSizeInPixels()}
          backgroundPosition={this.state.backgroundPositionX}
          backgroundSize="100%"
          backgroundImage='/growth.png'
          backgroundColor="white"
          flex={1}
          p={0}
          borderRadius={0}
          onClick={(e: React.MouseEvent) => this.onClick()}
        />
      </Box>
    )
  }
}


export default GridCell