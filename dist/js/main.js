
require.config({
	paths:{
		jquery : "jquery-1.10.1.min",
		cookie : "jquery.cookie",
		index: "index.min"
	}
})

require(["index"], function(index){
	index.index();
	
})