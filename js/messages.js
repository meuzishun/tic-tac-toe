(function() {
    const messageDisplay = document.querySelector('.message');

    function formatMessage(winner) {
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
            
        return winnerName ? `${winnerName} wins!` : `It's a draw`;
    }

    function displayMessage(message) {
        messageDisplay.textContent = message;
    }

    // function declareWinner(winnerName) {
    //     displayMessage(formatMessage(winnerName));
    // }

    function declareWinner(winner) {
        displayMessage(formatMessage(winner));
    }

    function clearMessage() {
        messageDisplay.textContent = '';
    }

    events.on('winnerDeclared', declareWinner);
    events.on('rematch', clearMessage);
    events.on('newGame', clearMessage);
})();