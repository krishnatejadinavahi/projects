<?php
$value1=$_POST['uid'];

$string=file_get_contents("data/teach.json");
$j=json_decode($string,true);


$a1=array_keys($j);

$string1=file_get_contents("data/clasdi.json");
$j1=json_decode($string1,true);

$a2=array_keys($j1);

$a3=array();

foreach($a1 as $val1)
{

if(isset($j1[$val1]))
{
$a4=array_keys($j1[$val1]);


foreach($a4 as $val2)
{
	//if(isset($j1[$val1])&&isset($j1[$val1][$val2])&&isset($j1[$val1][$val2]['names']))
	//{
	
	
	/*if(array_search($value1,$j1[$val1][$val2]['names']))
	{

		array_push($a3, $val2);
		
	}*/
	
	for($vv=0;$vv<count($j1[$val1][$val2]['names']);$vv++)
	{
		if($j1[$val1][$val2]['names'][$vv]==$value1)
		{
			array_push($a3, $val2);
		}
	}
	//}
}
}
}
echo json_encode($a3);

//echo count($a3);
//$string1=json_encode($j1);
//file_put_contents("data/clasdi.json", $j1);
?>