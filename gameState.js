const gameState = (function() {
    const boardData = new Array(9).fill('');
    const letters = ['X', 'O'];
    let plays = 0;

    

    function getMarker() {
        return letters[plays % 2];
    }

    function play(index) {
        const marker = getMarker();
        updateGameBoardData(index, marker);
        plays++;
        // checkForWinner();
        checkGameState();
    }
    
    function updateGameBoardData(index, marker) {
        boardData[index] = marker;
        events.emit('boardDataChanged', boardData);
    }

    function checkGameState() {
        // checkBoardFilled(data);

        const combo = checkForWinner();
        if (combo) {
            events.emit('winnerFound', combo);
        }
    }

    function checkBoardFilled(data) {
        if (data.every(item => item !== '')) {
            events.emit('gameOver', data);
        }
    }

    function checkForWinner() {
        const winningCombos = {
            topRow: [boardData[0], boardData[1], boardData[2]],
            middleRow: [boardData[3], boardData[4], boardData[5]],
            bottomRow: [boardData[6], boardData[7], boardData[8]],
            leftColumn: [boardData[0], boardData[3], boardData[6]],
            centerColumn: [boardData[1], boardData[4], boardData[7]],
            rightColumn: [boardData[2], boardData[5], boardData[8]],
            leftRightDiagonal: [boardData[0], boardData[4], boardData[8]],
            rightleftDiagonal: [boardData[2], boardData[4], boardData[6]]
        };

        for (const combo in winningCombos) {
            if (winningCombos[combo].every((item, index, array) => item !== '' && item === array[0])) {
                return { combo, marker: winningCombos[combo][0] };
            }
        }
    }

    events.on('gameboardClicked', play);
    
    events.on('playPlayed', checkGameState);

})();