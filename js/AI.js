const AI = (function() {
    let emptyCells;

    function findEmptyCells(gameboardData) {
        emptyCells = gameboardData
            .map((item, index) => item === '' ? index : null)
            .filter(item => item !== null);
    }

    function makeRandomChoice() {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const choice = emptyCells[randomIndex];
        events.emit('AIchoice', choice);
    }

    function checkPlayer(currentPlayer) {
        if (currentPlayer.getType() === 'computer') {
            console.log('Now playing: computer');
            let timer = setTimeout(() => {
                makeRandomChoice();
                clearTimeout(timer);
            }, 500);
        }
    }

    function play() {
        console.log('Now playing: computer');
        let timer = setTimeout(() => {
            makeRandomChoice();
            clearTimeout(timer);
        }, 500);
    }

    events.on('gameboardDataChanged', findEmptyCells);
    // events.on('currentPlayerChanged', checkPlayer);
    events.on('computerTurn', play);

    return {
        makeRandomChoice
    }
})();