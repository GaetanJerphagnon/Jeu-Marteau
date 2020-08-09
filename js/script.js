let difficulty = 'Impossible';
difficulties = {
    'Easy':         2000,
    'Medium':       1100,
    'Hard':          800,
    'Impossible':    1000
};
let pointCounter = 0;
let difficultyTimer = 0;
let broken = false;

let game = {
    init: function(){
        console.log('Js Chargé')
        let difficultyButton = document.getElementById('difficulty-choice');
        difficultyButton.addEventListener('click', game.chooseDifficultyHandle);

        let startButton = document.getElementById('start-button');
        startButton.addEventListener('click', game.startGame);
        let sizeForm = document.getElementById("size-container");
        sizeForm.addEventListener('submit', game.changeGridSizeClickHandle);
        game.changeGridSize(1);
        game.setDifficulty(difficulty);
        document.getElementById('grid-size-display').textContent= "5x5";
    },
    
    changeGridSizeClickHandle: async function(event){
        event.preventDefault();
        let input = document.getElementById('size-input');
        let number = input.value;
        number = parseInt(number);
        if (number){
            if (number > 20 || number < 1) {
                input.style.border ='2px solid red';
                input.value = '';
                if(number > 20){
                    input.setAttribute('placeholder', 'Max 20!');
                } else if (number < 1){
                    input.setAttribute('placeholder', 'Min 1...');
                }
            } else {
                input.value = '';
                game.changeGridSize(number);
                game.setColors();
            }
        }
        input.value = '';
        await sleep(1000);
        input.style.border ='1px solid black';
        input.setAttribute('placeholder', '1> ... >20');
        let sizeForm = document.getElementById("size-container");
        sizeForm.addEventListener('submit', game.changeGridSizeClickHandle);
    },
    
    changeGridSize: function (number = 5){
        let grid = document.querySelector('#grid-container .grid');
        while (grid.lastElementChild) {
            grid.removeChild(grid.lastElementChild);
        };
        game.displayGridSize(number);
        game.generateCells(number);
    },
    
    displayGridSize: function(number){
        let sizeDisplay = document.getElementById('grid-size-display');
        sizeDisplay.textContent= number+'x'+number;
    },
    
    generateCells: function(number = 5){
        let grid = document.querySelector('#grid-container .grid');
        for (let i=0; i<number ; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            for (let i2=0; i2<number ; i2++){
                let cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
            }
            grid.appendChild(row);
        }
    },
    
    setDifficulty: function(mode) {
        let display = document.getElementById('difficulty-display');
        
        for(d in difficulties) {
            if (mode == d) {
                difficulty = d;
                difficultyTimer = difficulties[d];
            }
        }
        game.setColors();
        display.textContent = difficulty;
        display.classList ="";
        display.classList.add('dif-'+difficulty.toLowerCase());
    },
    
    setColors: function(){
        let container = document.getElementById('container');
        container.classList = '';
        container.classList.add('container-'+difficulty.toLowerCase());
        
        let infos = document.querySelector('.infos');
        infos.classList = '';
        infos.classList.add('infos');
        infos.classList.add('infos-'+difficulty.toLowerCase());
        
        let scores = document.querySelector('.scores');
        scores.classList = '';
        scores.classList.add('scores');
        scores.classList.add('scores-'+difficulty.toLowerCase());
        
        let difChoose = document.getElementById('difficulty-choice');
        difChoose.classList = '';
        difChoose.classList.add('difficulty-container-'+difficulty.toLowerCase());
        
        let startButton = document.getElementById('start-button');
        startButton.classList = '';
        startButton.classList.add('start-button-'+difficulty.toLowerCase());
        
        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList = '');
        cells.forEach(cell => cell.classList.add('cell'));
        cells.forEach(cell => cell.classList.add('cell-'+difficulty.toLowerCase()));
        
    },
    
    
    chooseDifficultyHandle: function(event){
        let target = event.currentTarget;
        let targetParent = target.parentElement;
        let i = document.querySelector('#difficulty-choice span i');
        let options = document.createElement('ul');
        options.id ="options";
        
        i.classList.remove("fa-chevron-right");
        i.classList.add("fa-chevron-down");
        
        
        for(let difficulty in difficulties) {
            let option = document.createElement('li');
            let name = difficulty;
            option.textContent = name;
            option.addEventListener('click', game.chooseDifficultyExit);
            let lowerName = name.toLowerCase();
            option.classList.add("dif-"+lowerName);
            options.appendChild(option);
        }
        
        target.removeEventListener("click", game.chooseDifficultyHandle)
        target.addEventListener('click', game.chooseDifficultyExit);
        targetParent.appendChild(options);
        return;
        
    },
    
    chooseDifficultyExit: function(event){
        let target = event.currentTarget;
        let compareTarget = document.getElementById('difficulty-choice');
        let i = document.querySelector('#difficulty-choice span i');
        if(target!=compareTarget){
            game.setDifficulty(target.textContent);   
        };
        game.removeDifficultyList();
        compareTarget.removeEventListener("click", game.chooseDifficultyExit);
        compareTarget.addEventListener("click", game.chooseDifficultyHandle);
        i.classList.remove("fa-chevron-down");
        i.classList.add("fa-chevron-right");
    },
    
    removeDifficultyList: function(){
        let options = document.getElementById('options');
        while (options.lastElementChild) {
            options.removeChild(options.lastElementChild);
        };
        options.parentNode.removeChild(options);
        
    },
    
    getRandomCell: async function(){
        let grid = document.querySelector('#grid-container .grid');
        let gridSize = grid.childElementCount;
        let cellNumber = Math.floor((Math.random() * gridSize*gridSize) + 0);
        let index = Math.floor(cellNumber/gridSize);
        console.log(cellNumber);
        console.log(index);
        let cellIndex = cellNumber-index*gridSize;
        let rowIndex = index+1 ;
        let row = document.querySelector('.grid .row:nth-child('+rowIndex+')').childNodes;
        let cell = row[cellIndex];
        console.log(row);
        console.log(cell);
        cell.classList.add("target");
        cell.addEventListener('click', game.cellClickHandle)
        await sleep(difficultyTimer*0.75);
        cell.removeEventListener('click', game.cellClickHandle)
        cell.classList.remove("target");
        cell.classList.remove("target-valid");
        if (difficulty == "Impossible") {
            cell.classList.add("target-impossible");
        }
    },
    
    addPoints: function (points){
        pointCounter += points;
        let scoreDisplay = document.getElementById('score-display');
        scoreDisplay.textContent = pointCounter;
    },
    
    cellClickHandle: async function (event){
        let target = event.currentTarget;
        game.addPoints(1/difficultyTimer*100000);
        target.removeEventListener('click', game.cellClickHandle);
        target.classList.remove("target");
        target.classList.add("target-valid");
        if (target.classList.contains("target-impossible")){
            target.classList.add("target-crack");
            target.classList.remove("target-impossible");
            target.classList.remove("cell");
            target.classList.remove("target-valid");
            target.classList.remove("target");
            target.style.transition = "0";
            let posX = event.screenX;
            let posY = event.clientY;
            let x = target.offsetLeft;
            let y = target.offsetTop;
            let w = target.offsetWidth;
            let h = target.offsetHeight;
            let bgx = posX-x-w/1.6;
            let bgy = posY-y-h/1.8;

            target.style.backgroundPosition = bgx+"px "+bgy+"px";
            broken = true;
        }     
    },

    startGame: async function(event){
        pointCounter = 0;
        game.addPoints(0);
        let difficultyButton = document.getElementById('difficulty-choice');
        difficultyButton.removeEventListener('click', game.chooseDifficultyHandle);
        difficultyButton.style.backgroundColor ="grey";
        let button = event.currentTarget;
        button.removeEventListener('click', game.startGame);
        let sizeForm = document.getElementById("size-container");
        sizeForm.removeEventListener('submit', game.changeGridSizeClickHandle)
        let buttonColor = button.style.backgroundColor;
        button.style.backgroundColor ="grey";
        
        let screen = document.querySelector('.screen p');
        screen.textContent ='Game starting...';
        progress(difficultyTimer/100);
        await sleep(difficultyTimer*1.1);
        screen.textContent ='Game in progress...';
        
        for (let i=0; i<15 ; i++) {
            if(broken == false){
                game.getRandomCell();
                await sleep(difficultyTimer);
            } else if (broken) {
                return alert('You clicked too hard you broke my game!');
            }
        }
        
        screen.textContent = '';
        difficultyButton.addEventListener('click', game.chooseDifficultyHandle);
        sizeForm.addEventListener('submit', game.changeGridSizeClickHandle)
        difficultyButton.style.backgroundColor = buttonColor;
        button.style.backgroundColor = buttonColor;
        button.addEventListener('click', game.startGame);
    },

    stopGame: function(){

    },
    
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let i = 0;
function progress(ms) {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, ms);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}
game.init();