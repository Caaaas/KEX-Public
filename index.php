<?php
$root = $_SERVER['DOCUMENT_ROOT'];
require_once $root . '/general/functions.php';
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css">

    <title>KEX!</title>
</head>
<body>
<div class="fill" id="step_one">
    <div class="container">
        <h3>Hitta på KTH</h3>
        <div class="form-group">
            <label for="input_one">Ange en kurskod eller en sal.</label>
            <input name="input_one" type="text" class="form-control" id="input_one" placeholder="">
            <small class="text-danger"></small>
        </div>
        <div class="form-group">
            <label for="input_one">Ange en kurskod, en sal eller lämna tom.</label>
            <input name="input_two" type="text" class="form-control" id="input_two" placeholder="">
            <small class="text-danger"></small>
        </div>
        <button type="submit" class="btn btn-primary" id="submit_one">Submit</button>
    </div>
</div>
<div class="fill hide" id="step_two">
    <div class="container">
    </div>
</div>

<div class="fill hide" id="step_three">
    <div class="container">

    </div>
</div>

<div class="fill hide" id="step_four">
    <div class="container">

    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="general/step_one.js"></script>
<script src="general/step_two.js"></script>
<script src="general/step_three.js"></script>
<script src="general/step_four.js"></script>
<script type="text/javascript">
    var one = null;
    var two = null;
    var data;

    function scrollTo(id)
    {
        $('html, body').animate({
            scrollTop: $("#step_" + id).offset().top
        }, 1000);
    }
</script>
</body>
</html>