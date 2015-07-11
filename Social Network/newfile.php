<?php 
$i=0;
$j=0;

$k=-1;

if(isset($_POST['uid']))
{
$value1 = $_POST['uid'];

$i=1;
}

if(isset($_POST['pwd']))
{
	$value2 = $_POST['pwd'];

	$j=1;

}
if($i==1&&$j==1)
{
$string = file_get_contents("log.json");
$j=json_decode($string);



$j1=(array)$j;
$newArray = array_keys($j1);

if(count($j1)!=0)
{
for($i=0;$i<count($j1);$i++)
{
if($value1==$newArray[$i])
{
	$k=-1;
	break;
}

else 
{
	$k=0;
	continue;
}

}
}
else
{
	$j->$value1=$value2;
	$string = json_encode($j);
	file_put_contents('log.json', $string);
	$k=0;
}
if($k==0)
{
$j->$value1=$value2;
$string = json_encode($j);
file_put_contents('log.json', $string);
}

}
echo $k;
?>