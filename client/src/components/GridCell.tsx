import { Box, Button } from '@chakra-ui/react';
import React from 'react';


interface GridCellProps {
  alive: boolean;
  isTree: boolean;
  nNeighbors: number;
  isBorderCell: boolean;
  isSettingCell: boolean;
  onClick: () => void;
}


interface GridCellState {
  opacity: number;
}


class GridCell extends React.Component<GridCellProps, GridCellState> {
  alive: boolean;
  isBorderCell: boolean;
  isSettingCell: boolean;
  nNeighbors: number;
  onClick: () => void;

  cellSize: number
  isTree: boolean;
  animation: () => void

  constructor(props: GridCellProps) {
    super(props);
    this.alive = props.alive;
    this.onClick = props.onClick;
    this.isBorderCell = props.isBorderCell;
    this.nNeighbors = props.nNeighbors;
    this.isSettingCell = props.isSettingCell;

    this.isTree = props.isTree;
    this.animation = this.alive ? this.animateBirth : this.animateDeath
    this.cellSize = 32;

    this.state = {
      opacity: this.isSettingCell ? 0.0 : (this.alive ? 0.0 : 1.0)
    }
  }

  componentDidMount() {
    this.animation()
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
    if (this.isSettingCell) {
      return `rgba(217, 255, 227, ${this.state.opacity})`
    }

    if (!this.isBorderCell) {
      if (this.nNeighbors === 0) {
        return `rgba(255, 247, 251, ${this.state.opacity})`
      }
      if (this.nNeighbors === 1) {
        return `rgba(217, 255, 227, ${this.state.opacity})`
      }
      if (this.nNeighbors === 2) {
        return `rgba(219, 255, 217, ${this.state.opacity})`
      }
      if (this.nNeighbors === 3) {
        return `rgba(237, 255, 217, ${this.state.opacity})`
      }
      if (this.nNeighbors === 4) {
        return `rgba(249, 255, 201, ${this.state.opacity})`
      }
      if (this.nNeighbors === 5) {
        return `rgba(255, 242, 201, ${this.state.opacity})`
      }
      if (this.nNeighbors === 6) {
        return `rgba(255, 231, 201, ${this.state.opacity})`
      }
      if (this.nNeighbors >= 7) {
        return `rgba(255, 215, 201, ${this.state.opacity})`
      }
    } else {
      return `rgba(255, 239, 214, ${this.state.opacity})`
    }
    return "white"
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
    for (let i = 1; i < 100; i+=10) {
      await new Promise(resolve => setTimeout(
        () => {
          this.setState({opacity: this.state.opacity - i*.01});
          resolve('');
        },
        50,
      ));
    }
  }

  render() {
    return (
      <Box id="cellHero" borderColor="#d4d4d4" borderWidth="1px">
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