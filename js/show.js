define(["header","single","jquery","jquery-cookie"], function(header,single,$){
	function show(){

		var id = getUrlParam("id");
		$(".con_right6 .con_right_r button").eq(0).attr("id",id);
		$.ajax({
			type: "get",
			url: "../data/list.json",
			success: function(arr){
				if(arr){
					for(var i = 0; i < arr.length; i ++){
						if(id == arr[i].id){
							var oListImg = $("<div class='list_img'></div>");
							var oUl = $("<ul></ul>");
							for(var j = 0; j < arr[i].img.length; j++){
								$("<li><img src='" + arr[i].img[j] + "?imageView2/1/w/400/h/400/q/100/' alt=" + arr[i].title + " title=" + arr[i].title + "></li>").appendTo(oUl);
								$("<img src=" + arr[i].img[j] + " alt=" + arr[i].title + " title=" + arr[i].title + ">").appendTo($(".big"));
							}
							$("<span class='grayBox'></span>").appendTo(oUl);
							oUl.appendTo(oListImg);
							var oListImgX = $("<div class='list_imgx'></div>");
							var oOl = $("<ol></ol>");
							for(var j = 0; j < arr[i].img.length; j ++){
								$("<li><img src='" + arr[i].img[j] + "?imageView2/1/w/58/h/58/q/100/' alt=" + arr[i].title + " title=" + arr[i].title + "></li>").appendTo(oOl);
							}
							oOl.appendTo(oListImgX);
							$("<span class='prev'>&lt;</span><span class='next'>&gt;</span>").appendTo(oListImgX);
							oListImgX.appendTo(oListImg);
							oListImg.appendTo($(".con_left"));

							$(".con_right1 h2").html(arr[i].title);
							$(".con_right2 .con_right_r").html("<p>¥  " + arr[i].price + "</p><span>市场价：</span><em>¥" + arr[i].del + "</em>");

						}
					}


					var iNow = 0;
					//鼠标经过图片
					$(".list_img ul li").eq(0).show().siblings().hide();
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
					//放大镜
					//
					$(".con_left .list_img ul").mouseenter(function(){
						$(".big").show();
						$(".grayBox").show()
					})
					$(".con_left .list_img ul").mousemove(function(ev){
						var offsetX = ev.pageX - $(this).offset().left;
						var offsetY = ev.pageY - $(this).offset().top;
						var left = offsetX - $(".grayBox").width() / 2;	
						var top = offsetY -  $(".grayBox").height() / 2;
						
						var index = 0;
						$(".con_left .list_img ul li").each(function(){
					         if($(this).css("display") != "none"){
					            index = $(this).index();
					         }
					     })
						$(".big img").eq(index).show().siblings().hide();
						
						left = left <= 0 ? 0 : left;
						if(top <= 0){
							top = 0;
						}

						//samll 的宽度 - gary 的宽度 ;
						var maxLeft = parseInt($(".con_left .list_img ul").width()) - parseInt($(".con_left .list_img ul .grayBox").width());
						var maxTop = parseInt($(".con_left .list_img ul").height()) - parseInt($(".con_left .list_img ul .grayBox").height());
						left = left >= maxLeft ? maxLeft : left;
						if(top >= maxTop){
							top = maxTop;
						}
						$(".grayBox").css("left",left);
						$(".grayBox").css("top",top);


						var propLeft = Math.round(left / maxLeft * 100)/100 ;
						//左侧位移的比例;保留两位小数;
						var propTop =  Math.round(top / maxTop * 100)/100;
						//console.log(propLeft,propTop);

						//图片的能走的路;


						var maxBigLeft = $(".big img").width() - $(".big").width()//图片left能移动的距离;

						$(".big img").css("left",- maxBigLeft * propLeft); //让大图移动;
						
						var maxBigTop = $(".big img").height() - $(".big").height();
						$(".big img").css("top",-maxBigTop * propTop);

					}).mouseleave(function(){
						$(".big").hide();
						$(".grayBox").hide()
					})

				}
			},
			error: function(msg){
				console.log(msg)
			}
		})


		//点击类型
		$(".con_right4 ul li").click(function(){			
			$(this).addClass("active").siblings().removeClass("active");
		})



		$.ajax({
			type: "get",
			url: "../data/list.json",
			success: function(arr){
				if(arr){
					for(var i = 0; i < arr.length; i++){
						if(i < 8){
							$("<dd><a href=" + arr[i].url + "?id=" + arr[i].id + "><img src=" + arr[i].img[0] + " alt=" + arr[i].title + "><p>" + arr[i].title + "</p><span>" + arr[i].price + "</span></a></dd>").appendTo($("#hotList"));
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


		

		//加入购物车
		$(".con_right6 .con_right_r button").eq(0).click(function(){
			//进行cookie缓存
			var id = this.id;
			//1、先去判断是否是第一次添加 goods
			var first = $.cookie("goods") == null ? true : false;
			if(first){
				$.cookie("goods", "[{id:" + id + ",num:" + parseInt($("#shopNum").val()) + "}]",{
					expires: 7,
					path:"/"
				})
			}else{
				//2、判断之前是否添加该商品
				var cookieStr = $.cookie("goods");
				var cookieArr = eval(cookieStr);
				var isSame = false;
				for(var i = 0; i < cookieArr.length; i++){
					if(cookieArr[i].id == id){
						//之前添加过数量+1
						if($("#shopNum").val() > 1){
							cookieArr[i].num += parseInt($("#shopNum").val());
						}else{
							cookieArr[i].num++;
						}
						
						isSame = true;
						break;
					}
				}
				if(!isSame){
					//之前每天加过
					var obj = {id: id,num:parseInt($("#shopNum").val())};
					cookieArr.push(obj);
				}
				//3、重新存入进去
				$.cookie("goods", JSON.stringify(cookieArr),{
					expires: 7,
					path:"/"
				});
			}
				// alert($.cookie("goods"))
			header.shopCar();
			single.single();
		})
	}

	//获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) {
            return unescape(r[2]); 
        }
        return null; //返回参数值
    }

	return {
		show:show
	}
})