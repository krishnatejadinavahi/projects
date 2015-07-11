<?php

$value1=$_POST['usr'];

$string = file_get_contents("count.json");
$j=json_decode($string,true);

$j1=(array)$j;
$newArray = array_keys($j1);

$kk;
$temp=-1;
$ret=-1;

for($kk=0;$kk<count($newArray);$kk++)
{
	if($newArray[$kk]==$value1)
	{
	$temp=0;
	break;	
	}
}

if($temp==-1)
{
	echo -100;
}
else
{
	//$ar=array($j1[$value1]['0']['lik'],$j1[$value1]['0']['disl']);
	
	//echo $j1[$value1]['0']['lik'].",".$j1[$value1]['0']['disl'];
	
	//$ar=$j1[$value1]['0']['lik']." ".$j1[$value1]['0']['disl'];
	
	$ar=array();
	$ar['u']=$j1[$value1]['0']['lik'];
	$ar['i']=$j1[$value1]['0']['disl'];
	
	
	
	echo json_encode($ar);
}










?>