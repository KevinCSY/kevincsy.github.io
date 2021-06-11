let board_index = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".board");
const player = "O";
const computer = "X";
let complete = false;

const renderBoard = () => {
    board_container.innerHTML = "";
    board_index.forEach((e, i) => {
        board_container.innerHTML += `<div id="grid_${i}" class="grid" onclick="addPlayerMove(${i})">${board_index[i]}</div>`;

        if (e == player || e == computer) {
            document.querySelector(`#grid_${i}`).classList.add("occupied");
        }
    });
};

const gameLoop = () => {
    renderBoard();
    checkcomplete();
    checkWinner();
};

const addPlayerMove = e => {
    if(!complete){
        if (board_index[e] == "") {
            board_index[e] = player;

            gameLoop();
            addComputerMove();
        }
    }
};

const addComputerMove = () => {
    if(!complete) {
        do {
            selected = Math.floor(Math.random() * 9);
        } while (board_index[selected] != "");
        board_index[selected] = computer;
        gameLoop();
    }
    
};

const checkcomplete = () => {
    for(var e of board_index){
        if(e == "") {
            complete = false;
            break; // if even 1 grid is empty then not complete, no need to check anymore
        } else {
            complete = true;
        }
    }
};

// Check if specified board index has matching values
const checkLine = (a, b, c) => {
    return (
        board_index[a] == board_index[b] &&
        board_index[b] == board_index[c] &&
        (board_index[a] != "")
    );
};

// Check rows, columns, and diagonals for 3-in-a-rows
const checkMatch = () => {
    for(i=0; i<9; i+=3) {
        if(checkLine(i, i+1, i+2)) {
            return board_index[i];
        }
    }

    for(i=0; i<3; i++) {
        if(checkLine(i, i+3, i+6)) {
            return board_index[i];
        }
    }

    if(checkLine(0, 4, 8)) {
        return board_index[0];
    }

    if(checkLine(2, 4, 6)) {
        return board_index[2];
    }

    return "";
};

const checkWinner = () => {
    let winner = checkMatch();
    const result = document.querySelector(".winner-text");
    if(winner == player) {
        result.innerHTML = `<h2 class="win">You win!</h2>`;

        complete = true;

    } else if(winner == computer) {
        result.innerHTML = `<h2 class="lose">You lose!</h2>`;
        complete = true;

    } else if(complete){
        result.innerHTML = `<h2 class="draw">It's a draw!</h2>`;
    }
};

gameLoop();