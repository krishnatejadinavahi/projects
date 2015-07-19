<?php

$value1=$_POST['rnd'];


$string=file_get_contents("data/paper.json");
$j=json_decode($string,true);

$j[$value1]=NULL;


$string=json_encode($j);
file_put_contents("data/paper.json", $string);

?>