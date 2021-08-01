(function() {
    const gameboard = gameContainer.querySelector('.gameboard');
    const cells = gameboard.querySelectorAll('.cell');
    
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
        gameboard.addEventListener('click', handleBoardClick);
    }

    function newGame() {
        gameboard.removeEventListener('click', handleBoardClick);
        gameboard.classList.add('hide-board');
    }
    
    events.on('startGame', startGame);
    events.on('boardDataChanged', mapDataToBoard);
    events.on('gameOver', gameOver);
    events.on('rematch', rematch);
    events.on('newGame', newGame);

})();