const AI = (function() {
    let possibleMoves;

    function findEmptyCells(gameboardData) {
        return gameboardData
            .map((item, index) => item === '' ? index : null)
            .filter(item => item !== null);
    }

    function reportEmpty(gameboardData) {
        possibleMoves = findEmptyCells(gameboardData);
    }

    function makeRandomChoice() {
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        const choice = possibleMoves[randomIndex];
        events.emit('AIchoice', choice);
    }

    events.on('gameboardDataChanged', reportEmpty);

    return {
        makeRandomChoice
    }
})();