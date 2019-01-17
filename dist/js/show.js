define(["jquery"], function($){
	function show(){
		var iNow = 0;
		//鼠标经过图片
		$(".list_imgx ol").on("mouseenter", "li", function(){
			iNow = $(this).index();
			$(this).attr("class","active").siblings().attr("class","");
			$(this).parent().parent().prev().find("li").eq(iNow).show().siblings().hide();
		})
		//上一张
		$(".prev").click(function(){
			iNow--
			if(iNow < 0){
				iNow = 0
			}
			var liWidth = ($(this).prev().find("li").width() + 12) * $(this).prev().find("li").size();
			var iLeftNum = $(this).prev().find("li").size() - 5;
			var iLeft = parseInt($(this).prev().css("left"));
			
			$(this).prev().width(liWidth)

			if(iNow <= iLeftNum && iLeft < 0){
				$(this).prev().stop().animate({
					left: iLeft + $(this).prev().find("li").width()
				},500)
			}
			$(this).prev().find("li").eq(iNow).attr("class","active").siblings().attr("class","");
			$(this).parent().prev().find("li").eq(iNow).show().siblings().hide();
		})
		//下一张
		$(".next").click(function(){
			iNow++;
			if(iNow > $(this).parent().prev().find("li").size()){
				iNow = $(this).parent().prev().find("li").size()
			}
			var liWidth = ($(this).prev().prev().find("li").width() + 12) * $(this).prev().prev().find("li").size();
			$(this).prev().prev().width(liWidth)
			if(iNow >= 5){
				$(this).prev().prev().stop().animate({
					left: -$(this).prev().prev().find("li").width()
				},500)
			}
			$(this).prev().prev().find("li").eq(iNow).attr("class","active").siblings().attr("class","");
			$(this).parent().prev().find("li").eq(iNow).show().siblings().hide();
		})

		$.ajax({
			type: "get",
			url: "../data/list.json",
			success: function(arr){
				if(arr){
					for(var i = 0; i < arr.length; i++){
						if(i < 8){
							$("<dd><a href=" + arr[i].url + "><img src=" + arr[i].img + " alt=" + arr[i].title + "><p>" + arr[i].title + "</p><span>" + arr[i].price + "</span></a></dd>").appendTo($("#hotList"));
						}
					}
				}
			},
			error: function(msg){
				console.log(msg);
			}
		})

		$(".show_tab li").click(function(){
			$(this).attr("class","active").siblings().attr("class","");
			$(".content .content_show").eq($(this).index()).show().siblings().hide();
		})


		//放大镜
		//
		$(".con_left .list_img ul").mouseenter(function(){
			$(".big").show();
			$(".grayBox").show()
		})
		$(".con_left .list_img ul").mousemove(function(ev){
			var offsetX = ev.clientX - $(this).offset().left;
			var offsetY = ev.clientY - $(this).offset().height;
			var left = offsetX - $(".grayBox").width() / 2;	
			var top = offsetY -  $(".grayBox").height() / 2;	
			left = left <= 0 ? 0 : left;
			if(top <= 0){
				top = 0;
			}

			//samll 的宽度 - gary 的宽度 ;
			var maxLeft = parseInt($(".con_left .list_img ul li").width()) - parseInt($(".con_left .list_img ul .grayBox").width());
			var maxTop = parseInt($(".con_left .list_img ul li").height()) - parseInt($(".con_left .list_img ul .grayBox").height());
			left = left >= maxLeft ? maxLeft : left;
			if(top >= maxTop){
				top = maxTop;
			}


			$(".grayBox").css("left",left);
			$(".grayBox").css("top",top);

			var propLeft = Math.round(left / maxLeft * 100)/100 ;//左侧位移的比例;保留两位小数;
			var propTop =  Math.round(top / maxTop * 100)/100;
			//console.log(propLeft,propTop);

			//图片的能走的路;


			var maxBigLeft = $(".big img").width() - $(".big").width()//图片left能移动的距离;
			$(".big img").css("left",-maxBigLeft * propLeft); //让大图移动;

			var maxBigTop = $(".big img").height() - $(".big").height();
			$(".big img").css("top",-maxBigTop * propTop);

		}).mouseleave(function(){
			$(".big").hide();
			$(".grayBox").hide()
		})
	}

	return {
		show:show
	}
})