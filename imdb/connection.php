<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$db = 'moviedb';


$conn=mysql_connect($dbhost,$dbuser,$dbpass) or die("cannot connect"); 

mysql_select_db($db) or die("cannot select DB");


?>