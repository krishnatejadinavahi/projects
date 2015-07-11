$(document).ready(function(){
	$('#af').hide();

//	localStorage.removeItem('frnd');
	
	var bah;
	var ft;
	var name=localStorage.getItem('uid');
	var ns=JSON.stringify(name);
	var fn=ns.substring(5,ns.length-1);
	
	fn=fn.replace(/\+/g, ' ');
	$('#dname').html(fn);
	
	
	 $( "input:file" ).addClass("ui-widget ui-corner-all");
	 var imre;
	$('#div1').css('background-color','CornflowerBlue');
	
	$('#midi').css('top','100px');
	
	$('#back1,#back').click(function(){
		localStorage.removeItem('frnd');
		location.reload();
		
	});

	
	$('#menu li,#form1').hover(function() {

	    // animate it
	    // by changing the left padding from its initial value to 20px
        // set animation duration to 300 milliseconds

        $(this).animate({ paddingLeft: '20px' }, 300);


    }, function() {

        // on mouseout, put the original value back in

        $(this).animate({ paddingLeft: '0px' }, 300);


    });

	
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
            	
                $('#blah').attr('src', e.target.result);
                $('#blah').css("visibility","visible");
                $('#blah').css("left","11000px");
                
                imre=e.target.result;
                var abc=localStorage.getItem('uid');
                
                $.ajax({
                	
                	type: 'POST',
            	    url: 'pulog.php',
            	    async:false,
            	    data:{a:abc,b:imre},
            	    success: function listFeed1(result)
            	    {
            	    	alert("see"+result);
            	    }
                
                })
                
               
               
               
            }
            
            reader.readAsDataURL(input.files[0]);
           
      
            
        
        }
    }
    
    $("#imgInp").change(function(){
        readURL(this);
        var usid=localStorage.getItem('uid');
        usid=usid.substring(4, usid.length);
      
        
       var newp=$.ajax({
        	
        	type: 'POST',
            url: 'newpic.php',	
        	data:{uid:usid},
        	async:false,
        	
        }).responseText;
       
       alert(newp);
       
    });

     
$('#subm1').click(function(){
	
var sen=$('#sear').val();
var abc=localStorage.getItem('uid');
localStorage.setItem('textbox',sen);
var yoyo=$.ajax({
	
	type: 'POST',
    url: 'frnd.php',	
	data:{uid:abc,frn:sen},
	async:false,

	
	
}).responseText;	

//localStorage.setItem('frnd', yoyo);


if(yoyo==-100)
	{
	alert("THE USER DOES NOT EXIST");
	}
else
	{
	localStorage.setItem('frnd', yoyo);
	
	
	}
});


var bb=localStorage.getItem('frnd');
alert(bb);
if(bb==-1)
	{
	$('#dname').html(localStorage.getItem('textbox'));
	$('#two,#three,#form1').hide();
	$('#af').show();
	$('#af').click(function(){
		
		
	//alert(localStorage.getItem('uid')+" "+localStorage.getItem('textbox'));
	
	var sender=localStorage.getItem('uid');
	var recv=localStorage.getItem('textbox');
	
	var adde=$.ajax({
		
		type: 'POST',
	    url: 'addfrnd.php',	
	    
	    data:{uid:sender,frn:recv},
	    async:false,
		
		
	}).responseText;
	
$('#af').text("friends");
$('#af').toggleClass("friend");	alert(adde);
	});
	
	
	}
if(bb==1)
	{
	$('#form1').hide();
	$('#dname').html(localStorage.getItem('textbox'));
	var tval=localStorage.getItem('textbox');
	
	var picdi=$.ajax({
		
		type: 'POST',
	    url: 'disppic.php',	
		data:{frn:tval},
		async:false,
	
		
		
	}).responseText;	
	


if(picdi==0)
	{
	alert("THE USER DID NOT UPLOAD ANY PIC");
	}
else
	{
	
	var image = new Image();
	var dd=document.getElementById('forim');
	image.id='im11';
	image.src = picdi;
	forim.appendChild(image);
	picdi=0;
	var tval=localStorage.getItem('textbox');
	var pri=$.ajax({
		
		type: 'POST',
	    url: 'prinl.php',	
		data:{usr:tval},
		async:false,
	
		 dataType: "json",
	
	}).responseText;
	
	if(pri==-100)
		{
		$("#likes").html("LIKES:"+"0"+"\nDISLIKES:"+"0");
		}
	else
		{
	var json = jQuery.parseJSON(pri);  
	
	alert("ajax"+json['i']);
	
	$("#likes").html("LIKES:"+json['u']+", DISLIKES:"+json['i']);
		}
	//alert("ajax"+pri.1);
	//alert("ajax"+pri[2]);
	}
	
	}


if(bb==null)
{
	
//	$('#dname').html(localStorage.getItem('uid'));
var tval1=localStorage.getItem('uid');

tval2=tval1.substring(4, tval1.length);

var tttt=tval2.replace(/\+/g, ' ');
$('#dname').html(tttt);

var picdi=$.ajax({
	
	type: 'POST',
    url: 'disppic.php',	
	data:{frn:tval2},
	async:false,

	
	
}).responseText;	



if(picdi==0)
{
alert("THE USER DID NOT UPLOAD ANY PIC");
}
else
{

var image = new Image();
var dd=document.getElementById('forim');
image.id='im11';
image.src = picdi;
forim.appendChild(image);
//$('#forim').html('<img src=picdi height="64px" width="64px">');
picdi=0;






var tval=localStorage.getItem('uid');
tval=tval.substring(4, tval.length);
var pri=$.ajax({
	
	type: 'POST',
    url: 'prinl.php',	
	data:{usr:tval},
	async:false,

	 dataType: "json",

}).responseText;

if(pri==-100)
	{
	$("#likes").html("LIKES:"+"0"+"\nDISLIKES:"+"0");
	}
else
	{
var json = jQuery.parseJSON(pri);  

alert("ajax"+json['i']);

$("#likes").html("LIKES:"+json['u']+", DISLIKES:"+json['i']);
	}

}

}
$('#two').click(function(){
	var tval1=localStorage.getItem('uid');
	var tval2=localStorage.getItem('textbox');
	var likedi=$.ajax({
		
		type: 'POST',
	    url: 'ld.php',	
		data:{uid:tval1,ser:tval2},
		async:false,

		
		
	}).responseText;	
alert(likedi);


});



$('#three').click(function(){
	var tval1=localStorage.getItem('uid');
	var tval2=localStorage.getItem('textbox');
	var likedi=$.ajax({
		
		type: 'POST',
	    url: 'dd.php',	
		data:{uid:tval1,ser:tval2},
		async:false,

		
		
	}).responseText;	
alert(likedi);

});
var tval2=localStorage.getItem('textbox');
var tval21=localStorage.getItem('uid');
tval1=tval21.substring(4, tval21.length);
if(tval1==tval2)
	{
	$('#form1').show();
	}



$('#one').click(function(){
	
$('#mesk').css("visibility","visible");
	

$('#mesk').addClass("ui-widget ui-corner-all");

$('#sendmsg').click(function(){
	
var mes=$("#msg").val();
var tval1=localStorage.getItem('uid');
var tval2=localStorage.getItem('textbox');
tval1=tval1.substring(4, tval1.length);
alert("vaaattt"+tval1);
	var seme=$.ajax({
		
		type: 'POST',
	    url: 'mess.php',	
		data:{uid:tval1,frn:tval2,ms:mes},
		async:false,

		
		
	}).responseText;	
alert(seme);
	
});

});

$('#mee1').click(function(){

$('#mdis').css('visibility','visible');
var tval1=localStorage.getItem('uid');

tval1=tval1.substring(4, tval1.length);
var message=$.ajax({
	
	type: 'POST',
    url: 'm_di.php',	
    dataType: "json",
	data:{uid:tval1},
	async:false,

	
	
}).responseText;	

	var jj=jQuery.parseJSON(message);

	var jjj=JSON.stringify(jj);
//	$('#mdis').val(message);
	$.each(jj, function(key, value) {
	     var k=key;
	 	$('#mdis').val($('#mdis').val()+"MESSAGES FROM "+key+":"+value+"\n");
	});
});


});
