define(["jquery","jquery-cookie"], function($){
	function list(){
			$.ajax({
				type: "get",
				url: "../data/list.json",
				success: function(arr){
					// console.log(arr);
					if(arr){
						for(var i = 0; i < arr.length; i++){
							var oListItem = $("<div class='list_item'></div>");
							var oListImg = $("<div class='list_img'></div>");
							var oA = $("<a href=" + arr[i].url + "?id=" + arr[i].id + "></a>");
							var oUl = $("<ul></ul>");
							for(var j = 0; j < arr[i].img.length; j++){
								$("<li><img src=" + arr[i].img[j] + " alt=" + arr[i].title + " title=" + arr[i].title + "></li>").appendTo(oUl);
							}
							oUl.appendTo(oA);
							oA.appendTo(oListImg);
							var oListImgX = $("<div class='list_imgx'></div>");
							var oOl = $("<ol></ol>");
							for(var j = 0; j < arr[i].imgx.length; j ++){
								$("<li><img src=" + arr[i].imgx[j] + " alt=" + arr[i].title + " title=" + arr[i].title + "></li>").appendTo(oOl);
							}
							oOl.appendTo(oListImgX);
							$("<span class='prev'>&lt;</span><span class='next'>&gt;</span>").appendTo(oListImgX);
							oListImgX.appendTo(oListImg);
							oListImg.appendTo(oListItem);
							$("<a href=" + arr[i].url + "><ul class='list_con'><li><span>￥" + arr[i].price + "</span><i>￥" + arr[i].del + "</i></li><li><p>" + arr[i].title + "</p></li><li><em>" + arr[i].evaluate + "</em></li><li><em>" + arr[i].merchant + "</em></li></ul></a>").appendTo(oListItem);
							oListItem.appendTo($(".list_cons"));

							if(i < 5){
								var oListItem = $("<div class='list_item'></div>");
								var oListImg = $("<div class='list_img'></div>");
								var oA = $("<a href=" + arr[i].url + "></a>");
								var oUl = $("<ul></ul>");
								for(var j = 0; j < arr[i].img.length; j++){
									$("<li><img src=" + arr[i].img[j] + " alt=" + arr[i].title + " title=" + arr[i].title + "></li>").appendTo(oUl);
								}
								oUl.appendTo(oA);
								oA.appendTo(oListImg);
								var oListImgX = $("<div class='list_imgx'></div>");
								var oOl = $("<ol></ol>");
								for(var j = 0; j < arr[i].imgx.length; j ++){
									$("<li><img src=" + arr[i].imgx[j] + " alt=" + arr[i].title + " title=" + arr[i].title + "></li>").appendTo(oOl);
								}
								oOl.appendTo(oListImgX);
								$("<span class='prev'>&lt;</span><span class='next'>&gt;</span>").appendTo(oListImgX);
								oListImgX.appendTo(oListImg);
								oListImg.appendTo(oListItem);
								$("<a href=" + arr[i].url + "?id=" + arr[i].id + "><ul class='list_con'><li><span>" + arr[i].price + "</span><i>" + arr[i].del + "</i></li><li><p>" + arr[i].title + "</p></li><li><em>" + arr[i].evaluate + "</em></li><li><em>" + arr[i].merchant + "</em></li></ul></a>").appendTo(oListItem);
								oListItem.appendTo($(".liker_list"));
							}

						}
						
						$(".list_img ul li").eq(0).show().siblings().hide();


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
				},
				error: function(msg){
					console.log(msg);
				}
			})

			$.ajax({
				type:"get",
				url: "../data/category.json",
				success: function(arr){
					if(arr){
						for(var i = 0; i < arr.length; i++){
							$("<a href=" + arr[i].url + ">" + arr[i].title + "</a>").appendTo($(".list_nav dd"))
						}
					}
				},
				error: function(msg){
					console.log(msg);
				}
			})		
	}

	return {
		list:list
	}
})