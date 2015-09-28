// The following function has been taken from http://stackoverflow.com/questions/21456198/read-from-a-local-text-file-and-update-and-updating-the-content-in-an-html-tag
function readTextFile(file)
{
	//console.log(file);
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
    //console.log(localStorage.getItem('alText'));
    rawFile.send(null);
	//init();
		
}



function readmtl(file)
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
                mtltext = rawFile.responseText;
				
               	localStorage.setItem('mtltext',mtltext);
				//alert(localStorage.getItem('alText'));
            }
        }
    }
    //console.log(localStorage.getItem('mtltext'));
    rawFile.send(null);
    init();
}



var allText="";
var filetext;

var mtlfil;
var mtlarray=[];
var mtlarray1=[];

var obarray=[];
var obarray1=[];

var canvas;
var gl;
var program;
var vertexbuffer;

var facebuffer;
/**
* Write the RGBA value of a given pixel location.
*/

function setPixel( imageData, x, y, r, g, b, a ) {

	//console.log(x+" "+y+" "+r+" "+g+" "+b);

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


mtlfil=localStorage.getItem('mtltext');
var mtl1=mtlfil.split("\n");
//console.log(mtl1[16].split('Ka')[1]);

for(i=0;i<mtl1.length;i++)
{
	if(mtl1[i].split(' ')[0]=='newmtl')
	{

		mtlarray.push(mtl1[i].split(' ')[1]);
		mtlarray.push(mtl1[i+1].split('Ka ')[1].split(' '));
		mtlarray.push(mtl1[i+2].split('Kd ')[1].split(' '));
		mtlarray.push(mtl1[i+3].split('Ks ')[1].split(' '));
		//mtlarray.push(mtl1[i+4].split('N')[1]);
		//alert(mtl1[i+5]);
		if(mtl1[i+5]==''||mtl1[i+5]==undefined)
		{
		//	alert("if");
			mtlarray.push(mtl1[i+4].split('N')[1]);
		}
		else
		{
			mtlarray.push(mtl1[i+5].split('Ns')[1]);
		}
		mtlarray1.push(mtlarray);
		mtlarray=[];
	}
}
console.log(mtlarray1);

///console.log(mtl1[15].split(' ')[0]);




var obgroup=localStorage.getItem('alText');
var obgroup1=obgroup.split("\n");
//console.log(obgroup1);
//console.log(obgroup1[22].split('g ')[1]);
//console.log(obgroup1[22].split(' ')[0]);



for(i=0;i<obgroup1.length;i++)
{
	if(obgroup1[i].split(' ')[0]=="g")
	{
		obarray.push(obgroup1[i].split('g ')[1]);
		var j=i;
		while(obgroup1[j]!="")
		{
			if(obgroup1[j].split(' ')[0]=="f")
			{
				obarray.push(obgroup1[j].split('f ')[1].split(' '));
			}
			j++;

		}
		obarray1.push(obarray);
		obarray=[];
	}
}

console.log(obarray1);



	
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
if(localStorage.getItem('file')=='js/dolphins.mtl')
{
vertices.push(p[1]/300);
vertices.push(p[2]/300);
vertices.push(p[3]/300);
}
else if(localStorage.getItem('file')=='js/cube2.mtl')
{
vertices.push(p[1]);
vertices.push(p[2]);
vertices.push(p[3]);
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

	var ctx = canvas.getContext('2d');
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height );
	var data = imageData.data;


	var count1=0;
	var count2=0;

	var dist;
	var nearest;
	var ip=[];
	var amb=[];
	var dif=[];
	var spec=[];
	var Ka=[];
	var Kd=[];
	var Ks=[];
	var p1=[];
	var p2=[];
	var p3=[];
	var kfinal;
	var jfinal;


	 for(k = -1; k <=1; k+=2/canvas.width){
	//for( k = -5; k <=5; k+=10/canvas.width) {
		count1++;
		for(j = 1; j >=-1; j-=2/canvas.height){
	//for( j = 5; j >=-5; j-=10/canvas.height ) {
		count2++;

		
		for(i=0;i<face1.length;i++)
		{
		if(i==0)
		{
			dist=100000;
			
		}

		

		var arr=face1[i];
		//console.log(face1[i]);
		var v1=vertex1[arr[0]-1];
		var v2=vertex1[arr[1]-1];
		var v3=vertex1[arr[2]-1];

		if(v1!=undefined&&v2!=undefined&&v3!=undefined)
		{

		var w=rayTriangle([0,0,-2],[k,j,1],v1,v2,v3);

		if(w!=false)
		{

			
			
			if(w[3]<dist)
			{


				dist=w[3];	
				nearest=face1[i];
				ip=[];
				ip.push(w[0]);
				ip.push(w[1]);
				ip.push(w[2]);
				jfinal=j;
				kfinal=k;


			}


			
			break;
			
		}
		else
		{

			dist=dist;

		}
		}
		
	
		}
		
		if(dist!=100000)
		{

			for(j1=0;j1<obarray1.length;j1++)
			{
				for(k1=0;k1<obarray1[j1].length;k1++)
				{
					//console.log(obarray1[j][k]+face1[i]);
					var is_same = (nearest.length == obarray1[j1][k1].length) && face1[i].every(function(element, index) {
					    return element === obarray1[j1][k1][index]; 
					});
					if(is_same)
					{
						//alert("yes");
						//console.log(obarray1[j][0]);
						var grou=obarray1[j1][0];
						for(p1=0;p1<mtlarray1.length;p1++)
						{
								if(mtlarray1[p1][0]==grou)
								{
									//console.log(mtlarray1[p1][1]+" "+mtlarray1[p1][2]+" "+mtlarray1[p1][3]+" "+mtlarray1[p1][4]+" "+face1[i]+" "+dist+" "+ip);
									Ka=mtlarray1[p1][1];
									Kd=mtlarray1[p1][2];
									Ks=mtlarray1[p1][3];
									exponent=mtlarray1[p1][4];
									//console.log(mtlarray1[p1][4]);
									break;
								}
						}
						break;
					}
				}
			}


			amb=Ka;
			//console.log(Ka+" "+Kd+" "+Ks+" "+amb);

			p1=vertex1[nearest[0]-1];
			p2=vertex1[nearest[1]-1];
			p3=vertex1[nearest[2]-1];

			//console.log(nearest[0]+" "+p1+" "+nearest[1]+" "+p2+" "+nearest[2]+" "+p3);
		
			var D11=[];
			vec3.subtract(D11,p2,p1);
			var D12=[];
			vec3.subtract(D12,p3,p1);
			//console.log(p3+" "+p1+" "+D12);

			var D13=[];

			vec3.cross(D13,D11,D12);
			//console.log(D13);
	
			var D1=[];
			vec3.normalize(D1,D13);
			//console.log(D1);


			var D21=[];
			var light=[0,5,0];
			vec3.subtract(D21,light,ip);
			//console.log(D21);

			var D2=[];
			vec3.normalize(D2,D21);
			//console.log(D2);

			var D3=Kd;

			var D4=vec3.dot(D1,D2);
			//console.log(D4);

			if(D4<0)
			{
				D4=0;
			}
			else if(D4>1)
			{
				D4=1;
			}

			var Dfinal=[];
			Dfinal=[D3[0]*D4,D3[1]*D4,D3[2]*D4];
			//console.log(Dfinal);


////////////////////////////////////////////////////////

		
			var vbar1=[];
			vec3.subtract(vbar1,[0,0,-2],ip);
			//console.log(ip+" "+vbar);

			var vbar=[];
			vec3.normalize(vbar,vbar1);

			var rbar1=vec3.dot(D2,D1);
			if(rbar1<0)
			{
				rbar1=0;
			}
			else if( rbar1>1)
			{
				rbar1=1;
			}



			var rbar2=2*rbar1;

			var rbar3=[rbar2*D1[0],rbar2*D1[1],rbar2*D1[2]];
			//console.log(rbar3);

			var rbarf1=[];
			vec3.subtract(rbarf1,rbar3,D2);
			//console.log(rbarf);
			

			var rbarf=[];
			vec3.normalize(rbarf,rbarf1);

			var s2=vec3.dot(vbar,rbarf);
			//console.log(s2);

			

			if(s2<0)
			{
				s2=0;
			}
			else if(s2>1)
			{
				s2=1;
			}

			//console.log(exponent);
			var s22=Math.pow(s2,exponent);
			//console.log(s2+" "+exponent+" "+s22);

			console.log(s22+" "+s2+" "+exponent);



			var sfinal=[Ks[0]*s22,Ks[1]*s22,Ks[2]*s22];


			var illu1=[];


			illu1=[parseFloat(Dfinal[0])+parseFloat(amb[0]),parseFloat(Dfinal[1])+parseFloat(amb[1]),parseFloat(Dfinal[2])+parseFloat(amb[2])];


		
		


			var illu2=[];


			illu2=[parseFloat(illu1[0])+parseFloat(sfinal[0]),parseFloat(illu1[1])+parseFloat(sfinal[1]),parseFloat(illu1[2])+parseFloat(sfinal[2])];




			setPixel(imageData,count1,count2,illu2[0]*255,illu2[1]*255,illu2[2]*255,255);

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
	readmtl("js/cube2.mtl");
}



window.onload = main1;

