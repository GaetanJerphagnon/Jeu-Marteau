<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        for ($i = 0; $i<10; $i++) {
            echo '<div class="row">';
            for ($i2 = 0; $i2<10; $i2++) {
                echo '<div class="cell"></div>'; 
            }
            echo '</div>';
        }
    ?>
</body>
</html>