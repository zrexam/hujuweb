define(["slidePic","jquery","jquery-cookie"], function(slidePic,$){
	function index(){

		//banner
		$.ajax({
			type:"get",
			url: "../data/banner.json",
			success: function(arr){
				if(arr){
					var oUl = $("<ul class='clearfix'>");
					var oOl = $("<ol>");
					var oA = $("<a class='prev'></a><a class='next'></a>");
					var oUlStr = "";
					var oOlStr = "";

					for(var i = 0; i < arr.length; i++){
						oUlStr += "<li><a href=" + arr[i].url + " title=" + arr[i].title + "><img src=" + arr[i].img + " alt=" + arr[i].title + " title=" + arr[i].title + "></a></li>";
						oOlStr += "<li></li>";
					}
					oUl.html(oUlStr);
					oOl.html(oOlStr);
					oUl.appendTo($(".banner"));
					oOl.appendTo($(".banner"));
					oA.appendTo($(".banner"));

					$(".banner ul li").css("opacity",0).eq(0).css("opacity",1);
					$(".banner ol li").eq(0).attr("class", "active");

					$(".banner ol").on("mouseenter", "li", function(){
						iNow = $(this).index();
						tab(iNow)
					})
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
				}
			},
			error: function(msg){
				console.log(msg);
			}
		})
		var iNow = 1;
		var timer = null;
		//切换函数
		$(".banner").mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(iNow){
			timer = setInterval(function(){setTimer()}, 2000)
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
		
		//定时器
		 timer = setInterval(function(){setTimer()}, 2000)
		function setTimer(){
			tab(iNow);
			iNow ++;
			if(iNow == $(".banner ol li").size()){
				iNow = 0;
			}
		}
		

		//活动推荐
		$.get("../data/recommend.json", function(arr){
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


				//1F
				slidePic.slidePic("#1F dl dt ol");
				//2F
				slidePic.slidePic("#2F dl dt ol");
				//3F
				slidePic.slidePic("#3F dl dt ol");
				//4F
				slidePic.slidePic("#4F dl dt ol");

			},
			error: function(msg){
				console.log(msg);
			}
		})

		//体验店
		$.ajax({
			type: "get",
			url: "../data/experience.json",
			success: function(arr){
				if(arr){
					for(var i = 0; i < arr.length; i++){
						$("<dl><a href=" + arr[i].url + " title=" + arr[i].title + "><dt><img src=" + arr[i].img + " alt=" + arr[i].title + " title=" + arr[i].title + "></dt><dd><h2>" + arr[i].title + "</h2><ul><li><i class='fa fa-phone'></i><span class='orange'>" + arr[i].phone + "</span></li><li><i class='fa fa-map-marker'></i><span>" + arr[i].address + "</span></li><li><i class='fa fa-clock-o'></i><span>营业时间：" + arr[i].clock + "</span></li></ul><p><i class='fa fa-coffee'></i><span>免费茶水</span></p><p><i class='fa fa-product-hunt'></i><span>免费停车</span></p></dd></a></dl>").appendTo($("#tiyan"));
					}
				}
			},
			error: function(msg){
				console.log(msg);
			}
		})

		//新闻动态
		$.ajax({
			type: "get",
			url: "../data/news.json",
			success: function(arr){
				if(arr){
					for(var i = 0; i < arr.length; i++){
						if(arr[i].ishot == 1){
							var addTime = new Date(arr[i].addtime);
							var dateTime = addTime.getDate();
							var month = addTime.getMonth()+1;
							var year = addTime.getFullYear();
							$("<a href=" + arr[i].url + "><div class='con_news_l_img'><img src=" + arr[i].img + " alt=" + arr[i].title + " title=" + arr[i].title + "></div><dl><dt><span>" + dateTime + "</span><i>" + year + "-" + month + "</i></dt><dd><p>" + arr[i].title + "</p><span>" + arr[i].content + "</span></dd></dl></a>").appendTo($(".con_news_l"));
							$("<a href=" + arr[i].url + "><dt><span>" + dateTime + "</span><i>" + year + "-" + month + "</i></dt><dd><p>" + arr[i].title + "</p><span>" + arr[i].content + "</span></dd></a>").appendTo($(".con_news_r_top"));
						}
						if(arr[i].cateid == 1){
							$("<dd><a href=" + arr[i].url + " title=" + arr[i].title + "><span>" + arr[i].addtime + "</span><p>" + arr[i].title + "</p></a></dd>").appendTo($("#news_l"));
						}
						if(arr[i].cateid == 2){
							$("<dd><a href=" + arr[i].url + " title=" + arr[i].title + "><span>" + arr[i].addtime + "</span><p>" + arr[i].title + "</p></a></dd>").appendTo($("#news_r"));
						}
					}
				}
			},
			error: function(msg){
				console.log(msg);
			}
		})


	}
	return {
		index:index
	}
})