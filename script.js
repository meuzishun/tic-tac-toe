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
    const gameContainer = document.querySelector('.game-container')
    const grid = gameContainer.querySelector('.gameboard');
    const cells = grid.querySelectorAll('.cell');
    const newGameBtn = gameContainer.querySelector('.newGame-btn');
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

    function newGame() {
        clearBoard();
    }
    
    grid.addEventListener('click', addLetter);
    newGameBtn.addEventListener('click', newGame);

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
        }

    }
    
    events.on('playPlayed', checkGameState);

})();

