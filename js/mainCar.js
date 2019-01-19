require.config({
	paths:{
		jquery : "jquery-1.10.1.min",
		"jquery-cookie" : "jquery.cookie",
		shopCar: "shopCar.min",
		header: "header"
	},
	shim:{
		"jquery-cookie": ["jquery"]
	}
})

require(["shopCar","header"], function(shopCar, header){
	header.header();
	shopCar.shopCar();
})