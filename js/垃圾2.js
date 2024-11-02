// ==UserScript==
// @name			多个网站样式优化
// @version			0.1
// @description		个人自用
// @author			Telegram@GJK_en
// @match			https://share.dmhy.org/*
// @match			https://www.south-plus.net/*
// @match			https://nyaa.si/view/*
// @match			https://kygj.vanesing.net/*
// @match			https://stool.chinaz.com/vabkeywords
// @match			https://vcb-s.com/*
// @match			https://tu.rw2.cc/*
// @match			https://cdn.ipfsscan.io/*
// @match			https://gjkalist.us.kg/*
// @run-at			document-end
// @note			2024.08.28-V0.0.1 脚本诞生了!
// @grant			GM_addStyle
// @grant			GM_getResourceText
// @license			MIT
// @require			https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==

// 获取当前网站的URL
$currentUrl = document.URL;
window.onload = function(){
    //弹窗样式
    $('body').append('<div id="copyNotification" style="position: fixed;top: 20px;left: 50%;transform: translateX(-50%);background-color: #4CAF50;font-size: 17px;font-weight: bold;color: white;padding: 10px;border-radius: 14px;z-index: 9999;">提示信息</div>');

    // 是否有通知正在显示的标志位
	let isNotificationVisible = false;
	// 显示通知的函数
	function showNotification(message) {
		if (!isNotificationVisible) {
			isNotificationVisible = true;
			$('#copyNotification').text(message).fadeIn().delay(2500).fadeOut(() => {
				isNotificationVisible = false;  // 通知消失后重置标志位
			});
		}
	}

	if ($currentUrl.includes('share.dmhy.org/topics/view')){
		showNotification("'dmhy.org-view'加载成功");
		//种子页面左侧内容
		$("div.topics_bk.ui-corner-all > div.user-sidebar")[0].remove()
		//头部广告
		$("#1280_adv").remove()
		//头部新番索引
		$("#mini_jmd").remove()
        //居中
        $(".topics_bk.ui-corner-all").css({"display":"flex","justify-content":"center"})
	} else if ($currentUrl.includes('share.dmhy.org')){
		showNotification("'dmhy.org'加载成功");
		//头部广告
		$("#1280_adv").remove()
		//头部新番索引
		$("#mini_jmd").remove()
	} else if ($currentUrl.includes('www.south-plus.net')){
		showNotification("'south-plus'加载成功");
		//隐藏上方header广告
		$("#header > div:last-child").hide()
		$(".banner > a:last-child").hide()
	} else if ($currentUrl.includes('nyaa.si/view')){
		showNotification("'Nyaa-表'加载成功");
		//隐藏nyaa说明
		$("div.container > div:nth-child(2)")[1].remove()
	} else if ($currentUrl.includes('kygj.vanesing.net')){
		showNotification("'科妍'加载成功");
        //监测 URL 变化的函数
        function checkUrlChange() {
            const currentUrl = window.location.href;
            if (currentUrl.includes('admin/user/list')) {
                //隐藏科妍用户管理多余的白横条
                $("div.content-wrapper.ivu-layout-content > div > div:nth-child(3)").remove()
            }
        }
        // 每次监测到变化时检查 URL
        const observer = new MutationObserver(() => {
            checkUrlChange();
        });
        // 观察网页的标题变化以捕捉 URL 变化
        observer.observe(document.querySelector('title'), { childList: true });
	} else if ($currentUrl.includes('stool.chinaz.com/vabkeywords')){
		showNotification("'vabkeywords'加载成功");
		//禁用词检测优化样式
		$(".prohibited-head").html('<div class="prohibited-head"style="display: inline-block;"><div class="filter-contlist pr clearfix fl"><ol class="item js-FilterItem h24 pt5"id="_chkboxhide"><li class="pr PLcx selected"val="化妆品"><p><label hidefocus="on">化妆品</label></p></li></ol><input id="type"class="InputTxt"name="type"type="hidden"value="化妆品,"><script type="text/javascript">$(function(){$(".PLcx").click(function(){if($(this).attr("Class").indexOf("selected")>-1){$("#type").val($("#type").val().replace($(this).attr("val")+",",""));$(this).removeClass("selected")}else{$("#type").val($("#type").val()+$(this).attr("val")+",");$(this).addClass("selected")}})})</script></div><div class="fr"><input type="submit"value="检测"class="okbtn fr"><input type="button"value="清除"class="btnclear mr10 fr"><span class="fr mr10 pt2 col-red"id="num">您还可以输入：9889字</span></div></div>')
		$("div.fl.row-input").css("width","300px")
		$("div.fl.results-wrap").css("width","300px")
		//去除广告
		$(".ww100.ToolHeader").remove()
		$(".advertBox.backfix").remove()
	} else if ($currentUrl.includes('vcb-s.com')){
		showNotification("'vcb-s'加载成功");
        //隐藏背景图
        $("body").css("background-image","none")
	} else if ($currentUrl.includes("rw2.cc")){
		showNotification("'ipfs'加载成功");
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
	} else if ($currentUrl.includes("ipfsscan.io")){
		showNotification("'ipfsscan.io'加载成功");
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
    } else if ($currentUrl.includes("gjkalist.us.kg")){
        console.log('1')
    }
}