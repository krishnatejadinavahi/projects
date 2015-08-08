<?php
include 'connection.php';
$mname=$_POST['mname'];

$query="SELECT * FROM movies WHERE name='$mname' AND status='APPROVED'";
$result=mysql_query($query);
echo json_encode(mysql_fetch_array($result));
?>