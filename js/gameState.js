(function() {
    let players;
    let plays = 0;

    function importPlayers(arrayOfPlayers) {
        players = arrayOfPlayers;
    }

    function changePlayer() {
        const player = players[plays % 2];
        events.emit('playerChange', player);
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
                events.emit('winnerFound', winner);
                events.emit('gameOver', null);
            }
        }
    }
    
    function checkBoardFilled(gameboardData) {
        if (gameboardData.every(item => item !== '')) {
            events.emit('gameOver', null);
        }
    }

    function processClick() {
        changePlayer();
        plays++;
    }

    function checkBoardStatus(gameboardData) {
        checkForWinner(gameboardData);
        checkBoardFilled(gameboardData);
    }

    function resetPlaysNum() {
        plays = 0;
    }

    events.on('playersSet', importPlayers);
    events.on('gameboardClicked', processClick);
    events.on('boardDataChanged', checkBoardStatus);
    events.on('rematch', resetPlaysNum);
    events.on('newGame', resetPlaysNum);

})();