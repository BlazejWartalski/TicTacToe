btns = document.querySelectorAll(".space");
scoreBoardLeft = document.querySelector("#p1scoreboard");
scoreBoardLeftName = document.querySelector("#scoreBoardLeftName");
scoreBoardRight = document.querySelector("#p2scoreboard");
scoreBoardRightName = document.querySelector("#scoreBoardRightName");

restart = document.querySelector("#restart");
restart.addEventListener("click",restartGame);

btnStartGame = document.querySelector("#startGame");
btnStartGame.addEventListener("click",startGame);

gameConfigurationScreen = document.querySelector(".initialScreen");
gameScreen = document.querySelector(".gameScreen");

var playerOneTotalWins = 0;
var playerTwoTotalWins = 0;

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

function initialiseTheGame(packagedValues) {
    currentPlayer = packagedValues.firstPlayer;
    computerPlayer = packagedValues.AI;
    playerOneName = packagedValues.nameP1;
    playerTwoName = packagedValues.nameP2;
    btns.forEach((button) => {
        if (currentPlayer == "O" && computerPlayer == true) {
            computerMove();
            return currentPlayer = "X"
        }
        // if (currentPlayer == "O" && computerPlayer == true) {
        //     computerMove();
        //     if (findWinner(playerTwoScore)) {
        //     } else {
        //     return currentPlayer = "X" }
        button.addEventListener("click", () => {
            if (button.classList.contains("checked")) {
                alert("this space is already taken")
            } else {
                if (currentPlayer == "X" && computerPlayer == true) {
                    button.classList.add('checked');
                    button.textContent = currentPlayer
                    playerOneScore.push(button.id)
                    if (findWinner(playerOneScore)) {
                    } else {
                        currentPlayer = "O";
                        return computerMove();
                    }
                } else if (currentPlayer == "X" && computerPlayer == false) {
                    button.classList.add('checked');
                    button.textContent = currentPlayer
                    playerOneScore.push(button.id)
                    if (findWinner(playerOneScore)) {
                    } else {
                        return currentPlayer = "O";
                    }
                } else if (currentPlayer == "O" && computerPlayer == true) {
                        computerMove();
                        if (findWinner(playerTwoScore)) {
                        } else {
                        return currentPlayer = "X" }
                } else if (currentPlayer == "O" && computerPlayer == false) {
                    button.classList.add('checked');
                    button.textContent = currentPlayer
                    playerTwoScore.push(button.id)
                    if (findWinner(playerTwoScore)) {
                    } else {
                    return currentPlayer = "X"
                    }
                }
            }
        });
    })
}

function findWinner(playerScore) {
    for (i = 0; i < winCondition.length; i++) {
        a = winCondition[i]
        if(a.every(field => playerScore.includes(field))) {
            if (currentPlayer == "X") {
                var winner = playerOneName;
                scoreBoardLeft.textContent = (Number(scoreBoardLeft.textContent)+1)
            } else if (currentPlayer == "O") {
                var winner = playerTwoName;
                scoreBoardRight.textContent = (Number(scoreBoardRight.textContent)+1)
            }
            alert(`${winner} wins the round`)
            restartGame();
        }
    }
    if (playerOneScore.length+playerTwoScore.length == 9) {
        alert("It's a draw");
        restartGame();
    };
}
function startGame() {
    var playerOneName = document.querySelector("#playerOneName").value;
    var playerTwoName = document.querySelector("#playerTwoName").value;
    var playerTwoAI = document.querySelector("#playerAI");
    var firstMove = document.querySelector('input[name="group1"]:checked').value;
    let AI = playerTwoAI.checked,
        firstPlayer = firstMove,
        nameP1 = playerOneName,
        nameP2 = playerTwoName;
    packagedValues = {AI, firstPlayer, nameP1, nameP2};
    gameConfigurationScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    scoreBoardLeftName.textContent = playerOneName + " " + scoreBoardLeftName.textContent;
    scoreBoardRightName.textContent = playerTwoName + " " + scoreBoardRightName.textContent;
    initialiseTheGame(packagedValues);
    return packagedValues;
}
function restartGame() {
    alert("Game restarted");
    currentPlayer = packagedValues.firstPlayer;
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
        }}
    else {
        validMove = (Math.floor(Math.random() * emptySquares.length))
        winningMove = lookForWinningMove(playerTwoScore, emptySquares);
        humanWinningMove = lookForWinningMove(playerOneScore,emptySquares);
        if (typeof winningMove !== "undefined") {
            winningMove = winningMove.toString();
            var winningNumber = emptySquaresArray2.find(element => element.id === winningMove);
            nextComputerMove = (winningNumber);
        } else if (typeof humanWinningMove !== "undefined") { 
            humanWinningMove = humanWinningMove.toString();
            var winningNumber = emptySquaresArray2.find(element => element.id === humanWinningMove);
            nextComputerMove = (winningNumber);
        }   else {    
            nextComputerMove = (emptySquares[validMove]);
        }
    }
    nextComputerMove.textContent = currentPlayer;
    nextComputerMove.classList.add('checked');
    playerTwoScore.push(nextComputerMove.id)
    findWinner(playerTwoScore);
    return currentPlayer = 'X';
}

function lookForWinningMove(Score, emptySquares) {
    emptySquaresId = arrayOfEmptySquares(emptySquares);
    for (i = 0; i < winCondition.length; i++) {
        a = winCondition[i]
        let intersectionArray = a.filter(value => Score.includes(value));

        if (intersectionArray.length == 2) {
            var squareNeededToWin = a.filter(square => !intersectionArray.includes(square));
            if (squareNeededToWin.some(square => emptySquaresId.includes(square))) {
                const winningSquare = emptySquaresId.filter(square => squareNeededToWin.includes(square))
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
        let id = a.id
        emptySquaresArrayId.push(id);
    };
    return(emptySquaresArrayId);
}

// Computer logic 
// If middle square is empty, take it. DONE
// Else, check if a game winning move is possible. DONE
// Else, check if you can block human from winning. DONE
// Else, make a random move. DONE