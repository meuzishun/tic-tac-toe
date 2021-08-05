(function() {
    const messageDisplay = document.querySelector('.message');

    function formatMessage(winnerName) {
        return winnerName ? `${winnerName} wins!` : `It's a draw`;
    }

    function displayMessage(message) {
        messageDisplay.textContent = message;
    }

    function displayWinner(winnerName) {
        displayMessage(formatMessage(winnerName));
    }

    function clearMessage() {
        messageDisplay.textContent = '';
    }

    events.on('winnerDeclared', displayWinner);
    events.on('rematch', clearMessage);
    events.on('newGame', clearMessage);
})();