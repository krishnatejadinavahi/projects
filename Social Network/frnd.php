<?php
$k=-1;

$p=-100;
$value1=$_POST['uid'];

$value2=$_POST['frn'];


$string = file_get_contents("frnlis.json");
$j=json_decode($string,true);

$j1=(array)$j;

$newArray = array_keys($j1);






$string1 = file_get_contents("log.json");
$j11=json_decode($string1,true);

$j12=(array)$j11;

$newArray1 = array_keys($j12);


for($kk=0;$kk<count($newArray1);$kk++)
{
	
	$val=substr($newArray1[$kk],4,strlen($newArray1[$kk]));
	$vall2=str_replace("+", " ", $val);
	if($value2==$vall2)
	{
	$p=0;	
	}
}



if($p==0)
{
for($i=0;$i<count($j1);$i++)
{
	if($value1==$newArray[$i])
	{
		for($f=0;$f<count($j1[$newArray[$i]]['0']);$f++)
		{
			
			if($value2==$j1[$value1]['0'][$f])
			{
				
				$k=1;
				break;
				
			}
		}
	}
}


echo $k;
}
else
{
	echo $p;
}


//echo $j1[$value1]['0']['1'];
   
//echo count($j1[$newArray[0]][$ff]);

?>