define(function(require, exports, module) {

    api && api.setFullScreen({
        fullScreen: false
    });

    api && api.setStatusBarStyle({
        style: 'light'
    });

    if (window.APPMODE == 'dev' && !window.location.host) {
        api.clearCache();
        api.removeLaunchView();

        var path = _g.getLS('DEV_PATH');

        if (path) {
            api.confirm({
                title: '提示',
                msg: '使用历史记录地址',
                buttons: ['确定', '取消']
            }, function(ret, err) {
                if (ret.buttonIndex == 1) {
                    openDev(path);
                } else {
                    inputPath();
                }
            });
        } else {
            inputPath();
        }

        // var config = require('config');
        // var url = 'http://' + config.host + ':' + config.port;

        function openDev(path) {
            api.openWin({
                name: 'dev-win',
                url: path + '/index.html?isApp=1',
                bounces: false,
                slidBackEnabled: false,
                pageParam: { key: 'value' },
                animation: { type: 'none' }
            });
        }

        function inputPath() {
            api.prompt({
                buttons: ['确定', '取消']
            }, function(ret, err) {
                if (ret.buttonIndex == 1) {
                    path = 'http://' + ret.text;
                    _g.setLS('DEV_PATH', path);
                    openDev(path);
                } else {
                    api.closeWidget({
                        silent: true
                    });
                }
            });
        }

        return
    }

    // _g.rmLS('isFirstStart');
    // _g.rmLS('UserInfo');

    // 如果是第一次打开app, 启动引导页
    // if (!_g.getLS('isFirstStart')) {
    //     api && api.openWin({
    //         name: 'leading-index-win',
    //         url: './html/leading/index.html',
    //         bounces: false,
    //         slidBackEnabled: false
    //     });
    //     return
    // }

    // 利用本地缓存做用户登录状态保持
    // var startTime = new Date().getTime();
    // var LastTime = _g.getLS('LastTime');
    // if (!LastTime) _g.setLS('LastTime', startTime);
    // if (startTime - LastTime > 7 * 24 * 60 * 60 * 1000) {
    //     _g.rmLS('UserInfo');
    // }
    // _g.setLS('LastTime', startTime);

    // 移除启动页, 应该在确定必要页面加载完毕之后调用
    // api.removeLaunchView();
    api.removeLaunchView({
        animation: {
            type: 'fade',
            duration: 500
        }
    });

    // 获取状态栏高度, 并设置至缓存
    var StatusBarHeight = _g.getStatusBarHeight();
    _g.setLS('StatusBarHeight', StatusBarHeight);

    function openMainPage() {
        _g.openWin({
            name: 'main-index',
            url: './html/main/index.html',
            bounces: false,
            slidBackEnabled: false,
            animation: { type: 'none' }
        }, 'normal');
    }

    openMainPage();

    api.addEventListener({
        name: 'shake'
    }, function(ret, err) {
        if (window.APPMODE == 'pub') return;
        api.alert({
            title: '当前代码版本为:',
            msg: window.VERSION,
        }, function(ret, err) {

        });
    });

    module.exports = {};

});