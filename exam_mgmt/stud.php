<?php

$value1=$_POST['to'];

$string=file_get_contents("data/paper.json");
$j=json_decode($string,true);

if(array_key_exists($value1, $j)==FALSE)
{
	echo -1;
}
else
echo count($j[$value1]);

?>