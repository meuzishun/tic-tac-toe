const gameState = (function() {
    const gameboardData = new Array(9).fill('');
    let plays = 0;
    let players = [];
    function importPlayer(player) {
        players.push(player);
    }
    let currentPlayer;
    let winner = null;
    let winnerName = null;

    function setCurrentPlayer() {
        currentPlayer = players[plays % 2];
        const currentPlayerType = currentPlayer.getType();
        if (currentPlayerType === 'person') {
            events.emit('personTurn', null);
        }
        if (currentPlayerType === 'computer') {
            events.emit('computerTurn', null);
        }
        // events.emit('currentPlayerChanged', currentPlayer);
        //? Is this where we addClickListener or request to AI?
    }

    function startGame() {
        clearBoard();
        setCurrentPlayer();
    }
    
    function updateGameboardData(index) {
        gameboardData[index] = currentPlayer.getMarker();
        events.emit('gameboardDataChanged', gameboardData);
    }
    
    function processPlay(index) {
        if (gameboardData[index] === '') { //? Could we do this check in gameboard?
            updateGameboardData(index);
            if (checkForWinner()) {
                return;
            }
            if (checkBoardFilled()) {
                return;
            }
            plays++;
            setCurrentPlayer();
        }
    }

    function checkForWinner() {
        //TODO: there HAS to be a more efficient way of checking the data 
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
                winner = players.find(player => player.getMarker() === winningMarker);
                winner.addWin();
                winnerName = winner.getName();
                players.forEach(player => player.updateWinDisplay());
                events.emit('winnerDeclared', winner);
                events.emit('rowOfThree', lineName);
                events.emit('gameOver', null);
                return true;
            }
        }
    }

    function checkBoardFilled() {
        if (gameboardData.every(item => item !== '')) {
            events.emit('gameOver', null);
            events.emit('winnerDeclared', winnerName);
            return true;
        }
    }
    
    function clearBoard() {
        gameboardData.fill('');
        events.emit('gameboardDataChanged', gameboardData);
    }

    function rematch() {
        plays = 0;
        clearBoard();
        winner = null;
        winnerName = null;
        setCurrentPlayer();
    }
    
    function newGame() {
        players.forEach(player => player.clear());
        players = [];
        plays = 0;
        clearBoard();
        winner = null;
        winnerName = null;
    }

    events.on('newPlayer', importPlayer);
    events.on('startGame', startGame);
    events.on('gameboardClicked', processPlay);
    events.on('AIchoice', processPlay);
    events.on('rematch', rematch);
    events.on('newGame', newGame);

    return {
        gameboardData,
        processPlay,
        clearBoard
    }

})();