const gameboard = (function() {
    const gameContainer = document.querySelector('.game-container');
    const gameboard = gameContainer.querySelector('.gameboard');
    const cells = gameboard.querySelectorAll('.cell');
    
    function handleCellClick(evt) {
        let cellIndex = [...cells].indexOf(evt.target);
        events.emit('gameboardClicked', cellIndex);
    }

    function mapDataToBoard(boardData) {
        boardData.forEach((entry, index) => {
            cells[index].textContent = entry;
        });
    }
    
    function disableBoardClicks() {
        gameboard.removeEventListener('click', handleCellClick);
    }
    
    function enableBoardClicks() {
        gameboard.addEventListener('click', handleCellClick);
    }
    
    events.on('boardDataChanged', mapDataToBoard);
    events.on('gameOver', disableBoardClicks);
    events.on('startNewGame', enableBoardClicks);

    gameboard.addEventListener('click', handleCellClick);

})();