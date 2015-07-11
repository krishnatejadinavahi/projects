
<?php
$i;
$j=0;

	$value1 = $_POST['uid'];



	$value2 = $_POST['pwd'];


	$myPost = array_values($_POST);

	$string = file_get_contents("log.json");
	$j=json_decode($string);

	$j1=(array)$j;


	

	$newArray = array_keys($j1);

	$k=-1;
	
	//j1 array for keys and values of file
	//newArray array for keys of file
	for($i=0;$i<count($j1);$i++)
	{
		if($value1==$newArray[$i])
		{
			if($value2==$j1[$value1])
			{
			$k=1;
			break;
			}
			else
			{
				$k=-1;
			}
		}
		
	}
	echo $k;
?>
