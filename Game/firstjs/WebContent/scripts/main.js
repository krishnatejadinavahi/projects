var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var img=new Image();
//img.onLoad=function()
//{
	img.status=false;
//}
img.src = "scripts/ee.png";

var img1=new Image();
img1.status1=false;
img1.src= "scripts/aa.PNG";
var heya=function(){
	img.status=true;
	
	alert(img.status);
	if(img.status==true)
	{
	ctx.drawImage(img,0,0);
	ctx.drawImage(img1,0,0,50,60);

	}
}


