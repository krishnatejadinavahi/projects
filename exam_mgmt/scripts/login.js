$(document).ready(function(){

	
	$('#report').hide();
	$('#stt').hide();
	$('#logout').addClass("ui-widget ui-widget-content ui-widget-header ui-corner-all");
	$('#take').hide();
	$('#enttok1,#enttok2').addClass("ui-widget ui-widget-content ui-widget-header ui-corner-all");
	$('#logout').hide();
	$('#tess').hide();
	$('#men').hide();
	$('#enttok').hide();
	$('#stumen').hide();
	$('#div3').hide();
	$('#login').hide();
	$('#stort').hide();
//	$('#div2 p').text("tee");
	$('#select1').selectmenu({
	
	icons: { button: "ui-icon-circle-triangle-s" }
	
});

$('#select1').selectmenu({

change:function(){


	var a=$('#select1 option:selected').text();
	

	$('#div2').fadeOut("medium");
	$('#div1').fadeOut("medium");


//	$(document.body).append(a);
	$('#div3').fadeIn("slow");

	$('#login').fadeIn("slow");

	$('#stort p').text(a.toUpperCase());
	$('#stort').show();
	$('#stort p').animate({
		backgroundColor: "#B2004C",
		color:"white",
			left:900
		
	},1000);
	
	$('input').addClass("ui-widget ui-widget-content ui-widget-header ui-corner-all");


	
	}

});


$('#div2 p').animate({
	
	backgroundColor: "#B2004C",
	color:"white",
		left:600
	
},1000);


/*$('#login').hover(function(){
	
	$(this).animate({
		
	    left: '200px',
        opacity: '0.5',
      
		
	},1000);
	
	
},

function(){
	$(this).animate({
		
	    left: '40%',
        opacity: '1',
      
		
	},1000);
	
});*/


$('#reg').click(function()
{
	var a=$('#select1 option:selected').text();

	
	if(a=="student")
		{
		p=0;
		}
	if(a=="teacher")
		{
		p=1;
		}

		
		if($('#uid').val()==""||$('#pwd').val()=="")
			{
			$('#dilog').toggleClass("fail");
			$('#dilog').text("Please enter deatils in the boxes");
			$('#dilog').dialog({
				title: "EMPTY DETAILS"
				
			});
			}

		else
			{
			var uid=$('#uid').val();
			var pwd=$('#pwd').val();
			
			$.ajax({
				type:"POST",
				url:"validate.php",
				data:{uid:uid,pwd:pwd,t:p},
				async:false,
				success:function suc(result){
					if(result==-1)
						{
						$('#dilog').toggleClass("fail");
						$('#dilog').text("USERNAME ALREADY EXISTS");
						$('#dilog').dialog({
							
							title:"DUPLICATE"
						});
						}
					else
						{
						$('#dilog').toggleClass("success");
						$('#dilog').text("REGISTRATION SUCCESSFUL");
						$('#dilog').dialog({
							
							title:"SUCCESS"
						});
					
						}
					//$('#dilog').removeClass("success");
				},
				error:function(){
					$('#dilog').text("AN ERROR OCCURED DURING THE AJAX REQUEST");
					$('#dilog').dialog({
						
						title:"ERROR"
					});
				}
				
			});
		
			}
});


$('#log').click(function()
{
	var a=$('#select1 option:selected').text();

	
	if(a=="student")
		{
		p=0;
		}
	if(a=="teacher")
		{
		p=1;
		}
	
	if($('#uid').val()==""||$('#pwd').val()=="")
		{
		$('#dilog').toggleClass("fail");
		$('#dilog').text("Please enter details in the boxes");
		$('#dilog').dialog({
			title: "EMPTY DETAILS"
			
		});
		}
	else
		{
		var uid=$('#uid').val();
		var pwd=$('#pwd').val();
		$.ajax({
			
			type:"POST",
			url:"logval.php",
			data:{uid:uid,pwd:pwd,t:p},
			asyn:false,
			success:function listf(result)
			{
				if(result==-1)
					{
				
					$('#dilog').toggleClass("fail");
					$('#dilog').text("INVALID DETAILS");
					$('#dilog').dialog({
						
						title:"ERROR"
					});
				
					}
			
				else
					{
					$('#login').animate({
					  left:'100%',
					  opacity: '0.5'
						
					},300);
					$('#login').fadeOut("fast");
					if(a=="teacher")
					{
					$('#men').fadeIn("fast");
					$('#men').accordion({
						heightStyle: "content"
					});
					}
					if(a=="student")
						{
						$('#stumen').fadeIn("fast");
						$('#stumen').accordion();
						}
					$('#logout').show();
					}
			},
			error:function()
			{
				$('#dilog').text("AN ERROR OCCURED DURING THE AJAX REQUEST");
				$('#dilog').dialog({
					
					title:"ERROR"
				});
			}
		});
		}
	
	
	
	
});



$('#men').hover(function(){

	$('#men').animate({
		
		left:'0px'
		
	},300);

	
},

function(){
	
$('#men').animate({
		
	left:'-1250px'
		
	},300);
	
});



$('#stumen').hover(function(){
	
	
	$('#stumen').animate({
		left:'0px'
		
	},300);
	
},


function(){
	
	$('#stumen').animate({
		left:'-1250px'
		
	},300);
	

});



$('#opt1').click(function(){
	
	
//alert($('#allt option:selected').text());	
	
var rnd=(1+Math.floor(Math.random()*1000000));

$.ajax({
	
	type:"POST",
	data:{course:$('#allt option:selected').text(),token:rnd,uid:$('#uid').val()},
	async:false,
	url:"teachertoken.php",
	success:function listf(result)
	{
		//alert(result);
	}
	
});


localStorage.setItem('token',rnd);

$('#dilog').text(rnd);
$('#dilog').dialog({
	
	title:"THE TOKEN FOR THE TEST IS"
	
});

$('#tess').show();
$('TEXTAREA').addClass("ui-widget ui-widget-content ui-widget-header ui-corner-all");


$.ajax({
	
	type:"POST",
	data:{rnd:rnd},
	async:false,
	url:"setpaper.php",
	success: function listf(result){
		
	},
	
	error: function(){
		$('#dilog').text("ERROR");
		$('#dilog').dialog({
			
			title:"ERROR"
		});
	}
	
	
});


});


$('#ne').click(function(){
	
if($('#que').val()==""||$('#op1').val()==""||$('#op2').val()==""||$('#op3').val()==""||$('#op4').val()==""||$('#op5').val()=="")	
{
	$('#dilog').text("ENTER VALUES IN ALL THE BOXES");
	$('#dilog').dialog({
		
		title:"ERROR"
	});
}	
	
else
{
var toke=localStorage.getItem('token');
var q=$('#que').val();
var o1=$('#op1').val();
var o2=$('#op2').val();
var o3=$('#op3').val();
var o4=$('#op4').val();
var o5=$('#op5').val();


$.ajax({
	
	type:"POST",
	data:{q:q,o1:o1,o2:o2,o3:o3,o4:o4,o5:o5,toke:toke},
	async:false,
	url:"exam.php",
	success:function lisf(result)
	{
		$('#que').val("");
		$('#op1').val("");
		$('#op2').val("");
		$('#op3').val("");
		$('#op4').val("");
		$('#op5').val("");
	},
	error: function()
	{
		$('#dilog').text("ERROR");
		$('#dilog').dialog({
			
			title:"ERROR"
		});
	}
	
});

}

});


$('#su').click(function(){
	
	$('#dilog').text("SUCCESSFULLY SUBMITTED THE PAPER");
	$('#dilog').dialog({
		
		title:"SUCCESS"
	});
	$('#tess').fadeOut();

});

$('#logout').click(function(){
	$('#dilog').text("LOGGED OUT SUCCESSFULLY");
	$('#dilog').dialog({
		
		title:"LOGGED OUT"
	});
	
	$("body").fadeOut();

	
});

$('#aa').accordion({
	
	heightStyle: "content"
});

$('#cm').accordion({
	
	heightStyle: "content"
});



$('#bb').accordion({
	
	heightStyle: "content"
});

$('#oo').accordion({
	
	heightStyle: "content"
});

$('#clasto').click(function(){

	if($('#clas').val()==""||$('#clas1').val()=="")
		{
		$('#dilog').text("ENTER VALUES IN THE BOXES");
		$('#dilog').dialog({
			title:"ERROR"
		});
		}
	
	else
		{
		var tem1=0;
		var course=$.ajax({
			
			type:"POST",
			data:{uid:$('#uid').val(),subject:$('#clas').val(),studn:$('#clas1').val()},
			async:false,
			url:"classe.php"
			
		}).responseText;
		
		$('#clas1').val("");
		
		
	/*$('#comb option').each(function(){
			
			if($(this).text()==$('#clas').val())
				{
				tem1=-1
				}
			
		});
		
		if(tem1!=-1)
			{
			$('#comb').append($('<option>', {
			    value: $('#clas').val(),
			    text:  $('#clas').val(),
			   
			}));
			}*/
		
		
		}
	
});


$('#he').click(function(){
	
var w=$.ajax({
	
	type:"POST",
	data:{uid:$('#uid').val()},
	async:false,
	url:"teachcl.php"
	
}).responseText;
	
//alert(w);
var js=jQuery.parseJSON(w);


var tem1=0;
for(var kk=0;kk<js.length;kk++)
	{
	$('#comb option').each(function(){
		
	//	if($(this).text()==$('#clas').val())
		if(js[kk]==$(this).text())
			{
			tem1=-1
			}
		
	});
	if(tem1!=-1)
		{
	$('#comb').append($('<option>', {
	    value: js[kk],
	    text:  js[kk],
	   
	}));
		}
	}

});

$('#comb').change(function(){
	
//alert($('#comb option:selected').text());
	$('#comb1 option').each(function(){
		
		$(this).remove();
	
		
	});
	var t1=$.ajax({
		
		type:"POST",
		data:{uid:$('#uid').val(),course:$('#comb option:selected').text()},
		async:false,
		url:"getto.php"
		
		
	}).responseText;
	
	var js=jQuery.parseJSON(t1);
	//alert(js);
	
	
	var tem1=0;
	for(var kk=0;kk<js.length;kk++)
		{
		$('#comb1 option').each(function(){
			
		
			if(js[kk]==$(this).text())
				{
				tem1=-1;
				
				}
			
			
		});
		if(tem1!=-1)
			{
		$('#comb1').append($('<option>', {
		    value: js[kk],
		    text:  js[kk],
		   
		}));
	
			}
		}
	
});

$('#ema').click(function(){
	$('#dilog').text("");
	
	//alert($('#comb option:selected').text()+" "+localStorage.getItem('token'));
	
	var ento=$.ajax({
		
		type:"POST",
		data:{uid:$('#uid').val(),course:$('#comb option:selected').text(),token:localStorage.getItem('token')},
		async:false,
		url:"maill.php",
		
		
	}).responseText;
	
	var js=jQuery.parseJSON(ento);
	
	
	
	for(var zz=0;zz<js.length;zz++)
		{
		if(js[zz]=='')
			{
			continue;
			}
		$.ajax({
			
			type:"POST",
			data:{uid:js[zz],token:$('#comb1 option:selected').text()},
			async:false,
			url:"agai.php",
			success:function listd(result)
			{
			
			//	var obj =$('#dilog').text('\n'+$('#dilog').text()+'\n'+js[zz]+"\t "+result+'\n');
				
				var obj=$('#dilog').append(js[zz]+"\t "+result+'\n');
				obj.html(obj.html().replace(/\n/g,'<br/>'));
				$('#dilog').dialog({
					title:"SCORES FOR TEST "+$('#comb1 option:selected').text()
				});
					
			}
		});
		}
});


$('#hed').click(function(){
	

	
	var w=$.ajax({
		
		type:"POST",
		data:{uid:$('#uid').val()},
		async:false,
		url:"teachcl.php"
		
	}).responseText;
		
	
	var js=jQuery.parseJSON(w);


	var tem1=0;
	for(var kk=0;kk<js.length;kk++)
		{
		$('#allt option').each(function(){
			
		
			if(js[kk]==$(this).text())
				{
				tem1=-1;
				
				}
			
			
		});
		if(tem1!=-1)
			{
		$('#allt').append($('<option>', {
		    value: js[kk],
		    text:  js[kk],
		   
		}));
	
			}
		}
	
	
	
});

/* ------------------------------------------------------------------------------------------------------------------------------ */



$('#stu_opt1').click(function(){
	
$('#enttok').fadeIn("fast");	
	
	
});


$('#enttok2').click(function(){
	
	
	var nore=$.ajax({
		
		type:"POST",
		data:{uid:$('#uid').val(),token:$('#enttok1').val()},
		async:false,
		url:"repeat.php"
	
		
	}).responseText;
	
	if(nore==1)
	{
	if($('#enttok1').val()=="")
		{
		$('#dilog').text("PLEASE ENTER A VALID TOKEN NUMBER");
		
		$('#dilog').dialog({
			title:"ERROR"
		});
		}
	
	else
		{
		$('#enttok').hide();
		$('#take').fadeIn("fast");
		}
	}
	else
	{
		$('#dilog').text("YOU HAVE ALREADY TAKEN THIS TEST");
		$('#dilog').dialog({
			title:"ALERT"
		});
	}
});

$('#take').click(function(){
	var to=$('#enttok1').val();
	
	
	
	var count1=$.ajax({
		
		type:"POST",
		data:{to:to},
		async:false,
		url:"stud.php",
		
	}).responseText;	
	
	if(count1==-1)
		{
		$('#dilog').text("ENTER A VALID TOKEN NUMBER");
		$('#dilog').dialog({
			title:"ERROR"
		});
		
		$('#take').hide();
		$('#enttok').show();
		$('#enttok1').val("");
		}
	else
		{
	localStorage.setItem('noq',count1);
	$('#stumen').hide();	
	$('#div3').hide();
	$('#take').hide();
	$('#stt').show();
	$('#stuui').text("QUESTION APPEARS HERE. YOU CAN SELECT ONE OF THE FOUR OPTIONS. CLICKING SUBMIT TEST BUTTON SUBMITS YOUR TEST. CLICKING NEXT GOES TO NEXT QUESTION. ONCE YOU GO TO THE NEXT QUESTION YOU CANNOT VIEW THE PAST QUESTIONS. CLICK NEXT TO START THE TEST");
		
	$('#s1').text("option1");	
	$('#s2').text("option2");	
	$('#s3').text("option3");	
	$('#s4').text("option4");	
		}
	
});

var coun=0;
var score=0;
$('#nexq').click(function(){

	if((localStorage.getItem('correct')==localStorage.getItem('selected'))&&coun!=0)
	{
	score++;
	localStorage.setItem('score',score);
	}

coun++;
if(coun<=localStorage.getItem('noq'))
	{

	var nexq=$.ajax({
		
		type:"POST",
		data:{coun:coun,token:$('#enttok1').val()},
		async:false,
		url:"questions.php"
		
	}).responseText;
	var js=jQuery.parseJSON(nexq);

	
	$('#stuui').text(js[0]);
	$('#s1').text(js[1]);	
	$('#s2').text(js[2]);	
	$('#s3').text(js[3]);	
	$('#s4').text(js[4]);	
	

	
	localStorage.setItem('correct',js[5]);
	localStorage.setItem('selected',$('input[name="t"]:checked').val());
	$('#r1,#r2,#r3,#r4').change(function(){
	localStorage.setItem('selected',$('input[name="t"]:checked').val());
	});
	}
	
else
	{
	$('#dilog').text("YOU HAVE SUCCESSFULLY COMPLETED ALL THE QUESTIONS CLICK SUBMIT TEST TO SUBMIT YOUR TEST AND GET THE SCORE");
	$('#dilog').dialog({
		title:"CLICK ON SUBMIT TEST"
	});

	$('#stuui,#r1,#r2,#r3,#r4,#nexq').hide();
	$('#s1,#s2,#s3,#s4').text("");
	}


});

$('#subfin').click(function(){
	
	
	$('#dilog').text("YOUR SCORE IS "+localStorage.getItem('score')+" OUT OF "+localStorage.getItem('noq'));
	$('#dilog').dialog({
		
		title:"SCORE"
		
	});



	
	var review=$.ajax({
		
		
		type:"POST",
		data:{uid:$('#uid').val(),token:$('#enttok1').val(),score:localStorage.getItem('score')},
		async:false,
		url:"userscores.php"
		
		
	}).responseText;

	localStorage.setItem('score',0);
	$(this).hide();
	
});


$('#stu_opt2').click(function(){
	$('#dilog').text("");
	
	
	var rep=$.ajax({
		
		type:"POST",
		data:{uid:$('#uid').val()},
		async:false,
		url:"genrep.php"	
		
	}).responseText;
	
	var js=jQuery.parseJSON(rep);

	
	$.each(js,function(key,value){
		
		
		var obj=$('#dilog').text('\n'+$('#dilog').text()+'\n'+"TEST TOKEN:\t"+key+"\tSCORE:"+value);
	
		
		$('#dilog').dialog({
			
			title:"SCORES"
		});
		
	});
});


$('#stu_opt3').click(function(){
	
var ddd=$.ajax({
	
	type:"POST",
	data:{uid:$('#uid').val()},
	async:false,
	url:"drop.php"

	
}).responseText;

var js=jQuery.parseJSON(ddd);

var tem1=0;
for(var kk=0;kk<js.length;kk++)
{
$('#drp option').each(function(){
	

	if(js[kk]==$(this).text())
		{
		tem1=-1;
		
		}
	
	
});
if(tem1!=-1)
	{
$('#drp').append($('<option>', {
    value: js[kk],
    text:  js[kk],
   
}));
	

}
}
});


$('#conf').click(function(){

	$.ajax({
		
		type:"POST",
		data:{uid:$('#uid').val(),course:$('#drp option:selected').text()},
		async:false,
		url:"del.php",

		success:function listf(result)
		{
			$('#drp option:selected').remove();
			$('#dilog').text("DROPPED");
			$('#dilog').dialog({
				
				title:"SUCCESS"
				
			});
		}
		
	});
	

});

});

