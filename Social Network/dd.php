<?php

$value1=$_POST['uid'];
$value2=$_POST['ser'];

$loo=0;

$string = file_get_contents("dislikes.json");
$j=json_decode($string);

$j1=(array)$j;

$newArray = array_keys($j1);
$kk=0;
$cha=-1;
$temp=0;
if(count($newArray)!=0)
{
for($kk=0;$kk<count($newArray);$kk++)
{

	if($newArray[$kk]==$value2)
	{
		

	$co=count($j1[$value2]['0']);
	
	for($pp=0;$pp<$co;$pp++)
	{
		if($j1[$value2]['0'][$pp]==$value1)
		{
			
			
			$temp=-1;
			
		}
	}
	if($temp!=-1)
	{
	$j1[$value2]['0'][$co]=$value1;
	
	$loo++;
	
	}

	$cha=0;
	break;
	}
}
	if($cha==-1) 
	{
		

		$j1[$value2]['0']['0']=$value1;
		array_push($newArray,$value2);
	}


}
else
{
	$j1[$value2]['0']['0']=$value1;
}

$string = json_encode($j1);
file_put_contents('dislikes.json', $string);




/*--------------------------------------------------------------------------------------------*/


$string_ne = file_get_contents("count.json");
$j_ne=json_decode($string_ne,true);

$j1_ne=(array)$j_ne;

$newArray_ne = array_keys($j1_ne);

$trav=0;


$string = file_get_contents("dislikes.json");
$j=json_decode($string);

$j1=(array)$j;

$newArray = array_keys($j1);




if(count($newArray_ne)==0)
{
	$j1_ne[$value2]['0']['lik']=0;
	$j1_ne[$value2]['0']['disl']=1;
}


else
{
$yy=-1;
$tempo=0;
for($trav=0;$trav<count($newArray_ne);$trav++)	
{
$co=count($j1[$value2]['0']);
if($newArray_ne[$trav]==$value2)
{
	
	for($ww=0;$ww<$co;$ww++)
	{
	
	if($j1[$value2]['0'][$ww]==$value1&&$loo%2==0&&$j1_ne[$value2]['0']['disl']!=0)
	{
	

	$j1_ne[$value2]['0']['disl']=$j1_ne[$value2]['0']['disl']-1;

	$j1[$value2]['0'][$ww]="";

	$tempo=-1;
	echo -10;
	}
	}
	if($tempo!=-1)
	{
	$j1_ne[$value2]['0']['disl']=$j1_ne[$value2]['0']['disl']+1;
	}
	$yy=0;
//	$tempo=0;
}

}
if($yy==-1)
{
	
	$j1_ne[$value2]['0']['lik']=0;
	$j1_ne[$value2]['0']['disl']=1;
}


}

$string_ne = json_encode($j1_ne);
file_put_contents('count.json', $string_ne);

$string = json_encode($j1);
file_put_contents('dislikes.json', $string);


?>