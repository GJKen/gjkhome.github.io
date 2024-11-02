function showMessage(text) {
    console.log('显示消息:', text);
    $('.message').html(text).delay(5000); // 渐显后再渐隐
}

$(document).ready(function() {
    var text;
    if (document.referrer !== '') {
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
		 // 获取域名的主要部分
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = '欢迎！来自百度的朋友！';
        } else if (domain == 'so') {
            text = '欢迎！来自360搜索的朋友！';
        } else if (domain == 'google') {
            text = '欢迎！来自谷歌的朋友！';
        } else {
            text = '欢迎进入我的网站！';
        }
    } else {
        text = '欢迎进入我的网站！';
    }
    showMessage(text);
});