<?php

 $pdo = new PDO('mysql:host=localhost;dbname=hammer;charset=UTF8', 'root', 'wow123', array(
    \PDO::ATTR_EMULATE_PREPARES => false,
    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
));

function QuerySelectAllScores(){
    return "SELECT * FROM scores ORDER BY `score` DESC, `date` DESC;";
}

function QuerySelectAllScoresByDifficulty($difficulty, $playerName =""){
    if($playerName === ""){
        return "SELECT * FROM scores WHERE `difficulty` = '$difficulty' ORDER BY `date` ASC ;";
    } else {
        return "SELECT * FROM scores WHERE `playername` = '$playerName' AND `difficulty` = '$difficulty' ORDER BY `date` DESC;";
    }
}

function QuerySselectAllCheaters(){
    return "SELECT `playername` FROM scores WHERE difficulty = cheater ;";
}

function saveScore($playerName, $difficulty, $score) {
        $date = date("Y-m-d H:i:s");

        return "INSERT INTO scores (`playername`, `difficulty`, `score`, `date`)
                VALUES ('$playerName', '$difficulty', '$score', '$date');
                ;"
        ;
};
