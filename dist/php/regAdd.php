<?php 
	header("content-type:text/html;charset=utf-8");
	$username = $_POST['username'];
	$password = md5(md5($_POST['password']).'david');
	$phone = $_POST['phone'];

	$link = mysql_connect("localhost","root","123456");
	if(!$link){
		echo "数据库连接失败";
		exit;
	}
	mysql_set_charset("utf8");
	mysql_select_db("huju");

	$sqlSelect = "SELECT username FROM reg";

	$resSelect = mysql_query($sqlSelect);

	while ($row = mysql_fetch_assoc($resSelect)) {
		if($username == $row['username']){
			echo "用户名已存在";
			exit;
		}
	}

	$sql = "INSERT INTO reg(username,password,phone) VALUES('{$username}','{$password}','{$phone}')";

	$res = mysql_query($sql);
	if($res){
		echo "注册成功";
	}else{
		echo "注册失败";
	}
	mysql_close($link);
?>