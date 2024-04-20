//CELL
//ADD A PLAYER TOKEN TO A CELL
//RETRIEVE CURRENT CELL VALUE
//RETURN ADD TOKEN, GET VALUE OF CELL

function Cell() {
  let value = 0;
  
  const addToken = (player) => {
    value = player;
  };
  
  const getValue = () => value;
  
  return {
    addToken,
    getValue
  };
}


//GAMEBOARD
//CREATE BOARD DIMENSIONS
//GET BOARD TO RENDER
//PICK LOCATION ON BOARD, CHECK THAT COLUMN AND ROW OF A CELL IS BLANK, AND ASSIGN PLAYER TOKEN
//PRINT UPDATED BOARD IN CONSOLE FOR TESTING
//RETURN GET BOARD, ASSIGN TOKEN, PRINT BOARD

function GameBoard() {

  const rows = 3;
  const columns = 3;
  const board = [];
  
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  
  const getBoard = () => board;
   
  const setToken = (row, column, player) => {
    if (board[row][column] == undefined) {
      console.log(`Error: Invalid cell`)
      return false;
    } else if (board[row][column].getValue() != 0) {
      console.log(`Error: Cell was previously selected`)
      return false;
    } else {
      board[row][column].addToken(player);
    }
  }
  
  const checkWin = () => {
    let rowWin, colWin, diagWin, diagWinR;
    win = false;
    
    // Check rows and columns
    for (i = 0; i < rows; i++) {
      rowWin = true;
      colWin = true;
      diagWin = true;
      diagWinR = true;
      for (j = 1; j < columns; j++) {
        //Check row
        // console.log(`row values: ${board[i][j].getValue()} and ${board[i][j-1].getValue()}`)
        if (board[i][j].getValue() != board[i][j-1].getValue() || board[i][j-1].getValue() == 0) {
          rowWin = false;
        }       
        //Check column
        if (board[j][i].getValue() != board[j-1][i].getValue() || board[j][i].getValue() == 0) {
          colWin = false;
        }
        // Check primary diagonal
        if (board[j][j].getValue() != board[j-1][j-1].getValue() || board[j][j].getValue() == 0) {
          diagWin = false;
        }
        // Check secondary diagonal ###NOT WORKING## 
        if (board[0][columns - 1].getValue() != board[j][columns - 1 - j].getValue() || board[j][columns - 1 - j].getValue() == 0) {
          diagWinR = false;
        }
      }
      // console.log(`R: ${rowWin} C: ${colWin} D: ${diagWin} DR: ${diagWinR}`)
      if (rowWin == true || colWin == true || diagWin == true || diagWinR == true) {
        win = true;
        break
      }
    }
    
    // Return if winning condition
    // console.log(`Winner: ${win}`)
    return win;
  }
  
  const checkDraw = (round) => {
    maxRounds = rows*columns
    draw = true
    if (round < maxRounds) {
      draw = false
    }
    return draw
  }
  
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
    return boardWithCellValues
  }
  
  return {getBoard,
          setToken,
          printBoard,
          checkWin,
          checkDraw};
 }

//GAME CONTROLLER
//PLAYER NAMES
//RETRIVE BOARD
//SET ACTIVE PLAYER
//FUNCTION TO SWITCH PLAYERS AFTER ROUND
//FUNCTION NEW ROUND TO PRINT BOARD AND PLAYERS TURN TO START NEW ROUND
//FUNCTION PLAY ROUND THAT ALLOWS USER TO SELECT COLUMN AND ROW
//PRINT IN CONSOLE PLAYER MOVE
//RUN SWITCH PLAYER TURN AND NEW ROUND
//RETURN PLAYROUND AND GETACTIVEPLAYER

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
  const board = GameBoard();
  const dom = domActions();
  
  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    }
  ];
  
  //Resets the board
  let activePlayer = players[0];
  let round = 0;
  
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  
  const getActivePlayer = () => activePlayer;
  
  const printNewRound = () => {
    dom.renderBoard(board)
    board.printBoard();
    console.log(`It's now ${getActivePlayer().name}'s turn.'`);
  };
  
  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} chose row: ${row} and column: ${column}`);
    
    if (board.setToken(row, column, getActivePlayer().token) == false) {
      console.log(`Try again ${getActivePlayer().name}`)
      dom.renderBoard(board)
      board.printBoard();      
      return
    } else if (board.checkWin() == true) {
      console.log(`${getActivePlayer().name} is the winner!`)
      dom.renderBoard(board)
      board.printBoard();
      return
    } else {
      round = round + 1;
      if (board.checkDraw(round) == true) {
        console.log(`Game is a draw!`)
        dom.renderBoard(board)
        board.printBoard();
        return
      }
      switchPlayerTurn();
      printNewRound();
      //ADD LOGIC TO CHECK FOR WINNER AND WINNER MESSAGE
    }
  }
  
  printNewRound();
  
  return {
    playRound,
    getActivePlayer
  };
}

// DOM LOGIC
function domActions() {
  // const game = GameController();
  
  const renderBoard = (board) => {
    const ul = document.createElement('ul');
    let i = -1;

    board.printBoard().forEach(row => {
      i += 1;
      let j = -1;
      row.forEach(cell => {
        j += 1;
        const li = document.createElement('li');
        li.textContent = `Value: ${cell} Cell: ${i}${j}` ;
        li.classList.add('cell')
        ul.appendChild(li);
      })
    })
    const listContainer = document.getElementById('listContainer');
    //remove if list already exist
    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    listContainer.appendChild(ul)
  }
  
  const selectCell= (player) => {
    
  }

  return {
    renderBoard
  };
}

const game = GameController('David','Sally');

// const dom = createDom();
// dom.renderBoard()

// UNIT TEST

function simDiag() {
  const game = GameController();
  game.playRound(0,0);
  game.playRound(1,0);
  game.playRound(0,0);
  game.playRound(1,1);
  game.playRound(2,0);
  game.playRound(0,2);
  game.playRound(2,1);
  game.playRound(2,2);
}

function simDiagR() {
  const game = GameController();
  game.playRound(0,2);
  game.playRound(1,0);
  game.playRound(1,1);
  game.playRound(1,2);
  game.playRound(0,0);
  game.playRound(2,2);
  game.playRound(2,0);
}

function simRow() {
  const game = GameController();
  game.playRound(0,0);
  game.playRound(1,0);
  game.playRound(0,1);
  game.playRound(1,1);
  game.playRound(2,0);
  game.playRound(1,2);
}

function simCol() {
  const game = GameController();
  game.playRound(0,0);
  game.playRound(0,1);
  game.playRound(1,0);
  game.playRound(1,1);
  game.playRound(0,2);
  game.playRound(2,1);
}

function simDraw() {
  const game = GameController();
  game.playRound(0,0); //P1
  game.playRound(1,0); //P2
  game.playRound(2,0); //P1
  game.playRound(1,1); //P2
  game.playRound(0,1); //P1
  game.playRound(2,1); //P2
  game.playRound(1,2); //P1
  game.playRound(0,2); //P2
  game.playRound(2,2); //P1
}

function simGame() {
  simCol()
  simDraw()
  simRow()
  simDiag()
  simDiagR()
}

//const game = GameController();

//COMPLETE - ADD WINNING CONDITION CHECK, NEED TO TEST PLAYER 2. Vertical didn't work. REWROTE WINNING CONDITION ALGORITHM. WINNER IF FAKE DIAGONAL. 
//COMPLETE - ISSUE IS IF PLAYER CHOSES A CELL ALREADY WITH TOKEN STILL SWITCHES PLAYERS INSTEAD OF ASKING THEM TO TRY AGAIN.
//NEED FUNCTION TO RESET BOARD