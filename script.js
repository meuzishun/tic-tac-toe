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
    }
    
    cells.forEach(cell => cell.addEventListener('click', addLetter.bind(this)));
    
    return {
        addLetter,
        clearBoard
    };

})();

const gameplay = (function() {
    function displayState(data) {
        console.table(data);
    }

    events.on('playPlayed', displayState);
})();

