gameControl = (function() {
    const btnContainer = document.querySelector('.button-container');
    const startGameBtn = btnContainer.querySelector('.startGame-btn');
    const rematchBtn = btnContainer.querySelector('.rematch-btn');
    const newGameBtn = btnContainer.querySelector('.newGame-btn');
    
    function showAndEnableBtn(btn, cb) {
        btn.classList.remove('hide');
        btn.addEventListener('click', cb);
    }

    function hideAndDisableBtn(btn, cb) {
        btn.classList.add('hide');
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