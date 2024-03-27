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
  
  function Gameboard() {

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
      if (board[row][column].getValue() != 0) {
        return false;
      } else {
        board[row][column].addToken(player);
      }
    }
    
    const printBoard = () => {
      const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
      console.log(boardWithCellValues);
    }
    
    return {getBoard, setToken, printBoard};
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
    const board = Gameboard();
    
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
    
    let activePlayer = players[0];
    
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    
    const getActivePlayer = () => activePlayer;
    
    const printNewRound = () => {
      board.printBoard();
      console.log(`It's now ${getActivePlayer().name}'s turn.'`);
    };
    
    const playRound = (row, column) => {
      console.log(`${getActivePlayer().name} chose row: ${row} and column: ${column}`);
      
      if (board.setToken(row, column, getActivePlayer().token) == false) {
        board.printBoard();
        console.log(`That cell is already selected, try again ${getActivePlayer().name}`)
        return
      } else {
        switchPlayerTurn();
        printNewRound();
        //ADD LOGIC TO CHECK FOR WINNER AND WINNER MESSAGE
      }
    };
    
    const checkWinner = () => {
    }

    printNewRound();
    
    return {
      playRound,
      getActivePlayer
    };
  }
  
  const game = GameController();
  
  
  //RESOLVED - ISSUE IS IF PLAYER CHOSES A CELL ALREADY WITH TOKEN STILL SWITCHES PLAYERS INSTEAD OF ASKING THEM TO TRY AGAIN.