define(["jquery"], function($){
	function header(){

		//顶部显示隐藏
		$(".toper_show").mouseenter(function(){
			$(this).attr("class","active toper_show").find(".toper_hide").slideDown()
		}).mouseleave(function(){
			$(this).attr("class","toper_show").find(".toper_hide").slideUp()
		})
		//切换城市
		$.ajax({
			type:"get",
			url: "../data/city.json",
			success:function(arr){
				if(arr){
					for(var i = 0; i < arr.length; i++){
						$("<a>" + arr[i].title + "</a>").appendTo($(".city_abc"));
						var oDl = $("<dl></dl>");
						var oDd = $("<dd></dd>");
						$("<dt>" + arr[i].title + "</dt>").appendTo(oDl);
						var oDdStr = "";
						for(var j = 0; j < arr[i].content.length; j++){
							oDdStr += "<a href =' " + arr[i].content[j].url + "'>" + arr[i].content[j].title + "</a>";
						}
						oDd.html(oDdStr);
						oDd.appendTo(oDl);
						oDl.appendTo($(".city_sroll"));
					}
					$(".city_abc").on("mouseenter", "a", function(){
						var cityTop = $(".city_item dl").eq($(this).index()).position().top;
						$(".city_item").stop().animate({
							scrollTop: cityTop
						},500);
					})
				}
			},
			error: function(msg){
				console.log(msg);
			}
		})

		//顶部导航
		$.ajax({
			type: "get",
			url: "../data/menu.json",
			success: function(arr){
				if(arr){
					for(var i = 0; i < arr.length; i++){
						if(!arr[i].ishot){
							$("<li><a href=" + arr[i].url + " title=" + arr[i].title + " target='_blank'>" + arr[i].title + "</a></li>").appendTo($(".naver"));
						}else{
							$("<li><a href=" + arr[i].url + " title=" + arr[i].title + " target='_blank'>" + arr[i].title + "<i class='hot'></i></a></li>").appendTo($(".naver"));
						}
					}
				}
			},
			error: function(msg){
				console.log(msg);
			}
		})

		//左侧导航
		$.ajax({
			type: "get",
			url: "../data/nav.json",
			success: function(arr){
				if(arr){
					for(var i = 0; i < arr.length; i++){
						//左侧
						var oMenu = $("<li class='menu_btn'>");
						var oMenu_l = $("<div class='menu_l'><i><img src=" + arr[i].img + " alt=" + arr[i].title + " title=" + arr[i].title + "></i></div>");
						var oDl_l = $("<dl><dt><a href=" + arr[i].url + " target='_blank'>" + arr[i].title + "</a></dt></dl>");
						var oDd_l = $("<dd>");
						var oDl_l_str = "";
						for(var j = 0; j < arr[i].keywords.length; j ++){
							oDl_l_str += "<a target='_blank' href=" + arr[i].keywords[j].url + ">" + arr[i].keywords[j].title + "</a>";
						}
						oDd_l.html(oDl_l_str);
						oDd_l.appendTo(oDl_l);
						oDl_l.appendTo(oMenu_l);

						//右侧导航内容
						var oMenu_r = $("<div class='menu_r'>");
						var oMenu_r_l = $("<div class='menu_r_left'>");
						for(var j = 0; j < arr[i].content.length; j ++){
							var oDl_r = $("<dl><dt><a href=" + arr[i].content[j].url + " target='_blank'>" + arr[i].content[j].title + "</a></dt></dl>");
							var oDd = $("<dd>");
							var oDdStr = "";
							for(var k = 0; k < arr[i].content[j].childs.length; k++){
								oDdStr += "<a href=" + arr[i].content[j].childs[k].title + " target='_blank'>" + arr[i].content[j].childs[k].title + "</a>";
							}
							oDd.html(oDdStr);
							oDd.appendTo(oDl_r);
							oDl_r.appendTo(oMenu_r_l);
						}
						oMenu_r_l.appendTo(oMenu_r);
						//右侧推荐品牌
						var oMenu_r_r = $("<div class='menu_r_right'><h2>推荐品牌</h2></div>");
						var oUl = $("<ul>");
						var oUlStr = "";
						for(var j = 0; j < arr[i].imgs.length; j++){
							oUlStr += "<li><a href=" + arr[i].imgs[j].url + " target='_blank' title=" + arr[i].imgs[j].title + "><img src=" + arr[i].imgs[j].img + " alt=" + arr[i].imgs[j].title + " title=" + arr[i].imgs[j].title + "></a></li>";
						}
						oUl.html(oUlStr);
						oUl.appendTo(oMenu_r_r);
						$("<h2>精选活动</h2><p><img src='https://img20.huju168.com/FpltGqxYJs8FqKdOSzTpXWKoXlWh' alt='精选活动''></p>").appendTo(oMenu_r_r);
						oMenu_r_r.appendTo(oMenu_r);
						oMenu_l.appendTo(oMenu);
						oMenu_r.appendTo(oMenu);
						oMenu.appendTo($(".menu"));	
					}		
				}
			},
			error: function(msg){
				console.log(msg);
			}
		})
		$(".menu").on("mouseenter", ".menu_btn", function(){
			$(".menu .menu_l").attr("class","menu_l");
			$(this).find(".menu_l").attr("class","menu_l active")
			$(".menu .menu_r").hide().eq($(this).index()).show();
		})
		$(".menu").mouseleave(function(){
			$(".menu .menu_l").attr("class","menu_l");
			$(".menu .menu_r").hide();
		})
		//滚动监听显示飘窗
		$(window).scroll(function(){
			var scrollHeight = $(window).scrollTop();
			if(scrollHeight > 350){
				$(".fixedLeft").slideDown();
				$(".fixedRight").slideDown();
			}else{
				$(".fixedLeft").slideUp();
				$(".fixedRight").slideUp();
			}
		})
		//左侧飘窗
		$(".fixedLeft").on("click", "li", function(){
			$(this).attr("class", "active").siblings().attr("class", "");
			var oli = $(this).attr("data-target");
			var height = $(oli).offset().top;
			$('html,body').stop().animate({
				scrollTop:height + "px"
			});
			return false;
		}) 
		$(".fixedRight li").eq(1).mouseenter(function(){
			$(this).attr("class","active");
			$(this).find(".code").show();
		}).mouseleave(function(){
			$(this).attr("class","");
			$(this).find(".code").hide();
		})
	}
	return {
		header:header
	}
})