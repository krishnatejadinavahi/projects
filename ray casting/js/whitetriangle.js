// The following function has been taken from http://stackoverflow.com/questions/21456198/read-from-a-local-text-file-and-update-and-updating-the-content-in-an-html-tag
function readTextFile(file)
{
	console.log(file);
	localStorage.setItem('file',file);
    var rawFile = new XMLHttpRequest();

    rawFile.open("GET", file, false);

    rawFile.onreadystatechange = function ()
    {
		//alert("coming");
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
				
               	localStorage.setItem('alText',allText);
				//alert(localStorage.getItem('alText'));
            }
        }
    }
    console.log(localStorage.getItem('alText'));
    rawFile.send(null);
	init();
		
}





var allText="";
var filetext;

var canvas;
var gl;
var program;
var vertexbuffer;

var facebuffer;
/**
* Write the RGBA value of a given pixel location.
*/

function setPixel( imageData, x, y, r, g, b, a ) {

    index = ( x + y * imageData.width ) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;

}


/*
* Pixel manipulation example.
*/
function writeCanvasPixels() {
	var ctx = canvas.getContext('2d');
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height );
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	
	// clear all pixels to black
	for (i = 0; i < canvas.width; i++) {
		for( j = 0; j < canvas.height; j++ ) {
			setPixel(imageData, i, j, 0, 0, 0, 255);			
		}		
	}
	
	ctx.putImageData( imageData, 0, 0 );
}


function init()
{

	
filetext=localStorage.getItem('alText');
//console.log(filetext);
var res = filetext.split("\n");
//alert(res[8].length);


var faces=[];
var face1=[];
var count1=0;
var z=0;


for(var k=0;k<res.length;k++)
{
	if(res[k][0]=="f")
	{
		count1++;
		var q=res[k].split(" ");
	
		faces.push(q[1]);
		faces.push(q[2]);
		faces.push(q[3]);
	}
}

//console.log(faces);

for(var p=0;p<faces.length;p++)
{
	
	if(face1[z]==undefined)
	{
	face1[z]=[];
	face1[z].push(faces[p]);
	}
	else if(face1[z].length<3)
	{	
	face1[z].push(faces[p]);
	}
	else
	{
		z++;
		p--;
	}
}

for(var i=0;i<face1.length;i++)
{
	//console.log(face1[i]+"\n");
}


var index=0;
for(var i=0;i<res.length;i++)
{
if(res[i][0]=="v")
{
//alert("got");
index=i;
break;
}
}
var vertices=[];

var j=index;
var count=0;

//alert(j);
while(res[j][0]=="v"||res[j][0]=="vn")
{
var p=res[j].split(" ");
//alert(p[1]+" "+p[2]+" "+p[3]);
//alert(localStorage.getItem('file'));
if(localStorage.getItem('file')=='js/cube2.obj')
{
vertices.push(p[1]);
vertices.push(p[2]);
vertices.push(p[3]);
}
else if(localStorage.getItem('file')=='js/dolphins.obj')
{
vertices.push(p[1]/300);
vertices.push(p[2]/300);
vertices.push(p[3]/300);	
}
else
{
vertices.push(p[1]);
vertices.push(p[2]);
vertices.push(p[3]);	
}
count++;
j++;
}



var vertex1=[];
var z1=0;
for(var p1=0;p1<vertices.length;p1++)
{
	
	if(vertex1[z1]==undefined)
	{
	//console.log("yes"+" "+z)
	//console.log(faces[p]);
	vertex1[z1]=[];
	vertex1[z1].push(vertices[p1]);
	}
	else if(vertex1[z1].length<3)
	{	
	vertex1[z1].push(vertices[p1]);
	}
	else
	{
		z1++;
		p1--;
	}
}

for(var i=0;i<vertex1.length;i++)
{
	//console.log(vertex1[i]+"\n");
}


	var ctx = canvas.getContext('2d');
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height );
	var data = imageData.data;


	var count1=0;
	var count2=0;
	 
	  for(k = -1; k <=1; k+=2/canvas.width){
	//for( k = -5; k <=5; k+=10/canvas.width) {
		count1++;
		for(j = 1; j >=-1; j-=2/canvas.height){
	//for( j = 5; j >=-5; j-=10/canvas.height ) {
		count2++;
		//setPixel(imageData,k,j,0, 0, 0, 255);
		//console.log(k+" "+j);
		
		for(i=0;i<face1.length;i++)
		{
		
		var arr=face1[i];
		//console.log(face1[i]);
		var v1=vertex1[arr[0]-1];
		var v2=vertex1[arr[1]-1];
		var v3=vertex1[arr[2]-1];
		//console.log(face1[i]+" "+v1+" "+v2+" "+v3);
		//console.log(k+" "+j+" "+i);
		if(v1!=undefined&&v2!=undefined&&v3!=undefined)
		{
			//console.log(k+" "+j);
		var w=rayTriangle([0,0,-2],[k,j,1],v1,v2,v3);
		//console.log(w);
		//var w=intersectTriangle([],[0,0,-2],[k,j,1],[v1,v2,v3]);
		//console.log(retval);
		//console.log(w);
		if(w!=false)
		{
			//console.log("counts"+" "+count1+" "+count2);
			setPixel(imageData,count1,count2,220, 220,220, 255);
			//console.log("if"+" "+k+" "+j);
			
			//break;
			
		}
		else
		{
			
			//setPixel(imageData,k,j,190, 60,40,255);
	
			//console.log("else"+" "+k+" "+j);
			//continue;
			
		}
		}
	
	
		}
		
		}	
		
count2=0;		
	}
	ctx.putImageData( imageData, 0, 0 );
	//alert("done");
	
}

// The following function has been taken from http://www.html5gamedevs.com/topic/11012-3d-ray-triangle-intersection/

function rayTriangle(y, x, z, r, n) { // rayTriangle(from [x,y,z], normal [x,y,z], vertex1 [x,y,z], vertex2 [x,y,z], vertex3 [x,y,z])
  
	var a = (r[1] - z[1]) * (n[2] - z[2]) - (n[1] - z[1]) * (r[2] - z[2]),
        i = (r[2] - z[2]) * (n[0] - z[0]) - (n[2] - z[2]) * (r[0] - z[0]),
        t = (r[0] - z[0]) * (n[1] - z[1]) - (n[0] - z[0]) * (r[1] - z[1]),
        e = Math.sign(a * (z[0] - y[0]) + i * (z[1] - y[1]) + t * (z[2] - y[2])),
        u = x[0] * a + x[1] * i + x[2] * t;
    if (e != Math.sign(u) || 0 == e) return false;
    var v = (a * z[0] + i * z[1] + t * z[2] - (a * y[0] + i * y[1] + t * y[2])) / u,
        f = x[0] * v + y[0],
        g = x[1] * v + y[1],
        s = x[2] * v + y[2],
        c = (z[1] - g) * (r[2] - s) - (r[1] - g) * (z[2] - s),
        h = (z[2] - s) * (r[0] - f) - (r[2] - s) * (z[0] - f),
        M = (z[0] - f) * (r[1] - g) - (r[0] - f) * (z[1] - g);
    if (0 > c * a + h * i + M * t) return false;
    var c = (r[1] - g) * (n[2] - s) - (n[1] - g) * (r[2] - s),
        h = (r[2] - s) * (n[0] - f) - (n[2] - s) * (r[0] - f),
        M = (r[0] - f) * (n[1] - g) - (n[0] - f) * (r[1] - g);
    if (0 > c * a + h * i + M * t) return false;
    var c = (n[1] - g) * (z[2] - s) - (z[1] - g) * (n[2] - s),
        h = (n[2] - s) * (z[0] - f) - (z[2] - s) * (n[0] - f),
        M = (n[0] - f) * (z[1] - g) - (z[0] - f) * (n[1] - g);
    return 0 > c * a + h * i + M * t ? false : [f, g, s, vecDist(y, [f, g, s])];
}

function vecDist(a, b){
    return Math.sqrt( Math.pow( (a[0] - b[0])  ,2)+Math.pow( (a[1] - b[1])  ,2)+Math.pow( (a[2] - b[2]),2) );
}




function main1() {	
	
	// get a WebGL context
	canvas = document.getElementById( "canvas" );

	// 2D example
	writeCanvasPixels();
	readTextFile("js/cube2.obj");
}



window.onload = main1;

