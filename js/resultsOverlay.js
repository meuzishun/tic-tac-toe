const resultsOverlay = (function() {
    const gameContainer = document.querySelector('.game-container');
    const gameboard = gameContainer.querySelector('.gameboard');
    const lines = gameboard.querySelectorAll('.row, .column, .diagonal');

    function showWinningLine(lineName) {
        lines.forEach(line => {
            if (line.classList.contains(lineName)) {
                line.classList.remove('hideLine');
            }
        });
    }

    function hideAllLines() {
        lines.forEach(line => {
            if (!line.classList.contains('hideLine')) {
                line.classList.add('hideLine');
            }
        });
    }

    events.on('rowOfThree', showWinningLine);
    events.on('newGame', hideAllLines);
    
})();