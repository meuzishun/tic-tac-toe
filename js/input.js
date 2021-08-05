(function() {
    const inputContainer = document.querySelector('.name-input-container');
    const nameInputs = [...inputContainer.querySelectorAll('.player-name-input')];

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
        inputContainer.classList.add('hide');
        // gameContainer.classList.remove('hide-game');
    }
    
    function newGame() {
        inputContainer.classList.remove('hide');
        // gameContainer.classList.add('hide-game');
    }

    events.on('startGame', sendNames);
    events.on('newGame', newGame);

})();