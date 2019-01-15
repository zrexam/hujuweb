
require.config({
	paths:{
		jquery : "jquery-1.10.1.min",
		cookie : "jquery.cookie",
		show: "show",
		header: "header"
	}
})

require(["show","header"], function(show, header){
	header.header();
	show.show();
})