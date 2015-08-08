<?php
include 'connection.php';
$retval=-1;
$uid=$_POST['uid'];
$pwd=$_POST['pwd'];

$query="SELECT * FROM users";
$result=mysql_query($query);

while($pe=mysql_fetch_array($result))
{
	if($pe['uid']==$uid&&$pe['pwd']==$pwd)
	{
		$retval=0;
		break;
	}
}
if($retval==0)
{
	echo 1;
}
else
{
	echo -1;
}
?>