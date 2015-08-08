<?php
include 'connection.php';
$name=$_POST['movie'];

$query="SELECT * FROM movies WHERE name='$name' AND status='APPROVED'";

$result=mysql_query($query);

if(mysql_num_rows($result)==0)
{
	echo -1;
}
?>