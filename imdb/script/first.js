$(document).ready(function()
{

$('#logout').click(function(){
	$("body").fadeOut("slow");
});

//	$('#sellist').append('<option>TEJA</option>')
$('#uname,#pwd,#sub,#reg,#adid,#asub,#sear,#sear1,#moviename,#movielink,#moviedesc,#movierate,#moviesub,#cancel,#pend,#sellist,#movieimg,#adata,#five,#six,#ud,#editing,#elink,#edesc,#eimg,#esub,#ecan,#logout,#seven').addClass("ui-widget ui-widget-content ui-widget-header ui-corner-all");
$('#search,#add,#approve,#sellist,#adata,#ud,#uda,#uda1,#slider,#editing').hide();	
localStorage.setItem('y',$('#back1').attr('id'));	
$('#back2,#back3,#back4').fadeOut("fast");
function explode()
{
	
	var p=document.getElementById(localStorage.getItem('y'));

	$(p).effect("puff",{percent:500});
	
	$(p).fadeOut("fast");
	localStorage.setItem('x',localStorage.getItem('y'));

	setTimeout(one,10);

};


function one()
{
if(localStorage.getItem('x')=="back1")
	{
	$('#back2').fadeIn("slow");

	localStorage.setItem('y',$('#back2').attr('id'));
	setTimeout(explode, 5000);
	}
else if(localStorage.getItem('x')=="back2")
	{
	$('#back3').fadeIn("slow");
	localStorage.setItem('y',$('#back3').attr('id'));
	setTimeout(explode, 5000);

	}
else if(localStorage.getItem('x')=="back3")
	{
	$('#back4').fadeIn("slow");
	localStorage.setItem('y',$('#back4').attr('id'));
	setTimeout(explode, 5000);
	
	}
else if(localStorage.getItem('x')=="back4")
	{
	$('#back1').fadeIn("slow");
	localStorage.setItem('y',$('#back1').attr('id'));
	setTimeout(explode, 5000);
	
	}
}
explode();

$('#reg').click(function(){
	if($('#uname').val()==""||$('#pwd').val()=="")
	{
	$('#dilog').text("Please enter deatils in the boxes");
	$('#dilog').dialog({
		title: "EMPTY DETAILS"
	
		
	});
	$('#uname,#pwd').effect('pulsate',{times:10});
	}
	else
	{
		$.ajax
		({
		type:"POST",	
		url:"register.php",
		data:{uid:$('#uname').val(),pwd:$('#pwd').val()},
		success:function listd(result)
		{
			if(result==-1)
				{
				$('#dilog').text("USER ALREADY EXISTS");
				$('#dilog').dialog({
					title:"ERROR"
					
				});
				$('#uname,#pwd').effect('pulsate',{times:10});
				}
			else
				{
				$('#dilog').text("REGISTRATION SUCCESSFUL");
				$('#dilog').dialog({
					title:"SUCCESS"
					
				});
				$('#uname').val("");
				$('#pwd').val("");
				}
		}
		
		});
	}
});

$('#sub').click(function()
{
	if($('#uname').val()==""||$('#pwd').val()=="")
	{
	$('#dilog').text("Please enter deatils in the boxes");
	$('#dilog').dialog({
		title: "EMPTY DETAILS"
	
		
	});
	$('#uname,#pwd').effect('pulsate',{times:10});
	}
	
	else
	{
		var lo=$.ajax({
			type:"POST",
			data:{uid:$('#uname').val(),pwd:$('#pwd').val()},
			url:"login.php",
			async:false
	
			
		}).responseText;
		
		if(lo==1)
			{
		
			$('#loginform,#admindiv').fadeOut("fast");
			$('#search').fadeIn("fast");
			}
		else
			{
			$('#dilog').text("invalid username or password");
			$('#dilog').dialog({
				title: "INVALID DETAILS"
			
			});
			$('#uname,#pwd').effect('pulsate',{times:10});
			}
		
	}
	
	
});

$('#sear1').click(function(){
	
	if($('#sear').val()=="")
		{
		/*$('#dilog').text("enter something to search in the search box");
		$('#dilog').dialog({
			title:"NOTHING TO SEARCH"
		});*/
		
		$('#sear').effect("pulsate",{times:10});
		
		}
	else
		{
		var movie_exists=$.ajax({
			type:"POST",
			data:{movie:$('#sear').val()},
			url:"movies.php",
			async:false
			
		}).responseText;

		if(movie_exists==-1)
			{
			
			$('#search').hide();
			$('#dilog').text("the movie does not exist, you can add the movie and it's details now or click cancel to go back");
			$('#dilog').dialog({
				title:"MOVIE DOES NOT EXIST"
			});
			$('#add').show();
			}
		else
			{
			
/*-------------------------------------------------------------------------------------------------------------------------------------------------------*/
			$('#ud,#uda,#uda1,#slider').fadeIn("slow");
			
			var xx=$.ajax({	
				type:"POST",
				url:"retrate.php",
				async:false,
				data:{uname:$('#uname').val(),mname:$('#sear').val()}
				
			}).responseText;
			
			var val=xx;
		
			$('#slider').hover(function(){
			
			$('#slider').slider({
					disabled:false
				});
				
			
			});
			
			$('#slider').slider({
				disabled: true,
				max: 10,
				value:xx,
				change:function(){
					$('#slider p').text($( "#slider" ).slider( "option", "value" ));
					var dy=$.ajax({	
						type:"POST",
						url:"rating.php",
						async:false,
						data:{uname:$('#uname').val(),mname:$('#sear').val(),rate:$( "#slider" ).slider( "option", "value" )}
						
					}).responseText;
				
				}
			});
			
			$('#uda').click(function(){

				$('#editing').fadeIn();	
			
			});
			
			
		$('#esub').click(function(){
				
				if($('#elink').val()=="")
				{
				$('#elink').effect("pulsate",{times:30});
				}
				
				if($('#edesc').val()=="")
				{
				$('#edesc').effect("pulsate",{times:30});
				}
				
				if($('#eimg').val()=="")
				{
				$('#eimg').effect("pulsate",{times:30});
				}
				
				if($('#elink').val()!=""&&$('#edesc').val()!=""&&$('#eimg').val()!="")
					{
					
					
					var mo=$.ajax({
						type:"POST",
						data:{mname:$('#sear').val()},
						async:false,
						url:"modify.php",
						dataType:"json"
					}).responseText;
				
					
					var js=jQuery.parseJSON(mo);
					
					var links=js['links'];
					var desc=js['description'];
					var image=js['image'];
					var uname=$('#uname').val();
					
					var addmov=$.ajax({
						type:"POST",
						url:"insertmovie.php",
						data:{uname:$('#uname').val(),name:js['name'],link:$('#elink').val(),desc:$('#edesc').val(),rate:js['rating'],image:$('#eimg').val()},
						async:false
					}).responseText;
					
					
					$('#elink').val("");
					$('#edesc').val("");
					$('#eimg').val("");
					
					}
				
			});	
		
		$('#ecan').click(function(){
			$('#editing').fadeOut("fast");
		});
			
			$('#uda1').click(function(){
				$('#ud,#uda,#uda1,#slider').fadeOut("slow");
			});
			var ap=$.ajax({
				type:"POST",
				data:{name:$('#sear').val()},
				async:false,
				url:"retri.php",
				dataType:"json"
			}).responseText;
		var js=jQuery.parseJSON(ap);
		
		var ap1=$.ajax({
			type:"POST",
			data:{mname:$('#sear').val(),uname:$('#uname').val()},
			async:false,
			url:"ratecount.php"
			
		}).responseText;
		
		
		
		//$('#ud').html();
		$('#ud').html('<a href='+js['image']+'><img src='+js['image']+' height="300" width="300"></a>'+"<br><br>MOVIE NAME:&nbsp"+js['name']+"<br><br>MOVIE LINKS:&nbsp"+js['links']+"<br><br>MOVIE DESCRIPTION:&nbsp"+js['description']+"<br><br>MOVIE RATING:&nbsp"+ap1);
		//$('#ud').html(escaped.replace(/\n/g, '<br>'));
		
			}
		
		}
	
});

$('#cancel').click(function(){
	$('#add').hide();
	$('#sear').val("");
	$('#search').show();
	
});

$('#moviesub').click(function(){
	if($('#moviename').val()=="")
		{
		$('#moviename').effect("pulsate",{times:30});
		}
	if($('#movielink').val()=="")
		{
		$('#movielink').effect("pulsate",{times:30});
		}
	
	if($('#moviedesc').val()=="")
		{
		$('#moviedesc').effect("pulsate",{times:30});
		}
	if($('#movierate').val()=="")
		{
		$('#movierate').effect("pulsate",{times:30});
		}
	if($('#moviesub').val()=="")
		{
		$('#moviesub').effect("pulsate",{times:30});
		}
	if($('#movieimg').val()=="")
		{
		$('#movieimg').effect("pulsate",{times:30});
		}
	if($('#moviename').val()!=""&&$('#movielink').val()!=""&&$('#moviedesc').val()!=""&&$('#movierate').val()!=""&&$('#moviesub').val()!=""&&$('#movieimg').val()!="")
		{
		var addmov=$.ajax({
			type:"POST",
			url:"insertmovie.php",
			data:{uname:$('#uname').val(),name:$('#moviename').val(),link:$('#movielink').val(),desc:$('#moviedesc').val(),rate:$('#movierate').val(),image:$('#movieimg').val()},
			async:false
		}).responseText;
		
		
		var rt=$.ajax({
			
			type:"POST",
			url:"rating.php",
			async:false,
			data:{uname:$('#uname').val(),mname:$('#sear').val(),rate:$('#movierate').val()}
			
		}).responseText;
	
		
		
		
	//	alert(addmov);
		$('#moviename').val("");
		$('#movielink').val("");
		$('#moviedesc').val("");
		$('#movierate').val("");
		$('#movieimg').val("");
		}
});

$('#asub').click(function(){
	if($('#adid').val()==""||$('#adid').val()!="123")
	{
	$('#adid').effect("pulsate",{times:30});
	$('#dilog').text("enter a valid admin id");
	$('#dilog').dialog({
		title:"ERROR"
	});
	}
	else
	{
		$('#admindiv,#loginform').fadeOut("slow");
		$('#approve').fadeIn("slow");
	}
});

$('#approve').hover(function(){
	$('#approve h1').fadeOut("fast");
	$(this).animate({
		
		top:'0px'
		
	},300);
},

function(){
	$('#approve h1').fadeIn("fast");
	
	$(this).animate({
		
		top:'-80px'
		
		
	},300);	
});

$('#pend').hover(function(){
	
	$(this).animate({
		zoom:'150%'
	},100);
	
},function(){
	
	$(this).animate({
		zoom:'100%'
	},100);
	
});
var temp=0;
$('#pend').click(function(){

$('#sellist').fadeIn("slow");	
var ap=$.ajax({
	type:"GET",
	url:"approval.php",
	async:false,
	dataType: "json"
}).responseText;
var js=jQuery.parseJSON(ap);
//$(this).prop("disabled",true);	
for(var z=0;z<js.length;z++)
	{
	$('#sellist option').each(function(){
		if($(this).text()==js[z])
			{
			temp=-1;
			}
	});
	if(temp!=-1)
	$('#sellist').append('<option value='+js[z]+'>'+js[z]+'</option>');
	}
});

$('#sellist').change(function(){

	var ap=$.ajax({
		type:"POST",
		data:{name:$('#sellist option:selected').text()},
		async:false,
		url:"approve.php",
		dataType:"json"
	}).responseText;
var js=jQuery.parseJSON(ap);


$('#adata').fadeIn("fast");
$('#one').text(js['name']);
$('#two').text(js['links']);
$('#three').text(js['description']);
$('#four').text(js['rating']);
$('#ff').html('<a href='+js['image']+'><img src='+js['image']+' height="200" width="200"></a>');



});

$('#six').click(function(){
	
	$('#adata').fadeOut("fast");
});


$('#five').click(function(){
	
	
	var ap=$.ajax({
		type:"POST",
		data:{name:$('#sellist option:selected').text()},
		async:false,
		url:"approve.php",
		dataType:"json"
	}).responseText;
var js=jQuery.parseJSON(ap);

	
	localStorage.setItem('ind',$('#sellist option:selected').text());
	

	$('#adata').fadeOut();
	var retval=$.ajax({
		type:"POST",
		url:"addapp.php",
		async:false,
		data:{uname:js['uname'],ind:$('#sellist option:selected').text(),name:js['name'],links:js['links'],description:js['description'],rating:js['rating'],image:js['image']}
	}).responseText;
	var t1=localStorage.getItem('ind');
	
	$("#sellist option[value="+t1+"]").remove();

	$("#sellist option[value='edo']").prop('selected', true);
});

$('#seven').click(function(){
	localStorage.setItem('ind',$('#sellist option:selected').text());
	var retval=$.ajax({
		type:"POST",
		url:"disap.php",
		async:false,
		data:{ind:$('#sellist option:selected').text()}
	}).responseText;	
	
	var t1=localStorage.getItem('ind');
	
	$("#sellist option[value="+t1+"]").remove();

	$("#sellist option[value='edo']").prop('selected', true);
	$('#adata').fadeOut();
});

});