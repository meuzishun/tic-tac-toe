(function() {
    const gameboardData = new Array(9).fill('');

    let currentMarker;

    function setCurrentMarker(player) {
        currentMarker = player.marker;
    }

    function checkBoardFilled() {
        if (gameboardData.every(item => item !== '')) {
            events.emit('gameOver', null);
        }
    }

    function updateGameboardData(index) {
        if (gameboardData[index] === '') {
            gameboardData[index] = currentMarker;
            events.emit('boardDataChanged', gameboardData);
        }
        checkBoardFilled();
    }

    function clearBoard() {
        gameboardData.fill('');
        events.emit('boardDataChanged', gameboardData);
    }

    events.on('playerChange', setCurrentMarker);
    events.on('gameboardClicked', updateGameboardData);
    events.on('rematch', clearBoard);
    events.on('newGame', clearBoard);

})();