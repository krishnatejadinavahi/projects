$(document).ready(function(){

var temp;
	$(function() {
	    $( "input:text" ).addClass("ui-widget ui-widget-content ui-widget-header ui-corner-all");
	    $( "input:password" ).addClass("ui-widget ui-widget-content ui-widget-header ui-corner-all");
	    $( "input:submit" ).addClass("ui-widget ui-corner-all");
	   
	 
	  
	});
	$('#uid,#pwd,#sub,#sub1').hover(function(){
		
		$(this).animate({
			color:"blue",
				backgroundColor: "GhostWhite"
		});
		
	});

$('#uid,#pwd,#sub,#sub1').mouseleave(function(){
		
		$(this).animate({
			color:"black",
				backgroundColor: "GhostWhite"
		});
		
	});


$('#sub').click(function(){
	
	var query = $('#fo').serialize();
    
	$.ajax({
		
		type: 'POST',
	    url: 'newfile.php',
	  // data: {'$("#uid").serialize()':$('#pwd').serialize()},
	    data: {'uid':$("#uid").serialize(),'pwd':$('#pwd').serialize()},
	    //data: query,
	    success: function listFeeds(result)
	    {
	    	if(result==-1)
	    		{
	    		alert("USER ALREADY EXISTS")
	    		}
	    	else
	    		{
	    		alert("REGISTRATION SUCCESSFUL");
	    
	    		}
	    		
	    }
	    
	  

	});



	
});

$('#sub1').click(function(){

	localStorage.removeItem('frnd');
    var a=$("#uid").serialize();
    var b=$('#pwd').serialize();
	$.ajax({
		
		type: 'POST',
	    url: 'login.php',
	  
	    async:false,
	    data: {uid:a, pwd:b},
	    //data: {'$("#uid").serialize()':$('#pwd').serialize()},
	    success: function listFeeds1(result)
	    {
	    	if(result==1)
	    		{
	    		localStorage.setItem('uid', $("#uid").serialize());
	    		
	    		temp=1;
	    		}
	    	else
	    		{
	    		
	    		alert("ENTER THE CORRECT DETAILS OR REGISTER AS A NEW USER");
	    		//alert(result);
	    		}
	    
	    	
	    }
	    

	   
	});


if(temp==1)
	{
	window.open('profile.php');
	
	}


});




});
 