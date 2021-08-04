(function() {
    const setupContainer = gameContainer.querySelector('.player-setup-container');
    const playerNameInputs = [...setupContainer.querySelectorAll('.player-name-input')];

    playerNameInputs.forEach(input => input.addEventListener('input', validateNameInputs));

    function validateNameInputs() {
        if (playerNameInputs.every(input => input.value !== '')) {
            events.emit('namesEntered', null);
        }
    }

    function sendNames() {
        let names = playerNameInputs.map(input => input.value);
        names.forEach((name, index) => {
            const markers = ['X', 'O'];
            let player = createPlayer(name, markers[index]);
            events.emit('newPlayer', player);
        });
        playerNameInputs.forEach(input => input.value = '');
        setupContainer.classList.add('hide-container');
    }

    function newGame() {
        setupContainer.classList.remove('hide-container');
    }

    events.on('startGame', sendNames);
    events.on('newGame', newGame);

})();