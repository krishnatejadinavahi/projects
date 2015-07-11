<?php
$value1 = $_POST['a'];
$value2 = $_POST['b'];

$string = file_get_contents("upic.json");
$j=json_decode($string);

$val1=(string)$value1;

$vall1=str_replace("+", " ", $val1);

$val11=substr($vall1,4,strlen($val1));

$j->$val11=$value2;
$string = json_encode($j);
file_put_contents('upic.json', $string);

echo $val11;
?>