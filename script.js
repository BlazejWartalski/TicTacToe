btns = document.querySelectorAll(".space");
restart = document.querySelector("#restart");



restart.addEventListener("click",restartGame)


var currentPlayer = "X"

var playerOneScore = [];
var playerTwoScore = [];
var emptySquares = [];
const winCondition = [
["0", "1", "2"],
["3","4","5"],
["6","7","8"],
["0","3","6"],
["1","4","7"],
["2","5","8"],
["0","4","8"],
["2","4","6"]]

btns.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("checked")) {
        } else {
            button.classList.add('checked');
            button.textContent = currentPlayer
            if (currentPlayer == "X") {
                playerOneScore.push(button.id)
                if (findWinner(playerOneScore)) {
                    console.log("X is the winner")
                    return
                } else {
                currentPlayer = "O"
                computerMove();
                }
            } else if (currentPlayer == "O") {
                computerMove();
                // playerTwoScore.push(button.id)
                // if (findWinner(playerTwoScore)) {
                //     console.log("O is the winner")
                // } else {
                // computerMove();
                // return currentPlayer = "X"
                // }
            }
        }
    });
})

function findWinner(playerScore) {
    for (i = 0; i < winCondition.length; i++) {
        a = winCondition[i]
        if(a.every(field => playerScore.includes(field))) {
            return alert(`${currentPlayer} is the winner`)
        }
    }
    if (playerOneScore.length+playerTwoScore.length == 9) {
        return console.log("It's a draw");
    };
}

function restartGame() {
    alert("Game restarted");
    currentPlayer = "X";
    playerOneScore = [];
    playerTwoScore = [];
    btns.forEach((button) => {
        button.classList.remove('checked');
        button.textContent = "";
    })
}
///COMPUTER MOVES
function computerMove() {
    let emptySquares = [];
    emptySquares = document.querySelectorAll(".field:not(.checked)")
    emptySquaresArray2 = Array.from(emptySquares);
    if (typeof emptySquaresArray2.find(element => element.id === "4") !== "undefined") {
        var desiredSquare = emptySquaresArray2.find(element => element.id === "4");
        if (!desiredSquare.classList.contains("checked")) {
            nextComputerMove = (desiredSquare);
            console.log("Occupy the middle")
        }}
    else {
        validMove = (Math.floor(Math.random() * emptySquares.length))
        winningMove = lookForWinningMove(playerTwoScore, emptySquares);
        console.log("Looking at human moves now!")
        humanWinningMove = lookForWinningMove(playerOneScore,emptySquares);
        if (typeof winningMove !== "undefined") {
            console.log(winningMove);
            winningMove = winningMove.toString();
            var winningNumber = emptySquaresArray2.find(element => element.id === winningMove);
            console.log("take the win");
            nextComputerMove = (winningNumber);
        } else if (typeof humanWinningMove !== "undefined") { 
            humanWinningMove = humanWinningMove.toString();
            var winningNumber = emptySquaresArray2.find(element => element.id === humanWinningMove);
            console.log("Stop human from winning");
            nextComputerMove = (winningNumber);
        }   else {    
            console.log("Random move")
            nextComputerMove = (emptySquares[validMove]);
        }
    }
    nextComputerMove.textContent = currentPlayer;
    nextComputerMove.classList.add('checked');
    playerTwoScore.push(nextComputerMove.id)
    findWinner(playerTwoScore);
    console.log("computer phase over");
    return currentPlayer = "X"
}

function lookForWinningMove(Score, emptySquares) {
    emptySquaresId = arrayOfEmptySquares(emptySquares);
    for (i = 0; i < winCondition.length; i++) {
        a = winCondition[i]
        let intersectionArray = a.filter(value => Score.includes(value));

        if (intersectionArray.length == 2) {
            console.log(intersectionArray);
            var squareNeededToWin = a.filter(square => !intersectionArray.includes(square));
            console.log(squareNeededToWin);
            if (squareNeededToWin.some(square => emptySquaresId.includes(square))) {
                const winningSquare = emptySquaresId.filter(square => squareNeededToWin.includes(square))
                console.log(winningSquare);
                return winningSquare;
            }
        }
    }
}
function arrayOfEmptySquares(emptySquares) {
    let emptySquaresArray = Array.from(emptySquares);

    let emptySquaresArrayId = [];
    for (i = 0; i < emptySquaresArray.length; i++) {
        a = emptySquaresArray[i]
        let id = a.id//.push(item)
        emptySquaresArrayId.push(id);
    };
    return(emptySquaresArrayId);
}

// Computer logic 
// If middle square is empty, take it. DONE
// Else, check if a game winning move is possible. DONE
// Else, check if you can block human from winning. 
// Else, make a random move. DONE