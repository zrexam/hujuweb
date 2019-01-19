define(["jquery"], function($){
	function single(){
		if($("body .singleWrap")){
			var oWrap = $("<div class='singleWrap'></div>");
			var oCon = $("<div class='singleCon'><div class='close'>X</div><h2>添加成功</h2><a href='shopCar.html'>去结算</a></div>");
			oCon.appendTo(oWrap);
			oWrap.appendTo($("body"));
			$(".singleCon .close").click(function(){
				$("body .singleWrap").remove();
			})
		}

	}

	return {
		single:single
	}
})