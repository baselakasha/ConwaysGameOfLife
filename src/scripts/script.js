const {Game} = require("./core/Game");

import "../styles/style.scss";

function main() {
    let table = getGameScreenElement();
    let table_body = getGameScreenBodyElement();
    let divider = convertRemToPixels(1.6);
    let my_game = new Game(table.offsetWidth / divider, table.offsetHeight / divider);

    drawGameScreen(my_game, table_body);
    listenToGenrationButton(my_game, table_body);
}

function drawGameScreen(my_game, table_body) {
    drawGrid(my_game, table_body);
    addEventListenersToCells(my_game);
}

function listenToGenrationButton(my_game, table_body) {
    let next_gen_button = document.getElementById("nextGenButton");
    next_gen_button.onclick = function () {
        my_game.nextGeneration();
        drawGameScreen(my_game, table_body);
    };
}

function drawGrid(my_game, table_body) {
    emptyGameSceen(table_body);
    for (let row = 0; row < my_game.grid.height; row++)
        drawARow(my_game, row, table_body)
}

function addEventListenersToCells(my_game) {
    let cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++)
        cells[i].onclick = function () { toogleCell(this, my_game) };
}

function emptyGameSceen(table_body) {
    table_body.innerHTML = "";
}

function drawARow(my_game, row, table_body) {
    let new_row = getNewRowElement();
    for (let column = 0; column < my_game.grid.width; column++)
        addACell(column, row, my_game, new_row);
    addRowToTable(table_body, new_row);
}

function toogleCell(cell, my_game) {
    toggleCellStatus(cell, my_game);
    toggleCellClass(cell);
}

function getNewRowElement() {
    return document.createElement("tr");
}

function addACell(column, row, my_game, new_row) {
    let new_cell = getNewCellElement();
    updateCellHTMLXYProprties(new_cell, column, row);
    updateCellClassName(new_cell, my_game, column, row);
    addCellToRow(new_row, new_cell);
}

function addRowToTable(table_body, new_row) {
    table_body.appendChild(new_row);
}

function toggleCellStatus(cell, my_game) {
    let { x, y } = getCellPostion(cell);
    let my_cell = my_game.grid.columns[x][y];
    my_cell.status = !my_cell.status;
}

function toggleCellClass(cell) {
    if (cell.classList.contains("cell--alive"))
        cell.className = "cell";
    else
        cell.className += " cell--alive";
}

function getNewCellElement() {
    return document.createElement("td");
}

function updateCellHTMLXYProprties(new_cell, column, row) {
    new_cell.setAttribute("data-x", column);
    new_cell.setAttribute("data-y", row);
}

function updateCellClassName(new_cell, my_game, column, row) {
    new_cell.className = "cell";
    if (my_game.grid.columns[column][row].status)
        new_cell.className += " cell--alive";
}

function addCellToRow(new_row, new_cell) {
    new_row.appendChild(new_cell);
}

function getCellPostion(cell) {
    let x = cell.getAttribute("data-x");
    let y = cell.getAttribute("data-y");
    return { x, y };
}

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function getGameScreenElement() {
    return document.getElementById("gameScreen");
}

function getGameScreenBodyElement() {
    return document.getElementById("gameScreenBody");
}


window.onload = main()
