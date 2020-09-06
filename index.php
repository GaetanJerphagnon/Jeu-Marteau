<?php

require 'php/pdo.php';

$allScores = $pdo->query(QuerySelectAllScores())->fetchAll(PDO::FETCH_ASSOC);


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="public/css/reset.css">
    <link rel="stylesheet" href="public/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet">
    <title>Hammer Game</title>
    <link rel="icon" href="public/image/viseur.png">
    <script src="https://kit.fontawesome.com/fb034f5d7d.js" crossorigin="anonymous"></script>

</head>
<body>
    <section id="container">
        <div class="infos">
            <div class="difficulty-container">
                <p id="difficulty-choice"><span><i class="fas fa-chevron-right"></i></span> Difficulty</p>
                <p id="difficulty-display" class=""></p>

            </div>
            <div class="screen-container">
                <i class="fas fa-tv"></i>
                <div class="screen">
                    <p>
                        <div id="myProgress">
                            <div id="myBar"></div>
                        </div>
                    </p>
                </div>
                <div class="secret-options-display-container"><p id="grid-size-display"></p><p id="occurence-display"></p></div>

                </div>
            <div class="rules-container">
                <div class="rules">
                    <p>Rules are simple :</p>
                    <hr>
                    <p>Some cells will turn into another color.</p>
                    <p>It will occur <strong>15</strong> times. +1 bonus</p>
                    <p>You have to click on them as fast as you can.</p>
                    <p>Earn points by doing so and score high !</p>
                    <p>Select a difficulty and click on Start button below.</p>
                </div>
                <button id="start-button">Start!</button>
            </div>
        </div>
        <section id="grid-container">
            <div class="grid">
            </div>
        </section>
        <div id="scores-container">
            <div id="secret-commands">
                <p>You found some secret commands!</p>
                <p>You will not be able to save your scores using those</p>
                <form id="size-container"><button class="secret-option">Choose grid size</button><input type="int" id="size-input" class="secret-inputs" placeholder="1...20"></form>
                <form id="occurence-container"><button class="secret-option">Choose occurences</button><input type="int" id="occurence-input" class="secret-inputs" placeholder="1...50"></form>

            </div>
            <div class="scores">
                <div id="secret"></div>
                <div class="your-score">
                    <span class="score-title">Your score</span>
                    <p id="score-display">0</p>
                </div>
                <div class="top-scores">
                    <p>Top scores</p>
                    <hr>
                    <table>
                    </table>

                </div>
            </div>
        </div>
        <div id="end-game-container">
            <div id="end-game">
                <div id="end-game-close">X</div>
                <div id="end-game-suggestion">Looks like you are at the top</div>
                <div id="end-game-question">Would you like to save your score?</div>
                <form id="end-game-form" action="php/add-score.php" method="POST" class="end-game-form">
                    <div><label for="username">Your name  </label><input type="text" id="username" name="username" placeholder="10 chars max"></div>
                    <input id="score-data" class="hidden" type="int" name="score">
                    <input id="score-difficulty" class="hidden" type="text" name="score-difficulty">
                    <div id="end-game-form-error"> </div>
                    <button id="end-game-button" type="submit">Save!</button>
                </form>
            </div>
        </div>
    </section>

    
    
    <script> 
    let allScores = <?php json_encode($allScores); ?>;
    </script>
    <script src='public/js/script.js' ></script>
</body>
</html>