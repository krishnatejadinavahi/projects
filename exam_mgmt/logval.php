<?php
class mm
{
	function aa($value1,$value2)
	{
		$string=file_get_contents("data/regis.json");
		$j=json_decode($string,true);
		
		if(array_key_exists($value1, $j))
		{
			if($j[$value1]==$value2)
			{
				echo 1;
			}
			else 
			{
				echo -1;
			}
		}
		else
		{
			echo -1;
		}
	}
	
	
	function aa1($value1,$value2)
	{
		$string=file_get_contents("data/teach.json");
		$j=json_decode($string,true);
	
		if(array_key_exists($value1, $j))
		{
			if($j[$value1]==$value2)
			{
				echo 1;
			}
			else
			{
				echo -1;
			}
		}
		else
		{
			echo -1;
		}
	}
}

if(isset($_POST['uid']))
{
	$m1=new mm();
	if($_POST['t']==0)
	{
	$m1->aa($_POST['uid'],$_POST['pwd']);
	}
	else 
	{
		$m1->aa1($_POST['uid'],$_POST['pwd']);
	}
}
?>