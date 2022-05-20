import { Box, Button } from '@chakra-ui/react';
import React from 'react';


interface GridCellProps {
  x: number;
  y: number;
}

interface GridCellState {
  x: number;
  y: number;
  alive: boolean;
}


class GridCell extends React.Component<GridCellProps, GridCellState> {

  constructor(props: GridCellProps) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      alive: false,
    };
  }

  render() {
    return (
      <Button backgroundColor="blue" flex={1} borderRadius={0}/>
    )
  }
}


export default GridCell