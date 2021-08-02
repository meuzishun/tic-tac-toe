(function() {
    const gameboard = gameContainer.querySelector('.gameboard');
    const cells = gameboard.querySelectorAll('.cell');
    const lines = gameboard.querySelectorAll('.row, .column, .diagonal');
    const gameboardData = new Array(9).fill('');
    let currentMarker;
    
    function startGame() {
        gameboard.classList.remove('hide-board');
        gameboard.addEventListener('click', handleBoardClick);
    }

    function setCurrentMarker(player) {
        currentMarker = player.marker;
    }

    function checkBoardFilled() {
        if (gameboardData.every(item => item !== '')) {
            gameboard.removeEventListener('click', handleBoardClick);
            events.emit('gameOver', null);
        }
    }

    function mapDataToBoard() {
        gameboardData.forEach((entry, index) => {
            cells[index].textContent = entry;
        });
    }

    function updateGameboardData(index) {
        gameboardData[index] = currentMarker;
        mapDataToBoard();
        events.emit('boardDataChanged', gameboardData);
        checkBoardFilled();
    }

    function handleBoardClick(evt) {
        let cellIndex = [...cells].indexOf(evt.target);
        if (gameboardData[cellIndex] === '') {
            events.emit('acceptedClick')
            updateGameboardData(cellIndex);
        }
    }

    function showWinningLine(lineName) {
        lines.forEach(line => {
            if (line.classList.contains(lineName)) {
                line.classList.remove('hide-line');
                gameboard.removeEventListener('click', handleBoardClick);
            }
        });
    }

    function hideAllLines() {
        lines.forEach(line => {
            if (!line.classList.contains('hide-line')) {
                line.classList.add('hide-line');
            }
        });
    }

    function clearBoard() {
        gameboardData.fill('');
        mapDataToBoard(gameboardData);
        events.emit('boardDataChanged', gameboardData);
    }
    
    function rematch() {
        clearBoard();
        hideAllLines();
        gameboard.addEventListener('click', handleBoardClick);
    }

    function newGame() {
        clearBoard();
        hideAllLines();
        gameboard.removeEventListener('click', handleBoardClick);
        gameboard.classList.add('hide-board');
    }
    
    events.on('startGame', startGame);
    events.on('playerSent', setCurrentMarker);
    events.on('rowOfThree', showWinningLine);
    events.on('rematch', rematch);
    events.on('newGame', newGame);

})();