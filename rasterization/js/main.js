var canvas;
var gl;
var program;
var vertexbuffer;

/**
* Pull the shader code from a script tag.
*/

//------------------------------------------------------------------------------------//
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
   // console.log(localStorage.getItem('alText'));
    rawFile.send(null);
	//init();
		
}
//------------------------------------------------------------------------------------//



 function getShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) return null;

	var str = "";
	var k = shaderScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}

	var shader;
	if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	}else if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	}else {
		return null;
	}

	gl.shaderSource(shader, str);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}


/**
* Load and compile GLSL shaders.
*/
function loadShaders() {
	var vertexShader = getShader(gl, "shader-vs");
	var fragmentShader = getShader(gl, "shader-fs");

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.error( "Could not initialize shaders" );
	}

	gl.useProgram(shaderProgram);

	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
}


/**
* Program initialization.
*/
function init() {
	
	// create and compile our GLSL program from the shaders
	loadShaders();	

//--------------------------------------------------------------------------------------------//

	filetext=localStorage.getItem('alText');
	//console.log(filetext);
	var res = filetext.split("\n");

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
				vertices.push(parseInt(p[1]));
				vertices.push(parseInt(p[2]));
				vertices.push(parseInt(p[3]));

			count++;
			j++;
		}

		console.log(count);
//--------------------------------------------------------------------------------------------//


	// create a buffer and put a single clipspace triangle in it	
	vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	/*var vertices = [
		 0.0,  1.0,  0.0,
		-1.0, -1.0,  0.0,
		 1.0, -1.0,  0.0
	];*/
/*	for(var i=0;i<vertices.length;i++)
	{

		console.log(vertices[i]);
	}*/


	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	vertexBuffer.itemSize = 3;
	vertexBuffer.numItems = count;
	

}


/**
* Main rendering function.
*/
function render() {
	
	// clear the canvas
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// set the shader and vertex buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	// draw the triangle
	gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numItems);	
}


/**
* Program entry point.
*/
function main() {	
	
	// get a WebGL context
	canvas = document.getElementById( "canvas" );
	readTextFile("js/cube2.obj");
	// 3D example
	gl = canvas.getContext("experimental-webgl");
	gl.viewportWidth = canvas.width;
	gl.viewportHeight = canvas.height;
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	
	// set the GL clear color
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	// load shaders and bind arrays
	init();
	
	// draw
	render();

}

window.onload = main;