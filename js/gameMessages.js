(function() {
    const messageDisplay = gameContainer.querySelector('.message-display');

    let winner = null;

    function storeWinner(data) {
        winner = data;
    }

    function displayResults() {
        if (!winner) {
            messageDisplay.textContent = `It's a draw`;
        } else {
            messageDisplay.textContent = `${winner.name} wins!`;
        }
    }

    function clearDisplay() {
        messageDisplay.textContent = '';
        winner = null;
    }

    events.on('winnerFound', storeWinner);
    events.on('gameOver', displayResults);
    events.on('rematch', clearDisplay);
    events.on('newGame', clearDisplay);

})();