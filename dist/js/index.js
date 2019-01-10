define(['jquery'], function($){
	function index(){
		//顶部显示隐藏
		$(".toper_show").mouseenter(function(){
			$(this).attr("class","active toper_show").find(".toper_hide").slideDown()
		}).mouseleave(function(){
			$(this).attr("class","toper_show").find(".toper_hide").slideUp()
		})
		//切换城市
		$(".city_abc").on("mouseenter", "a", function(){
			var cityTop = $(".city_item dl").eq($(this).index()).position().top;
			$(".city_item").scrollTop(cityTop);
		})
		//banner
		$(".banner ul li").css("opacity",0).eq(0).css("opacity",1);
		$(".banner ol li").eq(0).attr("class", "active");

		$(".banner ol").on("mouseenter", "li", function(iNow){
			var iNow = $(this).index();
			$(this).attr("class", "active").siblings().attr("class","");
			$(".banner ul li").stop().animate({
				"opacity": 0
			},1000)
			$(".banner ul li").eq(iNow).stop().animate({
				"opacity": 1
			},1000)
		})
		$(".banner .prev").click(function(iNow){
			var iNow = $(".banner ol li.active").index();			
			if(iNow > 0){
				iNow -= 1;
			}else{
				iNow = 4
			}
			$(".banner ol li").eq(iNow).attr("class", "active").siblings().attr("class","");
			$(".banner ul li").stop().animate({
				"opacity": 0
			},1000)
			$(".banner ul li").eq(iNow).stop().animate({
				"opacity": 1
			},1000)
		})
		$(".banner .next").click(function(iNow){
			var iNow = $(".banner ol li.active").index();			
			if(iNow < 4){
				iNow += 1;
			}else{
				iNow = 0
			}
			$(".banner ol li").eq(iNow).attr("class", "active").siblings().attr("class","");
			$(".banner ul li").stop().animate({
				"opacity": 0
			},1000)
			$(".banner ul li").eq(iNow).stop().animate({
				"opacity": 1
			},1000)
		})
		//左侧导航
		$(".menu").on("mouseenter", ".menu_btn", function(){
			$(".menu .menu_l").attr("class","menu_l");
			$(this).find(".menu_l").attr("class","menu_l active")
			$(".menu .menu_r").hide().eq($(this).index()).show();
		})
		$(".menu").mouseleave(function(){
			$(".menu .menu_l").attr("class","menu_l");
			$(".menu .menu_r").hide();
		})

		//活动推荐
		$.get("data/recommend.json", function(arr){
			if(arr){
				var oUl = $("<ul class='clearfix'></ul>");
				for(var i = 0; i < arr.length; i++){
					$("<li><a href=" + arr[i].url + " title=" + arr[i].title + "><img src=" + arr[i].img + " alt=" + arr[i].title + " title=" + arr[i].title + "></a></li>").appendTo(oUl);
				}
				oUl.appendTo($("#recommend"));
			}
		})
		//1F家具
		$.ajax({
			type: "get",
			url: "data/1f.json",
			success: function(arr){
				if(arr){
					for(var i = 0; i < arr.length; i++){
						var oContop = $("<div class='con_top clearfix'></div>")
						var oH2 = $("<h2>" + arr[i].title + "</h2>");
						var oUl = $("<ul></ul>");
						var oUlstr = "";
						for(var j = 0; j < arr[i].top.length; j++){
							oUlstr += $("<li><a href=''>" + arr[i].top[j] + "</a></li>");
						}
						oUl.html(oUlstr);
						oH2.appendTo(oContop);
						oUl.appendTo(oContop);
						var oDl = $("<dl class='clearfix'></dl>")
						var oDt = $("<dt></dt>");
						var oDd = $("<dd></dd>");
						var oDtul = $("<ul></ul>");
						var oDtol = $("<ol></ol>");
						var oDdul = $("<ul class='clearfix'></ul>");
						var oDtstr = "";
						for(var j = 0; j < arr[i].left.length; j++){
							oDtstr += $("<li><a href=" + arr[i].left[j].url + " title=" + arr[i].left[j].title + "><img src=" + arr[i].left[j].img + " alt=" + arr[i].left[j].title + "></a></li>");
						}
						oDtul.html(oDtstr);

						oDtul.appendTo(oDt);
						oDtol.appendTo(oDt);
						oDdul.appendTo(oDd);
						oDt.appendTo(oDl);
						oDd.appendTo(oDl);

					}
				}
			},
			error: function(msg){
				console.log(msg);
			}
		})
		$("#1F dl dt ol").on("mouseenter", "li", function(){
			$(this).attr("class", "active").siblings().attr("class","");
			var ulWidth = $("#1F dl dt ul li").width() * $("#1F dl dt ul li").size();
			$("#1F dl dt ul").width(ulWidth);
			$("#1F dl dt ul").stop().animate({
				left: - $("#1F dl dt ul li").width() * $(this).index()
			})
		})
	}
	return {
		index:index
	}
})