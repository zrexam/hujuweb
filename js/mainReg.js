require.config({
	paths:{
		jquery: "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",
		"jquery-idcode": "jquery.idcode",
		register: "register",
		verify:"verify.min"
	},
	shim:{
		"jquery-cookie": ['jquery'],
		"jquery-idcode": ['jquery']
	}

})

require(["register"], function(register){
	register.register()
})