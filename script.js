const gameboard = (function() {
    const grid = document.querySelector('.gameboard');
    const cells = grid.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', addLetter.bind(this)));
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
    }

    function clearBoard() {
        XsOs.fill('');
        console.table(XsOs);
        _render();
    }

    return {
        addLetter,
        clearBoard
    };
})();

const gameplay = (function() {

})();