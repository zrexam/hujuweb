define(["jquery"],function($){
	function userName(){
		if(!$("#username").val()){
			if($(".tips-box")){
				$(".tips-box").show();
				$(".tips-box i").show();
				$(".tips-box").css({
					"color":"red",
					"background": "#ffebeb",
					"border": "1px solid #faccc6"
				});
				$(".tips-box span").html("请输入用户名");
			}
			if($("#username").parent().find(".tips")){
				$("#username").addClass("red-bor");
				$("#username").next().css("color","red")
				$("#username").parent().find(".tips").html("请输入用户名");
			}
			return false;
		}else if(!/^[\w]{6,18}$/.test($("#username").val())){
			if($(".tips-box")){
				$(".tips-box").show();
				$(".tips-box i").show();
				$(".tips-box").css({
					"color":"red",
					"background": "#ffebeb",
					"border": "1px solid #faccc6"
				});
				$(".tips-box span").html("用户名必须为字母数字下划线，在6~18个字符之间");
			}
			if($("#username").parent().find(".tips")){
				$("#username").addClass("red-bor");
				$("#username").next().css("color","red")
				$("#username").parent().find(".tips").html("用户名必须为字母数字下划线，在6~18个字符之间");
			}
			return false;
		}else{
			if($(".tips-box")){
				$(".tips-box").show();
				$(".tips-box").css({
					"color":"green",
					"background": "#fff",
					"border": "1px solid green"
				});
				$(".tips-box i").hide();
				$(".tips-box span").html("用户名格式正确");
			}
			if($("#username").parent().find(".tips")){
				$("#username").removeClass("red-bor");
				$("#username").next().css("color","green")
				$("#username").parent().find(".tips").html("用户名格式正确");
			}	
			return true;
		}
	}

	function passWord(){
		if(!$("#password").val()){
			if($(".tips-box")){
				$(".tips-box").show();
				$(".tips-box i").show();
				$(".tips-box").css({
					"color":"red",
					"background": "#ffebeb",
					"border": "1px solid #faccc6"
				});
				$(".tips-box span").html("请输入密码");
			}
			if($("#password").parent().find(".tips")){
				$("#password").addClass("red-bor");
				$("#password").next().css("color","red")
				$("#password").parent().find(".tips").html("请输入密码");
			}
			return false;
		}else if($("#password").val().length > 18 || $("#password").val().length < 6){
			if($(".tips-box")){
				$(".tips-box").show();
				$(".tips-box i").show();
				$(".tips-box").css({
					"color":"red",
					"background": "#ffebeb",
					"border": "1px solid #faccc6"
				});
				$(".tips-box span").html("密码在6~18个字符之间");
			}
			if($("#password").parent().find(".tips")){
				$("#password").addClass("red-bor");
				$("#password").next().css("color","red")
				$("#password").parent().find(".tips").html("密码在6~18个字符之间");
			}
			return false;
		}else{
			if(/\d/.test($("#password").val()) && /[a-z]/.test($("#password").val()) && /[A-Z]/.test($("#password").val()) || /\w+[%!@%\^\&\*\.\#\$\/]+/.test($("#password").val())){
				if($(".tips-box")){
					$(".tips-box").show();
					$(".tips-box").css({
						"color":"green",
						"background": "#fff",
						"border": "1px solid green"
					});
					$(".tips-box i").hide();
					$(".tips-box span").html("密码强度：强");
				}
				if($("#password").parent().find(".tips")){
					$("#password").removeClass("red-bor");
					$("#password").next().css("color","green")
					$("#password").parent().find(".tips").html("密码强度：强");
				}	

			}else if(/^\d+$/.test($("#password").val()) || /^[a-z]+$/.test($("#password").val()) || /^[A-Z]+$/.test($("#password").val())){
				if($(".tips-box")){
					$(".tips-box").show();
					$(".tips-box").css({
						"color":"green",
						"background": "#fff",
						"border": "1px solid green"
					});
					$(".tips-box i").hide();
					$(".tips-box span").html("密码强度：弱");
				}
				if($("#password").parent().find(".tips")){
					$("#password").removeClass("red-bor");
					$("#password").next().css("color","green")
					$("#password").parent().find(".tips").html("密码强度：弱");
				}	
			}else{
				if($(".tips-box")){
					$(".tips-box").show();
					$(".tips-box").css({
						"color":"green",
						"background": "#fff",
						"border": "1px solid green"
					});
					$(".tips-box i").hide();
					$(".tips-box span").html("密码强度：中");
				}
				if($("#password").parent().find(".tips")){
					$("#password").removeClass("red-bor");
					$("#password").next().css("color","green")
					$("#password").parent().find(".tips").html("密码强度：中");
				}	
			}
			return true;
		}
	}

	function confirmPassWord(){
		var cfmPwd = $("#confirmPassWord").val();
		var pwd = $("#password").val();
		if(!$("#confirmPassWord").val()){
			$("#confirmPassWord").addClass("red-bor");
			$("#confirmPassWord").next().css("color","red")
			$("#confirmPassWord").parent().find(".tips").html("请输入确认密码");
			return false;
		}else if( cfmPwd !== pwd){
			$("#confirmPassWord").addClass("red-bor");
			$("#confirmPassWord").next().css("color","red")
			$("#confirmPassWord").parent().find(".tips").html("两次密码不一致");

			return false;
		}else{
			$("#confirmPassWord").removeClass("red-bor");
			$("#confirmPassWord").next().css("color","green")
			$("#confirmPassWord").parent().find(".tips").html("密码格式正确");
			return true;
		}
	}


	function phone(){
		if(!$("#phone").val()){
			$("#phone").addClass("red-bor");
			$("#phone").next().css("color","red")
			$("#phone").parent().find(".tips").html("请输入手机号");
			return false;
		}else if(!/^1[3|4|5|7|8]\d{9}$/.test($("#phone").val())){
			$("#phone").addClass("red-bor");
			$("#phone").next().css("color","red")
			$("#phone").parent().find(".tips").html("手机号的格式不正确！");
			return false;
		}else{
			$("#phone").removeClass("red-bor");
			$("#phone").next().css("color","green")
			$("#phone").parent().find(".tips").html("验证码正确");
			return true;
		}
	}

	function code(){
		if(!$("#code").val()){
			if($(".tips-box")){
				$(".tips-box").show();
				$(".tips-box i").show();
				$(".tips-box").css({
					"color":"red",
					"background": "#ffebeb",
					"border": "1px solid #faccc6"
				});
				$(".tips-box span").html("请输入验证码");
			}
			if($("#code").parent().find(".tips")){
				$("#code").addClass("red-bor");
				$("#code").parent().find(".tips").css("color","red")
				$("#code").parent().find(".tips").html("请输入验证码");
			}
			return false;
		}else if($("#code").val().toUpperCase() != $("#ehong-code").text().toUpperCase()){
			if($(".tips-box")){
				$(".tips-box").show();
				$(".tips-box i").show();
				$(".tips-box").css({
					"color":"red",
					"background": "#ffebeb",
					"border": "1px solid #faccc6"
				});
				$(".tips-box span").html("验证码输入不正确！");
			}
			if($("#code").parent().find(".tips")){
				$("#code").addClass("red-bor");
				$("#code").parent().find(".tips").css("color","red")
				$("#code").parent().find(".tips").html("验证码输入不正确！");
			}
			return false;
		}else{
			if($(".tips-box")){
				$(".tips-box").show();
				$(".tips-box").css({
					"color":"green",
					"background": "#fff",
					"border": "1px solid green"
				});
				$(".tips-box i").hide();
				$(".tips-box span").html("验证码正确");
			}
			if($("#code").parent().find(".tips")){
				$("#code").removeClass("red-bor");
				$("#code").parent().find(".tips").css("color","green")
				$("#code").parent().find(".tips").html("验证码正确");
			}
			return true;
		}
	}

	return {
		userName:userName,
		passWord:passWord,
		confirmPassWord:confirmPassWord,
		phone:phone,
		code:code
	}
})