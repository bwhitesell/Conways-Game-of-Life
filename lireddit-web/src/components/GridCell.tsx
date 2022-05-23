import { Box, Button } from '@chakra-ui/react';
import React from 'react';


interface GridCellProps {
  alive: boolean;
  animate: boolean;
  onClick: () => void;
}

interface GridCellState {
  backgroundPositionX: string;
}


class GridCell extends React.Component<GridCellProps, GridCellState> {
  alive: boolean;
  animate: boolean
  onClick: () => void;

  cellSize: number
  animation: () => void

  constructor(props: GridCellProps) {
    super(props);
    this.alive = props.alive;
    this.animate = props.animate;
    this.onClick = props.onClick;

    this.animation = this.alive ? this.animateBirth : this.animateDeath
    this.cellSize = 48;

    this.state = {
      backgroundPositionX: this.cellSizeInPixels(this.animate ? (this.alive ? 1 : 37) : (1)),
    }
  }

  cellSizeInPixels(multiple: number = 1) {
    return String(this.cellSize * multiple) + 'px'
  }

  alivePosition() {
    return this.cellSizeInPixels(37)
  }

  deadPosition() {
    return this.cellSizeInPixels(1)
  }

  componentDidMount() {
    if (this.animate) {
      this.animation()
    }
  }

  async animateBirth() {
    for (let i = 1; i < 38; i++) {
      await new Promise(resolve => setTimeout(
        () => {
          this.setState({backgroundPositionX: this.cellSizeInPixels(i)});
          resolve('');
        },
        8,
      ));
    }
  }

  async animateDeath() {
    for (let i = 37; i > 0; i--) {
      await new Promise(resolve => setTimeout(
        () => {
          this.setState({backgroundPositionX: this.cellSizeInPixels(i)});
          resolve('');
        },
        8,
      ));
    }
  }


  render() {
    return (
      <Box w={this.cellSizeInPixels()} h={this.cellSizeInPixels()} overflow="hidden">
        <Button
          width={this.cellSizeInPixels(37)}
          height={this.cellSizeInPixels()}
          backgroundPosition={this.state.backgroundPositionX}
          backgroundSize="100%"
          backgroundImage='/growth2.png'
          backgroundColor={this.alive? "white":"white"}
          flex={1}
          p={0}
          borderRadius={2}
          onClick={(e: React.MouseEvent) => this.onClick()}
        />
      </Box>
    )
  }
}


export default GridCell