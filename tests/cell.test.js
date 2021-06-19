const { Cell } = require("../src/scripts/core/Cell");

describe("Cell", () => {
    it("New cell status should be dead (false)", () => {
        my_cell = new Cell();
        expect(my_cell.status).toBe(false);
    });
})