var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

//ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);

var loo=document.getElementById("youlost");
var bullet=new Image();

var t1=0;
var t2=0;
var t3=0;

/*bullet.src="scripts/pp.png";
bullet.id="bul";*/

var nex=document.getElementById("nextim");
var enemy=document.getElementById("enem");
var defe=document.getElementById("defeat");
var no_of=0;


var ene_weap=document.getElementById("weapon");
var aa=null;
//var bu=null;
//var cou=0;
var doMove=function() {
	
	//bu.style.left = parseInt(bu.style.left)+1+'px'; // pseudo-property code: Move right by 10px
	if(parseInt(nex.style.left)<1280)
		{
		var x1=parseInt(enemy.style.top);
		var y=parseInt(nex.style.top);
		//alert("enemy"+x1);
		//alert("bomb"+y);
		//console.log("enemy"+x1);
		//console.log("bomb"+y);
		if(nex.style.left==enemy.style.left&&((y+50>=x1&&y<x1)||(y-50<=x1&&y>x1)))
				
				//nex.style.top==enemy.style.top)//||nex.style.top==(parseInt(enemy.style.top+100)+'px')||nex.style.top==(parseInt(enemy.style.top-100)+'px'))
			{
			enemy.style.visibility="hidden";
			nex.style.visibility="hidden";
			no_of++;
			//ctx.fillText("aaaaaaaaaaaaaaaaa");
			
			init();
			}
		nex.style.left = parseInt(nex.style.left)+1+'px'; 
		
		setTimeout(doMove,2);
		}
	else
		{
		nex.style.visibility="hidden";
		}
	

}

var enemy_doMove=function(){
	
var x2=parseInt(aa.style.top);
var y2=parseInt(ene_weap.style.top);

//alert("meeee"+x2);
//alert("bomb"+y2);

if(parseInt(ene_weap.style.left)>=0)
	{
	if((aa.style.left==ene_weap.style.left||aa.style.left==enemy.style.left||aa.style.left==parseInt(ene_weap.style.left)-1+'px'||aa.style.left==parseInt(ene_weap.style.left)+1+'px'||aa.style.left==parseInt(ene_weap.style.left)-2+'px'||aa.style.left==parseInt(ene_weap.style.left)+2+'px')&&((y2+50>=x2&&y2<x2)||(y2-50<=x2&&y2>x2)))
		{
		
		aa.style.visibility="hidden";
	
		ene_weap.style.visibility="hidden";
		
		nex.style.visibility="hidden";
		
		enemy.style.visibility="hidden";
		loo.style.visibility="visible";
		}
	ene_weap.style.left = parseInt(ene_weap.style.left)-1+'px'; 
	
	
	var enemotion=Math.floor(Math.random() * 2) + 1;
	var in_emo=Math.floor(Math.random() * 2) + 1;
	enemy.style.bottom=540-Math.abs(parseInt(enemy.style.top))+'px';
	//alert(parseInt(enemy.style.bottom)+"bottom");
	switch(enemotion){
	
	case 1:
		
		if(parseInt(enemy.style.top)>=-100&&parseInt(enemy.style.bottom)>=-100)
		{
			if(parseInt(enemy.style.top)<0)
				enemy.style.top=0+'px';
			if(parseInt(enemy.style.bottom)<0)
				enemy.style.bottom=0+'px';
		if(parseInt(enemy.style.top)==0)
			{
			
		enemy.style.top=parseInt(enemy.style.top)+50+'px';
			}
		if(parseInt(enemy.style.bottom)==0)
		{
		
	enemy.style.top=parseInt(enemy.style.top)-50+'px';
		}
		else if(parseInt(enemy.style.bottom)==0)
		enemy.style.top=parseInt(enemy.style.top)-1+'px';
		else
			{
			switch(in_emo){
			case 1:
				enemy.style.top=parseInt(enemy.style.top)-1+'px';
				break;
			case 2:
				enemy.style.top=parseInt(enemy.style.top)+1+'px';
				break;
			default:
				break;
			}
			}
		}
		else
			alert(parseInt(enemy.style.bottom));
		break;
	case 2:
		
		if(parseInt(enemy.style.top)>=-100&&parseInt(enemy.style.bottom)>=-100)
		{
			if(parseInt(enemy.style.top)<0)
				enemy.style.top=0+'px';
			if(parseInt(enemy.style.bottom)<0)
				enemy.style.bottom=0+'px';
		if(parseInt(enemy.style.top)==0)
			{
			
		enemy.style.top=parseInt(enemy.style.top)+50+'px';
			}
		if(parseInt(enemy.style.bottom)==0)
		{
		
	enemy.style.top=parseInt(enemy.style.top)-50+'px';
		}
		else if(parseInt(enemy.style.bottom)==0)
		enemy.style.top=parseInt(enemy.style.top)-1+'px';
		else
		{
		switch(in_emo){
		case 1:
			enemy.style.top=parseInt(enemy.style.top)-1+'px';
			break;
		case 2:
			enemy.style.top=parseInt(enemy.style.top)+1+'px';
			break
		default:
			break;
		}
		}
		}
		else
			alert(parseInt(enemy.style.bottom));
		break;
	/*case 3: 
		
		break;
	case 4:
		
		break;*/
	default:
		
		break;
	
	}
	
	
	
	setTimeout(enemy_doMove,2);
	
	}
else
	{
	
	ene_weap.style.visibility="hidden";
	if(enemy.style.visibility!="hidden")
	enemy_attack();
	}
}

var enemy_attack=function(){
	if(no_of!=0)
		{
		defe.style.visibility="hidden";
		/*enemy.style.right=Math.floor(Math.random() * 100) + 1+'px';
		enemy.style.top=Math.floor(Math.random() * 400) + 1+'px';
		enemy.style.left=1280-parseInt(enemy.style.right)+'px';*/
		enemy.style.visibility="visible";
		}
	
	ene_weap.style.left=enemy.style.left;
	ene_weap.style.top=enemy.style.top;
	ene_weap.style.right=enemy.style.right;
	ene_weap.style.visibility="visible";
		
	enemy_doMove();
}

var kk=5;
var count=function(){
	if(kk<25)
	kk=kk+2;
	else
		;
}
/*var countdec=function(){
	kk=kk-2;
}*/
var init=function(){
	
	if(no_of!=0&&aa.style.visibility!="hidden")
	{
	alert("LEVEL"+no_of);
	

	aa.style.left='0px';
	aa.style.top='0px';
	
	nex.style.left='0px';
	nex.style.top='0px';
	
	enemy.style.right=Math.floor(Math.random() * 100) + 1+'px';
	enemy.style.top=Math.floor(Math.random() * 400) + 1+'px';
	enemy.style.left=1280-parseInt(enemy.style.right)+'px';
	
	
	ene_weap.style.left='0px';
	ene_weap.style.top='0px';
	
	
	enemy_attack();
	}
	else
		{
		aa=document.getElementById('im1');

		aa.style.left='0px';
		aa.style.top='0px';
		nex.style.left='0px';
		nex.style.top='0px';
		
		enemy.style.right=Math.floor(Math.random() * 100) + 1+'px';
		enemy.style.top=Math.floor(Math.random() * 400) + 1+'px';
		enemy.style.left=1280-parseInt(enemy.style.right)+'px';
		
		
		ene_weap.style.left='0px';
		ene_weap.style.top='0px';
		
		
		enemy_attack();
		}
	
	}
	window.onload=init;

var keys=new Set();
window.onkeydown = function(e) {
	
	t2=Date.now();
	//t3=(t2-t1)/2000;
	t3=1;
	
	var key = e.keyCode ? e.keyCode : e.which;
	

	switch(key){
	
	case 38:
		if(parseInt(aa.style.top)>20)
		aa.style.top = parseInt(aa.style.top)-(Math.abs(kk)*t3)+'px';
		if(e.ctrlKey && e.which == 38) {
			//aa.style.top = parseInt(aa.style.top)-(Math.abs(kk)*t3)+'px';
			nex.style.visibility="visible";
		    
			nex.style.left=aa.style.left;
			nex.style.right=aa.style.right;
			nex.style.top=aa.style.top;
			nex.style.bottom=aa.style.bottom;
			
			doMove();
	    }
		break;
	case 40:
		if(parseInt(aa.style.top)<550)
		aa.style.top = parseInt(aa.style.top)+(Math.abs(kk)*t3)+'px';
		if(e.ctrlKey && e.which == 40) {
			//aa.style.top = parseInt(aa.style.top)+(Math.abs(kk)*t3)+'px';
			nex.style.visibility="visible";
		    
			nex.style.left=aa.style.left;
			nex.style.right=aa.style.right;
			nex.style.top=aa.style.top;
			nex.style.bottom=aa.style.bottom;
			
			doMove();
		    }
		break;
	case 37:
		if(parseInt(aa.style.left)>10)
		aa.style.left = parseInt(aa.style.left)-(Math.abs(kk)*t3)+'px';
		if(e.ctrlKey && e.which == 37) {
			//aa.style.left = parseInt(aa.style.left)-(Math.abs(kk)*t3)+'px';
			nex.style.visibility="visible";
		    
			nex.style.left=aa.style.left;
			nex.style.right=aa.style.right;
			nex.style.top=aa.style.top;
			nex.style.bottom=aa.style.bottom;
			
			doMove();
		    }
		break;
	case 39:
		if(parseInt(aa.style.left)<1180)
			{
		aa.style.left = parseInt(aa.style.left)+(Math.abs(kk)*t3)+'px';
			}
		if(e.ctrlKey && e.which == 39) {
			//aa.style.left = parseInt(aa.style.left)+(Math.abs(kk)*t3)+'px';
			nex.style.visibility="visible";
		    
			nex.style.left=aa.style.left;
			nex.style.right=aa.style.right;
			nex.style.top=aa.style.top;
			nex.style.bottom=aa.style.bottom;
			
			doMove();
		    }
		break;
	case 17:
		//ctx.drawImage(bullet,10,10);
		//doMove();
		//alert(parseInt(nex.style.left));
		//if(parseInt(nex.style.left==0))
		//	{
		
		nex.style.visibility="visible";
	    
		nex.style.left=aa.style.left;
		nex.style.right=aa.style.right;
		nex.style.top=aa.style.top;
		nex.style.bottom=aa.style.bottom;
		
		doMove();
			//}
			
		//else
		//	alert("eeeyyy");
		break;
	case 32:
		count();
		break;
	default:
		
		break;
	}
	
	keys.add(key);
	
	console.log(keys);
	
}


