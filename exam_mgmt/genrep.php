<?php


$value1=$_POST['uid'];

$string=file_get_contents("data/scores.json");
$j=json_decode($string,true);

echo json_encode($j[$value1]);
?>