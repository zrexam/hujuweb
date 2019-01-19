define(["verify",'jquery',"jquery-idcode","jquery-cookie"], function(verify,$){
	function login(){
		//切换
		$(".loginBox .hd ul li").click(function(){
			$(this).attr("class","on").siblings().attr("class","");
			$(".loginBox .bd .bd-box").eq($(this).index()).show().siblings().hide();
		})
		//验证码
		$.idcode.setCode();
		//表单验证
		$("#username").keyup(function(){
			verify.userName();
		});
		$("#password").keyup(function(){
			verify.passWord();
		});
		$("#code").keyup(function(){
			verify.code();
		})

		$("#userLogin").click(function(){
			if(!verify.userName()){
				return false;
			}
			if(!verify.passWord()){
				return false;
			}
			if(!verify.code()){
				return false;
			}
			$.ajax({
				type: "post",
				url: "../php/loginAdd.php",
				data: "username=" + $("#username").val() + "&password=" + $("#password").val(),
				success: function(data){
					alert(data);
					if(data == "登录成功"){
						$.cookie('username',$("#username").val(),{
							path:"/"
						});
						setTimeout(function(){
							location.assign("/index.html");
						},1000);
					}
				},
				error: function(msg){
					alert(msg);
				}
			})
		})
	}

	return  {
		login: login
	}
})