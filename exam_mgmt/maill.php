<?php

$value1=$_POST['uid'];
$value2=$_POST['course'];
$value3=$_POST['token'];

//echo $value1." ".$value2." ".$value3;

$string=file_get_contents("data/clasdi.json");

$j=json_decode($string,true);


echo json_encode($j[$value1][$value2]['names']);


?>