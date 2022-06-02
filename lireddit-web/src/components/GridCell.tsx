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
  opacity: number;
}


class GridCell extends React.Component<GridCellProps, GridCellState> {
  alive: boolean;
  animate: boolean;
  isBorderCell: boolean;
  onClick: () => void;

  cellSize: number
  isTree: boolean;
  animation: () => void

  constructor(props: GridCellProps) {
    super(props);
    this.alive = props.alive;
    this.animate = props.animate;
    this.onClick = props.onClick;
    this.isBorderCell = props.isBorderCell;

    this.isTree = props.isTree;
    this.animation = this.alive ? this.animateBirth : this.animateDeath
    this.cellSize = 32;

    this.state = {
      opacity: this.animate ? (this.alive ? 0.0 : 1.0) : 0.0
    }
  }

  componentDidMount() {
    if (this.animate) {
      this.animation()
    }
  }

  buttonId() {
    if (this.alive) {
      if (this.isTree) {
        return "aliveTreeCell"
      } else {
        return "aliveFlowerCell"
      }
    } else {
      if (this.isTree) {
        return "deadTreeCell"
      } else {
        return "deadFlowerCell"
      }
    }
  }

  backgroundColor() {
    if (!this.isBorderCell) {
      return `rgba(166, 255, 188, ${this.state.opacity})`
    } else {
      return `rgba(255, 239, 214, ${this.state.opacity})`
    }
  }
    
  async animateBirth() {
    for (let i = 1; i < 10; i+=1) {
      await new Promise(resolve => setTimeout(
        () => {
          this.setState({opacity: this.state.opacity + i*.1});
          resolve('');
        },
        40,
      ));
    }
  }

  async animateDeath() {
    for (let i = 1; i < 10; i+=1) {
      await new Promise(resolve => setTimeout(
        () => {
          this.setState({opacity: this.state.opacity - i*.1});
          resolve('');
        },
        40,
      ));
    }
  }

  render() {
    return (
      <Box id="cellHero" borderRadius={5}>
        <Button
          id={this.buttonId()}
          overflow="hidden"
          backgroundSize="100%"
          backgroundColor={this.backgroundColor()}
          flex={1}
          p={0}
          onClick={(e: React.MouseEvent) => this.onClick()}
        >
        </Button>
      </Box>
    )
  }
}


export default GridCell