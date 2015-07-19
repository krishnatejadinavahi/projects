<?php
$value1=$_POST['uid'];

$value2=$_POST['course'];

$string=file_get_contents("data/teach.json");
$j=json_decode($string,true);


$a1=array_keys($j);

$string1=file_get_contents("data/clasdi.json");
$j1=json_decode($string1,true);

$a3=array();

foreach($a1 as $val1)
{

if(isset($j1[$val1]))
{
	
	for($vv=0;$vv<count($j1[$val1][$value2]['names']);$vv++)
	{
		if($j1[$val1][$value2]['names'][$vv]==$value1)
		{
			$j1[$val1][$value2]['names'][$vv]='';
		
			$a3=array_filter($j1[$val1][$value2]['names']);
			
			//array_replace($j1[$val1][$value2]['names'], $a3);
			
			array_replace_recursive($j1[$val1][$value2]['names'], $a3);
			
			break;
		//unset($j1[$val1][$value2]['names'][$vv]);
		}
	}
	//}

}
}
//echo json_encode($a3);

//echo count($a3);
$string1=json_encode($j1);
file_put_contents("data/clasdi.json", $string1);

?>