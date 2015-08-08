<?php

include 'connection.php';
$retval=0;
$uid=$_POST['uid'];
$pwd=$_POST['pwd'];
$token=rand(1,1000000);


$query="SELECT * FROM users";
$result=mysql_query($query);
while($pe=mysql_fetch_array($result))
{
	if($pe['uid']==$uid)
	{
		$retval=-1;
		break;
	}
}


if($retval!=-1)
{
	$query="INSERT INTO users VALUES ('$uid','$pwd','$token')" or die("invalid query");
	mysql_query($query);
}

echo $retval;
?>