<?php

$value1=$_POST['uid'];
$string=file_get_contents("data/clasdi.json");
$j=json_decode($string,true);

//echo json_encode($j[$value1]);

echo json_encode(array_keys($j[$value1]));



?>
