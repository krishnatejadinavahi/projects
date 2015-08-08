<?php

include 'connection.php';
$name=$_POST['name'];
$query="SELECT * FROM movies WHERE name='$name' AND status='APPROVED'";
$result=mysql_query($query);

echo json_encode(mysql_fetch_array($result));

?>