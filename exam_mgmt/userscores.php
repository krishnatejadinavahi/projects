<?php

$value1=$_POST['uid'];
$value2=$_POST['token'];
$value3=$_POST['score'];

$string=file_get_contents("data/scores.json");
$j=json_decode($string,true);

$j[$value1][$value2]=$value3;

$string=json_encode($j);
file_put_contents("data/scores.json",$string);


?>