export default class Board {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.board = this.createBoard()
  }

  //creates board with rows and cols
  createBoard() {
    const newBoard = []

    for (let i = 0; i < this.rows; i++) {
      const newRow = []
      for (let j = 0; j < this.cols; j++) {
        newRow.push(0)
      }
      newBoard.push(newRow)
    }
    return newBoard
  }

  //returns status of current cell, i.e. living or dead
  getCell(row, col) {
    const isRowValid = row >= 0 && row < this.rows
    const isColValid = col >= 0 && col < this.cols
    if (isRowValid && isColValid) {
      return this.board[row][col]
    }
    return -1
  }

  //returns number of living cells around a given cell
  numLivingNbhrs(row, col) {
    let numLiving = 0

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (this.getCell(row + i, col + j) === 1) numLiving++
      }
    }

    if (this.getCell(row, col) === 1) numLiving--
    return numLiving
  }

  //tick makes one move from current position
  tick() {
    const newBoard = this.createBoard()

    //loop through all the cells of the board and determine based on each cell's neighbors, whether the cell should be dead or alive on the next iteration
    //we want to count the number of living neighbors for each cell
    //then set the next state of newBoard based on this info

    //rules:
    // 1. Any alive cell that is touching less than two alive neighbours dies.
    // 2. Any alive cell touching four or more alive neighbours dies.
    // 3. Any alive cell touching two or three alive neighbours does nothing.
    // 4. Any dead cell touching exactly three alive neighbours becomes alive.

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const livingNs = this.numLivingNbhrs(row, col)
        const cellIsAlive = this.getCell(row, col) === 1

        const rule1 = cellIsAlive && livingNs < 2
        const rule2 = cellIsAlive && livingNs >= 4
        const rule3 = cellIsAlive && (livingNs === 2 || livingNs === 3)
        const rule4 = !cellIsAlive && livingNs === 3

        if (rule3 || rule4) newBoard[row][col] = 1
        else if (rule1 || rule2) newBoard[row][col] = 0
      }
    }
    this.board = newBoard
  }
}
