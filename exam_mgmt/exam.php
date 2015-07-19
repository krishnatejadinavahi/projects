<?php

$value1=$_POST['toke'];
$value2=$_POST['q'];
$value3=$_POST['o1'];
$value4=$_POST['o2'];
$value5=$_POST['o3'];
$value6=$_POST['o4'];
$value7=$_POST['o5'];


$string=file_get_contents("data/paper.json");

$j=json_decode($string,true);

$co=count($j[$value1]);

//$co=count($j['203014']);

	$j[$value1][$co+1]['0']=$value2;
	$j[$value1][$co+1]['1']=$value3;
	$j[$value1][$co+1]['2']=$value4;
	$j[$value1][$co+1]['3']=$value5;
	$j[$value1][$co+1]['4']=$value6;
	$j[$value1][$co+1]['5']=$value7;


$string=json_encode($j);
file_put_contents("data/paper.json", $string);
?>