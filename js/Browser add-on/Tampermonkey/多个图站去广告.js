// ==UserScript==
// @name			多个网站样式优化v2
// @version			0.2
// @description		个人自用
// @author			Telegram@GJK_en
// @match			https://share.dmhy.org/*
// @match			https://dmhy.org/*
// @match			https://www.south-plus.net/*
// @match			https://nyaa.si/view/*
// @match			https://kygj.vanesing.net/*
// @match			https://stool.chinaz.com/vabkeywords
// @match			https://vcb-s.com/*
// @match			https://tu.rw2.cc/*
// @match			https://cdn.ipfsscan.io/*
// @match			https://gjkalist.us.kg/@*
// @match			http://bbs.ainimua.com/*
// @match			https://www.123684.com/*
// @run-at			document-end
// @note			2024.10.16-V0.1 脚本诞生了!
// @grant			GM_addStyle
// @grant			GM_getResourceText
// @license			MIT
// @require			https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==

// 获取当前网站的URL
$currentUrl = document.URL;
window.onload = function(){
	// 创建提示信息的div
	$('body').append('<div id="copyNotification" style="display: none;position: fixed;top: 20px;left: 50%;transform: translateX(-50%);background-color: #4CAF50;font-size: 17px;font-weight: bold;color: white;padding: 10px;border-radius: 14px;z-index: 999999999999;">提示信息</div>');
	let notificationShown = false;
	let notificationTimeout; // 用于存储定时器ID
	// 提示框的动画控制函数
	function showNotification(message) {
		clearTimeout(notificationTimeout);
		$('#copyNotification').stop(true, true).text(message).fadeIn(300);
		notificationTimeout = setTimeout(function() {
			$('#copyNotification').fadeOut(300);
		}, 2000);
	}
	//通用延迟函数
	$.delay = function(callback, ms) {
		return setTimeout(callback, ms);
	};
	// 判断当前域名及路径，执行对应代码
	function checkUrl() {
		console.log("checkUrl函数√")
		var currentUrl = window.location.href;
		if (currentUrl.includes("share.dmhy.org") || currentUrl.includes("dmhy.org")) {
			//按顺序批量移除广告
			//头部 & 头部新番索引 & pikpak & 种子页面左侧内容
			$("#1280_adv, #mini_jmd, #pkpk, div.topics_bk.ui-corner-all > div.user-sidebar").remove()
			if (currentUrl.includes("/topics/view")) {
				showNotification("正在访问动漫花园种子详情页");
				//样式居中优化
				$(".topics_bk.ui-corner-all").css({"display":"flex","justify-content":"center"})
			}else {
				showNotification("正在访问动漫花园");
			}
		}
		else if (currentUrl.includes("south-plus.net")) {
			showNotification("正在访问南+");
			//隐藏上方header广告
			$(".banner > a:last-child, #header > div:last-child").hide()
		}
		else if (currentUrl.includes("nyaa.si/view")) {
			showNotification("'Nyaa-表'加载成功");
			//隐藏nyaa说明
			$("div.container > div:nth-child(2)")[1].remove()
		}
		else if (currentUrl.includes("kygj.vanesing.net")) {
			if (currentUrl.includes("admin/user/list")) {
				showNotification("正在访问科妍用户列表");
				//延迟隐藏科妍用户管理多余的白横条
				$.delay(function() {
					$("div.content-wrapper.ivu-layout-content > div > div:nth-child(3)").remove()
				}, 1000);
			}
		}
		else if (currentUrl.includes("stool.chinaz.com/vabkeywords")) {
			showNotification("正在访问'vabkeywords'");
			//禁用词检测-优化样式
			$(".prohibited-head").html('<div class="prohibited-head"style="display: inline-block;"><div class="filter-contlist pr clearfix fl"><ol class="item js-FilterItem h24 pt5"id="_chkboxhide"><li class="pr PLcx selected"val="化妆品"><p><label hidefocus="on">化妆品</label></p></li></ol><input id="type"class="InputTxt"name="type"type="hidden"value="化妆品,"><script type="text/javascript">$(function(){$(".PLcx").click(function(){if($(this).attr("Class").indexOf("selected")>-1){$("#type").val($("#type").val().replace($(this).attr("val")+",",""));$(this).removeClass("selected")}else{$("#type").val($("#type").val()+$(this).attr("val")+",");$(this).addClass("selected")}})})</script></div><div class="fr"><input type="submit"value="检测"class="okbtn fr"><input type="button"value="清除"class="btnclear mr10 fr"><span class="fr mr10 pt2 col-red"id="num">您还可以输入：9889字</span></div></div>')
			$("div.fl.row-input, div.fl.results-wrap").css("width","300px")
			//去除广告
			$(".advertBox.backfix, .ww100.ToolHeader, div.backtoTop.backtoTop-new.backfix > div:nth-child(1)").remove()
		}
		else if (currentUrl.includes("vcb-s.com")) {
			showNotification("正在访问VCB-s");
			//隐藏背景图
			$("body").css("background-image","none")
		}
		else if (currentUrl.includes("tu.rw2.cc")) {
			showNotification("正在访问tu.rw2.cc");
			//防止社死,使内容半透明
			$(".preview").css("opacity","0.2")
			const checkButton = () => {
				const buttonText = $('.btn.btn-lg.btn-info').text();
				const previewParagraphs = $('.preview p'); // 获取所有 p 标签

				if (buttonText.includes('success')) {
					previewParagraphs.css('cursor', 'pointer');
					previewParagraphs.off('click').on('click', function() {
						const textToCopy = $(this).text();
						const imgAbove = $(this).prev('img'); // 获取当前 p 标签上方的 img

						navigator.clipboard.writeText(textToCopy).then(() => {
							showNotification("复制成功");

							// 检查当前 p 标签前是否已存在提示，如果不存在则添加
							if ($(this).prev('.copy-status').length === 0) {
								$(this).before('<div class="copy-status" style="color: green; font-size: 17px;">√</div>');

								// 将当前 p 标签上方的 img 元素半透明化 80%
								imgAbove.css('opacity', '0.08');
							}
						}).catch(err => {
							showNotification("复制失败");
						});
					});
				} else {
					previewParagraphs.off('click');
				}
			};

			setInterval(checkButton, 100);
		}
		else if (currentUrl.includes("cdn.ipfsscan.io")) {
			showNotification("正在访问cdn.ipfsscan.io");
			$('body').css("background","#f3f3f3")
			function checkClassName() {
				if ($('.desc__name').length){
					//优化样式
					$(".filelist").css("padding","0 0 47px")
					$(".desc__name").css("white-space","pre-wrap")
				} else {
					// 类名不存在,继续检测,每隔 1 秒检查一次
					setTimeout(checkClassName, 1000);
				}
			}
			checkClassName(); // 执行函数
		}
		else if (currentUrl.includes("gjkalist.us.kg/@manage")) {
			if (currentUrl.includes("/@manage/settings/global")) {
				showNotification("正在访问alist全局");
				// 在这里写全局设置页面的具体代码
			} else if (currentUrl.includes("/@manage/storages")) {
				if (!notificationShown) {
					console.log(notificationShown)
					showNotification("正在访问alist储存");
					notificationShown = true;
					// 在这里写储存页面的具体代码
				}
			}
		}
		else if (currentUrl.includes("bbs.ainimua.com")) {
			showNotification("正在访问侠客行");
			$("body, .card > .card-header, .card").css("background","#fff")
		}
		else if (currentUrl.includes("www.123684.com")) {
			if (!notificationShown) {
				showNotification("正在访问123pan");
				//登陆后界面隐藏123pan上方广告
				$(".mfy-main-layout__head").css("display","none")
				notificationShown = true;
			}
		}
	}
	checkUrl() //网页加载后,执行检查url函数
	// 监听页面路径变化，确保代码在路径变化时也能生效
	var oldHref = document.location.href;

	// 拦截 pushState 和 replaceState
	(function(history){
		var pushState = history.pushState;
		var replaceState = history.replaceState;

		history.pushState = function() {
			pushState.apply(history, arguments);
			$(window).trigger('urlChanged'); // 自定义事件
		};

		history.replaceState = function() {
			replaceState.apply(history, arguments);
			$(window).trigger('urlChanged'); // 自定义事件
		};
	})(window.history);

	// 监听自定义事件
	$(window).on('urlChanged', function() {
		checkUrl();  // 当路径变化时执行你的函数
	});
}