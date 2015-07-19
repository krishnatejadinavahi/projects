<?php

$value1=$_POST['uid'];
$value2=$_POST['token'];


$string=file_get_contents("data/scores.json");
$j=json_decode($string,true);

if(isset($j[$value1][$value2]))
{
echo $j[$value1][$value2];
}
?>