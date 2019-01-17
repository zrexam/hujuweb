define(["jquery"], function($){
	function list(){
			var iNow = 0;
			//鼠标经过图片
			$(".list_imgx ol").on("mouseenter", "li", function(){
				iNow = $(this).index();
				$(this).attr("class","active").siblings().attr("class","");
				$(this).parent().parent().prev().find("ul li").eq(iNow).show().siblings().hide();
			})
			//上一张
			$(".prev").click(function(){
				iNow--
				if(iNow < 0){
					iNow = 0
				}
				var liWidth = ($(this).prev().find("li").width() + 6) * $(this).prev().find("li").size();
				var iLeftNum = $(this).prev().find("li").size() - 5;
				var iLeft = parseInt($(this).prev().css("left"));
				
				$(this).prev().width(liWidth)

				if(iNow <= iLeftNum && iLeft < 0){
					$(this).prev().stop().animate({
						left: iLeft + $(this).prev().find("li").width()
					},500)
				}
				$(this).prev().find("li").eq(iNow).attr("class","active").siblings().attr("class","");
				$(this).parent().prev().find("ul li").eq(iNow).show().siblings().hide();
			})
			//下一张
			$(".next").click(function(){
				iNow++;
				if(iNow > $(this).parent().prev().find("ul li").size()){
					iNow = $(this).parent().prev().find("ul li").size()
				}
				var liWidth = ($(this).prev().prev().find("li").width() + 6) * $(this).prev().prev().find("li").size();
				$(this).prev().prev().width(liWidth)
				if(iNow >= 5){
					$(this).prev().prev().stop().animate({
						left: -$(this).prev().prev().find("li").width()
					},500)
				}
				$(this).prev().prev().find("li").eq(iNow).attr("class","active").siblings().attr("class","");
				$(this).parent().prev().find("ul li").eq(iNow).show().siblings().hide();
			})
	}

	return {
		list:list
	}
})