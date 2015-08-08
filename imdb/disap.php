<?php
include 'connection.php';

$ind=$_POST['ind'];
$query="DELETE FROM movies WHERE ind='$ind' AND status='PENDING'";
mysql_query($query);
?>