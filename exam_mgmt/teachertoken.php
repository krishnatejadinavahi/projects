<?php

$value1=$_POST['uid'];
$value2=$_POST['course'];
$value3=$_POST['token'];



$string=file_get_contents("data/clasdi.json");
$j=json_decode($string,true);

//$j[$value1][$value2]['tokens']


if(count($j[$value1][$value2]['tokens'])==0)
{
	$j[$value1][$value2]['tokens']=[];
}

	array_push($j[$value1][$value2]['tokens'],$value3);


$string=json_encode($j);
file_put_contents("data/clasdi.json", $string);
?>