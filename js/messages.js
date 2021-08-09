(function() {
    const messageDisplay = document.querySelector('.message');

    function formatMessage(winnerName) { 
        return winnerName ? `${winnerName} wins!` : `It's a draw`;
    }

    function displayMessage(message) {
        messageDisplay.textContent = message;
    }

    function declareWinner(winner) {
        let winnerName;
        let playerType;
        if (winner) {
            playerType = winner.getType();
        }
        if (playerType === 'person') {
            winnerName = winner.getName();
        }
        if (playerType === 'computer') {
            winnerName = winner.getMarker();
        }
        displayMessage(formatMessage(winnerName));
    }

    function clearMessage() {
        messageDisplay.textContent = '';
    }

    events.on('winnerDeclared', declareWinner);
    events.on('rematch', clearMessage);
    events.on('newGame', clearMessage);
})();