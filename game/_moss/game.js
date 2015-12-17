 var gl;

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }


    function getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }


    var shaderProgram;

    function initShaders() {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

        shaderProgram.vertexColorAttribute1 = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute1);


        shaderProgram.vertexColorAttribute2 = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute2);



        shaderProgram.vertexColorAttribute3 = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute3);


        shaderProgram.vertexColorAttribute4 = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute4);


        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    }


    var mvMatrix = mat4.create();
    var mvMatrixStack = [];
    var pMatrix = mat4.create();

    function mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    }

    function mvPopMatrix() {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    }


    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }


    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }


    var pyramidVertexPositionBuffer;
    var pyramidVertexColorBuffer;
    var cubeVertexPositionBuffer;
    var cubeVertexColorBuffer;
    var cubeVertexIndexBuffer;
    var cubeVertexColorBuffer1;
 var cubeVertexColorBuffer2;
 var cubeVertexColorBuffer3;
    var tempcolorarr=[];
var trial=[];
    function initBuffers() {






        cubeVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        vertices = [
            // Front face
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,

            // Back face
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0, -1.0, -1.0,

            // Top face
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0, -1.0,

            // Bottom face
            -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,

            // Right face
             1.0, -1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0,  1.0,  1.0,
             1.0, -1.0,  1.0,

            // Left face
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        cubeVertexPositionBuffer.itemSize = 3;
        cubeVertexPositionBuffer.numItems = 24;

        cubeVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
        colors = [
            [0.3, 0.3, 0.3, 0.9], // Front face
            [1.0, 1.0, 0.0, 1.0], // Back face
            [0.0, 0.0, 0.8, 1.0], // Top face
            [1.0, 0.5, 0.5, 1.0], // Bottom face
            [1.0, 0.0, 1.0, 1.0], // Right face
            [0.0, 0.0, 0.1, 1.0]  // Left face
        ];
        var unpackedColors = [];
        for (var i in colors) {
            var color = colors[i];
            for (var j=0; j < 4; j++) {
                unpackedColors = unpackedColors.concat(color);
            }
        }

        for(var p=0;p<28;p++)
        {
            tempcolorarr.push(unpackedColors);
        }
        console.log(tempcolorarr);


       for(var a=0;a<96;a++)
        {
            if(a>=32&&a<=48){
            trial[a]=0.0;
         //   trial.push(0);
      //      trial.push(0);
         //   trial.push(1);
        }
        else
        {
         //   console.log(unpackedColors[a]);
           // trial.push(unpackedColors[a]);
           trial[a]=unpackedColors[a];
        }
        }
   
        console.log(trial);
      //  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors), gl.STATIC_DRAW);
       // cubeVertexColorBuffer.itemSize = 4;
        //cubeVertexColorBuffer.numItems = 24;









        cubeVertexColorBuffer1 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer1);
        var colors1 = [
            [1.0, 0.0, 1.0, 1.0], // Front face
            [0.0, 0.0, 0.0, 1.0], // Back face
            [1.0, 0.0, 0.0, 1.0],  // Top face
            [1.0, 0.0, 0.0, 1.0], // Bottom face
            [1.0, 0.0, 0.0, 1.0],  // Right face
            [1.0, 0.0, 0.0, 1.0]// Left face
        ];

 
        var unpackedColors1 = [];
        for (var i in colors1) {
            var color1 = colors1[i];
            for (var j=0; j < 4; j++) {
                unpackedColors1 = unpackedColors1.concat(color1);
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors1), gl.STATIC_DRAW);
        cubeVertexColorBuffer1.itemSize = 4;
        cubeVertexColorBuffer1.numItems = 24;



   cubeVertexColorBuffer2 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer2);
        var colors2 = [
            [1.0, 0.0, 0.0, 1.0], // Front face
            [0.0, 0.0, 0.0, 1.0], // Back face
            [1.0, 0.0, 0.0, 1.0],  // Top face
            [1.0, 0.0, 0.0, 1.0], // Bottom face
            [1.0, 0.0, 0.0, 1.0],  // Right face
            [1.0, 0.0, 0.0, 1.0]// Left face
        ];

 
        var unpackedColors2 = [];
        for (var i in colors2) {
            var color2 = colors2[i];
            for (var j=0; j < 4; j++) {
                unpackedColors2 = unpackedColors2.concat(color2);
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors2), gl.STATIC_DRAW);
        cubeVertexColorBuffer2.itemSize = 4;
        cubeVertexColorBuffer2.numItems = 24;




       cubeVertexColorBuffer3 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer3);
        var colors3 = [
            [0.0, 0.9, 0.0, 1.0], // Front face
            [0.0, 0.0, 0.0, 1.0], // Back face
            [1.0, 0.0, 0.0, 1.0],  // Top face
            [1.0, 0.0, 0.0, 1.0], // Bottom face
            [1.0, 0.0, 0.0, 1.0],  // Right face
            [1.0, 0.0, 0.0, 1.0]// Left face
        ];

 
        var unpackedColors3 = [];
        for (var i in colors3) {
            var color3 = colors3[i];
            for (var j=0; j < 4; j++) {
                unpackedColors3 = unpackedColors3.concat(color3);
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors3), gl.STATIC_DRAW);
        cubeVertexColorBuffer3.itemSize = 4;
        cubeVertexColorBuffer3.numItems = 24;






       cubeVertexColorBuffer4 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer4);
        var colors4 = [
            [1.0, 1.0, 0.0, 1.0], // Front face
            [0.0, 0.0, 0.0, 1.0], // Back face
            [1.0, 0.0, 0.0, 1.0],  // Top face
            [1.0, 0.0, 0.0, 1.0], // Bottom face
            [1.0, 0.0, 0.0, 1.0],  // Right face
            [1.0, 0.0, 0.0, 1.0]// Left face
        ];

 
        var unpackedColors4 = [];
        for (var i in colors4) {
            var color4 = colors4[i];
            for (var j=0; j < 4; j++) {
                unpackedColors4 = unpackedColors4.concat(color4);
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors4), gl.STATIC_DRAW);
        cubeVertexColorBuffer4.itemSize = 4;
        cubeVertexColorBuffer4.numItems = 24;








        cubeVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        var cubeVertexIndices = [
            0, 1, 2,      0, 2, 3,    // Front face
            4, 5, 6,      4, 6, 7,    // Back face
            8, 9, 10,     8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15, // Bottom face
            16, 17, 18,   16, 18, 19, // Right face
            20, 21, 22,   20, 22, 23  // Left face
        ];
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
        cubeVertexIndexBuffer.itemSize = 1;
        cubeVertexIndexBuffer.numItems = 36;
    }


    var rPyramid = 0;
    var rCube = 45;
    var rcube1=45;
    var rcube2=40;
      var rcube3=50;
      var rcube6=40;
    var count1;
    var player_array=[0,0.9,-7];


var win=0;

var loss=0;
    function drawScene() {
        if(currarr.indexOf(0)==-1&&t1!=1)
        {
win=1;
document.getElementById('uwon').innerHTML='YOU WON';
t1=1;

var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/Game%20start%20music.wav');
audio.play();

        }
        count1=-1;
         gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  //      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        for(var l1=0;l1<8;l1++)
        {
        
        for(var l2=0;l2<l1;l2++){
        count1++;    
       

        mat4.identity(mvMatrix);

      // console.log(transarr[count1][0]+"  "+transarr[count1][1]+"   "+transarr[count1][2]);

      //  mat4.translate(mvMatrix, [0.0, 2.0, -8.0]);


       // console.log(transarr[count1]);
       //console.log(count1);
        mat4.translate(mvMatrix, [transarr[count1][0],transarr[count1][1],transarr[count1][2]]);


        mat4.scale(mvMatrix,[0.4,0.4,0.5]);

      //  mat4.translate(mvMatrix, [3.0, 0.0, 0.0]);
        
        mvPushMatrix();
        mat4.rotate(mvMatrix, degToRad(rCube), [1.8, 0.1, 0]);
        mat4.rotate(mvMatrix, degToRad(rCube), [0, 1, 0]);


        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cubeVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

       // console.log(tempcolorarr[0]);



       if(currarr[count1]!=1)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempcolorarr[count1]), gl.STATIC_DRAW);
    else
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trial), gl.STATIC_DRAW);
        cubeVertexColorBuffer.itemSize = 4;
        cubeVertexColorBuffer.numItems = 24;


        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

        mvPopMatrix();
    }   
    }

// mat4.identity(mvMatrix);

    //console.log(player_array[0]+"  "+player_array[1])
   // console.log(player_array);
       // mat4.translate(mvMatrix, [-6.0+(player_array[0]), 9.5+(player_array[1]*2), 4.0]);

      // mat4.translate(mvMatrix,[-6+player_array[0],10.5+player_array[1]-0.5,4+player_array[2]+9]);
//mat4.translate(mvMatrix, [transarr[0][0],transarr[0][1],2*transarr[0][2]]);
if(win!=1&&loss!=1){
    mat4.identity(mvMatrix);
       mat4.translate(mvMatrix,player_array);


//mat4.translate(mvMatrix,[0,0.7,4]);
        mat4.scale(mvMatrix,[0.15,0.15,0.05]);
        mvPushMatrix();
       // mat4.rotate(mvMatrix, degToRad(rCube), [1, 0, 1]);
      //  mat4.rotate(mvMatrix, degToRad(rCube1), [0, 1, 0]);
      //  mat4.rotate(mvMatrix, degToRad(rCube2), [0, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer1);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cubeVertexColorBuffer1.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        mvPopMatrix();

}








    }


function drawScene1()
{
    rcube6=rcube6+5.5;

         gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  //      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        mat4.identity(mvMatrix);
      //  mat4.translate(mvMatrix,-player_array)
      //mvMatrix=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        mat4.translate(mvMatrix,[-2,-0.7,-8]);


//mat4.translate(mvMatrix,[transarr[0][0],transarr[0][1],transarr[0][2]]);

       // console.log(transarr[0][0]+"  "+transarr[0][1]+"   "+transarr[0][2]);
        mat4.scale(mvMatrix,[0.3,0.3,0.3]);
   //     mvPushMatrix();
        mat4.rotate(mvMatrix, degToRad(rcube6), [0, 0, 1]);
      //  mat4.rotate(mvMatrix, degToRad(rCube1), [0, 1, 0]);
      //  mat4.rotate(mvMatrix, degToRad(rCube2), [0, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer2);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute2, cubeVertexColorBuffer2.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
     //   mvPopMatrix();
}


var dcount=0;
var earray=[];
earray=[-0.0,-0.5,-7];
var ecurrent=4;
var t1=0;
function drawScene2()
{
if(ecurrent==current)
{
    

var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/byebye.wav');
audio.play();


   loss=1;
   t1=1;
}
        dcount++;
        if(dcount==100)
        {
            var tem=Math.floor(Math.random()*4);
       //     console.log(tem);
           if(t1==1)
            tem=-3;
            if(pos_arr[ecurrent][tem]==-1){

                ecurrent=4;
                tem=1;
            }
            earray=coord_array[pos_arr[ecurrent][tem]-1];
            dcount=0;
            ecurrent=pos_arr[ecurrent][tem]-1;
        //    console.log(ecurrent);
        }
         gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  //      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        mat4.identity(mvMatrix);
      //  mat4.translate(mvMatrix,-player_array)
      //mvMatrix=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        mat4.translate(mvMatrix,earray);


//mat4.translate(mvMatrix,[transarr[0][0],transarr[0][1],transarr[0][2]]);

      //  console.log(transarr[0][0]+"  "+transarr[0][1]+"   "+transarr[0][2]);
        mat4.scale(mvMatrix,[0.15,0.15,0.05]);
   //     mvPushMatrix();
        mat4.rotate(mvMatrix, degToRad(rcube2), [0, 0, 1]);
      //  mat4.rotate(mvMatrix, degToRad(rCube1), [0, 1, 0]);
      //  mat4.rotate(mvMatrix, degToRad(rCube2), [0, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer2);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute2, cubeVertexColorBuffer2.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
     //   mvPopMatrix();
}



var ecurrent1=21;
var earray1=[];
earray1=[-2.4,-3.0 ,-7];
var dcount1=0;
var kk=0;
var tem=0;
function drawScene3()
{

if(ecurrent1==current)
{
    var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/byebye.wav');
audio.play();

   loss=1;
   t1=1;
}
        dcount1++;
        if(dcount1==100)
        {
            //var tem=Math.floor(Math.random()*4);
            if(kk!=1)
            tem=0;
        else
            tem=1;

       //     console.log(tem);
           if(t1==1)
            tem=-3;
            if(pos_arr[ecurrent1][tem]==-1&&kk!=1){

                ecurrent1=0;
                tem=1;
                kk=1;
            }
            else if(pos_arr[ecurrent1][tem]==-1&&kk==1){

            ecurrent1=21;
            tem=0;
            kk=0;
        }
            earray1=coord_array[pos_arr[ecurrent1][tem]-1];
            dcount1=0;
            ecurrent1=pos_arr[ecurrent1][tem]-1;
        //    console.log(ecurrent);
        }
         gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  //      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        mat4.identity(mvMatrix);
      //  mat4.translate(mvMatrix,-player_array)
      //mvMatrix=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        mat4.translate(mvMatrix,earray1);


//mat4.translate(mvMatrix,[transarr[0][0],transarr[0][1],transarr[0][2]]);

      //  console.log(transarr[0][0]+"  "+transarr[0][1]+"   "+transarr[0][2]);
        mat4.scale(mvMatrix,[0.15,0.15,0.05]);
   //     mvPushMatrix();
        mat4.rotate(mvMatrix, degToRad(rcube2), [0, 0, 1]);
      //  mat4.rotate(mvMatrix, degToRad(rCube1), [0, 1, 0]);
      //  mat4.rotate(mvMatrix, degToRad(rCube2), [0, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer3);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute3, cubeVertexColorBuffer3.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
     //   mvPopMatrix();
}


var ecurrent2=27;
var earray2=[];
earray2=[2.3,-2.9 ,-7];
var dcount2=0;
var kk1=0;
var tem1=0;

function drawScene4()
{

if(ecurrent2==current)
{
    var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/byebye.wav');
audio.play();

   loss=1;
   t1=1;
}
        dcount2++;
        if(dcount2==100)
        {
            //var tem=Math.floor(Math.random()*4);
            if(kk1!=1)
            tem1=2;
        else
            tem1=3;

       //     console.log(tem);
           if(t1==1)
            tem1=-3;
            if(pos_arr[ecurrent2][tem1]==-1&&kk1!=1){

                ecurrent2=0;
                tem1=3;
                kk1=1;
            }
            else if(pos_arr[ecurrent2][tem1]==-1&&kk1==1){

            ecurrent2=27;
            tem1=2;
            kk1=0;
        }
            earray2=coord_array[pos_arr[ecurrent2][tem1]-1];
            dcount2=0;
            ecurrent2=pos_arr[ecurrent2][tem1]-1;
        //    console.log(ecurrent);
        }
         gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  //      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        mat4.identity(mvMatrix);
      //  mat4.translate(mvMatrix,-player_array)
      //mvMatrix=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        mat4.translate(mvMatrix,earray2);


//mat4.translate(mvMatrix,[transarr[0][0],transarr[0][1],transarr[0][2]]);

      //  console.log(transarr[0][0]+"  "+transarr[0][1]+"   "+transarr[0][2]);
        mat4.scale(mvMatrix,[0.15,0.15,0.05]);
   //     mvPushMatrix();
        mat4.rotate(mvMatrix, degToRad(rcube3), [0, 0, 1]);
      //  mat4.rotate(mvMatrix, degToRad(rCube1), [0, 1, 0]);
      //  mat4.rotate(mvMatrix, degToRad(rCube2), [0, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer4);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute4, cubeVertexColorBuffer4.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
     //   mvPopMatrix();
}












//top down left right
var pos_arr=[[-1,2,-1,3],//1
            [1,4,-1,5],//2
            [-1,5,1,6],//3
            [2,7,-1,8],//4
            [3,8,2,9],//5
            [-1,9,3,10],//6
            [4,11,1,12],//7
            [5,12,4,13],//8
            [6,13,5,14],//9
            [-1,14,6,15],//10
            [7,16,-1,17],//11
            [8,17,7,18],//12
            [9,18,8,19],//13
            [10,19,9,20],//14
            [-1,20,10,21], //15
            [11,22,-1,23],//16
            [12,23,11,24],//17
            [13,24,12,25], //18
            [14,25,13,26], //19
            [15,26,14,27], //20
            [-1,27,15,28], // 21
            [16,-1,-1,-1], //22
            [17,-1,16,-1], //23
            [18,-1,17,-1], //24
            [19,-1,18,-1], //25
            [20,-1,19,-1], //26
            [21,-1,20,-1],//27
            [-1,-1,21,-1] //28
          ];



/*var coord_array=[[0,0.9,-7],[-0.5,0.2,-7],[0.5,0.2,-7],[-0.8,-0.5,-7],[-0.0,-0.5,-7],[0.8,-0.5,-7],[-1.2,-1.1,-7],[-0.4,-1.1,-7],[0.4,-1.1,-7],[1.2,-1.1,-7],[-1.6,-1.7,-7],[-0.7,-1.7,-7],[0.0,-1.8,-7],[0.8,-1.8,-7],[1.6,-1.7,-7],[-1.9,-2.4,-7],[-1.1,-2.4,-7],[-0.3,-2.4,-7],[0.4,-2.4,-7],[1.1,-2.4,-7],[1.9,-2.4,-7],[-2.3,-3.0,-7],[-1.5,-3.0,-7],[-0.7,-3.0,-7],[0.0,-3.0,-7],[0.7,-3.0,-7],[1.5,-3.0,-7],[2.3,-3.0,-7]];*/

var coord_array=[];


console.log(coord_array.length);

console.log(pos_arr);
var current=0;

 var currentlyPressedKeys = {};
   /* function handleKeyDown(event) {
        currentlyPressedKeys[event.keyCode] = true;

    }
    function handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }
    function handleKeys() {
        if (currentlyPressedKeys[37]) {
            

         
        }
        if (currentlyPressedKeys[40]) {
            // Page Down
            
            current=pos_arr[current][1];
            player_array=transarr[current];
            console.log(player_array);
           
        }
        if (currentlyPressedKeys[38]) {
            // Left cursor key
           
        }
        if (currentlyPressedKeys[39]) {
            // Right cursor key
           
        }

    }*/

var currarr=[];
for(var i=0;i<28;i++)
{
  //  currarr.push(Math.random(0,1));
  currarr.push(0);
}
//currarr[0]=1;
function keyEvent(event) {
  var key = event.keyCode || event.which;


  if(key==40)
  {

var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/Ahop.wav');
audio.play();
    //console.log(transarr);
    console.log(colors);
    var temp=current;
            current=pos_arr[temp][1]-1;
            if(current==-2)
            {
                  var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/Qbert%20Over%20the%20edge.wav');
                  audio.play();  
            }
            player_array=coord_array[current];
         //   alert(player_array);
            currarr[current]=1;
        console.log(tempcolorarr[current+1]);
    //       console.log(pla)
     
            
  }


if(key==39)
  {
    var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/Ahop.wav');
audio.play();
   // console.log(transarr);
    var temp=current;
            current=pos_arr[temp][3]-1;
            if(current==-2)
            {
                  var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/Qbert%20Over%20the%20edge.wav');
                  audio.play();  
            }
            player_array=coord_array[current];
    //       console.log(pla)
  currarr[current]=1;

            
  }

if(key==37)
  {
    if(current==6)
    {
var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/The%20Bite.wav');
audio.play();
    }
    var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/Ahop.wav');
audio.play();
   // console.log(transarr);
    var temp=current;
            current=pos_arr[temp][2]-1;
            if(current==-2)
            {
                  var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/Qbert%20Over%20the%20edge.wav');
                  audio.play();  
            }
            player_array=coord_array[current];
    //       console.log(pla)
  currarr[current]=1;
            
  }
if(key==38)
  {
    var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/Ahop.wav');
audio.play();
   // console.log(transarr);
    var temp=current;
            current=pos_arr[temp][0]-1;
            if(current==-2)
            {
                  var audio = new Audio('http://www.basementarcade.com/arcade/sounds/qbert/Qbert%20Over%20the%20edge.wav');
                  audio.play();  
            }
            player_array=coord_array[current];
    //       console.log(pla)
  currarr[current]=1;
            
  }
}














    var lastTime = 0;


    function tick() {
        requestAnimFrame(tick);
      //  handleKeys();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        drawScene();
        drawScene1();
        drawScene2();
         drawScene3();
          drawScene4();
        //animate();
    }

  var transarr=[];
    function webGLStart() {
        var audio = new Audio('http://www.basementarcade.com/arcade/sounds/tapper/38.wav');
        audio.play();
        var canvas = document.getElementById("lesson04-canvas");
        initGL(canvas);


        initShaders()
        initBuffers();


        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
    //    document.onkeydown = handleKeyDown;
     //   document.onkeyup = handleKeyUp;

        
        var temparr=[];
      
        for(var i=0;i<8;i++)
        {
            var count=i-1;
            for(var j=0;j<i;j++)
            {
                //[-count*1.4*.06, (-i+3)*0.06*1.9, i*0.06];
              //  temparr.push(-count*1.4*.06);
               // temparr.push((-i+3)*0.06*1.9);
               // temparr.push(i*0.06);
            
                temparr.push(-count*0.4);
                temparr.push((-i+2)*0.7);
                temparr.push(-8);


                transarr.push(temparr);
                temparr=[];
                count=count-2;
            }
        }

        
        for(var i=0;i<transarr.length;i++)
        {
           // coord_array[i]=transarr[i];
           var tar=[];
           for(var j=0;j<3;j++)
           {
            if(j==0)
            tar.push(transarr[i][j]);
        else if(j==1)
            tar.push((transarr[i][j]+0.2)*0.9);
            else
            tar.push(-7);
           }

           coord_array.push(tar);
           tar=[];
        }
        console.log(coord_array);
        tick();
    }
