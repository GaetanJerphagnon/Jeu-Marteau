<?php

require 'app/Utils/pdo.php';

$allScores = $pdo->query(QuerySelectAllScores())->fetchAll(PDO::FETCH_ASSOC);

echo $allScores;

?>
