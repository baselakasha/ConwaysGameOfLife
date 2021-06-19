const { Grid } = require("./Grid");

class Game{
    constructor(width, height) {
        this.grid = new Grid(width, height);
        this.new_grid = null;
    }

    nextGeneration() {
        this.new_grid = new Grid(this.grid.width, this.grid.height);
        this.decideAllCellsFuture();
        this.swapGrid();
    }

    decideAllCellsFuture() {
        this.loopThroughColumns();
    }

    swapGrid() {
        this.grid = this.new_grid;
    }

    loopThroughColumns() {
        for (let column = 1; column < this.new_grid.columns.length - 1; column++)
            this.loopThroughColumnCells(column);
    }

    loopThroughColumnCells(column) {
        for (let cell = 1; cell < this.new_grid.columns[0].length -1; cell++)
            this.decideCellFuture(column, cell);
    }

    decideCellFuture(column, cell) {
        let neighbors = this.calculateNeighborsOfACell(column, cell);
        if (this.doesMakeCellAlive(neighbors, column, cell))
            this.new_grid.columns[column][cell].status = true;
        else
            this.new_grid.columns[column][cell].status = false;
    }

    doesMakeCellAlive(neighbors, column, cell) {
        return this.doesCellLive(neighbors, column, cell)
            || this.doesCellBorn(neighbors, column, cell);
    }

    doesCellLive(neighbors, column, cell) {
        return (neighbors == 2 || neighbors == 3)
            && this.grid.columns[column][cell].status;
    }

    doesCellBorn(neighbors, column, cell) {
        return (neighbors == 3) && !this.grid.columns[column][cell].status;
    }

    calculateNeighborsOfACell(column, cell) {
        let neighbors = 0;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                const skipSelfCell = x == 0 && y == 0;
                if (skipSelfCell)
                    continue
                neighbors += this.grid.columns[column + x][cell + y].status;
            }
        }
        return neighbors;
    }
}

exports.Game = Game;