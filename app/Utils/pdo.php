<?php

$configData = parse_ini_file(__DIR__.'/../config.ini');

$pdo = new PDO("mysql:host={$configData['DB_HOST']};dbname={$configData['DB_NAME']};charset=utf8",
    $configData['DB_USERNAME'],
    $configData['DB_PASSWORD'], array(
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
    return "SELECT `playername` FROM scores WHERE difficulty = 'cheater' ;";
}

function saveScore($playerName, $difficulty, $score) {
        $date = date("Y-m-d H:i:s");

        return "INSERT INTO scores (`playername`, `difficulty`, `score`, `date`)
                VALUES ('$playerName', '$difficulty', '$score', '$date');
                ;"
        ;
};
