<?php
require_once "../wshare/jssdk.php";
$jssdk = new JSSDK("wxd3a7714f3a9f9675", "5db7f79eabe9bcc7ff28e3dbc9b3b4d9");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>最爱你的人</title>
    <meta name="format-detection" content="telephone=no, email=no"/>
    <link rel="stylesheet" href="css/common.css"/>
    <script type="text/javascript" src="js/zepto.min.js"></script>
    <script type="text/javascript" src="js/flexible.js"></script>
</head>
<body>
    <!--横屏检测-->
    <div class="loading" id="loading">
        <div class="loading-logo"></div>
        <p class="loading-tip">请旋转您的手机</p>
    </div>
    <!--/横屏检测-->
    <!--场景容器-->
    <div class="scene-container preserve-3d" id="scene-container">
        <!--场景-->
        <div class="scene preserve-3d" id="scene">
            <!--场景一-->
            <div class="first-scene" id="first">
                <div class="first-scene-container">
                    <div class="first-scene-canvas page">
                        <button class="first-scene-canvas-btn" id="start"></button>
                    </div>
                    <div class="first-scene-camera"></div>
                </div>
            </div>
            <!--场景一-->
            <!--场景二-->
            <div class="second-scene" id="second">
                <div class="second-scene-container">
                    <div class="second-scene-canvas page"></div>
                </div>
            </div>
            <!--/场景二-->
            <!--场景三-->
            <div class="third-scene" id="third">
                <div class="third-scene-container">
                    <div class="third-scene-canvas page"></div>
                </div>
            </div>
            <!--/场景三-->
            <!--场景四-->
            <div class="fourth-scene" id="fourth">
                <div class="fourth-scene-container">
                    <div class="fourth-scene-canvas page"></div>
                </div>
            </div>
            <!--/场景四-->
            <!--场景五-->
            <div class="fifth-scene" id="fifth">
                <div class="fifth-scene-container">
                    <div class="fifth-scene-canvas page"></div>
                </div>
            </div>
            <!--/场景五-->
            <!--场景六-->
            <div class="sixth-scene" id="sixth">
                <div class="sixth-scene-container">
                    <div class="sixth-scene-canvas page"></div>
                </div>
            </div>
            <!--/场景六-->
            <!--场景七-->
            <div class="seventh-scene" id="seventh">
                <div class="seventh-scene-container">
                    <div class="seventh-scene-canvas page"></div>
                </div>
            </div>
            <!--/场景七-->
            <!--场景八-->
            <div class="eighth-scene" id="eighth">
                <div class="eighth-scene-container">
                    <div class="eighth-scene-canvas">
                    </div>
                </div>
            </div>
            <!--/场景八-->
            <button class="eighth-scene-canvas-btn-1" id="go-down"></button>
            <button class="eighth-scene-canvas-btn-2" id="do-it"></button>
            <!--音乐-->
            <div class="music" id="music-container">
                <audio src="./source/music.mp3" autoplay id="music"></audio>
            </div>
            <!--/音乐-->
            <!--印章-->
            <div class="canvas-seal" id="canvas-seal"></div>
            <!--/印章-->
            <!--切换页面-->
            <div class="scene-change" id="scene-change"></div>
            <!--/切换页面-->
        </div>
        <!--/场景-->
    </div>
    <!--/场景容器-->
    <!--遮罩层-->
    <div class="mask-container" id="mask">
        <div class="mask"></div>
        <div class="share"></div>
    </div>
    <!--/遮罩层-->
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> 
    <script>
        Zepto(function($){
            var shareTitle = '分享标题';
            var sharedes = '分享描述';
            wx.config({
             debug: false,//调试模式
            appId: '<?php echo $signPackage["appId"];?>',// </span><span style="font-family:Georgia, Times New Roman, Times, sans-serif;color:#333333;">
            timestamp: <?php echo $signPackage["timestamp"];?>,//生成签名的时间戳
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',//生成签名的随机串
            signature: '<?php echo $signPackage["signature"];?>',

            jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline']// 所有要调用的 API 都要加到这个列表中
            });
            wx.ready(function() {
                wx.onMenuShareAppMessage({ //分享给朋友
                    title: shareTitle, // 分享标题,可在控制器端传递
                    desc: sharedes,//分享的描述，可在控制器端传递

                    link: 'http://wixinxyz.vemic.com/own/bonus/', // 分享链接，可在控制器端传递
                    imgUrl: 'http://wixinxyz.vemic.com/own/wshare/share.jpg', // 分享图标 ，可在控制器端传递
                    success: function() {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });

                wx.onMenuShareTimeline({ //分享到朋友圈
                    title: shareTitle,
                    desc: sharedes,

                    link: 'http://wixinxyz.vemic.com/own/bonus/', // 分享链接
                    imgUrl: 'http://wixinxyz.vemic.com/own/caiyun/images/cai.png', // 分享图标
                    success: function() {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        });
    </script>
</body>
</html>