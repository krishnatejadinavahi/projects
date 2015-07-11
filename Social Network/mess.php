<?php
$value1=$_POST['uid'];
$value2=$_POST['frn'];
$value3=$_POST['ms'];

$temp=-1;
$temp2=-1;
$string = file_get_contents("mesa.json");
$j=json_decode($string,true);

$j1=(array)$j;

$newArray = array_keys($j1);

if(count($newArray)==0)
{
	$j1[$value2]['0'][$value1]['0']=$value3;
}

else
{
	
	for($kk=0;$kk<count($newArray);$kk++)
	{
		if($newArray[$kk]==$value2)
		{
			$temp=0;
			break;
		}
	}
	
	if($temp!=0)
	{
		$j1[$value2]['0'][$value1]['0']=$value3;
	}
	else
	{
		$co=count($j1[$value2]['0']);
		
		for($pp=0;$pp<$co;$pp++)
		{
			//echo "----------------".$j1[$value1]['0'][$value2]."   ".$value2."------------";
			
			
			$keya=array_keys($j1[$value2]['0']);
			
			
			for($xx=0;$xx<count($keya);$xx++)
			{
				if($keya[$xx]==$value1)
				{
					$temp2=0;
					break;
				}
			}
		}
		if($temp2!=0)
		{
			$j1[$value2]['0'][$value1]['0']=$value3;
			//$j1[$value1]['0'][$value2]['0']=$value3;
			
		
		}
		else 
		{
			echo "no wayyyyyy";
		
			$co1=count($j1[$value2]['0'][$value1]);
			
			$j1[$value2]['0'][$value1][$co1]=$value3;
		}
	}
	
	
}

$string = json_encode($j1);
file_put_contents('mesa.json', $string);

echo $value1." ".$value2." ".$value3;

?>