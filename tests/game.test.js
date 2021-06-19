const { Game } = require("../src/scripts/core/Game");
const { Grid } = require("../src/scripts/core/Grid");

describe("Game", () => {
    it("New game has a grid", () => {
        let my_game = new Game(10, 10);
        expect(my_game.grid instanceof Grid).toBe(true);
    });

    it("New game has a grid with the provided demensions", () => {
        let my_game = new Game(10, 10);
        expect(my_game.grid.columns.length).toBe(10);
    });
});


describe("Next Generation", () => {
    it("Cell that does not have neighbors dies", () => {
        const dead_grid = new Grid(10, 10);

        let my_game = new Game(10, 10);
        my_game.grid.columns[2][3].status = true;
        my_game.nextGeneration();

        expect(my_game.grid.columns[2][3].status).toBe(false);
        expect(my_game.grid).toStrictEqual(dead_grid);
    });

    it("Cell that has one neighbor dies", () => {
        const dead_grid = new Grid(10, 10);
        let my_game = new Game(10, 10);
        my_game.grid.columns[2][3].status = true;
        my_game.grid.columns[2][4].status = true;
        my_game.nextGeneration();
        expect(my_game.grid).toStrictEqual(dead_grid);
    });

    it("Cell that has two nighboars lives", () => {
        let expected_grid = new Grid(10, 10);
        expected_grid.columns[4][4].status = true;

        let my_game = new Game(10, 10);

        my_game.grid.columns[3][3].status = true;
        my_game.grid.columns[4][4].status = true;
        my_game.grid.columns[5][5].status = true;

        my_game.nextGeneration();
        expect(my_game.grid).toStrictEqual(expected_grid);
    });

    it("Live cell that has three nighboars lives", () => {
        let my_game = new Game(10, 10);
        my_game.grid.columns[3][5].status = true;
        my_game.grid.columns[3][3].status = true;
        my_game.grid.columns[4][4].status = true;
        my_game.grid.columns[5][5].status = true;

        my_game.nextGeneration();
        expect(my_game.grid.columns[4][4].status).toEqual(true);
    });

    it("Dead cell that that has three nighboars born", () => {
        let expected_grid = new Grid(10, 10);
        expected_grid.columns[2][2].status = true;

        let my_game = new Game(10, 10);
        my_game.grid.columns[2][1].status = true;
        my_game.grid.columns[1][2].status = true;
        my_game.grid.columns[3][3].status = true;

        my_game.nextGeneration();
        expect(my_game.grid).toStrictEqual(expected_grid);
    });

    it("Test one vetical line turns into horizontal line", () => {
        let expected_grid = new Grid(10, 10);
        expected_grid.columns[2][1].status = true;
        expected_grid.columns[2][2].status = true;
        expected_grid.columns[2][3].status = true;


        let my_game = new Game(10, 10);
        my_game.grid.columns[1][2].status = true;
        my_game.grid.columns[2][2].status = true;
        my_game.grid.columns[3][2].status = true;


        my_game.nextGeneration();
        expect(my_game.grid).toStrictEqual(expected_grid);
    });
});