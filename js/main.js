
require.config({
	paths:{
		jquery : "jquery-1.10.1.min",
		cookie : "jquery.cookie",
		index: "index.min",
		slidePic: "slidePic.min"
	}
})

require(["index"], function(index){
	index.index();
	
})