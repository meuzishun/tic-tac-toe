const setupForm = (function() {
    const setupForm = document.querySelector('.setup-form');
    const personSelections = setupForm.querySelectorAll('.person-selection');
    const computerSelections = setupForm.querySelectorAll('.computer-selection');

    // On both radio buttons for the person option, we listen for selection.  Once selected, the HTML for the name input is created (don't forget the required attribute).  If unselected, the recently created HTML is deleted.

    // FOR COMPUTER VS PERSON
    function createNameInput(marker) {
        const nameInputContainer = document.createElement('div');
        nameInputContainer.classList.add('name-input-container');

        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', `player${marker}-name`);
        nameLabel.textContent = 'Name:';

        const textInput = document.createElement('input');
        textInput.setAttribute('type', 'text');
        textInput.classList.add('player-name-input');
        textInput.id = `player${marker}-name`;
        textInput.required = true;

        nameInputContainer.appendChild(nameLabel);
        nameInputContainer.appendChild(textInput);

        return nameInputContainer;
    }

    function handlePersonSelection(e) {
        const selection = e.target;
        const container = selection.parentElement.parentElement.parentElement;
        const marker = container.dataset.marker;
        const nameInput = createNameInput(marker);
        container.appendChild(nameInput);
    }

    function handleComputerSelection(e) {
        const selection = e.target;
        const container = selection.parentElement.parentElement.parentElement;

        const nameInput = container.querySelector('.name-input-container');
        if (nameInput) {
            container.removeChild(nameInput);
        }
    }

    personSelections.forEach(selection => selection.addEventListener('input', handlePersonSelection));
    
    computerSelections.forEach(selection => selection.addEventListener('input', handleComputerSelection));


    // SUBMITTING THE DATA
    // let formData = [];

    function parseInput(playerInput) {
        const marker = playerInput.dataset.marker;
        const inputs = [...playerInput.querySelectorAll('input')];
        const checked = inputs.filter(input => input.checked);
        const playerType = checked[0].dataset.player;
        
        const obj = {
            marker,
            playerType
        }

        if (playerType === 'person') {
            const text = inputs.filter(input => input.type === 'text');
            obj.name = text[0].value;
        } else {
            obj.name = 'Computer';
        }
        
        const player = createPlayer(obj);
        events.emit('newPlayer', player);
        // formData.push(obj);
    }

    function storeFormData(form) {
        const playerInputs = form.querySelectorAll('.player-inputs');
        
        playerInputs.forEach(playerInput => {
            parseInput(playerInput);
        });
    }

    // function clearFormData() {
    //     formData = [];
    // }
    
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        storeFormData(form);
        setupForm.classList.add('hide');
        events.emit('startGame', null);
    }

    function newGame() {
        setupForm.classList.remove('hide');
    }

    setupForm.addEventListener('submit', handleSubmit);

    events.on('newGame', newGame)

    // return {
    //     formData
    // }
})();