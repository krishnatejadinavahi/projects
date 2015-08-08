<?php
include 'connection.php';
$uname=$_POST['uname'];
$mname=$_POST['mname'];
$query="SELECT rate FROM userrate WHERE uname='$uname' AND mname='$mname'";
$result=mysql_query($query);
if(mysql_num_rows($result)==0)
{
	echo 0;
}
else
{
	echo mysql_fetch_array($result)['rate'];
}
?>