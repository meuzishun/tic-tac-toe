const gameboard = (function() {
    const gameContainer = document.querySelector('.game-container')
    const gameboard = gameContainer.querySelector('.gameboard');
    const cells = gameboard.querySelectorAll('.cell');
    const lines = gameboard.querySelectorAll('.row, .column, .diagonal');
    const newGameBtn = gameContainer.querySelector('.newGame-btn');
    const messageDisplay = gameContainer.querySelector('.message-display');
    
    function _render(boardData) {
        boardData.forEach((entry, index) => {
            cells[index].textContent = entry;
        });
    }
    
    events.on('boardDataChanged', _render);
    events.on('winnerFound', endGame);
    
    function handleCellClick(evt) {
        let elem = evt.target;
        let index = [...cells].indexOf(elem);
        events.emit('gameboardClicked', index);
    }

    function declareWinner(winner) {
        messageDisplay.textContent = `${winner} wins!`;
    }
    
    function clearBoard() {
        XsOs.fill('');
        plays = 0;
        _render();
        lines.forEach(line => {
            if (!line.classList.contains('hide')) {
                line.classList.add('hide');
            }
        });
        gameboard.addEventListener('click', handleCellClick);
    }

    function newGame() {
        clearBoard();
    }

    function endGame(obj) {
        showWinningLine(obj.combo);
        declareWinner(obj.marker);
    }

    function buttonStateChange(evt) {
        evt.target.classList.toggle('pressed');
    }
    
    gameboard.addEventListener('click', handleCellClick);
    newGameBtn.addEventListener('click', newGame);
    newGameBtn.addEventListener('mousedown', buttonStateChange);
    newGameBtn.addEventListener('mouseup', buttonStateChange);

    function showWinningLine(combo) {
        lines.forEach(line => {
            if (line.classList.contains(combo)) {
                line.classList.remove('hide');
            }
        });
    }

    events.on('gameOver', () => {
        console.log('game over');
        gameboard.removeEventListener('click', handleCellClick);
    });
    
    return {
        handleCellClick,
        clearBoard
    };

})();