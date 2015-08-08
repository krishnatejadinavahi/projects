<?php
include 'connection.php';

$ind=$_POST['ind'];
$name=$_POST['name'];
$links=$_POST['links'];
$description=$_POST['description'];
$rating=$_POST['rating'];
$image=$_POST['image'];
$uname=$_POST['uname'];
$query="SELECT * FROM movies WHERE name='$name' AND status='APPROVED'";
$result=mysql_query($query);
if(mysql_num_rows($result)==0)
{
	$query1="DELETE FROM movies where ind='$ind'";
	mysql_query($query1);
	$query2="INSERT INTO movies VALUES ('$ind','$name','$links','$description','$rating','$image','APPROVED','$uname')";
	mysql_query($query2);
	$query3="UPDATE userrate SET status='APPROVED' where uname='$uname' AND mname='$name'";
	mysql_query($query3);
	echo 1;
}
else 
{
	$query1="DELETE FROM movies where ind='$ind'";
	mysql_query($query1);
	$query2="UPDATE movies SET links='$links',description='$description',image='$image',uname='$uname' WHERE name='$name' AND status='APPROVED'";
	mysql_query($query2);
}
?>