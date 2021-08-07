(function() {
    const messageDisplay = document.querySelector('.message');

    function formatMessage(winnerName) {
        return winnerName ? `${winnerName} wins!` : `It's a draw`;
    }

    function displayMessage(message) {
        messageDisplay.textContent = message;
    }

    function declareWinner(winnerName) {
        displayMessage(formatMessage(winnerName));
    }

    function clearMessage() {
        messageDisplay.textContent = '';
    }

    events.on('winnerDeclared', declareWinner);
    events.on('rematch', clearMessage);
    events.on('newGame', clearMessage);
})();