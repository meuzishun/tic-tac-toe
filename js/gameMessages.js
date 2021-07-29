const gameMessages = (function() {
    const gameContainer = document.querySelector('.game-container');
    const messageDisplay = gameContainer.querySelector('.message-display');

    function displayResults(winner) {
        if (!winner) {
            messageDisplay.textContent = `It's a draw`;
        } else {
            messageDisplay.textContent = `${winner} wins!`;
        }
    }

    function clearDisplay() {
        messageDisplay.textContent = '';
    }

    events.on('newGame', clearDisplay);
    events.on('winnerFound', displayResults);

})();