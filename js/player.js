function createPlayer(obj) {
    let wins = 0;
    const playerContainer = document.querySelector(`.player${obj.marker}-container`);
    const label = playerContainer.querySelector('.player-label');
    const winCount = playerContainer.querySelector('.win-count');

    const getMarker = function() {
        return obj.marker;
    }

    const getType = function() {
        return obj.playerType;
    }

    const getName = function() {
        return obj.name;
    }

    const updateWinDisplay = function() {
        winCount.textContent = wins;
    }

    const addWin = function() {
        wins++;
    }

    const clear = function() {
        label.textContent = '';
        winCount.textContent = '';
    }

    label.textContent = `${obj.name || obj.playerType.toUpperCase()} (${obj.marker})`;

    return {
        getMarker,
        getType,
        getName,
        addWin,
        updateWinDisplay,
        clear
    }
}