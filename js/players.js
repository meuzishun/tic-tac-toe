(function() {
    const gameContainer = document.querySelector('.game-container');

    const player1container = gameContainer.querySelector('.player1-container');
    const player1form = player1container.querySelector('.form-container');
    const player1input = player1container.querySelector('#player1-name');
    const player1label = player1container.querySelector('.player1-label');
    
    const player2container = gameContainer.querySelector('.player2-container');
    const player2form = player2container.querySelector('.form-container');
    const player2input = player2container.querySelector('#player2-name');
    const player2label = player2container.querySelector('.player2-label');

    function checkForNames() {
        if (player1input.value && player2input.value) {
            events.emit('namesEntered', null);
        }
    }

    function setupNames() {
        player1label.textContent = `${player1input.value} (X)`;
        player2label.textContent = `${player2input.value} (O)`;
        player1form.classList.add('hide-form');
        player2form.classList.add('hide-form');
    }

    events.on('startGame', setupNames)

    player1input.addEventListener('input', checkForNames);
    player2input.addEventListener('input', checkForNames);
})();