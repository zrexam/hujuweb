require.config({
	paths:{
		jquery: "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",
		"jquery-idcode": "jquery.idcode",
		login: "login",
		verify:"verify.min"
	},
	shim:{
		"jquery-cookie": ['jquery'],
		"jquery-idcode": ['jquery']
	}

})

require(["login"], function(login){
	login.login()
})