gameboard = (function() {
    const gameboard = gameContainer.querySelector('.gameboard');
    const cells = gameboard.querySelectorAll('.cell');
    const lines = gameboard.querySelectorAll('.row, .column, .diagonal');
    
    function startGame() {
        gameboard.classList.remove('hide-board');
        gameboard.addEventListener('click', handleBoardClick);
    }

    function handleBoardClick(evt) {
        let index = [...cells].indexOf(evt.target);
        //? Could we do a check for a marker here instead?
        events.emit('gameboardClicked', index);
    }

    function mapDataToBoard(gameboardData) {
        gameboardData.forEach((entry, index) => {
            cells[index].textContent = entry;
        });
    }    

    function showWinningLine(lineName) {
        lines.forEach(line => {
            if (line.classList.contains(lineName)) {
                line.classList.remove('hide-line');
                gameboard.removeEventListener('click', handleBoardClick);
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

    function endGame() {
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
    
    events.on('startGame', startGame);
    events.on('gameboardDataChanged', mapDataToBoard);
    events.on('rowOfThree', showWinningLine);
    events.on('gameOver', endGame);
    events.on('rematch', rematch);
    events.on('newGame', newGame);

    return {
        startGame,
        mapDataToBoard,
        showWinningLine,
        hideAllLines
    }

})();