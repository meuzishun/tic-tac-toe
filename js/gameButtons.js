(function() {
    const startGameBtn = gameContainer.querySelector('.startGame-btn');
    const rematchBtn = gameContainer.querySelector('.rematch-btn');
    const newGameBtn = gameContainer.querySelector('.newGame-btn');
    
    function showAndEnableBtn(btn, cb) {
        btn.classList.remove('hide-btn');
        btn.addEventListener('click', cb);
    }

    function hideAndDisableBtn(btn, cb) {
        btn.classList.add('hide-btn');
        btn.removeEventListener('click', cb);
    }

    function enableStart() {
        showAndEnableBtn(startGameBtn, startGame);
    }

    function startGame() {
        events.emit('startGame', null);
        hideAndDisableBtn(startGameBtn, startGame);
    }

    function endGame() {
        showAndEnableBtn(rematchBtn, rematch);
        showAndEnableBtn(newGameBtn, newGame);
    }

    function rematch() {
        events.emit('rematch', null);
        hideAndDisableBtn(rematchBtn, rematch);
        hideAndDisableBtn(newGameBtn, newGame);
    }
    
    function newGame() {
        events.emit('newGame', null);
        hideAndDisableBtn(newGameBtn, newGame);
        hideAndDisableBtn(rematchBtn, rematch);
    }

    events.on('namesEntered', enableStart);
    events.on('gameOver', endGame);

})();