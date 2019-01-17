require.config({
	paths:{
		jquery: "jquery-1.10.1.min",
		login: "login"
	}
})

require(["login"], function(login){
	login.login()
})