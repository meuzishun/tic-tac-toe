(function() {
    const player1container = gameContainer.querySelector('.player1-container');
    const player1form = player1container.querySelector('.form-container');
    const player1input = player1container.querySelector('#player1-name');
    const player1label = player1container.querySelector('.player1-label');
    const player1winCount = player1container.querySelector('.win-count');
    
    const player2container = gameContainer.querySelector('.player2-container');
    const player2form = player2container.querySelector('.form-container');
    const player2input = player2container.querySelector('#player2-name');
    const player2label = player2container.querySelector('.player2-label');
    const player2winCount = player2container.querySelector('.win-count');

    function playerFactory(name, marker) {
        return {
            name: name,
            marker: marker,
            wins: 0,
            addWin: function() {
                this.wins++;
            }
        }
    }

    function checkForNames() {
        if (player1input.value && player2input.value) {
            events.emit('namesEntered', null);
        }
    }

    function setupPlayers() {
        const player1 = playerFactory(player1input.value, 'X');
        const player2 = playerFactory(player2input.value, 'O');
        setupNames();
        events.emit('playersSet', [player1, player2]);
    }

    function setupNames() {
        player1label.textContent = `${player1input.value} (X)`;
        player2label.textContent = `${player2input.value} (O)`;
        player1input.value = '';
        player2input.value = '';
        player1form.classList.add('hide-form');
        player2form.classList.add('hide-form');
    }

    function updateScore(winner) {
        winner.wins++;
        let elem;
        if (winner.marker === 'X') {
            elem = player1winCount;
         } else {
            elem = player2winCount;
        }
        console.log(elem);
        elem.textContent = winner.wins;
        console.log(winner);
    }

    function reset() {
        player1label.textContent = '';
        player2label.textContent = '';
        player1form.classList.remove('hide-form');
        player2form.classList.remove('hide-form');
        player1winCount.textContent = '';
        player2winCount.textContent = '';
    }

    events.on('startGame', setupPlayers);
    events.on('winnerFound', updateScore);
    events.on('newGame', reset);

    player1input.addEventListener('input', checkForNames);
    player2input.addEventListener('input', checkForNames);
    
})();