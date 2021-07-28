const resultsOverlay = (function() {
    const gameContainer = document.querySelector('.game-container');
    const gameboard = gameContainer.querySelector('.gameboard');
    const lines = gameboard.querySelectorAll('.row, .column, .diagonal');

    function showWinningLine(lineName) {
        lines.forEach(line => {
            if (line.classList.contains(lineName)) {
                line.classList.remove('hide');
            }
        });
    }

    function hideAllLines() {
        lines.forEach(line => {
            if (!line.classList.contains('hide')) {
                line.classList.add('hide');
            }
        });
    }

    events.on('rowOfThree', showWinningLine);
    events.on('clearBoard', hideAllLines);
    
})();