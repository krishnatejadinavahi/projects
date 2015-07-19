<?php

class mm
{
	function aa($value1,$value2)
	{
		$string=file_get_contents("data/paper.json");
		$j=json_decode($string,true);
		echo json_encode($j[$value2][$value1]);
	}
}

$m1=new mm();

$m1->aa($_POST['coun'],$_POST['token']);
?>