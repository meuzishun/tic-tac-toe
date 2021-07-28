// const events = (function() {
//     const _events = {};

//     function on(eventName, fn) {
//         _events[eventName] = _events[eventName] || [];
//         _events[eventName].push(fn);
//     };

//     function off(eventName, fn) {
//         if (_events[eventName]) {
//             for (let i = 0; i < _events[eventName].length; i++) {
//                 if (_events[eventName][i] === fn) {
//                     _events[eventName].splice(i, 1);
//                     break;
//                 }
//             }
//         }
//     };

//     function emit(eventName, data) {
//         if (_events[eventName]) {
//             _events[eventName].forEach(fn => fn(data));
//         }
//     };

//     return {
//         on,
//         off,
//         emit
//     };

// })();




// const gameboard = (function() {
//     const gameContainer = document.querySelector('.game-container')
//     const gameboard = gameContainer.querySelector('.gameboard');
//     const cells = gameboard.querySelectorAll('.cell');
//     const lines = gameboard.querySelectorAll('.row, .column, .diagonal');
//     const newGameBtn = gameContainer.querySelector('.newGame-btn');
//     const messageDisplay = gameContainer.querySelector('.message-display');
    
//     function _render(boardData) {
//         boardData.forEach((entry, index) => {
//             cells[index].textContent = entry;
//         });
//     }
    
//     events.on('boardDataChanged', _render);
//     events.on('winnerFound', endGame);
    
//     function handleCellClick(evt) {
//         let elem = evt.target;
//         let index = [...cells].indexOf(elem);
//         events.emit('gameboardClicked', index);
//     }

//     function declareWinner(winner) {
//         messageDisplay.textContent = `${winner} wins!`;
//     }
    
//     function clearBoard() {
//         XsOs.fill('');
//         plays = 0;
//         _render();
//         lines.forEach(line => {
//             if (!line.classList.contains('hide')) {
//                 line.classList.add('hide');
//             }
//         });
//         gameboard.addEventListener('click', handleCellClick);
//     }

//     function newGame() {
//         clearBoard();
//     }

//     function endGame(obj) {
//         showWinningLine(obj.combo);
//         declareWinner(obj.marker);
//     }

//     function buttonStateChange(evt) {
//         evt.target.classList.toggle('pressed');
//     }
    
//     gameboard.addEventListener('click', handleCellClick);
//     newGameBtn.addEventListener('click', newGame);
//     newGameBtn.addEventListener('mousedown', buttonStateChange);
//     newGameBtn.addEventListener('mouseup', buttonStateChange);

//     function showWinningLine(combo) {
//         lines.forEach(line => {
//             if (line.classList.contains(combo)) {
//                 line.classList.remove('hide');
//             }
//         });
//     }

//     events.on('gameOver', () => {
//         console.log('game over');
//         gameboard.removeEventListener('click', handleCellClick);
//     });
    
//     return {
//         handleCellClick,
//         clearBoard
//     };

// })();




// const gameplay = (function() {
//     const boardData = new Array(9).fill('');
//     const letters = ['X', 'O'];
//     let plays = 0;

    

//     function getMarker() {
//         return letters[plays % 2];
//     }

//     function play(index) {
//         const marker = getMarker();
//         updateGameBoardData(index, marker);
//         plays++;
//         // checkForWinner();
//         checkGameState();
//     }
    
//     function updateGameBoardData(index, marker) {
//         boardData[index] = marker;
//         events.emit('boardDataChanged', boardData);
//     }

//     function checkGameState() {
//         // checkBoardFilled(data);

//         const combo = checkForWinner();
//         if (combo) {
//             events.emit('winnerFound', combo);
//         }
//     }

//     function checkBoardFilled(data) {
//         if (data.every(item => item !== '')) {
//             events.emit('gameOver', data);
//         }
//     }

//     function checkForWinner() {
//         const winningCombos = {
//             topRow: [boardData[0], boardData[1], boardData[2]],
//             middleRow: [boardData[3], boardData[4], boardData[5]],
//             bottomRow: [boardData[6], boardData[7], boardData[8]],
//             leftColumn: [boardData[0], boardData[3], boardData[6]],
//             centerColumn: [boardData[1], boardData[4], boardData[7]],
//             rightColumn: [boardData[2], boardData[5], boardData[8]],
//             leftRightDiagonal: [boardData[0], boardData[4], boardData[8]],
//             rightleftDiagonal: [boardData[2], boardData[4], boardData[6]]
//         };

//         for (const combo in winningCombos) {
//             if (winningCombos[combo].every((item, index, array) => item !== '' && item === array[0])) {
//                 return { combo, marker: winningCombos[combo][0] };
//             }
//         }
//     }

//     events.on('gameboardClicked', play);
    
//     events.on('playPlayed', checkGameState);

// })();

