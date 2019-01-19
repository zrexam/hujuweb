
require.config({
	paths:{
		jquery : "jquery-1.10.1.min",
		"jquery-cookie" : "jquery.cookie",
		list: "list",
		header: "header"
	},
	shim:{
		"jquery-cookie": ["jquery"]
	}
})

require(["list","header"], function(list, header){
	header.header();
	list.list();
})