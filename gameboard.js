const gameboard = (function() {
    const gameContainer = document.querySelector('.game-container')
    const gameboard = gameContainer.querySelector('.gameboard');
    const cells = gameboard.querySelectorAll('.cell');
    const lines = gameboard.querySelectorAll('.row, .column, .diagonal');
    const newGameBtn = gameContainer.querySelector('.newGame-btn');
    const messageDisplay = gameContainer.querySelector('.message-display');
    
    function handleCellClick(evt) {
        let cellIndex = [...cells].indexOf(evt.target);
        events.emit('gameboardClicked', cellIndex);
    }

    function mapDataToBoard(boardData) {
        boardData.forEach((entry, index) => {
            cells[index].textContent = entry;
        });
    }

    function showWinningLine(lineName) {
        lines.forEach(line => {
            if (line.classList.contains(lineName)) {
                line.classList.remove('hide');
            }
        });
    }

    function hideAllLines() {
        lines.forEach(line => {
            if (!line.classList.contains('hide')) {
                line.classList.add('hide');
            }
        });
    }

    function declareWinner(winner) {
        if (!winner) {
            messageDisplay.textContent = `It's a draw`;
        } else {
            messageDisplay.textContent = `${winner} wins!`;
        }
    }
    
    function clearBoard() {
        events.emit('clearBoard', null);
        hideAllLines();
        messageDisplay.textContent = '';
    }

    function endGame() {
        gameboard.removeEventListener('click', handleCellClick);
        newGameBtn.classList.remove('hide');
    }

    function newGame() {
        clearBoard();
        gameboard.addEventListener('click', handleCellClick);
        newGameBtn.classList.add('hide');
    }
    
    gameboard.addEventListener('click', handleCellClick);
    newGameBtn.addEventListener('click', newGame);

    events.on('boardDataChanged', mapDataToBoard);
    events.on('rowOfThree', showWinningLine)
    events.on('winnerFound', declareWinner);
    events.on('gameOver', endGame);

})();