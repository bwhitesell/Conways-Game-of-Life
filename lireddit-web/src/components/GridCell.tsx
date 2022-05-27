import { Box, Button } from '@chakra-ui/react';
import React from 'react';


interface GridCellProps {
  alive: boolean;
  animate: boolean;
  isTree: boolean;
  isBorderCell: boolean;
  onClick: () => void;
}

interface GridCellState {
  backgroundPositionX: string;
}


class GridCell extends React.Component<GridCellProps, GridCellState> {
  alive: boolean;
  animate: boolean;
  isBorderCell: boolean;
  onClick: () => void;

  cellSize: number
  backgroundImage: string;
  animation: () => void

  constructor(props: GridCellProps) {
    super(props);
    this.alive = props.alive;
    this.animate = props.animate;
    this.onClick = props.onClick;
    this.isBorderCell = props.isBorderCell;

    this.backgroundImage = (props.isTree) ? '/flower-growth.png': 'growth2.png'
    this.animation = this.alive ? this.animateBirth : this.animateDeath
    this.cellSize = 32;

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

  backgroundColor() {
    if (this.alive) {
      if (this.isBorderCell) {
        return '#f5d058'
      }
      return '#cfffd5'
    }
    else if (this.animate) {
      if (!this.alive) {
        return 'white'
      }
    }
    return 'white'
  }

  async animateBirth() {
    for (let i = 1; i < 38; i+=4) {
      await new Promise(resolve => setTimeout(
        () => {
          this.setState({backgroundPositionX: this.cellSizeInPixels(i)});
          resolve('');
        },
        25,
      ));
    }
  }

  async animateDeath() {
    for (let i = 37; i > 0; i-=4) {
      await new Promise(resolve => setTimeout(
        () => {
          this.setState({backgroundPositionX: this.cellSizeInPixels(i)});
          resolve('');
        },
        25,
      ));
    }
  }

  render() {
    return (
      <Box w={this.cellSizeInPixels()} h={this.cellSizeInPixels()} overflow="hidden" borderRadius={5} position="relative" opacity="100%">
        <Button
          width={this.cellSizeInPixels(37)}
          height={this.cellSizeInPixels()}
          backgroundPosition={this.state.backgroundPositionX}
          sx={{"image-rendering": "pixelated"}}
          overflow="hidden"
          backgroundSize="100%"
          backgroundImage={this.backgroundImage}
          backgroundColor={this.backgroundColor()}
          flex={1}
          p={0}
          onClick={(e: React.MouseEvent) => this.onClick()}
        />
      </Box>
    )
  }
}


export default GridCell