define(["header","jquery","jquery-cookie"], function(header,$){
	function shopCar(){
		carNum();
		carMsg();

		//删除cookie
		$(".cart-item-list").on("click",".item-list .del", function(){
			var id = this.id;

			var cookieStr = $.cookie("goods");
			var cookieArr = eval(cookieStr);
			var goodsArr = []; //存储添加到cookie中商品的详细数据
			for(var i = 0; i < cookieArr.length; i++){
				if(id != cookieArr[i].id){
					//找到匹配的商品，并且新增数量属性
					goodsArr.push(cookieArr[i]);
				}
			}
			//重新存入进去
			$.cookie("goods", JSON.stringify(goodsArr),{
				expires: 7,
				path:"/"
			});
			carNum();
			carMsg();
		})
		//删除全部cookie
		$(".cart_floatbar .cart_toolbar .remove_shop").click(function(){
			$.cookie("goods", null,{
				path:"/"
			});
			carNum();
			carMsg();
		})
		//添加数量
		$(".cart-item-list").on("click",".add-num", function(){
			var id = this.id;
			var cookieStr = $.cookie("goods");
			var cookieArr = eval(cookieStr);
			var goodsArr = []; //存储添加到cookie中商品的详细数据
			for(var i = 0; i < cookieArr.length; i++){
				if(id == cookieArr[i].id){
					//找到匹配的商品，并且新增数量属性
					cookieArr[i].num++;
				}
			}
			$.cookie("goods", JSON.stringify(cookieArr),{
				expires: 7,
				path:"/"
			});
			carNum();
			carMsg();
		})
		//减少数量
		$(".cart-item-list").on("click",".reduce-num", function(){
			var id = this.id;
			var cookieStr = $.cookie("goods");
			var cookieArr = eval(cookieStr);
			for(var i = 0; i < cookieArr.length; i++){
				if(id == cookieArr[i].id){
					//找到匹配的商品，并且新增数量属性
					if(cookieArr[i].num <= 1){
						cookieArr[i].num = 1;
					}else{
						cookieArr[i].num--;
					}
				}
			}
			$.cookie("goods", JSON.stringify(cookieArr),{
				expires: 7,
				path:"/"
			});
			carNum();
			carMsg();
		})
		//购物车数量
		function carNum(){
			var cookieStr = $.cookie("goods");
			var cookieArr = eval(cookieStr);

			var sum = 0;
			//通过循环，完成累加
			if(cookieArr){
				for(var i = 0; i < cookieArr.length; i++){
					sum += cookieArr[i].num;
				}
			}
			$(".switch-cart-count").html(sum);
			$(".check-goods-num").html(sum);
			$(".toper .toper_right li:nth-child(4)").find("em").html(sum);
		}
		//加载COOKIE中的数据
		function carMsg(){
			$(".cart-list .cart-item-list").html("");
			$.ajax({
				type: "get",
				url: "../data/list.json",
				success: function(arr){
					//arr 完整的所有的商品数据
					//购物车加载是不是必须是，购物车添加的数据才能加载
					var cookieStr = $.cookie("goods");
					if(cookieStr){
						var cookieArr = eval(cookieStr);
						var goodsArr = []; //存储添加到cookie中商品的详细数据
						for(var i = 0; i < arr.length; i++){
							for(var j = 0; j < cookieArr.length; j++){
								if(arr[i].id == cookieArr[j].id){
									//找到匹配的商品，并且新增数量属性
									arr[i].num = cookieArr[j].num;
									goodsArr.push(arr[i]);
								}
							}
						}
						var prices = 0;
						// console.log(goodsArr);
						//创建节点，添加到页面上
							for(var i = 0; i < goodsArr.length; i++){
								$("<div class='item-list'>"+
		                            "<div class='item-item item-goods'>"+
		                                "<div class='item-form'>"+                            
		                                    "<div class='cell p-goods'>"+
		                                        "<a target='_blank' title=" + goodsArr[i].title + " href=" + goodsArr[i].url + "?id=" + goodsArr[i].id + ">"+
		                                            "<div class='img-box'>"+
		                                                "<img alt=" + goodsArr[i].title + " src=" + goodsArr[i].img[0] + ">"+
		              								"</div>"+
		                                        "</a>"+
		                                        "<div class='p-txt'>"+
		                                            "<a target='_blank' title=" + goodsArr[i].title + " href=" + goodsArr[i].url + "?id=" + goodsArr[i].id + ">"+
		                                                "<strong>" + goodsArr[i].title + "</strong>"+
		                                           "</a>"+
		                                        "</div>"+
		                                    "</div>"+
		                                     "<div class='cell p-props'>"+
		                                            "<strong>¥<span class='goods-subtotal'>" + goodsArr[i].price + "</span></strong>"+
											   "<div class='sales-promotion-box'></div>"+
											   "</div>"+
		                                        "<div class='cell p-quantity'>"+
		                                            "<div class='quantity-form'>"+ 
		                                                "<a class='decrement reduce-num' id=" + goodsArr[i].id + ">-</a>"+
		                                                "<input class='itxt goods-num' type='text' value=" + goodsArr[i].num + ">"+
		                                                "<a class='increment add-num' id=" + goodsArr[i].id + ">+</a>"+
		                                            "</div>"+
		                                            "<p>有货</p>"+
		                                        "</div>"+
		                                        "<div class='cell p-sum'>"+
		                                            "<strong>¥<span class='goods-subtotal'>" + (parseInt(goodsArr[i].price) * parseInt(goodsArr[i].num)) + ".00</span></strong>"+
		                                        "</div>"+
		                                        "<div class='cell p-ops'>"+
		                                           "<p><a class='del' id=" + goodsArr[i].id + ">删除</a></p>"+
		                                        "</div>"+
										"</div>"+

		                            "</div>"+

		                            "<div class='full-gift'></div>"+
		                           
		                        "</div>").appendTo($(".cart-list .cart-item-list"));
								prices += (parseInt(goodsArr[i].price) * parseInt(goodsArr[i].num))
							}
							$(".check-goods-total").html(prices + ".00")
					}else{
						$(".check-goods-total").html("0.00")
					}
				},
				error: function(msg){
					console.log(msg);
				}
			})
		}


		//猜你喜欢
		$.ajax({
			type: "get",
			url: "../data/list.json",
			success: function(arr){
				// console.log(arr);
				if(arr){
					for(var i = 0; i < arr.length; i++){
						if(i < 5){
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

	}

	return {
		shopCar:shopCar
	}
})