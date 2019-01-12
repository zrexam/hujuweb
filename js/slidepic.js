define(["jquery"],function($){
	function slidePic(node){
		var iconNow = 0;
		var timerCon = null;
		timerCon = setInterval(function(){
			setTimerCon()
		},2000)
		$(node).parent().mouseenter(function(){
			clearInterval(timerCon);
		}).mouseleave(function(){
			timerCon = setInterval(function(){
				setTimerCon()
			},2000)
		})
		$(node).on("mouseenter", "li", function(){
			iconNow = $(this).index();
			listTabs(this, iconNow);
		})
		//定时器
		function setTimerCon(){
			if(iconNow == $(node).find("li").size()){
				iconNow = 0;
			}
			listTabs($(node).find("li"),iconNow);
			iconNow ++;
		}
		//滚动切换 
		function listTabs(node,iconNow){
			$(node).parent().find("li").attr("class","");
			$(node).parent().find("li").eq(iconNow).attr("class", "active");
			var ulWidth = $(node).parent().parent().find("ul li").width() * $(node).parent().parent().find("ul li").size();
			$(node).parent().parent().find("ul").width(ulWidth);
			$(node).parent().parent().find("ul").stop().animate({
				left: - $(node).parent().parent().find("ul li").width() * iconNow
			});
		}
	}

	return {
		slidePic:slidePic
	}
})