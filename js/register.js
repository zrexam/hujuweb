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
	}

	return {
		register:register
	}
})