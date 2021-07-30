const gameButtons = (function() {
    // const gameContainer = document.querySelector('.game-container');
    const startGameBtn = gameContainer.querySelector('.startGame-btn');
    const rematchBtn = gameContainer.querySelector('.rematch-btn');
    const newGameBtn = gameContainer.querySelector('.newGame-btn');

    function showAndEnableStartGameBtn() {
        startGameBtn.classList.remove('hide-btn');
        startGameBtn.addEventListener('click', startGame);
    }

    function hideAndDisableStartGameBtn() {
        startGameBtn.classList.add('hide-btn');
        startGameBtn.removeEventListener('click', startGame);
    }

    function showAndEnableNewGameBtn() {
        newGameBtn.classList.remove('hide-btn');
        newGameBtn.addEventListener('click', newGame);
    }

    function hideAndDisableNewGameBtn() {
        newGameBtn.classList.add('hide-btn');
        newGameBtn.removeEventListener('click', newGame);
    }

    function showAndEnableRematchBtn() {
        rematchBtn.classList.remove('hide-btn');
        rematchBtn.addEventListener('click', rematch);
    }

    function hideAndDisableRematchBtn() {
        rematchBtn.classList.add('hide-btn');
        rematchBtn.removeEventListener('click', rematch);
    }

    function showAndEnableBtn(btn, cb) {
        btn.classList.remove('hide-btn');
        btn.addEventListener('click', cb);
    }

    function hideAndDisableBtn(btn, cb) {
        btn.classList.add('hide-btn');
        btn.removeEventListener('click', cb);
    }

    function startGame() {
        events.emit('startGame', null);
        // startGameBtn.removeEventListener('click', startGame);
        // startGameBtn.classList.add('hide-btn');
        hideAndDisableBtn(startGameBtn, startGame);
    }

    function rematch() {
        events.emit('rematch', null);
        // hideAndDisableRematchBtn();
        hideAndDisableBtn(rematchBtn, rematch);
        hideAndDisableBtn(newGameBtn, newGame);
    }
    
    function newGame() {
        events.emit('newGame', null);
        // hideAndDisableNewGameBtn();
        hideAndDisableBtn(newGameBtn, newGame);
        hideAndDisableBtn(rematchBtn, rematch);
    }

    events.on('namesEntered', showAndEnableStartGameBtn);
    events.on('gameOver', showAndEnableRematchBtn);
    events.on('gameOver', showAndEnableNewGameBtn);

})();