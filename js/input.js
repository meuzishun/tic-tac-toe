const inputs = (function() {
    const inputContainer = document.querySelector('.setup-container');
    const playerSelections = inputContainer.querySelectorAll('.person-selection');
    const computerSelections = inputContainer.querySelectorAll('.computer-selection');
    const nameInputs = [...inputContainer.querySelectorAll('.player-name-input')];

    playerSelections.forEach(selection => {
        selection.addEventListener('input', function() {
            this.parentElement.parentElement.parentElement.querySelector('.name-input-container').classList.remove('hide');
        });
    });
    
    computerSelections.forEach(selection => {
        selection.addEventListener('input', function() {
            this.parentElement.parentElement.parentElement.querySelector('.name-input-container').classList.add('hide');
        });
    });

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

    return {
        // showHideInputs
    }
})();