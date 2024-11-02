const cells = document.querySelectorAll(".cell")
const player1 = document.querySelector(".player1")
const player2 = document.querySelector(".player2")
const restartBtn = document.querySelector(".restart-btn")
const winnerText = document.querySelector(".winner-text")
const gameBoard = document.querySelector(".game-board")

let currentPlayer = 'X'
let nextPlayer = 'O';
let playerTurn = currentPlayer


player1.textContent = `Player 1 : ${currentPlayer}`
player2.textContent = `Player 2 : ${nextPlayer}`
const startGame = () => {
    cells.forEach(cell =>{
        cell.addEventListener('click', handleClick);
        cell.addEventListener('mouseover', showHoverTurn);
        cell.addEventListener('mouseout', removeHoverTurn);
    });
}

const changeTurn = () => {
    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
}


const handleClick = (e) => {
    if(e.target.textContent === ''){
        e.target.textContent = playerTurn;
        e.target.classList.remove(`hover-${playerTurn}`);
        if(checkWin()){
            showWinner(playerTurn);
            disableClick()
        }
        else if(checkTie()){
            showWinner(null);
            disableClick()
        }
        else{

            changeTurn();
        }

    }
}

const showHoverTurn = (e) => {
    if (e.target.textContent === '') {
        e.target.classList.add(`hover-${playerTurn}`);
    }
};

const removeHoverTurn = (e) => {
    e.target.classList.remove(`hover-${playerTurn}`);
};

function showWinner(val) {
    if(val !== null) {
        winnerText.innerText = `Player ${val} is the winner 🥳`;
    }else{
        winnerText.innerText = `It's a draw 😮`;
    }
}

const disableClick = ()=> {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick)
        cell.classList.add("disable");
        cell.removeEventListener('mouseover', showHoverTurn);
        cell.removeEventListener('mouseout', removeHoverTurn);
    })
}

const checkWin = () => {
    const winPatters = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winPatters.length; i++) {
        const [index1, index2 , index3] = winPatters[i];
        if(cells[index1].textContent !== '' && 
            cells[index1].textContent === cells[index2].textContent && 
            cells[index2].textContent === cells[index3].textContent){
            return true;
        }
        
    }
    return false;
}

const checkTie = () => {
    emptyCellCount = 0;
    cells.forEach(cell => {
        if(cell.textContent === '')
            emptyCellCount++;
    });
    return emptyCellCount === 0 && !checkWin();
}

const restartGame = () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disable', 'hover-X', 'hover-O');

    })
    winnerText.innerHTML = '';
    playerTurn = currentPlayer;
    startGame();
}

restartBtn.addEventListener('click', restartGame);
startGame()
