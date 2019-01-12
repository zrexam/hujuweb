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
		var iNow = 1;
		var timer = null;
		//切换函数
		$(".banner ul li").css("opacity",0).eq(0).css("opacity",1);
		$(".banner ol li").eq(0).attr("class", "active");

		$(".banner").mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(iNow){
			timer = setInterval(function(){setTimer()}, 2000)
		})
		$(".banner ol").on("mouseenter", "li", function(){
			iNow = $(this).index();
			tab(iNow)
		})
		function tab(){
			$(".banner ol li").eq(iNow).attr("class", "active").siblings().attr("class","");
			$(".banner ul li").stop().animate({
				"opacity": 0
			},1000)
			$(".banner ul li").eq(iNow).stop().animate({
				"opacity": 1
			},1000,function(){
				if(iNow == $(".banner ol li").size()){
					$(".banner ul li").css("opacity", 1);
				}
			})
		}
		//上一个
		$(".banner .prev").click(function(){		
			iNow = $(".banner ol li.active").index();		
			if(iNow > 0){
				iNow -= 1;
			}else{
				iNow = 4
			}
			tab(iNow);
		})
		//下一个
		$(".banner .next").click(function(){			
			iNow = $(".banner ol li.active").index();	
			if(iNow < 4){
				iNow += 1;
			}else{
				iNow = 0
			}
			tab(iNow);
		})
		//定时器
		 timer = setInterval(function(){setTimer()}, 2000)
		function setTimer(){
			tab(iNow);
			iNow ++;
			if(iNow == $(".banner ol li").size()){
				iNow = 0;
			}
		}
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
			url: "data/content.json",
			success: function(arr){
				if(arr){
					for(var i = 0; i < arr.length; i++){
						var oContop = $("<div class='con_top clearfix'></div>")
						var oH2 = $("<h2 class='con_tit'>" + arr[i].title + "</h2>");
						var oUl = $("<ul></ul>");
						var oUlstr = "";
						for(var j = 0; j < arr[i].top.length; j++){
							oUlstr += "<li><a target='_blank' href=''>" + arr[i].top[j] + "</a></li>";
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
						var oDtolStr = "";
						for(var j = 0; j < arr[i].left.length; j++){
							oDtstr += "<li><a target='_blank' href=" + arr[i].left[j].url + " title=" + arr[i].left[j].title + "><img src=" + arr[i].left[j].img + " alt=" + arr[i].left[j].title + "></a></li>";
							oDtolStr += "<li></li>";
						}
						oDtul.html(oDtstr);
						oDtol.html(oDtolStr);

						var oDdstr = "";
						for(var j = 0; j < arr[i].right.length; j++){
							oDdstr += "<li><a target='_blank' href=" + arr[i].right[j].url + " title=" + arr[i].right[j].title + "><img src=" + arr[i].right[j].img + " alt=" + arr[i].right[j].title + "></a></li>";
						}
						oDdul.html(oDdstr);

						oDtul.appendTo(oDt);
						oDtol.appendTo(oDt);
						oDdul.appendTo(oDd);
						oDt.appendTo(oDl);
						oDd.appendTo(oDl);
						oContop.appendTo("#" + (i+1) + "F");
						oDl.appendTo("#" + (i+1) + "F");

					}
				}
				$(".con_1f dl dt ol").find("li:first-child").attr("class", "active");

				/*var iconNows = 0;
				$(".con_1f dl dt ol").on("mouseenter", "li", function(){
					iconNows = $(this).index();
					listTab(this, iconNows);
				})*/
				//1F
				var iconNow1 = 0;
				var timerCon1 = null;
				timerCon1 = setInterval(function(){
					setTimerCon1()
				},2000)
				$("#1F dl dt").mouseenter(function(){
					clearInterval(timerCon1);
				}).mouseleave(function(){
					timerCon1 = setInterval(function(){
						setTimerCon1()
					},2000)
				})
				$("#1F dl dt ol").on("mouseenter", "li", function(){
					iconNow1 = $(this).index();
					listTab(this, iconNow1);
				})
				function setTimerCon1(){
					if(iconNow1 == $("#1F dl dt ol li").size()){
						iconNow1 = 0;
					}
					listTab("#1F dl dt ol li",iconNow1);
					iconNow1 ++;
				}

				//2F
				var iconNow2 = 0;
				var timerCon2 = null;
				timerCon2 = setInterval(function(){
					setTimerCon2()
				},2000)
				$("#2F dl dt").mouseenter(function(){
					clearInterval(timerCon2);
				}).mouseleave(function(){
					timerCon2 = setInterval(function(){
						setTimerCon2()
					},2000)
				})
				$("#2F dl dt ol").on("mouseenter", "li", function(){
					iconNow2 = $(this).index();
					listTab(this, iconNow2);
				})
				function setTimerCon2(){
					if(iconNow2 == $("#2F dl dt ol li").size()){
						iconNow2 = 0;
					}
					listTab("#2F dl dt ol li",iconNow2);
					iconNow2 ++;
				}
				//3F
				var iconNow3 = 0;
				var timerCon3 = null;
				timerCon3 = setInterval(function(){
					setTimerCon3()
				},2000)
				$("#3F dl dt").mouseenter(function(){
					clearInterval(timerCon3);
				}).mouseleave(function(){
					timerCon3 = setInterval(function(){
						setTimerCon3()
					},2000)
				})
				$("#3F dl dt ol").on("mouseenter", "li", function(){
					iconNow3 = $(this).index();
					listTab(this, iconNow3);
				})
				function setTimerCon3(){
					if(iconNow3 == $("#3F dl dt ol li").size()){
						iconNow3 = 0;
					}
					listTab("#3F dl dt ol li",iconNow3);
					iconNow3 ++;
				}
				//4F
				var iconNow4 = 0;
				var timerCon4 = null;
				timerCon4 = setInterval(function(){
					setTimerCon4()
				},2000)
				$("#4F dl dt").mouseenter(function(){
					clearInterval(timerCon4);
				}).mouseleave(function(){
					timerCon4 = setInterval(function(){
						setTimerCon4()
					},2000)
				})
				$("#4F dl dt ol").on("mouseenter", "li", function(){
					iconNow4 = $(this).index();
					listTab(this, iconNow4);
				})
				function setTimerCon4(){
					if(iconNow4 == $("#4F dl dt ol li").size()){
						iconNow4 = 0;
					}
					listTab("#4F dl dt ol li",iconNow4);
					iconNow4 ++;
				}

				//滚动效果
				function listTab(node,iconNow){
					$(node).parent().find("li").attr("class","");
					$(node).parent().find("li").eq(iconNow).attr("class", "active");
					var ulWidth = $(node).parent().parent().find("ul li").width() * $(node).parent().parent().find("ul li").size();
					$(node).parent().parent().find("ul").width(ulWidth);
					$(node).parent().parent().find("ul").stop().animate({
						left: - $(node).parent().parent().find("ul li").width() * iconNow
					});
				}
			},
			error: function(msg){
				console.log(msg);
			}
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
		index:index
	}
})