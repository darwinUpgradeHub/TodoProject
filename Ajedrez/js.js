 
      const chessboard = document.getElementById("chessboard");
      const statusDisplay = document.getElementById("status");
      const newGameBtn = document.getElementById("newGameBtn");
      const undoBtn = document.getElementById("undoBtn");

      let board = [];
      let selectedPiece = null;
      let currentPlayer = "white";
      let moveHistory = [];

      const initialBoard = [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
      ];

      function initializeBoard() {
        board = JSON.parse(JSON.stringify(initialBoard));
        currentPlayer = "white";
        selectedPiece = null;
        moveHistory = [];
        renderBoard();
        updateStatus();
      }

      function renderBoard() {
        chessboard.innerHTML = "";
        for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.className = `square ${
              (row + col) % 2 === 0 ? "white" : "black"
            }`;
            square.dataset.row = row;
            square.dataset.col = col;
            square.textContent = board[row][col];
            square.addEventListener("click", () => handleSquareClick(row, col));
            chessboard.appendChild(square);
          }
        }
      }

      function handleSquareClick(row, col) {
        const piece = board[row][col];

        if (selectedPiece) {
          if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
            movePiece(selectedPiece.row, selectedPiece.col, row, col);
            selectedPiece = null;
            switchPlayer();
          } else {
            selectedPiece = null;
          }
        } else if (piece && isPieceOwnedByCurrentPlayer(piece)) {
          selectedPiece = { row, col };
        }

        renderBoard();
        updateStatus();
      }

      function isValidMove(fromRow, fromCol, toRow, toCol) {
        const piece = board[fromRow][fromCol];
        const target = board[toRow][toCol];

        // Implementación básica de reglas de movimiento
        if (isPieceOwnedByCurrentPlayer(target)) return false;

        switch (piece.toLowerCase()) {
          case "♟":
          case "♙":
            // Peón
            const direction = currentPlayer === "white" ? -1 : 1;
            if (fromCol === toCol && !target) {
              if (toRow === fromRow + direction) return true;
              if (
                (currentPlayer === "white" && fromRow === 6) ||
                (currentPlayer === "black" && fromRow === 1)
              ) {
                if (toRow === fromRow + 2 * direction) return true;
              }
            }
            if (
              Math.abs(fromCol - toCol) === 1 &&
              toRow === fromRow + direction &&
              target
            )
              return true;
            break;
          case "♜":
          case "♖":
            // Torre
            if (fromRow === toRow || fromCol === toCol) return true;
            break;
          case "♞":
          case "♘":
            // Caballo
            const rowDiff = Math.abs(fromRow - toRow);
            const colDiff = Math.abs(fromCol - toCol);
            if (
              (rowDiff === 2 && colDiff === 1) ||
              (rowDiff === 1 && colDiff === 2)
            )
              return true;
            break;
          case "♝":
          case "♗":
            // Alfil
            if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol))
              return true;
            break;
          case "♛":
          case "♕":
            // Reina
            if (
              fromRow === toRow ||
              fromCol === toCol ||
              Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)
            )
              return true;
            break;
          case "♚":
          case "♔":
            // Rey
            if (
              Math.abs(fromRow - toRow) <= 1 &&
              Math.abs(fromCol - toCol) <= 1
            )
              return true;
            break;
        }

        return false;
      }

      function movePiece(fromRow, fromCol, toRow, toCol) {
        moveHistory.push({
          from: { row: fromRow, col: fromCol },
          to: { row: toRow, col: toCol },
          piece: board[fromRow][fromCol],
          captured: board[toRow][toCol],
        });

        board[toRow][toCol] = board[fromRow][fromCol];
        board[fromRow][fromCol] = "";
      }

      function switchPlayer() {
        currentPlayer = currentPlayer === "white" ? "black" : "white";
      }

      function isPieceOwnedByCurrentPlayer(piece) {
        if (!piece) return false;
        return (
          (currentPlayer === "white" && piece === piece.toUpperCase()) ||
          (currentPlayer === "black" && piece === piece.toLowerCase())
        );
      }

      function updateStatus() {
        statusDisplay.textContent = `Turno del jugador: ${
          currentPlayer === "white" ? "Blancas" : "Negras"
        }`;
      }

      function undoLastMove() {
        if (moveHistory.length === 0) return;

        const lastMove = moveHistory.pop();
        board[lastMove.from.row][lastMove.from.col] = lastMove.piece;
        board[lastMove.to.row][lastMove.to.col] = lastMove.captured;

        switchPlayer();
        renderBoard();
        updateStatus();
      }

      newGameBtn.addEventListener("click", initializeBoard);
      undoBtn.addEventListener("click", undoLastMove);

      initializeBoard();
    