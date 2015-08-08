<html>
<head><title></title>


<script src="http://code.jquery.com/jquery-2.1.4.js"></script>
<script src="http://code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
<link href="http://code.jquery.com/ui/1.11.3/themes/ui-lightness/jquery-ui.css" rel="stylesheet">
<script type="text/javascript" src="script/first.js"></script>
<link href="style/casc.css" rel="stylesheet"></link>

</head>
<body>
<div id="images">
<img src="http://i.ytimg.com/vi/AP3fjiUWZds/maxresdefault.jpg" id="back1" />
<img src="http://www.nela.in/wordpress/wp-content/uploads/jalsa.jpg" id="back2" />
<img src="http://photos.filmibeat.com/ph-big/2013/08/ajith-s-aarambam-first-look-posters_137655134410.jpg" id="back3" />
<img src="http://mp3bakery.com/wp-content/uploads/2015/07/uppi-2-kannada-movie-mp3-songs-free-download.jpg" id="back4" />

</div>

<div id="loginform">

<p>USER LOGIN</p><input type="text" placeholder="enter your username here" id="uname" />
<input type="password" placeholder="password" id="pwd" />
<input type="submit" value="register" id="reg" />
<input type="submit" value="login" id="sub" />
</div>

<div id="admindiv">
<p>ADMIN LOGIN</p>
<input type="text" placeholder="admin id" id="adid" />
<input type="submit" value="login" id="asub" />
</div>

<div id="search">
<input type="text" placeholder="search" id="sear" />
<input type="submit" value="search" id="sear1" />
</div>


<div id="add">
<input type="text" placeholder="movie name" id="moviename" /><br>
<TEXTAREA rows="10" cols="50" id="movielink" placeholder="links for verification of your information" /></TEXTAREA><br>
<TEXTAREA rows="10" cols="50" id="moviedesc" placeholder="description" /></TEXTAREA><br>
<input type="text" placeholder="rating out of 10" id="movierate" /><br>
<input type="text" placeholder="image link" id="movieimg" /><br>
<input type="submit" value="submit" id="moviesub" /><br>
<input type="submit" value="cancel" id="cancel" /><br>
</div>

<div id="dilog">
<p></p>
</div>

<div id="approve">

<br>

<input type="submit" value="CHECK PENDING REQUESTS" id="pend" /><br>
<h1>MENU</h1>
</div>

<select id="sellist">
<option SELECTED="selected" disabled="disabled" value="edo" >UNAPPROVED REQUESTS</option>
</select>

<div id="adata">
<strong>MOVIE NAME: </strong><p id="one"></p><br>
<strong>LINKS: </strong><p id="two"></p><br>
<strong>MOVIE DESCRIPTION: </strong><p id="three"></p><br>
<strong>MOVIE RATING: </strong><p id="four"></p><br>
<div id="ff"></div><br><br><br><br>
<input type="submit" value="APPROVE" id="five" />
<input type="submit" value="DISAPPROVE" id="seven" />
<input type="submit" value="CANCEL" id="six" />
<br>
</div>

<div id="ud">

</div>
<!--  <input type="submit" value="edit" id="uda" />-->
<a href="#" id="uda1"><h1>back</h1></a>
<a href="#" id="uda"><h1>edit</h1></a>

<div id="slider">
<p></p>
</div>

<div id="editing">
<TEXTAREA rows="10" cols="50" id="elink" placeholder="links for verification of your information" /></TEXTAREA><br>
<TEXTAREA rows="10" cols="50" id="edesc" placeholder="description" /></TEXTAREA><br>
<input type="text" placeholder="image link" id="eimg" /><br>
<input type="submit" value="submit" id="esub" /><br>
<input type="submit" value="cancel" id="ecan" /><br>
</div>

<input type="button" value="logout" id="logout" />

</body>
</html>