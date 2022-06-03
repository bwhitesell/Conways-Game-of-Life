

class ConwayGrid {
  /**
   * The grid of cells that composes conways' game of life. The game can be
   * updated and metadata about the game state can be extracted through the
   * created object methods.
   */

  grid: boolean[][];
  nVerticalCells: number;
  nHorizontalCells: number;
  nBoardCells: number;
  generation: number;

  constructor(grid: boolean[][]) {
    this.grid = grid;
    this.generation = 1;
    this.nVerticalCells = this.grid.length;
    this.nHorizontalCells = this.grid[0].length;
    this.nBoardCells = this.nVerticalCells * this.nHorizontalCells
  }

  updateGrid() {
    const newGrid = [];

    for (let rowNum = 0; rowNum < this.nVerticalCells; rowNum ++) {

      const newRow = [];

      for (let colNum = 0; colNum < this.nHorizontalCells; colNum++) {

        const nNeighbors = this.getNumNeighbors(rowNum, colNum);
        const cellIsAlive = this.grid[rowNum][colNum];
        newRow.push(this.cellShouldLive(cellIsAlive, nNeighbors));
      }

      newGrid.push(newRow);

    }
    
    this.grid = newGrid;
    this.generation += 1;
  }

  cellShouldLive(cellIsAlive: boolean, nNeighbors: number) {
    // Conway's Rules //
    if (cellIsAlive && [2, 3].includes(nNeighbors)) {
  
      return true
    } else if ((!cellIsAlive) && nNeighbors === 3) {

      return true
    }

    return false
  }

  nLiveCells() {
    return this.grid.map(
      (x: boolean[]) => x.filter(Boolean).length
    ).reduce((a, b) => a + b)
  }

  nDeadCells() {
    return this.nBoardCells - this.nLiveCells()
  }

  isBorderCell(x:number, y: number) {
      const xAtEdge = (0 >= x || x >= this.nHorizontalCells - 1);
      const yAtEdge = (0 >= y || y >= this.nVerticalCells - 1);
      return xAtEdge || yAtEdge
    }
  
  coordinatesInBounds(x: number, y: number) {
    const xInBounds = x >= 0 && x < this.nVerticalCells;
    const yInBounds = y >= 0 && y < this.nHorizontalCells;
    if (xInBounds && yInBounds) {
      return true
    }
    return false
  }

  getNumNeighbors(x: number, y: number) {
    const neighbors = [];
    for (let i = -1; i <= 1; i ++) {
      for (let j = -1; j <= 1; j ++) {
        if (i !== 0 || j !== 0) {
          if (this.coordinatesInBounds(x + i, y + j)) {
              neighbors.push(this.grid[x + i][y + j]);
            }
        }
      }
    }
    return neighbors.filter(Boolean).length
  }
}

export default ConwayGrid