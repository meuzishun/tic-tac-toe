gameboard = (function() {
    const gameContainer = document.querySelector('.game-container');
    const gameboard = gameContainer.querySelector('.gameboard');
    const cells = gameboard.querySelectorAll('.cell');
    const overlay = gameContainer.querySelector('.overlay');
    const lines = overlay.querySelectorAll('.row, .column, .diagonal');
    
    function startGame() {
        gameContainer.classList.remove('hide');
        // gameboard.addEventListener('click', handleBoardClick);
    }

    function checkPlayer(currentPlayer) {
        if (currentPlayer.getType() === 'person') {
            console.log('we have a person here!'); //! Getting error here
        }
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
                line.classList.add('show');
                gameboard.removeEventListener('click', handleBoardClick);
            }
        });
    }

    function hideAllLines() {
        lines.forEach(line => {
            if (line.classList.contains('show')) {
                line.classList.remove('show');
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
        gameContainer.classList.add('hide');
    }
    
    events.on('startGame', startGame);
    events.on('currentPlayerChanged', checkPlayer)
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