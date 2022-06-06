import { Box } from '@chakra-ui/react';
import React from 'react';
import GridCell  from '../components/GridCell'
import ConwayGrid from '../conwayGrid';


interface BoardProps {

  /**
   * A configuration for the board. 
   */
  conwayGrid: ConwayGrid;
  setter?: (x: boolean[][]) => void;
}


class Board extends React.Component<BoardProps> {
  /**
   * React component to render the grid of cells that displays and can potentially
   * update the game of life. Because the board can be initialized in a directly
   * interactive AND indirectly interactive context, setter is optional.
   * 
   * setter?:
   *  If the setter argument is passed, the board state can be updated through button
   *  clicks. If not, the board state can only be updated via an update of the
   *  references by parent components and this component is soley responsible for
   *  display.
   */

  conwayGrid: ConwayGrid;
  setter?: (x: boolean[][]) => void;

  constructor(props: BoardProps) {
    super(props);
    this.conwayGrid = props.conwayGrid;
    this.setter = props.setter;
  }

  updateConwayGrid(rowNum: number, colNum: number) {
    if (this.setter) { // only allow updates if the setter is passed
      this.conwayGrid.grid[rowNum][colNum] = !this.conwayGrid.grid[rowNum][colNum]
      this.setter(this.conwayGrid.grid)
    }
  }

  renderGrid() {
    /**
     * Iterates through the conway grid object to render a grid of html elements
     * for displaying the state of the game.
     */
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