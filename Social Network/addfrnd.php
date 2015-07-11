<?php

$value1=$_POST['uid'];
$value2=$_POST['frn'];
$k=-1;
$co=-1;
$string = file_get_contents("frnlis.json");
$j=json_decode($string,true);

$j1=(array)$j;


$newArray = array_keys($j1);
$i=0;
do
//for($i=0;$i<count($j1);$i++)
{
	if($value1==$newArray[$i])
	{
		
		$co=count($j1[$value1]['0']);
		
		$j1[$value1]['0'][$co]=$value2;
		$k=0;
	}
	
$i++;	
	
}while($i<count($j1));

if($k==-1)
{
	$value3=substr($value1,4);
	//$j1[$value1]=["0"=>$value3,"1"=>$value2];
	
	$j1[$value1]['0']['0']=$value3;
	$j1[$value1]['0']['1']=$value2;
	
}
$string = json_encode($j1);
file_put_contents('frnlis.json', $string);

echo $k;


?>