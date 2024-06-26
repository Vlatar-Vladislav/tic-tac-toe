let newGameButton = document.querySelector('#new-game-button')
let settingsButton = document.querySelector('#settings-button')
let backButton = document.querySelector('#back-button')

let gamePage = document.querySelector('#game-page')
let menuPage = document.querySelector('#menu-page')
let settingsPage = document.querySelector('#settings-page')

let minusQuantityButton = document.querySelector('#quantity-minus')
let plusQuantityButton = document.querySelector('#quantity-plus')
let quantityLines = document.querySelector('#quantity-squares')
let crossCheck = document.querySelector('#cross-check')
let zeroCheck = document.querySelector('#zero-check')

let cells = document.querySelector('.cells')
let verticals = document.querySelector('.verticals')
let horizontals = document.querySelector('.horizontals')

let currentPlayerLabel = document.querySelector('#current-player')
let currentMoveLabel = document.querySelector('#current-move')

let windows = document.querySelector('.windows')
let victoryWindow = document.querySelector('#victory-window')

let progress
let lines = 3
let firstMove = 'zero'
let field = []
let move = 0
let currentPlayer = null
console.log(victoryWindow.children[victoryWindow.children.length - 1])

quantityLines.textContent = lines

if(firstMove === 'cross'){
    crossCheck.checked = true
    crossCheck.disabled = true
    zeroCheck.checked = false
} else {
    crossCheck.checked = false
    zeroCheck.checked = true
    zeroCheck.disabled = true
}

let checkWin = (number) => {
    let row = Math.floor(number / lines);
    let col = number % lines;
    let value = field[row][col];

    // ПРОВЕРКА ДИАГОНАЛЕЙ ПО 2
    if(row + 2 < lines && col + 2 < lines && field[row + 1][col + 1] === value && field[row + 2][col + 2] === value){
        openVictoryWindow()
    } else if(row - 2 >= 0 && col - 2 >= 0 && field[row - 1][col - 1] === value && field[row - 2][col - 2] === value){
        openVictoryWindow()
    } else if(row - 2 >= 0 && col + 2 < lines && field[row - 1][col + 1] === value && field[row - 2][col + 2] === value){
        openVictoryWindow()
    } else if(row + 2 < lines && col - 2 >= 0 && field[row + 1][col - 1] === value && field[row + 2][col - 2] === value){
        openVictoryWindow()
    // ПРОВЕРКА ПРЯМЫХ ПО 2
    } else if(row - 2 >= 0 && field[row - 1][col] === value && field[row - 2][col] === value){
        openVictoryWindow()
    } else if(row + 2 < lines && field[row + 1][col] === value && field[row + 2][col] === value){
        openVictoryWindow()
    } else if(col - 2 >= 0 && field[row][col - 1] === value && field[row][col - 2] === value){
        openVictoryWindow()
    } else if(col + 2 >= 0 && field[row][col + 1] === value && field[row][col + 2] === value){
        openVictoryWindow()
    // ПРОВЕРКА ОТ ЦЕНТРА ПО 1
    } else if(row - 1 >= 0 && row + 1 < lines && field[row - 1][col] === value && field[row + 1][col] === value){
        openVictoryWindow()
    } else if(col - 1 >= 0 && col + 1 < lines && field[row][col - 1] === value && field[row][col + 1] === value){
        openVictoryWindow()
    } else if(row - 1 >= 0 && col - 1 >= 0 && row + 1 < lines && col + 1 < lines){
        if(field[row - 1][col - 1] === value && field[row + 1][col + 1] === value){
            openVictoryWindow()
        } else if(field[row - 1][col + 1] === value && field[row + 1][col - 1] === value){
            openVictoryWindow()
        }
    }
}
    

let cellСlick = (number) => {
    if(cells.children[number].textContent === ''){
        currentPlayer == 'cross' ? cells.children[number].textContent = 'X' : cells.children[number].textContent = 'O'
        field[Math.floor(number / lines)][number % lines] = currentPlayer == 'cross' ? 'X' : 'O'
        move = move + 1
        currentPlayer === 'cross' ? currentPlayer = 'zero' : currentPlayer = 'cross'
        checkWin(number)

        if(move < lines * lines){
           currentMoveLabel.textContent = move + 1
           currentPlayerLabel.textContent = currentPlayer === 'cross' ? 'крестики' : 'нолики'
        } else {
            victoryWindow.children[0].textContent = 'Ничья!'

            windows.classList.remove('inactive')
            victoryWindow.classList.remove('inactive')
        }
    }
}

let openVictoryWindow = () => {
    victoryWindow.children[0].textContent = currentPlayer !== 'cross' ? 'Победа крестиков!' : 'Победа ноликов!'

    windows.classList.remove('inactive')
    victoryWindow.classList.remove('inactive')
}

victoryWindow.children[victoryWindow.children.length - 1].onclick = () => {
    menuPage.classList.remove('inactive')

    settingsPage.classList.add('inactive')
    gamePage.classList.add('inactive')
    backButton.classList.add('inactive')
    windows.classList.add('inactive')
    victoryWindow.classList.add('inactive')
}

newGameButton.onclick = (info) => {
    currentPlayer = firstMove
    move = 0
    currentMoveLabel.textContent = move + 1
    currentPlayerLabel.textContent = firstMove === 'cross' ? 'крестики' : 'нолики'
    field = []
    while (cells.firstChild) {
        cells.removeChild(cells.firstChild);
    }
    while (verticals.firstChild) {
        verticals.removeChild(verticals.firstChild);
    }
    while (horizontals.firstChild) {
        horizontals.removeChild(horizontals.firstChild);
    }

    cells.style.cssText = `width: ${80*lines}px`
    verticals.style.cssText = `height: ${80*lines}px`
    horizontals.style.cssText = `width: ${80*lines}px`

    for(let x = 0; x < lines; x++) {
        field.push([])
        for(let y = 0; y < lines; y++) {
            field[x].push(null)
        }
    }

    for(let i = 0; i < lines * lines; i++) {
        let div = document.createElement('div')
        div.onclick = (info) => {cellСlick(i)}        
        cells.append(div)
    }

    for(let i = 0; i < lines - 1; i++) {
        let vertical = document.createElement('div')     
        verticals.append(vertical)
        
        let horizontal = document.createElement('div')
        horizontals.append(horizontal)
    }


    gamePage.classList.remove('inactive')
    backButton.classList.remove('inactive')

    menuPage.classList.add('inactive')
    settingsPage.classList.add('inactive')
};

backButton.onclick = (info) => {
    menuPage.classList.remove('inactive')

    settingsPage.classList.add('inactive')
    gamePage.classList.add('inactive')
    backButton.classList.add('inactive')
};

settingsButton.onclick = (info) => {
    settingsPage.classList.remove('inactive')
    backButton.classList.remove('inactive')

    menuPage.classList.add('inactive')
    gamePage.classList.add('inactive')
};

// !!!  ВЗАЕМОДЕЙСТВИЕ С НАСТРОЙКАМИ  !!!
minusQuantityButton.onclick = (info) => {
    if(lines <= 3){
        lines = 3
    } else {
        lines = lines - 1
    }
    quantityLines.textContent = lines
};

plusQuantityButton.onclick = (info) => {
    if(lines >= 5){
        lines = 5
    } else {
        lines = lines + 1
    }
    quantityLines.textContent = lines
};

const handleCheckboxClick = (checkbox) => {
    const otherCheckbox = checkbox === crossCheck ? zeroCheck : crossCheck;
    otherCheckbox.checked = false;
    checkbox.disabled = true
    otherCheckbox.disabled = false
    
    firstMove = checkbox === crossCheck ? 'cross' : 'zero'
};
  
crossCheck.addEventListener('click', () => handleCheckboxClick(crossCheck));
zeroCheck.addEventListener('click', () => handleCheckboxClick(zeroCheck));