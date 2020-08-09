let game = {
    init: function(){
        console.log('Js Chargé')
        let difficultyButton = document.getElementById('difficulty-choice');
        difficultyButton.addEventListener('click', game.chooseDifficultyHandle);

        let startButton = document.getElementById('start-button');
        startButton.addEventListener('click', game.startGame);
        let difficulty = 'Medium';
        game.setDifficulty(difficulty);
        
    },

    generateCells: function(){
        let grid = document.querySelector('#grid-container .grid');
        console.log(grid);
        for (let i=0; i<5 ; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            console.log(row);
            for (let i2=0; i2<5 ; i2++){
                let cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
                console.log(cell);
            }
            grid.appendChild(row);
        }
    },
    
    setDifficulty: function(mode) {
        let display = document.getElementById('difficulty-display');
        let colorSet =[]
        
        for(d in difficulties) {
            if (mode == d) {
                difficulty = d;
                difficultyTimer = difficulties[d].t;
                for (color in difficulties[d]){
                    colorSet.push(difficulties[d][color]);
                }
                colorSet.splice(8,1);
               game.setColors(colorSet);
            }
        }
        display.textContent = difficulty;
        display.classList ="";
        display.classList.add('dif-'+difficulty.toLowerCase());
    },

    setColors: function(){
        let container = document.getElementById('container');
        container.classList = '';
        container.classList.add('container-'+difficulty.toLowerCase());
        console.log(container);

        let infos = document.querySelector('.infos');
        infos.classList = '';
        infos.classList.add('infos');
        infos.classList.add('infos-'+difficulty.toLowerCase());
        console.log(infos);

        let scores = document.querySelector('.scores');
        scores.classList = '';
        scores.classList.add('scores');
        scores.classList.add('scores-'+difficulty.toLowerCase());
        console.log(scores);

        let difChoose = document.getElementById('difficulty-choice');
        difChoose.classList = '';
        difChoose.classList.add('difficulty-container-'+difficulty.toLowerCase());
        console.log(difChoose);

        let startButton = document.getElementById('start-button');
        startButton.classList = '';
        startButton.classList.add('start-button-'+difficulty.toLowerCase());
        console.log(startButton);

        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList = '');
        cells.forEach(cell => cell.classList.add('cell'));
        cells.forEach(cell => cell.classList.add('cell-'+difficulty.toLowerCase()));
        console.log(cells);

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
        return;
    },
    
    removeDifficultyList: function(){
        let options = document.getElementById('options');
        while (options.lastElementChild) {
        options.removeChild(options.lastElementChild);
        };
        options.parentNode.removeChild(options);
        
},

getRandomCell: async function(){
    let cellNumber = Math.floor((Math.random() * 25) + 1);
        let cell = 0;
        if (cellNumber <= 5) {

            let row = document.querySelector('.grid .row:nth-child(1)').childNodes;
            cell = row[cellNumber-1];
        } else if (cellNumber > 5 && cellNumber <=10 ) {
            cellNumber -= 5;
            let row = document.querySelector('.grid .row:nth-child(2)').childNodes;
            cell = row[cellNumber-1];
        } else if (cellNumber > 10 && cellNumber <=15 ) {
            cellNumber -= 10;
            let row = document.querySelector('.grid .row:nth-child(3)').childNodes;
            cell = row[cellNumber-1];
        } else if (cellNumber > 15 && cellNumber <=20 ) {
            cellNumber -= 15;
            let row = document.querySelector('.grid .row:nth-child(4)').childNodes;
            cell = row[cellNumber-1];
        } else if (cellNumber > 20 && cellNumber <=25 ) {
            cellNumber -= 20;
            let row = document.querySelector('.grid .row:nth-child(5)').childNodes;
            cell = row[cellNumber-1];
        }

        cell.classList.add("target");
        cell.addEventListener('click', game.cellClickHandle)
        await sleep(difficultyTimer*0.75);
        cell.removeEventListener('click', game.cellClickHandle)
        cell.classList.remove("target");
        cell.classList.remove("target-valid");
    },

    addPoints: function (points){
        pointCounter += points;
        let scoreDisplay = document.getElementById('score-display');
        scoreDisplay.textContent = pointCounter;
    },

    cellClickHandle: function (event){
        let target = event.currentTarget;
        game.addPoints(1/difficultyTimer*100000);
        target.removeEventListener('click', game.cellClickHandle);
        target.classList.remove("target");
        target.classList.add("target-valid");
    },

    startGame: async function(event){
        pointCounter = 0;
        game.addPoints(0);
        let difficultyButton = document.getElementById('difficulty-choice');
        difficultyButton.removeEventListener('click', game.chooseDifficultyHandle);
        difficultyButton.style.backgroundColor ="grey";
        let button = event.currentTarget;
        button.removeEventListener('click', game.startGame);
        let buttonColor = button.style.backgroundColor;
        button.style.backgroundColor ="grey";

        let screen = document.querySelector('.screen p');
        screen.textContent ='Game starting...';
        progress(difficultyTimer/100);
        await sleep(difficultyTimer*1.1);
        screen.textContent ='Game in progress...';

        for (let i=0; i<10 ; i++) {
            game.getRandomCell();
            await sleep(difficultyTimer);
        }

        screen.textContent = '';
        difficultyButton.addEventListener('click', game.chooseDifficultyHandle);
        difficultyButton.style.backgroundColor = buttonColor;
        button.style.backgroundColor = buttonColor;
        button.addEventListener('click', game.startGame);
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

difficulties = {
    'Easy':         {'c1': '#007304', 'c2': '#4ae440', 'c3': '#29a027', 'c4': '#73d076', 'c5': '#016e09', 'c6': '#7deb8b', 'c7': '#24b522', 'c8': '#b9deb0','t': 2000},
    'Medium':       {'c1': '#002e73', 'c2': '#4095e4', 'c3': '#275ca0', 'c4': '#73a3d0', 'c5': '#01236e', 'c6': '#7daaeb', 'c7': 'royalblue', 'c8': 'lightsteelblue','t': 1100},
    'Hard':         {'c1': '#730000', 'c2': '#e44040', 'c3': '#a02727', 'c4': '#d07373', 'c5': '#6e0101', 'c6': '#eb7d7d', 'c7': '#b52222', 'c8': '#deb0b0','t': 800},
    'Impossible':   {'c1': '#151515', 'c2': '#737373', 'c3': '#4e4e4e', 'c4': '#adadad', 'c5': '#333333', 'c6': '#cac9c9', 'c7': '#464646', 'c8': '#d0d0d0','t': 250}
};
let pointCounter = 0;
let difficultyTimer = 0;
game.generateCells();
game.init();