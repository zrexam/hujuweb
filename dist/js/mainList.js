
require.config({
	paths:{
		jquery : "jquery-1.10.1.min",
		cookie : "jquery.cookie",
		list: "list",
		header: "header"
	}
})

require(["list","header"], function(list, header){
	header.header();
	list.list();
})