<?php

include 'connection.php';

$uname=$_POST['uname'];
$mname=$_POST['mname'];
$rate=$_POST['rate'];

$query="SELECT * FROM userrate WHERE uname='$uname' AND mname='$mname'";
$result=mysql_query($query);
if(mysql_num_rows($result)==0)
{
	$query3="SELECT status FROM movies WHERE name='$mname' AND uname='$uname'";
	$result2=mysql_query($query3);
	$pp=mysql_fetch_array($result2)['status'];
	
	if($pp=="")
	{
		$pp='APPROVED';
	}

	$query1="INSERT INTO userrate VALUES('$uname','$mname','$rate','$pp')";
	mysql_query($query1);
}
else
{
	
	$query3="SELECT status FROM movies WHERE name='$mname' AND uname='$uname'";
	$result2=mysql_query($query3);
	$pp=mysql_fetch_array($result2)['status'];
	
	
	if($pp=="PENDING")
	{

		$query4="SELECT * FROM userrate WHERE mname='$mname' AND status='APPROVED'";
		$result9=mysql_query($query4);
	
	
		if(mysql_num_rows($result9)!=0)
		{
				
			$pp="APPROVED";

			$query2="UPDATE userrate SET status='$pp' WHERE uname='$uname' AND mname='$mname'";
			mysql_query($query2);
		}
	}
	
	
	$query2="UPDATE userrate SET rate='$rate' WHERE uname='$uname' AND mname='$mname'";
	mysql_query($query2);
}

?>