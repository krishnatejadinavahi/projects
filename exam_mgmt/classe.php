<?php

class mm
{

function aa($value1,$value2,$value3)
{	

$string=file_get_contents("data/regis.json");
$j=json_decode($string,true);


if(array_key_exists($value3, $j))
{

$string=file_get_contents("data/clasdi.json");
$j=json_decode($string,true);

if(count($j[$value1][$value2]['names'])==0)
{
$j[$value1][$value2]['names']=[];
}


if(array_search($value3, $j[$value1][$value2]['names'])===FALSE)
{
array_push($j[$value1][$value2]['names'],$value3);

$string=json_encode($j);
file_put_contents("data/clasdi.json", $string);
}
}
else 
{
	//echo -100;
}
}	

}

$m1=new mm();

$m1->aa($_POST['uid'],$_POST['subject'],$_POST['studn']);

?>