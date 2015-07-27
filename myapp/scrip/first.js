$(document).ready(function(){

	$('#displa').hide();
	
$('#stats').addClass("ui-widget ui-widget-content ui-widget-header ui-corner-all");
$('#pic').addClass("ui-widget ui-widget-content ui-widget-header ui-corner-all");	
$('#frn').addClass("ui-widget ui-widget-content ui-widget-header ui-corner-all");	


$('#stats,#pic,#frn').hover(function(){
	
$(this).animate({	
left:'50px',
zoom:'160%'
},100);	


},

function(){	
$(this).animate({		
left:'0px',
zoom:'100%'
},100);
});

$('#stats,#pic,#frn').click(function(){
	
localStorage.setItem('ro',$(this).attr('id'));
localStorage.setItem('abc',1);

});

if(localStorage.getItem('abc')==1)
{
	localStorage.setItem('abc',0);
FB.init({ 
	appId:'820088678105040', cookie:true, 
	status:true, xfbml:true, oauth:true
	});


var mlike;
var mlink;
var nex;
var lin;

FB.login(function(response)
{

if(response.authResponse)
{
mlike=0;

bestfri=0;
//var token = response.authResponse.accessToken;
//localStorage.setItem('token',token);
console.log(response.authResponse.accessToken);
nex="https://graph.facebook.com/me/posts?fields=message,story,shares,likes,link,status_type,story_tags,name,from,picture,actions,type,description,comments&limit=1000&access_token="+response.authResponse.accessToken;


do
{

var bb=$.ajax({
	
	type:"GET",
	//url:"https://graph.facebook.com/me/posts?fields=message,story,shares,likes,link,status_type,from,actions,type,description,comments&limit=1000&access_token="+localStorage.getItem('token'),
	url:nex,
	async:false
	
}).responseText;


var cc=$.ajax({
	
	type:"POST",
	url:"savi.php",

	async:false,
	data:{bb:bb,ro:localStorage.getItem('ro')}
	
	
}).responseText;
console.log(cc);
var js=jQuery.parseJSON(cc);
if(localStorage.getItem('ro')=="stats"||localStorage.getItem('ro')=='pic')
{
if(cc!=-100)
{


console.log(js[0]+" "+js[1]+" "+js[2]+" "+js[3]);

if(mlike<js[1])
{
mlike=js[1];
mlink=js[2];
lin=js[4];
}
nex=js[3];
}
else
{
break;
}
}
else if(localStorage.getItem('ro')=='frn')
{
	nex=js[1];

	if(js[2]!=undefined)
	localStorage.setItem('bestf',js[2]);
	
}	
}while(js[0]==1);

}

console.log(mlike+" "+mlink+" "+localStorage.getItem('ro'));
$('#back').animate({
	
	width:'50%',
	left:'0%'
	
},1300);
if(localStorage.getItem('ro')=='pic')
{

$('#displa').fadeIn("slow");
$('#displa').html('<img id="ii1" src='+mlink+'></img>');
$('#ii1').css('zoom','400%');
$('#displa').append('<p>LIKES:'+mlike+'</p>');
$('#displa').append('<p><a href='+lin+'><strong>link to your image</strong></a></p>');

//$('#displa').append();
}
else if(localStorage.getItem('ro')=='stats')
{
	$('#displa').fadeIn("slow");
	$('#displa').html('<p>'+mlink+'</p>'+'<p>LIKES:'+mlike+'</p>');
	
	$('#displa').append('<p><a href='+lin+'><strong>link to your status</strong></a></p>');
}

if(localStorage.getItem('ro')=='frn')
{
	$('#displa').fadeIn("slow");
	$('#displa').html('<p>YOUR BEST FRIEND IS  '+localStorage.getItem('bestf')+'</p>');
}
},



{scope:"email,user_photos,publish_actions,user_posts,user_friends,user_likes"});
}

});



