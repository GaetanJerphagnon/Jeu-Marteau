<?php

 $username = filter_input(INPUT_POST,'username',FILTER_SANITIZE_STRING);
 $score = filter_input(INPUT_POST,'score',FILTER_SANITIZE_NUMBER_INT);
 $scoreDifficulty = filter_input(INPUT_POST,'score-difficulty',FILTER_SANITIZE_STRING);
if (strlen($username)>10 || strlen($username)<=0){
    throw new Error('Il y a eu une erreur, votre nom n\'est pas valide');
}
var_dump($username);
var_dump($score);
var_dump($scoreDifficulty);

require 'pdo.php';


$allScores = $pdo->query(QuerySelectAllScoresByDifficulty($scoreDifficulty, $username))->fetchAll(PDO::FETCH_ASSOC);
var_dump($allScores);

if ($scoreDifficulty !== 'secret'){

    if(!empty($allScores)){
        if ($allScores[0]['score'] < $score){
            $pdo->exec("DELETE FROM `scores` WHERE `playername` = '$username' ;"); 
            $pdo->exec(saveScore($username, $scoreDifficulty, $score));
        }
    } else {
        $pdo->exec(saveScore($username, $scoreDifficulty, $score));  
    };
}

header('Location: ../index.php');
