<?php 
class val
{
function send($value1)
{
echo $value1;
}

function inser($value1,$value2)
{
$string=file_get_contents("data/regis.json");
$j=json_decode($string,true);

if(array_key_exists($value1, $j)==TRUE)
{
	echo -1;
}
else 
{
$j[$value1]=$value2;
$string=json_encode($j);
file_put_contents("data/regis.json", $string);
}
}

function inser1($value1,$value2)
{
	$string=file_get_contents("data/teach.json");
	$j=json_decode($string,true);

	if(array_key_exists($value1, $j)==TRUE)
	{
		echo -1;
	}
	else
	{
		$j[$value1]=$value2;
		$string=json_encode($j);
		file_put_contents("data/teach.json", $string);
	}
}


}

if(isset($_POST['uid']))
{
$v1=new val();
if($_POST['t']==0)
{
$v1->inser($_POST['uid'],$_POST['pwd']);
}
else
{
	$v1->inser1($_POST['uid'],$_POST['pwd']);
}
}

?>
