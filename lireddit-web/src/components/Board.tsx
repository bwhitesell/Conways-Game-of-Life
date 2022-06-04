import { Box, Button, Heading } from '@chakra-ui/react';
import { Props } from 'framer-motion/types/types';
import React from 'react';
import GridCell  from '../components/GridCell'
import ConwayGrid from '../conwayGrid';
import { ValidatedInputState } from './types';
import ValidatedInput from './ValidatedInput';


interface BoardProps {

  /**
   * A configuration for the board. 
   */
  conwayGrid: ConwayGrid;
  setter?: (x: boolean[][]) => void;
}


class Board extends React.Component<BoardProps> {

  conwayGrid: ConwayGrid;
  setter?: (x: boolean[][]) => void;

  constructor(props: BoardProps) {
    super(props);

    this.conwayGrid = props.conwayGrid;
    this.setter = props.setter;
  }

  updateConwayGrid(rowNum: number, colNum: number) {
    if (this.setter) {
      this.conwayGrid.grid[rowNum][colNum] = !this.conwayGrid.grid[rowNum][colNum]
      this.setter(this.conwayGrid.grid)
    }
  }

  renderGrid() {
    const grid = [];

    for (let rowNum = 0; rowNum < this.conwayGrid.nVerticalCells; rowNum++) {

      const renderedGridRow = [];

      for (let colNum = 0; colNum < this.conwayGrid.nHorizontalCells; colNum ++) {

        const cellIsAlive = this.conwayGrid.grid[rowNum][colNum]

        renderedGridRow.push(
          <GridCell
            key={`${rowNum}_${colNum}_${cellIsAlive})` }
            isSettingCell={this.conwayGrid.generation === 1}
            nNeighbors={this.conwayGrid.getNumNeighbors(rowNum, colNum)}
            alive={cellIsAlive}
            onClick={() => this.updateConwayGrid(rowNum, colNum)}
            isTree={((rowNum + colNum) % 2 === 0)}
            isBorderCell={this.conwayGrid.isBorderCell(colNum, rowNum)}
          />
        )
      }
      grid.push(
        <Box key={rowNum} display="flex">{renderedGridRow}</Box>
      );
    }
    return grid
  }

  render() {
    return (
      <Box display="block" margin="auto">
        {this.renderGrid()}
      </Box>
    )
  }
}

export default Board