var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");


var drag=function(ev)
{
	ev.dataTransfer.setData("text",ev.target.id);
	}

var drop=function(ev){
	
	ev.preventDefault();
	var data=ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
	
}

var allowDrop=function(ev){
	ev.preventDefault();
}