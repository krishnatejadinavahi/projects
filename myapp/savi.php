<?php

class mm
{

//$value1=$_POST['bb'];
//$value2=$_POST['ro'];



public $value3;
public $value4;
public $value5;
function f1($val1,$val2)
{
$value1=$val1;
$value2=$val2;
switch($value2)
{
	case 'stats':
		$value3="mobile_status_update";
		$value4="message";
		break;
	case 'pic':
		$value3="added_photos";
		$value4="picture";
		break;
	default:
		
		break;
}
$lik=0;
$lin="";
$fin;
$send=-1;
file_put_contents("data/stats.json", $value1);



$j=json_decode($value1,true);

if(isset($j['error']))
{
	echo -100;
}

else 
{
if(isset($j['paging']['next']))
{
	$send=1;
}


for($i=0;$i<count($j['data']);$i++)
{
	
	$fin=0;	
if(isset($j['data'][$i]['status_type']))
{
if($j['data'][$i]['status_type']!=$value3)
{
	
	continue;
}
}
else
{
	continue;
}
	if(isset($j['data'][$i]['likes']))
	{
	if(isset($j['data'][$i]['likes']['paging']['next']))
	{
		$string=file_get_contents($j['data'][$i]['likes']['paging']['next']);
		
		do{
		file_put_contents("data/temp.json", $string);
		$j1=json_decode($string,true);
		$fin+=count($j1['data']);
		if(isset($j1['paging']['next']))
		{
			$string=file_get_contents($j1['paging']['next']);
				
		}
		else 
		{

			//break;
		}
		}while(isset($j1['paging']['next']));
//	$lik+=$fin;	
	}	
	if($lik<count($j['data'][$i]['likes']['data'])+$fin)
	{
		$lik=count($j['data'][$i]['likes']['data'])+$fin;
	
		if(isset($j['data'][$i][$value4]))
		$lin=$j['data'][$i][$value4];
		
		
		if($value2=="stats")
		{
			$value5=$j['data'][$i]['actions'][0]['link'];
		}
		else if($value2=="pic")
		{
			$value5=$j['data'][$i]['link'];
		}
		
	}
	}
	
}

$a3=array();
array_push($a3, $send);
array_push($a3, $lik);
array_push($a3, $lin);
if($a3[0]==1)
array_push($a3, $j['paging']['next']);
else
array_push($a3, -1);	
array_push($a3,$value5);
echo json_encode($a3);
}
}

function f2($val1,$val2)
{


	$send=-1;
	$value1=$val1;
	file_put_contents("data/stats.json", $value1);
	
	
	$j=json_decode($value1,true);


	//echo "Aaaaaaaaaaaaaaaaaaaaaaaaaaa"+$naam;
	
	if(isset($j['error']))
	{
		echo -100;
	}
	
	else
	{
		if(isset($j['paging']['next']))
		{
			$send=1;
		}
		for($i=0;$i<count($j['data']);$i++)
		{
			if(!(isset($j['data'][$i]['comments'])))
			{
				continue;
			}
			if(isset($j['data'][$i]['story_tags']))
			{
			if(count($j['data'][$i]['story_tags'])>1||$j['data'][$i]['type']=="video")
			{
				continue;
			}
			}
			
			
			if(isset($j['data'][$i]['comments']['paging']['next']))
			{
				$string=file_get_contents($j['data'][$i]['comments']['paging']['next']);
			
				do{
					file_put_contents("data/temp1.json", $string);
					$j1=json_decode($string,true);
					
					$frnd=file_get_contents("data/friend.json");
					$j2=json_decode($frnd,true);
					
					for($kk=0;$kk<count($j1['data']);$kk++)
					{
						$temp=0;
						if(isset($j1['data']['from']['name']))
						{
					/*	if(isset($j2[$j1['data']['from']['name']]))
						{
							$j2[$j1['data']['from']['name']]['count']++;
						}
						else
						{
							$j2[$j1['data']['from']['name']]['count']=1;
						}*/
							
						$co=count($j2);
						$pp=0;
						do 
						{
							if(isset($j2[$pp]['name']))
							{
								if($j2[$pp]['name']==$j1['data']['from']['name'])
								{
								$temp=0;
								$j2[$pp]['count']++;
								break;
								}
							}
							else 
							{
								$temp=-1;
							}
						$pp++;	
							
						}while($pp<=count($j2));
							
						if($temp==-1)
						{
							
							$j2[$co]['name']=$j1['data']['from']['name'];
							$j2[$co]['count']=1;
							
						}	
							
							
							
						}
					}
					$frnd=json_encode($j2);
					file_put_contents("data/friend.json", $frnd);
					if(isset($j1['paging']['next']))
					{
						$string=file_get_contents($j1['paging']['next']);
			
					}
					else
					{
			
					}
				}while(isset($j1['paging']['next']));
				
			}
			
			
			
			$frnd=file_get_contents("data/friend.json");
			$j2=json_decode($frnd,true);
			
			if(isset($j['data'][$i]['comments']))
			{
			for($kk=0;$kk<count($j['data'][$i]['comments']['data']);$kk++)
			{
			$tem=0;	
			if(isset($j['data'][$i]['comments']['data'][$kk]['from']))
			{
			$pp=0;	
			do 
			{
			if(isset($j2[$pp]['name']))
			{
				if($j2[$pp]['name']==$j['data'][$i]['comments']['data'][$kk]['from']['name'])
				{
				$j2[$pp]['count']++;
				$tem=0;
				break;
				}
			}	
			else
			{
				$tem=-1;
			}	
			$pp++;	
			}while($pp<=count($j2));

			if($tem==-1)
			{
				$co1=count($j2);
				
				
				$j2[$co1]['name']=$j['data'][$i]['comments']['data'][$kk]['from']['name'];
				$j2[$co1]['count']=1;
				
			}
				
			
			/*if(isset($j2[$j['data'][$i]['comments']['data'][$kk]['from']['name']]))
			{
				$j2[$j['data'][$i]['comments']['data'][$kk]['from']['name']]['count']++;
			}
			else
			{
			$j2[$j['data'][$i]['comments']['data'][$kk]['from']['name']]['count']=1;
			}*/
			}
			}
			}
			
			$frnd=json_encode($j2);
			file_put_contents("data/friend.json", $frnd);
		}

$konam1=0;		
			
$naba=file_get_contents("data/friend.json");
$j33=json_decode($naba,true);	
		
$naam=0;
for($ppp=0;$ppp<count($j);$ppp++)
{
	if(isset($j['data']['status_type']))
	{
		if($j['data']['status_type']=='added_photos')
		{
			$naam=$j['data'][$ppp]['from']['name'];
			break;
		}
	}

}

for($vo=0;$vo<count($j33);$vo++)
{
if($j33[$vo]['name']==$naam)
{
	$j33[$vo]['count']=0;
	break;
}	
}
$koko=0;
for($abc=0;$abc<count($j33);$abc++)
{
	if($j33[$abc]['count']>$koko)
	{
		$koko=$j33[$abc]['count'];
		$konam1=$j33[$abc]['name'];
	}
}

$naba=json_encode($j33);
file_put_contents("data/friend.json", $naba);		
		
		
		
		
		
		
		
		$a3=array();
		array_push($a3, $send);
		if($a3[0]==1)
		array_push($a3, $j['paging']['next']);
		else
		array_push($a3, -1);
		array_push($a3, $konam1);
		echo json_encode($a3);
	}

}

}


$val1=$_POST['bb'];
$val2=$_POST['ro'];

$m1=new mm();
if($val2=="stats"||$val2=="pic")
$m1->f1($val1,$val2);
else
{

$m1->f2($val1,$val2);
}
?>