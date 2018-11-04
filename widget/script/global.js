/*
----------------------------------------------------
 */
window.APPMODE = 'dev'; // dev:开发模式, pub:发布模式
window.VERSION = '0.0.1'; // 代码版本号, 每次发布之前, 请更新, 小版本号自增+1
window.MOCKJS = false; // 是否打开mockjs, 正式版发布, 或者测试接口数据需要关闭
window.CONFIG = {}; // 全局配置
CONFIG.DEFAULT_AVATAR = '../../image/placeholder.png'; // 默认头像
CONFIG.DEFAULT_PHOTO = '../../image/placeholder.png'; // 默认图片
APPMODE == 'dev' && (function() {
    CONFIG.HOST = 'http://120.77.204.252:80/';
    var isApp = !!window.localStorage.getItem('isApp');
    if (window.APPMODE == 'dev' && !isApp) {
        // 如果是开发模式并且不是app启动
        CONFIG.HOST = 'http://120.77.204.252:80/';
    }
})();
APPMODE == 'pub' && (function() {
    CONFIG.HOST = 'http://120.77.204.252:80/';
})();

apiready = function() {
    window.isReady = true;
    var resource = [
        'U/common',
        'L/vue/vue.base',
        $('#entry').data('path'),
    ];
    var isApp = !!window.localStorage.getItem('isApp');
    if (typeof api == 'undefined' && !isApp) resource.splice(1, 0, 'U/xui');
    seajs.use(resource, function() {
        if (api.frameName) {
            api.execScript({
                name: api.winName,
                script: 'window.frameReady();'
            });
        }
        if (!window.leftBtnTap) {
            window.leftBtnTap = function() {
                api.closeWin();
            };
        }
        // _g.fixStatusBar();
        console.log('entry')
    });
};

// 兼容模拟器启动
$(function() {
    if (window.APPMODE == 'dev' && window.location.search.indexOf('isApp=1') > -1) {
        // 如果是开发模式并且是app启动
        window.localStorage.setItem('isApp', 1);
    }
    var isApp = !!window.localStorage.getItem('isApp');
    if ($('#entry').data('path') == 'app') isApp = true;
    window.APPMODE == 'dev' && !isApp && !window.isReady && apiready();
    window.APPMODE == 'pub' && window.location.host && !window.isReady && apiready();
    setTimeout(function() {
        !window.isReady && apiready();
    }, 2000);
});