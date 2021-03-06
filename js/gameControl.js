gameControl = (function() {
    const btnContainer = document.querySelector('.button-container');
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

    events.on('playersReady', enableStart);
    events.on('gameOver', endGame);

})();