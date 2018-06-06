<?php
require_once "jssdk.php";
// 测试号管理的  appID  appsecret
$jssdk = new JSSDK("wxe66e51f8701b7376", "ece53b860b156200bf2441a7413a5eb0");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- meta:vp为了方便 -->
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  SJSDK测试
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  wx.config({
    // debug: true, // 不调试
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
      // 所有要调用的 API 都要加到这个列表中!!!
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'getNetworkType'
    ]
  });
  wx.ready(function () {
    // 在这里调用 API

    // 分享给朋友接口
    wx.onMenuShareAppMessage({
      title: '分享标题', // 分享标题
      desc: '分享描述', // 分享描述
      link: 'http://m.jd.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://st.360buyimg.com/m/images/index/top-jdlogo.png', // 分享图标 (确实是不好使的!!!)
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
        console.log('用户点击了确认(分享给朋友)');
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        console.log('用户点击了取消(分享给朋友)');
      }
    });
    // 分享到朋友圈接口
    wx.onMenuShareTimeline({
      title: '分享的标题-京东', // 分享标题
      link: 'http://m.jd.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://st.360buyimg.com/m/images/index/top-jdlogo.png', // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        console.log('用户点击了确认(分享到朋友圈)');
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        console.log('用户点击了取消(分享到朋友圈)');
      }
    });
    // 网络状态接口
    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
        console.log(networkType);
      }
    });

  });
</script>
</html>
