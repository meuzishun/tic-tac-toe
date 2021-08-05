function createPlayer(name, marker) {
    let wins = 0;
    const labelContainer = document.querySelector(`.player${marker}-label`);
    const winsCount = document.querySelector(`.player${marker}-container .win-count`);

    const getMarker = function() {
        return marker;
    }

    const updateWinDisplay = function() {
        winsCount.textContent = wins;
    }

    const addWin = function() {
        wins++;
    }

    const clear = function() {
        labelContainer.textContent = '';
        winsCount.textContent = '';
    }

    labelContainer.textContent = `${name} (${marker})`;

    return {
        getMarker,
        addWin,
        updateWinDisplay,
        clear
    }
}