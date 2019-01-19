define(["verify",'jquery',"jquery-idcode"], function(verify,$){
	function register(){
		//验证码
		$.idcode.setCode();
		//表单验证
		$("#username").keyup(function(){
			verify.userName();
		});
		$("#phone").keyup(function(){
			verify.phone();
		});
		$("#password").keyup(function(){
			verify.passWord();
		});
		$("#confirmPassWord").keyup(function(){
			verify.confirmPassWord();
		});
		$("#code").keyup(function(){
			verify.code();
		});

		$("#RegisterSubmit").click(function(){

			if(!verify.userName()){
				return false;
			}
			if(!verify.phone()){
				return false;
			}
			if(!verify.passWord()){
				return false;
			}
			if(!verify.confirmPassWord()){
				return false;
			}
			if(!verify.code()){
				return false;
			}
			$.ajax({
				type: "post",
				data: "username=" + $("#username").val() + "&password=" + $("#password").val() + "&phone=" + $("#phone").val(),
				url: "../php/regAdd.php",
				success: function(data){
					alert(data);
					if(data == "注册成功"){
						setTimeout(function(){
							location.assign("/html/login.html");
						},1000);
					}
				},
				error: function(msg){
					console.log(msg);
				}
			})
		})
	}

	return {
		register:register
	}
})