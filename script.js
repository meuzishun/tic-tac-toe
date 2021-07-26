const events = (function() {
    const _events = {};

    function on(eventName, fn) {
        _events[eventName] = _events[eventName] || [];
        _events[eventName].push(fn);
    };

    function off(eventName, fn) {
        if (_events[eventName]) {
            for (let i = 0; i < _events[eventName].length; i++) {
                if (_events[eventName][i] === fn) {
                    _events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    };

    function emit(eventName, data) {
        if (_events[eventName]) {
            _events[eventName].forEach(fn => fn(data));
        }
    };

    return {
        on,
        off,
        emit
    };

})();

const gameboard = (function() {
    const grid = document.querySelector('.gameboard');
    const cells = grid.querySelectorAll('.cell');
    const XsOs = new Array(9).fill('');
    const letters = ['X', 'O'];
    let plays = 0;
    
    function _render() {
        XsOs.forEach((entry, index) => {
            cells[index].textContent = entry;
        });
    }
    
    function addLetter(evt) {
        let elem = evt.target;
        let index = [...cells].indexOf(elem);
        let letter = letters[plays % 2];
        plays++;
        if (XsOs[index]) { return };
        XsOs[index] = letter;
        _render();
        events.emit('playPlayed', XsOs);
    }
    
    function clearBoard() {
        XsOs.fill('');
        plays = 0;
        _render();
        grid.addEventListener('click', addLetter);
    }
    
    grid.addEventListener('click', addLetter);

    events.on('winnerFound', (combo) => {
        console.log(combo);
    });
    
    events.on('gameOver', () => {
        console.log('game over');
        grid.removeEventListener('click', addLetter);
    });
    
    return {
        addLetter,
        clearBoard
    };

})();

const gameplay = (function() {
    function checkGameState(data) {
        checkBoardFilled(data);
        checkForWinner(data);
    }

    function checkBoardFilled(data) {
        if (data.every(item => item !== '')) {
            events.emit('gameOver', data);
        }
    }

    function checkForWinner(data) {
        const winningCombos = {
            topRow: [data[0], data[1], data[2]],
            middleRow: [data[3], data[4], data[5]],
            bottumRow: [data[6], data[7], data[8]],
            leftColumn: [data[0], data[3], data[6]],
            centerColumn: [data[1], data[4], data[7]],
            rightColumn: [data[2], data[5], data[8]],
            leftRightDiagonal: [data[0], data[4], data[8]],
            rightleftDiagonal: [data[2], data[4], data[6]]
        }

        for (const combo in winningCombos) {
            if (winningCombos[combo].every((item, index, array) => item !== '' && item === array[0])) {
                events.emit('winnerFound', combo);
                events.emit('gameOver', data);
            }
            // if (winningCombos[combo].every(item => item === 'O')) {
            //     events.emit('winnerFound', winningCombos[combo]);
            // }
        }

        // const topRow = [data[0], data[1], data[2]];
        // const middleRow = [data[3], data[4], data[5]];
        // const bottumRow = [data[6], data[7], data[8]];
        // const leftColumn = [data[0], data[3], data[6]];
        // const centerColumn = [data[1], data[4], data[7]];
        // const rightColumn = [data[2], data[5], data[8]];
        // const leftRightDiagonal = [data[0], data[4], data[8]];
        // const rightleftDiagonal = [data[2], data[4], data[6]];


    }
    
    events.on('playPlayed', checkGameState);

})();

