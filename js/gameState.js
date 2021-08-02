(function() {
    const messageDisplay = gameContainer.querySelector('.message-display');
    let players;
    let plays = 0;
    let winner = null;

    function importPlayers(arrayOfPlayers) {
        players = arrayOfPlayers;
    }

    function getPlayer() {
        const player = players[plays % 2];
        events.emit('playerSent', player);
    }

    function storeWinner(data) {
        winner = data;
    }

    function checkForWinner(gameboardData) {
        const winningLines = {
            topRow: [gameboardData[0], gameboardData[1], gameboardData[2]],
            middleRow: [gameboardData[3], gameboardData[4], gameboardData[5]],
            bottomRow: [gameboardData[6], gameboardData[7], gameboardData[8]],
            leftColumn: [gameboardData[0], gameboardData[3], gameboardData[6]],
            centerColumn: [gameboardData[1], gameboardData[4], gameboardData[7]],
            rightColumn: [gameboardData[2], gameboardData[5], gameboardData[8]],
            leftRightDiagonal: [gameboardData[0], gameboardData[4], gameboardData[8]],
            rightleftDiagonal: [gameboardData[2], gameboardData[4], gameboardData[6]]
        };

        for (const lineName in winningLines) {
            if (winningLines[lineName].every((item, index, array) => item !== '' && item === array[0])) {
                const winningMarker = winningLines[lineName][0];
                const winner = players.find(player => player.marker === winningMarker);
                events.emit('rowOfThree', lineName);
                storeWinner(winner);
                events.emit('winnerFound', winner);
                events.emit('gameOver', null);
                displayResults();
            }
        }
    }

    function displayResults() {
        if (!winner) {
            messageDisplay.textContent = `It's a draw`;
        } else {
            messageDisplay.textContent = `${winner.name} wins!`;
        }
    }

    function reset() {
        plays = 0;
        messageDisplay.textContent = '';
        winner = null;
    }

    function nextTurn() {
        getPlayer();
        plays++;
    }

    events.on('playersSet', importPlayers);
    events.on('acceptedClick', nextTurn);
    events.on('boardDataChanged', checkForWinner);
    // events.on('gameOver', displayResults);
    events.on('rematch', reset);
    events.on('newGame', reset);

})();