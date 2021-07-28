const gameboard = (function() {
    const gameContainer = document.querySelector('.game-container');
    const gameboard = gameContainer.querySelector('.gameboard');
    const cells = gameboard.querySelectorAll('.cell');
    const newGameBtn = gameContainer.querySelector('.newGame-btn');
    
    function handleCellClick(evt) {
        let cellIndex = [...cells].indexOf(evt.target);
        events.emit('gameboardClicked', cellIndex);
    }

    function mapDataToBoard(boardData) {
        boardData.forEach((entry, index) => {
            cells[index].textContent = entry;
        });
    }
    
    function clearBoard() {
        events.emit('clearBoard', null);
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
    events.on('gameOver', endGame);

})();