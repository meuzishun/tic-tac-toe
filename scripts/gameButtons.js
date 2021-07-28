const gameButtons = (function() {
    const gameContainer = document.querySelector('.game-container');
    const newGameBtn = gameContainer.querySelector('.newGame-btn');

    function showAndEnableNewGameBtn() {
        newGameBtn.classList.add('hide');
        newGameBtn.removeEventListener('click', showAndEnableNewGameBtn);
        events.emit('startNewGame', null);
    }

    function hideAndDisableNewGameBtn() {
        newGameBtn.classList.remove('hide');
        newGameBtn.addEventListener('click', showAndEnableNewGameBtn);
    }

    events.on('gameOver', hideAndDisableNewGameBtn);

})();