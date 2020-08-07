<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/style.css">
    <title>Document</title>
</head>
<body>
    <section class="container">
        <div class="grid">

                    <?php 
                for ($i = 0; $i<5; $i++) {
                    echo '<div class="row">';
                    for ($i2 = 0; $i2<5; $i2++) {
                        echo '<div class="cell"></div>'; 
                    }
                    echo '</div>';
                }
                ?>
        </div>
    </section>
</body>
</html>