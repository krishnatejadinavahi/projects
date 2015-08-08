<?php
include 'connection.php';
$name=$_POST['name'];
$link=$_POST['link'];
$desc=$_POST['desc'];
$rate=$_POST['rate'];
$image=$_POST['image'];
$uname=$_POST['uname'];
$val=0;
/*$query1="SELECT MAX(ind) FROM movies";
$result1=mysql_query($query1);

echo $result1['ind'];*/

$query="INSERT INTO movies VALUES ('$val','$name','$link','$desc','$rate','$image','PENDING','$uname')";
mysql_query($query);
?>