<?php

$value1=$_POST['frn'];
$vall1=str_replace("+", " ", $value1);

$value2=0;

$string = file_get_contents("upic.json");
$j=json_decode($string);

$j1=(array)$j;

$newArray = array_keys($j1);

for($i=0;$i<count($j1);$i++)
{
if($vall1==$newArray[$i])
{
	$value2=$j1[$vall1];
	break;
}
else
{
	continue;
}
}
echo $value2;
?>