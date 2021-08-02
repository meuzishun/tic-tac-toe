(function() {
    const gameboard = gameContainer.querySelector('.gameboard');
    const cells = gameboard.querySelectorAll('.cell');
    const lines = gameboard.querySelectorAll('.row, .column, .diagonal');
    
    function startGame() {
        gameboard.classList.remove('hide-board');
        gameboard.addEventListener('click', handleBoardClick);
    }

    function handleBoardClick(evt) {
        let cellIndex = [...cells].indexOf(evt.target);
        events.emit('gameboardClicked', cellIndex);
    }

    function mapDataToBoard(boardData) {
        boardData.forEach((entry, index) => {
            cells[index].textContent = entry;
        });
    }

    function gameOver() {
        gameboard.removeEventListener('click', handleBoardClick);
    }
    
    function rematch() {
        hideAllLines();
        gameboard.addEventListener('click', handleBoardClick);
    }

    function newGame() {
        hideAllLines();
        gameboard.removeEventListener('click', handleBoardClick);
        gameboard.classList.add('hide-board');
    }

    function showWinningLine(lineName) {
        lines.forEach(line => {
            if (line.classList.contains(lineName)) {
                line.classList.remove('hide-line');
            }
        });
    }

    function hideAllLines() {
        lines.forEach(line => {
            if (!line.classList.contains('hide-line')) {
                line.classList.add('hide-line');
            }
        });
    }
    
    events.on('startGame', startGame);
    events.on('boardDataChanged', mapDataToBoard);
    events.on('rowOfThree', showWinningLine);
    events.on('gameOver', gameOver);
    events.on('rematch', rematch);
    events.on('newGame', newGame);

})();