const gameButtons = (function() {
    const gameContainer = document.querySelector('.game-container');
    const newGameBtn = gameContainer.querySelector('.newGame-btn');
    const startGameBtn = gameContainer.querySelector('.startGame-btn');

    function showAndEnableNewGameBtn() {
        newGameBtn.classList.add('hide');
        newGameBtn.removeEventListener('click', showAndEnableNewGameBtn);
        events.emit('newGame', null);
    }

    function showAndEnableStartGameBtn() {
        startGameBtn.classList.remove('hide-btn');
        startGameBtn.addEventListener('click', startGame);
    }

    function hideAndDisableNewGameBtn() {
        newGameBtn.classList.remove('hide');
        newGameBtn.addEventListener('click', showAndEnableNewGameBtn);
    }

    function startGame() {
        events.emit('startGame', null);
        startGameBtn.removeEventListener('click', startGame);
        startGameBtn.classList.add('hide');
    }
    events.on('namesEntered', showAndEnableStartGameBtn);
    events.on('gameOver', hideAndDisableNewGameBtn);

})();