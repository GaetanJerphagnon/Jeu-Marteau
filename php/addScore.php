<?php

// $username = filter_input(INPUT_POST,'username',FILTER_SANITIZE_STRING);
// $score = filter_input(INPUT_POST,'score',FILTER_SANITIZE_NUMBER_INT);
// $scoreDifficulty = filter_input(INPUT_POST,'score-difficulty',FILTER_SANITIZE_STRING);

// if (strlen($username)>10 || strlen($username)<=0){
//     throw new Error('Il y a eu une erreur, votre nom n\'est pas valide');
// }
// require('../data/scores.php');

// $scoreInfos = [$username,$score];

// function saveScore($scoreInfos, $scoreDifficulty, $scores) {
//     if (is_array($scoreInfos)) {
//         //$phpContent = '$scores'.$scoreDifficulty.' = '.var_export($scoreInfos,1).';'.PHP_EOL;
//         //file_put_contents('../data/scores.php', $phpContent, FILE_APPEND);
//         foreach($scores as $key => $difficulty) {
//             if($scoreDifficulty === $key) {
//                 var_dump($difficulty);
//                 $difficulty[] = [$scoreInfos[0], $scoreInfos[1]];
//                 var_dump($difficulty);
//             }
//         }

//         return true;
//     } else {
//         echo '$score n\'est pas un tableau<br>';
//         return false;
//     }
// };


// saveScore($scoreInfos, $scoreDifficulty, $scores);

header('Location: ../index.html');
var_dump($username);
var_dump($score);
var_dump($scoreDifficulty);
