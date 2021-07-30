const gameState = (function() {
    const boardData = new Array(9).fill('');
    // const letters = ['X', 'O'];
    let players;
    let plays = 0;

    function importPlayers(data) {
        players = data;
    }

    function getMarker() {
        // return letters[plays % 2];
        return players[plays % 2].marker;
    }
    
    function updateGameBoardData(index, marker) {
        if (boardData[index] === '') {
            boardData[index] = marker;
            events.emit('boardDataChanged', boardData);
            return true;
        } else {
            return false;
        }
    }

    function checkForWinner() {
        const winningLines = {
            topRow: [boardData[0], boardData[1], boardData[2]],
            middleRow: [boardData[3], boardData[4], boardData[5]],
            bottomRow: [boardData[6], boardData[7], boardData[8]],
            leftColumn: [boardData[0], boardData[3], boardData[6]],
            centerColumn: [boardData[1], boardData[4], boardData[7]],
            rightColumn: [boardData[2], boardData[5], boardData[8]],
            leftRightDiagonal: [boardData[0], boardData[4], boardData[8]],
            rightleftDiagonal: [boardData[2], boardData[4], boardData[6]]
        };

        for (const lineName in winningLines) {
            if (winningLines[lineName].every((item, index, array) => item !== '' && item === array[0])) {
                const winningMarker = winningLines[lineName][0];
                const winner = players.find(player => player.marker === winningMarker);
                events.emit('rowOfThree', lineName);
                // events.emit('winnerFound', winningLines[lineName][0]);
                events.emit('winnerFound', winner);
                events.emit('gameOver', null);
            }
        }
    }
    
    function checkBoardFilled() {
        if (boardData.every(item => item !== '')) {
            // events.emit('winnerFound', null);
            events.emit('gameOver', null);
        }
    }

    function processClick(index) {
        const marker = getMarker();
        if (updateGameBoardData(index, marker)) {
            plays++;
            checkForWinner();
            checkBoardFilled();
        }
    }

    function resetEntries() {
        boardData.fill('');
        events.emit('boardDataChanged', boardData);
        plays = 0;
    }

    events.on('playersSet', importPlayers);
    events.on('gameboardClicked', processClick);
    events.on('rematch', resetEntries);
    events.on('newGame', resetEntries);

})();