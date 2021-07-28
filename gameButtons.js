const gameButtons = (function() {
    const gameContainer = document.querySelector('.game-container');
    const newGameBtn = gameContainer.querySelector('.newGame-btn');

    function newGame() {
        newGameBtn.classList.add('hide');
        newGameBtn.removeEventListener('click', newGame);
        events.emit('startNewGame', null);
    }

    function endGame() {
        newGameBtn.classList.remove('hide');
        newGameBtn.addEventListener('click', newGame);
    }

    events.on('gameOver', endGame);

})();