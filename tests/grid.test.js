const { Cell } = require("../src/scripts/core/Cell");
const { Grid } = require("../src/scripts/core/Grid");

describe("Grid", () => {
    it("New grid columns should be an empty array", () => {
        const my_grid = new Grid();
        expect(my_grid.columns).toStrictEqual([]);
    });

    it("Grid initialise should create columns with the provided width", () => {
        const my_grid = new Grid(10, 10);
        expect(my_grid.columns.length).toBe(10);
    });

    it("Grid initialise should create rows with the provided width", () => {
        const my_grid = new Grid(10, 10);
        expect(my_grid.columns[0].length).toBe(10);
    });

    it("Grid initialise should populate columns with cells", () => {
        const my_grid = new Grid(10, 10);
        expect(my_grid.columns[0][0] instanceof Cell).toBe(true);
    });
});