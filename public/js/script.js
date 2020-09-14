
let game = {
    
    difficulty : "Medium",
    difficulties : {
        "Easy": {"time" : 2000, "basePoints" : 10, "color" : "green"},
        "Medium": {"time": 1100, "basePoints" : 35, "color" : "blue"},
        "Hard": {"time": 700, "basePoints" : 60, "color" : "purple"},
        "Extreme": {"time": 470, "basePoints" : 100, "color" : "bordeaux"},
        "Impossible": {"time": 50, "basePoints" : 1, "color" : "black"},
    },
    bonusCountdown: 0,
    bonusPoint: 1,
    secret: document.getElementById("secret"),
    grid : document.querySelector('#grid-container .grid'),
    startButton : document.getElementById('start-button'),
    sizeForm : document.getElementById("size-container"),
    occurenceForm : document.getElementById("occurence-container"),
    difficultyButton : document.getElementById('difficulty-choice'),
    occurence: null,
    gridSize: null,
    pointCounter : 0,
    secretDiscovered: false,
    broken : false,


    init: function(){
        game.difficultyButton.addEventListener('click', game.chooseDifficultyHandle); 
        game.startButton.addEventListener('click', game.startGame);
        game.sizeForm.addEventListener('submit', game.changeGridSizeSubmitHandle);
        game.occurenceForm.addEventListener('submit', game.changeOccurenceSubmitHandle);
        game.changeGridSize();
        game.changeOcurrence();
        game.setDifficulty(game.difficulty);
        game.secret.addEventListener('click', game.secretClickHandle);
    },
    
    changeGridSizeSubmitHandle: async function(event){
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
        input.style.border ='';
        input.setAttribute('placeholder', '1...20');
        game.sizeForm.addEventListener('submit', game.changeGridSizeSubmitHandle);
    },

    changeOccurenceSubmitHandle: async function(event){
        event.preventDefault();
        let input = document.getElementById('occurence-input');
        let number = input.value;
        number = parseInt(number);
        if (number){
            if (number > 50 || number < 1) {
                input.style.border ='2px solid red';
                setTimeout(function(){
                    input.style.border ="";
                }, 1000);
                input.value = '';
                if(number > 50){
                    input.setAttribute('placeholder', 'Max 50!');
                } else if (number < 1){
                    input.setAttribute('placeholder', 'Min 1...');
                }
            } else {
                input.value = '';
                game.changeOcurrence(number);
            }
        }
        input.value = '';
        input.setAttribute('placeholder', '1...50');
        game.sizeForm.addEventListener('submit', game.changeOccurenceSubmitHandle);
    },
    
    changeGridSize: function (number = 10){
        if(number!=10){
            game.secretDiscovered = true;
        } else {
            game.secretDiscovered = false;
        };
        while (game.grid.lastElementChild) {
            game.grid.removeChild(game.grid.lastElementChild);
        };
        game.displayGridSize(number);
        game.gridSize = number;
        game.generateCells(number);
    },

    changeOcurrence: function(number = 15) {
        if(number!=15){
            game.secretDiscovered = true;
        } else {
            game.secretDiscovered = false;
        };
        game.occurence = number;
        game.displayOccurence();

    },
    
    displayGridSize: function(number){
        let sizeDisplay = document.getElementById('grid-size-display');
        sizeDisplay.textContent= number+'x'+number;
    },

    displayOccurence: function(){
        let occurenceDisplay = document.getElementById('occurence-display');
        occurenceDisplay.textContent= game.occurence+"x";
    },

    secretClickHandle: function(event) {
        let scores = document.querySelector(".scores");
        if (scores.classList.contains("move-score-panel-down")) {
            scores.classList.toggle("transition");
            setTimeout(function(){
                scores.classList.toggle("transition");
                },1000);
            game.moveScorePanelUp();
        } else {
            if (game.secretDiscovered===false){
                let audio = new Audio('http://noproblo.dayjo.org/ZeldaSounds/WW_New/WW_Secret.wav');
                audio.volume = 0.2;
                audio.play();
                game.secretDiscovered = true;
            }
            scores.classList.toggle("transition");
            setTimeout(function(){
                scores.classList.toggle("transition");
                },1000);
            game.moveScorePanelDown();
        }
    },
    
    moveScorePanelDown: function(event) {
        let scores = document.querySelector(".scores");
        scores.classList.add("move-score-panel-down");
        game.secret.classList.add("secret-active");
    },
    moveScorePanelUp: function(event) {
        let scores = document.querySelector(".scores");
        scores.classList.remove("move-score-panel-down");
        game.secret.classList.remove("secret-active");

    },

    generateCells: function(number=5){
        for (let i=0; i<number ; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            for (let i2=0; i2<number ; i2++){
                let cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
            }
           game.grid.appendChild(row);
        }
    },
    
    setDifficulty: function(mode) {
        let display = document.getElementById('difficulty-display');
        
        for(let d in game.difficulties) {
            if (mode == d) {
                game.difficulty = d;
                game.difficultyTimer = game.difficulties[d]["time"];
            }
        }
        game.setColors();
        game.changeScoreBoard(game.difficulty);
        display.textContent = game.difficulty;
        display.classList ="";
        display.classList.add('dif-'+game.difficulty.toLowerCase());
    },
    
    setColors: function(){
        let container = document.getElementById('container');
        container.classList = '';
        container.classList.add('container-'+game.difficulty.toLowerCase());
        
        let infos = document.querySelector('.infos');
        infos.classList = '';
        infos.classList.add('infos');
        infos.classList.add('infos-'+game.difficulty.toLowerCase());
        
        let scores = document.querySelector('.scores');
        if (scores.classList.contains('move-score-panel-down')) {
            scores.classList = 'move-score-panel-down';
        } else {
            scores.classList = '';
        }
        scores.classList.add('scores');
        scores.classList.add('scores-'+game.difficulty.toLowerCase());
        
        let difChoose = document.getElementById('difficulty-choice');
        difChoose.classList = '';
        difChoose.classList.add('difficulty-container-'+game.difficulty.toLowerCase());
        
        game.startButton.classList = '';
        game.startButton.classList.add('start-button-'+game.difficulty.toLowerCase());
        
        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList = '');
        cells.forEach(cell => cell.classList.add('cell'));
        cells.forEach(cell => cell.classList.add('cell-'+game.difficulty.toLowerCase()));
        
    },
    
    
    chooseDifficultyHandle: function(event){
        let target = event.currentTarget;
        let targetParent = target.parentElement;
        let i = document.querySelector('#difficulty-choice span i');
        let options = document.createElement('ul');
        options.id ="options";
        
        i.classList.remove("fa-chevron-right");
        i.classList.add("fa-chevron-down");
        
        
        for(let d in game.difficulties) {
            let option = document.createElement('li');
            let name = d;
            option.textContent = name;
            option.addEventListener('click', game.chooseDifficultyExit);
            let lowerName = name.toLowerCase();
            option.classList.add("dif-"+lowerName);
            options.appendChild(option);
        }
        
        target.removeEventListener("click", game.chooseDifficultyHandle)
        target.addEventListener('click', game.chooseDifficultyExit);
        document.addEventListener('click', game.clickOutside);
        targetParent.appendChild(options);
        return;
        
    },
    
    chooseDifficultyExit: function(event){
        let target = event.currentTarget;
        let compareTarget = document.getElementById('difficulty-choice');
        if(target!=compareTarget){
            game.setDifficulty(target.textContent);   
        };
        game.removeDifficultyList();
    },
    
    removeDifficultyList: function(){
        let i = document.querySelector('#difficulty-choice span i');
        i.classList.remove("fa-chevron-down");
        i.classList.add("fa-chevron-right");
        let options = document.getElementById('options');
        while (options.lastElementChild) {
            options.removeChild(options.lastElementChild);
        };
        options.parentNode.removeChild(options);
        game.difficultyButton.removeEventListener("click", game.chooseDifficultyExit);
        game.difficultyButton.addEventListener("click", game.chooseDifficultyHandle);
        document.removeEventListener("click", game.clickOutside);
        
    },

    changeScoreBoard: function(difficulty){
        let scoreOfCurrentDifficulty = [];
        let scoreBoard = document.querySelector("table");
        while (scoreBoard.lastElementChild) {
            scoreBoard.removeChild(scoreBoard.lastElementChild);
        };
        for(let i in allScores) {
            if(allScores[i]['difficulty'] === difficulty){
                scoreOfCurrentDifficulty.push([allScores[i]['playername'],allScores[i]['score']]);
            }
        }

        for(let i = 0 ; scoreOfCurrentDifficulty.length>i ; i++) {
            let scoreRow = document.createElement("tr");
            let scoreRank = document.createElement("th");
            let scorePlayer = document.createElement("th");
            let score = document.createElement("th");
            score.classList.add("top-scores-score");

            scoreRank.textContent = i+1+".";
            scorePlayer.textContent = scoreOfCurrentDifficulty[i][0];
            score.textContent = scoreOfCurrentDifficulty[i][1];

            scoreBoard.appendChild(scoreRow);
            scoreRow.appendChild(scoreRank);
            scoreRow.appendChild(scorePlayer);
            scoreRow.appendChild(score);
            //above 12 rows overflow
            if (i == 12){
            break;
            }
        }

    },
    
    getRandomCell: function(){
        let gridSize = game.grid.childElementCount;
        let cellNumber= null;
        let index = null;
        let cellIndex = null;
        let rowIndex = null;
        let row = null;
        let cell = null;
        do {
            cellNumber = Math.floor((Math.random() * gridSize*gridSize) + 0);
            index = Math.floor(cellNumber/gridSize);
            cellIndex = cellNumber-index*gridSize;
            rowIndex = index+1 ;
            row = document.querySelector('.grid .row:nth-child('+rowIndex+')').childNodes;
            cell = row[cellIndex];
        } while (cell.classList.contains("target"))
        return cell;
    },
    
    addTargetProperties: async function(cell){
        cell.classList.add("target");
        cell.removeEventListener('mousedown', game.missclickHandle);
        cell.addEventListener('mousedown', game.cellClickHandle)
        await sleep(game.difficulties[game.difficulty]["time"]*0.75);
        cell.removeEventListener('mousedown', game.cellClickHandle);
        cell.addEventListener('mousedown', game.missclickHandle);
        cell.classList.remove("target");
        cell.classList.remove("target-valid");
        if (game.difficulty == "Impossible") {
            cell.classList.add("target-impossible");
        } 
    },

    addBonusTargetProperties: async function(cell){
        cell.classList.add("target-bonus");
        cell.removeEventListener('mousedown', game.missclickHandle);
        cell.addEventListener('mousedown', game.cellClickHandle);
        setTimeout(function(){
            cell.removeEventListener('mousedown', game.cellClickHandle);
            cell.addEventListener('mousedown', game.missclickHandle);
            cell.classList.remove("target-bonus");
            cell.classList.remove("target-valid");

        }, game.difficulties[game.difficulty]["time"]*0.75);

        if (game.difficulty == "Impossible") {
            cell.classList.add("target-impossible");
        } 
    },
    
    addPoints: function (points){
        game.pointCounter += points;
        if (game.pointCounter <=0) {game.pointCounter=0;};
        let scoreDisplay = document.getElementById('score-display');
        scoreDisplay.textContent = game.pointCounter;
    },
    
    cellClickHandle: async function (event){
        let target = event.currentTarget;
        let targetBonusPoint = 0;
        if(target.classList.contains("target-bonus")){
            targetBonusPoint = game.difficulties[game.difficulty]['basePoints']*2;
        }
        target.classList.remove("target");
        target.classList.remove("target-bonus");
        target.removeEventListener('mousedown', game.cellClickHandle);
        target.classList.add("target-valid");
        if (game.bonusCountdown > Date.now()){
            if (game.bonusPoint<6){
                game.bonusPoint++;
            } else if (game.bonusPoint<11){
                game.bonusPoint=game.bonusPoint+2;
            } else if (game.bonusPoint<15){
                game.bonusPoint=game.bonusPoint+3;
            }
        } else {
            game.bonusPoint = 0;
        }
        if (game.bonusPoint != 0) {
            target.classList.add("cell-bonus");
            if (game.grid.childElementCount>15){
                target.textContent ="+"+game.bonusPoint;
            }else if(game.grid.childElementCount>10){
                target.textContent ="+"+game.bonusPoint+"!";
            } else {    
                target.textContent ="Bonus+"+game.bonusPoint+"!";
            }
            setTimeout(function(){
                target.textContent ="";
                target.classList.remove('cell-bonus');
            }, 1000);
        }
        game.bonusCountdown = Date.now()+1.9*game.difficulties[game.difficulty]["time"];
        game.addPoints(game.difficulties[game.difficulty]['basePoints']+game.bonusPoint+targetBonusPoint);
        if (target.classList.contains("target-impossible")){
            let targetOverlay = document.createElement("div");
            let container = document.getElementById('container');
            targetOverlay.classList.add("overlay");
            container.appendChild(targetOverlay);
            target.classList.remove("target-impossible");
            target.classList.remove("target-valid");
            target.classList.remove("target");
            target.classList.remove("cell-missclick");
            target.classList.remove("cell:hover");
            target.removeEventListener("mousedown", game.missclickHandle);
            target.style.transition = "0";
           let posX = event.screenX;
           let posY = event.clientY;
           let x = targetOverlay.offsetLeft;
           let y = targetOverlay.offsetTop;
           let w = targetOverlay.offsetWidth;
           let h = targetOverlay.offsetHeight;
           let bgx = posX-x-w/1.7;
           let bgy = posY-y-h/1.1;

            targetOverlay.style.backgroundPosition = bgx+"px "+bgy+"px";
            game.broken = true;
            let screen = document.querySelector('.screen p');
            screen.textContent ="Game is broken...";
        }     
    },

    missclickHandle: function(event) {
        game.bonusPoint = 0;
        game.bonusCountdown = 0;
        let target = event.currentTarget;
        target.classList.add("cell-missclick");
        if (game.grid.childElementCount>15){
            target.textContent ="-10";
        }else {    
            target.textContent ="-10!";
        }
        setTimeout(function(){
            target.textContent ="";
            target.classList.remove('cell-missclick');
        }, 500);
        game.addPoints(-10);

    },

    displayEndScore: function() {
        let endGameContainer = document.getElementById("end-game-container");
        endGameContainer.style.display = "block";
        let endGame = document.getElementById("end-game");
        setTimeout(function(){endGame.style.top = "0"}, 100);
    },

    closeEndScore: function(event) {
        let endGameContainer = document.getElementById("end-game-container");
        let endGame = document.getElementById("end-game");
        endGame.style.top ="100%";
        setTimeout(function(){endGameContainer.style.display = "none"}, 500);
    },

    submitEndScoreHandle: function(e) {
        e.preventDefault();
        let userName = document.getElementById("username").value;

        let error = document.getElementById("end-game-form-error");
        if (userName.length == 0) {
            error.textContent = "I need a name."
        } else if (10 < userName.length) {
            error.textContent = "Your name's too long";
        } else if (userName.length <= 2){
            error.textContent ="Your name's too short";
        } else {
            setTimeout(function(){ error.textContent="" },1500);
            let currentScore = game.pointCounter;
            let scoreToSave = document.getElementById("score-data");
            let scoreDisplay = document.getElementById('score-display');
            let screen = document.querySelector('.screen p');
            document.getElementById("score-difficulty").value = game.difficulty;
            scoreToSave.value=currentScore;

            if(game.pointCounter != scoreDisplay.textContent){
                //if user tried to change html value
                document.getElementById("score-difficulty").value = 'cheat';
            }
            if(game.occurence != 15 || game.gridSize != 10){
                document.getElementById("score-difficulty").value = 'secret';
            }
            //if secret commands are used
            document 
            e.currentTarget.submit();

        } 
        
    },

    startGame: async function(event){
        game.pointCounter = 0;
        game.addPoints(0);
        game.closeEndScore();
        let allCells = document.getElementsByClassName('cell');
        for(let i=0 ; i<allCells.length; i++){
            allCells[i].addEventListener("mousedown", game.missclickHandle);
        }
        game.difficultyButton.removeEventListener('click', game.chooseDifficultyHandle);
        game.difficultyButton.style.backgroundColor ="grey";
        let button = event.currentTarget;
        button.removeEventListener('click', game.startGame);
        game.sizeForm.removeEventListener('submit', game.changeGridSizeSubmitHandle)
        let buttonColor = button.style.backgroundColor;
        button.style.backgroundColor ="grey";
        
        let screen = document.querySelector('.screen p');
        screen.textContent ='Get ready...';
        progress(game.difficulties[game.difficulty]["time"]/100);
        await sleep(game.difficulties[game.difficulty]["time"]);
        screen.textContent ='Game in progress...';
        if(game.gridSize != 1){
            let bonusTimer = Math.floor((Math.random() *game.occurence*game.difficulties[game.difficulty]["time"]) + 0)
            setTimeout(function(){
                game.addBonusTargetProperties(game.getRandomCell());
            }, bonusTimer);
        }
        for (let i=0; i<game.occurence ; i++) {
            if(game.broken == false){
                game.addTargetProperties(game.getRandomCell());
                await sleep(game.difficulties[game.difficulty]["time"]);
            } else if (game.broken) {
                setTimeout(() => {
                    alert('You clicked too hard you broke my game!')  
                }, 20);
                return;
            }
        }
        for(let i=0 ; i<allCells.length; i++){
            allCells[i].removeEventListener("mousedown", game.missclickHandle);
        }
        screen.textContent = 'Game is over';
        if (game.difficulty === 'Impossible'){screen.textContent = "Impossible isn't it?";}
        game.difficultyButton.addEventListener('click', game.chooseDifficultyHandle);
        game.sizeForm.addEventListener('submit', game.changeGridSizeSubmitHandle)
        game.difficultyButton.style.backgroundColor = buttonColor;
        button.style.backgroundColor = buttonColor;
        button.addEventListener('click', game.startGame);

        // End game score form display
        game.displayEndScore();
        document.getElementById("end-game-form").addEventListener("submit", game.submitEndScoreHandle);
        document.getElementById("end-game-close").addEventListener('click', game.closeEndScore);
    },
    
    clickOutside: function(event){
        
        const difChoice = document.getElementById("difficulty-choice");
        let targetElement = event.target;
        do {
            if (targetElement == difChoice) {
                return;
            }
            targetElement = targetElement.parentNode;
        } while (targetElement);
        game.removeDifficultyList();
    
    },   
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let i = 0;
function progress(ms) {
    if (i == 0) {
        i = 1;
        let elem = document.getElementById("myBar");
        let width = 1;
        let id = setInterval(frame, ms);
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
