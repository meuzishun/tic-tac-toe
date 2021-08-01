const gameboard = (function() {
    // const gameContainer = document.querySelector('.game-container');
    const gameboard = gameContainer.querySelector('.gameboard');
    const cells = gameboard.querySelectorAll('.cell');

    function showGameboard() {
        gameboard.classList.remove('hide-board');
        enableBoardClicks();
    }
    
    function hideGameboard() {
        gameboard.classList.add('hide-board');
        disableBoardClicks();
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
    
    function disableBoardClicks() {
        gameboard.removeEventListener('click', handleBoardClick);
    }
    
    function enableBoardClicks() {
        gameboard.addEventListener('click', handleBoardClick);
    }
    
    events.on('startGame', showGameboard);
    events.on('boardDataChanged', mapDataToBoard);
    events.on('gameOver', disableBoardClicks);
    events.on('rematch', enableBoardClicks);
    events.on('newGame', hideGameboard);

})();