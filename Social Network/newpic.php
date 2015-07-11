<?php


$value1=$_POST['uid'];

echo $value1;

$string=file_get_contents("count.json");

$j=json_decode($string,true);

$j1=(array)$j;

$newArray = array_keys($j1);

$j1[$value1]['0']['lik']=0;

$j1[$value1]['0']['disl']=0;

$string = json_encode($j1);
file_put_contents('count.json', $string);
?>