const { Cell } = require("./Cell");

class Grid {
    constructor(width, height) {
        this.columns = [];
        this.width = width;
        this.height = height;
        this.init(width, height)
    }

    init(width, height) {
        for (let column = 0; column < width; column++)
            this.createColumn(column, height);
    }

    createColumn(column, height) {
        this.addAnEmptyColumn();
        this.populateColumnWithCells(column, height);
    }

    addAnEmptyColumn() {
        this.columns.push([]);
    }

    populateColumnWithCells(column, height) {
        for (let row = 0; row < height; row++)
            this.addNewCellToAColumn(column);
    }

    addNewCellToAColumn(column) {
        this.columns[column].push(new Cell);
    }
}

exports.Grid = Grid;