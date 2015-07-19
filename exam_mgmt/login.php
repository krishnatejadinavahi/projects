<html>
<head><title></title>


<script src="http://code.jquery.com/jquery-2.1.4.js"></script>
<script src="http://code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
<link href="http://code.jquery.com/ui/1.11.3/themes/ui-lightness/jquery-ui.css" rel="stylesheet">
<script type="text/javascript" src="scripts/login.js"></script>
<link href="styl/log.css" rel="stylesheet"></link>

</head>


<body> 
<div id="div1">
<select id="select1" value="">
<option disabled selected>SELECT</option>
<option value="student">student</option>

<option value="teacher">teacher</option>


</select>
</div>
<div id="div2">

<p>MAKE A SELECTION BELOW TO LOGIN AS A STUDENT OR TEACHER</p>
</div>
<div id="div3">

<img src="https://upload.wikimedia.org/wikipedia/en/2/2d/SRU-Logo-Transparent.png">
</div>

<div id="login">
<input type="text" placeholder="enter your user id here" id="uid" /><br>
<input type="password" placeholder="password" id="pwd"/><br><br>
<input type="submit" value="login" id="log"/>
<input type="submit" value="register" id="reg"/>
</div>

<div id="stort">
<p></p>

</div>

<div id="dilog">
<p></p>

</div>

<div id="men">

<h3>OPTIONS</h3>
<div id="oo">
<h3 id="hed">SELECT CLASS</h3>
<div>
<select id="allt">



</select>

</div>
<h3>SET PAPER</h3>
<div>
<a href="#" id="opt1">SET PAPER</a><br></div>

</div>

<h3>BATCHES</h3>
<div id="aa"><a href="#" id="opt2">SET CLASSES</a>


<div id="bb">
<h3>ADD STUDENTS</h3>
<div>
<input type="text" id="clas" placeholder="class name here" /><br>
<input type="text" id="clas1" placeholder="student email here" /><br>
<input type="submit" value="submit" id="clasto"/>
</div>




<h3 id="he">CHECK MARKS</h3>
<div>
<select id="comb">
<option disabled selected:"selected">SELECT A CLASS</option>

</select><br>

<select id="comb1">
<option disabled selected:"selected">SELECT A TOKEN</option>
</select><br>

<input type="submit" id="ema" value="CHECK" />
</div>


</div>

</div>

</div>



<div id="stumen">

<h3>TEST OPTIONS</h3>
<div>
<!--  <a href="#" id="stu_opt1">TAKE TEST</a> <br>

<a href="#" id="stu_opt2">CHECK MARKS</a> -->


<div id="cm">


<h3>TAKE TEST</h3>
<div>
<a href="#" id="stu_opt1">TAKE TEST</a> <br>

</div>


<h3>CHECK MARKS</h3>
<div>
<a href="#" id="stu_opt2">CHECK MARKS</a>

</div>


</div>


</div>

<h3>CLASS OPTIONS</h3>
<div>
<a href="#" id="stu_opt3">DROP CLASS</a> <br>
<select id="drp">
</select><br>
<input type="submit" id="conf" value="confirm" />
</div>
</div>

<div id="enttok">
<input type="text" id="enttok1" placeholder="enter the token number" /><br><br>
<input type="submit" id="enttok2" value="submit" />

</div>


<div id="tess">

<TEXTAREA id="que" COLS=40 ROWS=6 placeholder="enter your question here"></TEXTAREA><br>
<input type="text" placeholder="option1" id="op1" /><br>
<input type="text" placeholder="option2" id="op2" /><br>
<input type="text" placeholder="option3" id="op3" /><br>
<input type="text" placeholder="option4" id="op4" /><br>
<input type="text" placeholder="correct option number" id="op5" /><br>

<input type="submit" value="next" id="ne" />
<input type="submit" value="submit paper" id="su" />
</div>

<div>
<input type="submit" id="logout" value="logout" />
</div>

<input id="take" type="submit" value="START THE TEST" />

<div id="stt">
<div id="stuui">
<p></p>
</div><br>

<input type="radio" value="1" id="r1" name="t" checked="checked" /><span id="s1"></span><br><br>
<input type="radio" value="2" id="r2" name="t" /><span id="s2"></span><br><br>
<input type="radio" value="3" id="r3" name="t" /><span id="s3"></span><br><br>
<input type="radio" value="4" id="r4" name="t" /><span id="s4"></span><br><br>


<input type="submit" id="nexq" value="next" /> <br>
<input type="submit" id="subfin" value="SUBMIT TEST"/>
</div>

<div id="report">

<p></p>

</div>

</body>


</html>