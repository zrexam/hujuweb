<?php 
	header("content-type:text/html;charset=utf-8");
	$username = $_POST['username'];
	$password = md5(md5($_POST['password']).'david');

	$link = mysql_connect("localhost","root","123456");
	if(!$link){
		echo "数据库连接失败";
		exit;
	}
	mysql_set_charset("utf8");
	mysql_select_db("huju");

	$sql = "SELECT username,password FROM reg WHERE username='{$username}' AND password='{$password}'";


	$res = mysql_query($sql);

	$row = mysql_fetch_assoc($res);

	if($row){
		echo "登录成功";
	}else{
		echo "用户名或密码错误";
	}


	mysql_close($link);
?>