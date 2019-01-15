
require.config({
	paths:{
		jquery : "jquery-1.10.1.min",
		cookie : "jquery.cookie",
		index: "index.min",
		slidePic: "slidePic.min",
		header: "header"
	}
})

require(["index","header"], function(index, header){
	header.header();
	index.index();
	
})