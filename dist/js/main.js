
require.config({
	paths:{
		jquery : "jquery-1.10.1.min",
		"jquery-cookie" : "jquery.cookie",
		index: "index.min",
		slidePic: "slidePic.min",
		header: "header"
	},
	shim:{
		"jquery-cookie": ['jquery']
	}
})

require(["index","header"], function(index, header){
	header.header();
	index.index();
	
})