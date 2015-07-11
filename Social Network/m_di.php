<?php

$value1=$_POST['uid'];



$string = file_get_contents("mesa.json");
$j=json_decode($string,true);
$j1=(array)$j;
echo json_encode($j1[$value1]['0']);

?>