
require.config({
	paths:{
		jquery : "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",
		show: "show",
		header: "header",
		single: "single"
	},
	shim:{
		"jquery-cookie": ['jquery']
	}
})

require(["show","header"], function(show, header){
	header.header();
	show.show();
})