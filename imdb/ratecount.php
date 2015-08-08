<?php
include 'connection.php';

$uname=$_POST['uname'];
$mname=$_POST['mname'];

$query1="SELECT * FROM userrate WHERE mname='$mname' AND status='APPROVED'";
$result=mysql_query($query1);


$aa=0;
$bb=0;
while($pe=mysql_fetch_array($result))
{
$aa+=$pe['rate'];
$bb++;	
}
echo $aa/$bb;
?>
