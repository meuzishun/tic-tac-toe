(function() {
    const setupContainer = gameContainer.querySelector('.player-setup-container');
    const nameInputs = [...setupContainer.querySelectorAll('.player-name-input')];

    nameInputs.forEach(input => input.addEventListener('input', validateNameInputs));

    function validateNameInputs() {
        if (nameInputs.every(input => input.value !== '')) {
            events.emit('namesEntered', null);
        }
    }

    function sendNames() {
        let names = nameInputs.map(input => input.value);
        names.forEach((name, index) => {
            const markers = ['X', 'O'];
            let player = createPlayer(name, markers[index]);
            events.emit('newPlayer', player);
        });
        nameInputs.forEach(input => input.value = '');
        setupContainer.classList.add('hide-container');
    }

    function newGame() {
        setupContainer.classList.remove('hide-container');
    }

    events.on('startGame', sendNames);
    events.on('newGame', newGame);

})();