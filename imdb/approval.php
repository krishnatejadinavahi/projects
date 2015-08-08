<?php
include 'connection.php';
$query="SELECT * FROM movies WHERE status!='APPROVED'";
$result=mysql_query($query);
$arr=array();
while($pe=mysql_fetch_array($result))
{
	array_push($arr, $pe['ind']);
}

echo json_encode($arr);
?>