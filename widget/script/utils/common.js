(function() {

    // 常用函数库

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") // ==> 2016-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      // ==> 2016-7-2 8:9:4.18

    function Common() {
        this.isAndroid = (/android/gi).test(navigator.appVersion);
        this.isIOS = (/mac/gi).test(navigator.appVersion);
    }

    Common.prototype = {
        showPageInfo: function() {
            var pageInfo = {
                winName: api.winName,
                frameName: api.frameName,
                screenWidth: api.screenWidth,
                screenHeight: api.screenHeight,
                winWidth: api.winWidth,
                winHeight: api.winHeight,
                frameWidth: api.frameWidth,
                frameHeight: api.frameHeight,
                appVersion: api.appVersion
            };
            var info = '';
            _.each(pageInfo, function(value, key) {
                info += key + ':' + value + '\r\n';
            });
            alert(info);
        },
        uzStorage: function() {
            var ls = window.localStorage;
            if (this.isAndroid && !window.location.host) ls = os.localStorage();
            return ls;
        },
        setLS: function(key, value) {
            if (arguments.length === 2) {
                var v = value;
                if (typeof v == 'object') {
                    v = JSON.stringify(v);
                    v = 'obj-' + v;
                } else {
                    v = 'str-' + v;
                }
                var ls = this.uzStorage();
                if (ls) {
                    ls.setItem(key, v);
                }
            }
        },
        getLS: function(key) {
            var ls = this.uzStorage();
            if (ls) {
                var v = ls.getItem(key);
                if (!v) {
                    return;
                }
                if (v.indexOf('obj-') === 0) {
                    v = v.slice(4);
                    return JSON.parse(v);
                } else if (v.indexOf('str-') === 0) {
                    return v.slice(4);
                }
            }
        },
        rmLS: function(key) {
            var ls = this.uzStorage();
            if (ls && key) ls.removeItem(key);
        },
        clearLS: function() {
            var ls = this.uzStorage();
            if (ls) ls.clear();
        },
        getStatusBarHeight: function() {
            var StatusBarHeight = 0;
            if (api.systemType == 'ios') {
                var strSV = api.systemVersion;
                var numSV = parseInt(strSV, 10);
                var fullScreen = api.fullScreen;
                var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
                if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                    StatusBarHeight = 20;
                }
            } else if (api.systemType == 'android') {
                var ver = api.systemVersion;
                ver = parseFloat(ver);
                if (ver >= 4.4) {
                    StatusBarHeight = 25;
                }
            }
            return StatusBarHeight;
        },
        fixStatusBar: function() {
            var header = $('#header')[0];
            if (!api) return;
            if (!header) return;
            if (api.systemType == 'ios') {
                var strSV = api.systemVersion;
                var numSV = parseInt(strSV, 10);
                var fullScreen = api.fullScreen;
                var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
                if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                    header.style.paddingTop = '20px';
                }
            } else if (api.systemType == 'android') {
                var ver = api.systemVersion;
                ver = parseFloat(ver);
                if (ver >= 4.4) {
                    header.style.paddingTop = '25px';
                }
            }
        },
        isElement: function(obj) {
            return !!(obj && obj.nodeType == 1);
        },
        isArray: function(obj) {
            if (Array.isArray) {
                return Array.isArray(obj);
            } else {
                return obj instanceof Array;
            }
        },
        isEmptyObject: function(obj) {
            if (JSON.stringify(obj) === '{}') {
                return true;
            }
            return false;
        },
        toast: function(msg, duration, location) {
            if (typeof duration == 'string') location = duration;
            api && api.toast({
                msg: msg || '',
                duration: duration || 2000,
                location: location || 'middle'
            });
        },
        addHeader: function(opts) {
            var header = new Vue({
                el: opts.el || '#header',
                template: _g.getTemplate(opts.template || 'common/header-base-V'),
                data: opts.data || {},
                methods: (function() {
                    return $.extend(true, {
                        onTapLeftBtn: function() {
                            if (this.frameName) {
                                api.sendEvent({
                                    name: api.winName + '-closeFrame'
                                })
                                return
                            }
                            api && api.closeWin();
                        }
                    }, opts.methods);
                })(),
                ready: function() {
                    setTimeout(function() {
                        $('body')[0].style.paddingTop = $('#header').height() + 'px';
                    }, 0);
                }
            });
            return header;
        },
        addContent: function(opts) {
            if (!opts.name) return;
            if (!opts.url) return;
            var headerHeight = $('#header').height();
            // if (opts.name == 'order-index') headerHeight += 46;
            setTimeout(function() {
                api && api.openFrame({
                    name: opts.name + '-frame',
                    url: opts.url,
                    bounces: opts.bounces !== false,
                    vScrollBarEnabled: api.systemType != 'android',
                    hScrollBarEnabled: api.systemType != 'android',
                    rect: {
                        x: 0,
                        y: headerHeight,
                        w: 'auto',
                        h: api.winHeight - headerHeight
                    },
                    pageParam: opts.pageParam || {}
                });
            }, 0);
            setTimeout(function() {
                api.setFrameAttr({
                    name: opts.name + '-frame',
                    rect: {
                        x: 0,
                        y: headerHeight,
                        w: 'auto',
                        h: api.winHeight - headerHeight
                    },
                });
            }, 500);
        },
        openWin: function(opts, normal) {
            var startTime = new Date().getTime();
            _g.setLS('LastTime', startTime);
            if (!opts.name) return;
            if (!opts.url) return;
            if (normal) {
                opts.name += '-win';
                opts.url += '#StatusBarHeight=' + _g.getLS('StatusBarHeight');
                if (api.systemType == 'android') opts.hScrollBarEnabled = false;
                api.openWin(opts);
            } else {
                // 页面头部设置, 所有属性可选
                // opts.header = {
                //     title: '标题',
                //     leftIcon: '',
                //     leftText: '返回',
                //     rightIcon: '',
                //     rightText: '更多'
                // };
                var headerOpts = '#StatusBarHeight=' + _g.getLS('StatusBarHeight');
                if (_.isObject(opts.header)) {
                    _.each(opts.header, function(value, key) {
                        headerOpts += '&' + key + '=' + value;
                    });
                }
                api.openWin({
                    name: opts.name + '-win',
                    url: opts.url,//'../baseWin/index.html' + headerOpts,
                    bounces: false,
                    slidBackEnabled: !!opts.slidBackEnabled,
                    vScrollBarEnabled: api.systemType != 'android',
                    hScrollBarEnabled: api.systemType != 'android',
                    pageParam: { opts: opts }
                });
            }
        },
        frameBuilder: function (opts) {
            if (!opts || !opts.name) return null;
            var Frame = {
                name: opts.name,
                open: function () {
                    api.openFrame(opts);
                },
                show: function () {
                    api.setFrameAttr({
                        name: this.name,
                        hidden: false
                    });
                },
                hide: function () {
                    api.setFrameAttr({
                        name: this.name,
                        hidden: true
                    });
                }
            };
            return Frame;
        },
        // 设置baseWin页面头部
        setHeader: function(opts) {
            api.execScript({
                name: api.winName,
                script: 'window.setHeader(' + JSON.stringify(opts) + ');'
            });
        },
        closeWins: function(winNames) {
            _.each(winNames, function(winName) {
                api.closeWin({
                    name: winName,
                    animation: { type: "none" }
                });
            });
        },
        showProgress: function(opts) {
            opts = $.extend(true, {
                style: 'default',
                animationType: 'fade',
                modal: true
            }, opts);
            api && api.showProgress(opts);
        },
        hideProgress: function() {
            api && api.hideProgress();
        },
        viewAppear: function(callback) {
            api && api.addEventListener({
                name: 'viewappear'
            }, function(ret, err) {
                callback && callback();
            });
        },
        setFile: function(opts, callback) {
            var ret, fs = api.require('fs');
            var fd = null;
            opts.path = 'fs://data/' + opts.path;
            ret = fs.existSync({
                path: opts.path
            });
            if (!ret.exist) {
                ret = fs.createFileSync({
                    path: opts.path
                });
            }
            ret = fs.openSync({
                path: opts.path,
                flags: 'read_write'
            });
            if (ret.status) {
                fd = ret.fd
                ret = fs.writeSync({
                    fd: fd,
                    data: JSON.stringify(opts.content),
                    offset: 0,
                    overwrite: true
                });
                if (ret.status) {
                    ret = fs.closeSync({
                        fd: fd
                    });
                    if (ret.status) {
                        callback && callback(ret);
                    } else {
                        alert(JSON.stringify(ret));
                    }
                } else {
                    alert(JSON.stringify(ret));
                }
            } else {
                alert(JSON.stringify(ret));
            }
        },
        getFile: function(opts) {
            var ret, fs = api.require('fs');
            var fd = null;
            opts.path = 'fs://data/' + opts.path;
            ret = fs.existSync({
                path: opts.path
            });
            if (!ret.exist) {
                return undefined;
            }
            ret = fs.openSync({
                path: opts.path,
                flags: 'read_write'
            });
            if (ret.status) {
                fd = ret.fd
                ret = fs.readSync({
                    fd: fd
                });
                if (ret.status) {
                    var result = JSON.parse(ret.data);
                    ret = fs.closeSync({
                        fd: fd
                    });
                    if (ret.status) {
                        return result;
                    } else {
                        alert(JSON.stringify(ret));
                    }
                } else {
                    alert(JSON.stringify(ret));
                }
            } else {
                alert(JSON.stringify(ret));
            }
        },
        rmFile: function(opts, callback) {
            var ret, fs = api.require('fs');
            var fd = null;
            if (!opts.normal) opts.path = 'fs://data/' + opts.path;
            ret = fs.existSync({
                path: opts.path
            });
            if (ret.exist) {
                ret = fs.removeSync({
                    path: opts.path
                });
                if (ret.status) {
                    callback && callback(ret);
                } else {
                    alert(JSON.stringify(ret));
                }
            }
        },
        openPicActionSheet: function(opt) {
            opt = opt || {};
            var UIMediaScanner = api.require('UIMediaScanner');
            if (opt.type == 'UIMediaScanner' && !UIMediaScanner) {
                api.alert({
                    title: '提示',
                    msg: '没有引入模块 - UIMediaScanner'
                });
                return;
            }
            api.actionSheet({
                cancelTitle: '取消',
                buttons: ['拍照', '从相册选择']
            }, function(ret, err) {
                if (Number(ret.buttonIndex) == 1) {
                    //camera
                    _g.getPhoto(2, opt);
                } else if (Number(ret.buttonIndex) == 2) {
                    if (opt.type == 'UIMediaScanner') {
                        _g.openUIMediaScanner(opt);
                    } else {
                        //相册
                        _g.getPhoto(1, opt);
                    }
                }
            });
        },
        openUIMediaScanner: function(opt) {
            var UIMediaScanner = api.require('UIMediaScanner');
            UIMediaScanner.open({
                type: 'picture',
                column: opt.column || 4,
                classify: opt.classify || false,
                max: opt.max || 4,
                sort: {
                    key: 'time',
                    order: 'desc'
                },
                texts: {
                    stateText: '已选择*项',
                    cancelText: '取消',
                    finishText: '完成'
                },
                styles: {
                    bg: '#fff',
                    mark: {
                        icon: '',
                        position: 'bottom_left',
                        size: 30
                    },
                    nav: {
                        bg: '#eee',
                        stateColor: '#000',
                        stateSize: 18,
                        cancelBg: 'rgba(0,0,0,0)',
                        cancelColor: '#000',
                        cancelSize: 18,
                        finishBg: 'rgba(0,0,0,0)',
                        finishColor: '#000',
                        finishSize: 18
                    }
                },
                // scrollToBottom: {
                //     intervalTime: 3,
                //     anim: true
                // },
                exchange: true,
                rotation: false,
                showBrowser: opt.showBrowser !== false
            }, function(ret, err) {
                if (ret) {
                    if (opt.suc) opt.suc(ret, 'UIMediaScanner');
                } else {
                    if (opt.err) opt.err(err);
                };
            });
        },
        getPhoto: function(type, opt) {
            var sourceType, destinationType = 'base64';
            switch (Number(type)) {
                case 1:
                    sourceType = 'library';
                    break;
                case 2:
                    sourceType = 'camera';
                    break;
                case 3:
                    sourceType = 'album';
                    break;
            }

            api.getPicture({
                sourceType: sourceType,
                encodingType: 'jpg',
                mediaValue: 'pic',
                destinationType: opt.destinationType || destinationType,
                allowEdit: !!opt.allowEdit,
                quality: 50,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: false
            }, function(ret, err) {
                if (ret) {
                    if (opt.suc) opt.suc(ret, 'camera');
                } else {
                    if (opt.err) opt.err(err);
                };
            });
        },
        setPullDownRefresh: function(callback) {
            api.setRefreshHeaderInfo({
                visible: true,
                loadingImg: 'widget://image/refresh.png',
                bgColor: '#ccc',
                textColor: '#fff',
                textDown: '下拉刷新...',
                textUp: '松开刷新...',
                showTime: true
            }, function(ret, err) {
                window.isNoMore = false;
                callback && callback();
            });
        },
        setLoadmore: function(extra, callback) {
            extra = $.extend(true, { threshold: 200 }, extra);
            api.addEventListener({
                name: 'scrolltobottom',
                extra: extra
            }, function(ret, err) {
                if (window.isNoMore || window.isLoading) return;
                window.isLoading = true;
                callback && callback();
            });
        },
        refreshDone: function() {
            var loadmore = document.getElementById('loadmore');
            if (loadmore) document.body.removeChild(loadmore);
            api && api.refreshHeaderLoadDone();
            window.isLoading = false;
        },
        transData: function(data) {
            for (var d in data) {
                if (typeof data[d] == 'object') data[d] = JSON.stringify(data[d]);
            }
            return data;
        },
        avatar: function(avatar) {
            return avatar ? (CONFIG.HOST + avatar) : CONFIG.DEFAULT_AVATAR;
        },
        sex: function(sex) {
            return sex ? '男' : '女';
        },
        j2s: function(obj) {
            return JSON.stringify(obj);
        },
        s2j: function(s) {
            return JSON.parse(s);
        },
        log: function(msg) {
            $('body').attr('title', msg);
        },
        getTemplate: function(url) {
            var template = '';
            $.ajax({
                url: '../' + url + '.html',
                async: false,
                success: function(result) {
                    template = result;
                },
                error: function(msg) {
                    console.log('找不到:' + url + '模板,请检查');
                }
            });
            return template
        },
        frameReady: function() {
            api.execScript({
                name: api.winName,
                script: 'window.frameReady()'
            });
        },
        execScript: function(opts) {
            // var opts = {
            //     winName: 'winName', // 必填
            //     frameName: 'frameName', // 可选
            //     fnName: 'fnName', // 必填, 要执行的window.xxx, 只需要传入xxx
            //     data: {} // 可选, 规范必须传对象格式
            // };
            if (!opts) throw '_g.execScript : opts 不能为空';
            if (!opts.winName) throw '_g.execScript : winName 不能为空';
            if (!opts.fnName) throw '_g.execScript : fnName 不能为空';

            var _opts = {
                name: opts.winName
            };
            if (opts.frameName) _opts.frameName = opts.frameName;
            if (opts.data) {
                if (!_.isObject(opts.data)) throw '_g.execScript : data 规范为对象格式';
                _opts.script = 'window.' + opts.fnName + '(' + _g.j2s(opts.data) + ');';
            } else {
                _opts.script = 'window.' + opts.fnName + '();';
            }
            api.execScript(_opts);
        },
        alert: function() {
            var msg = _.map(arguments, function (item) {
                if (_.isObject(item)) {
                    return _g.j2s(item);
                } else {
                    return item;
                }
            });
            alert(msg.join('\r------\r'));
        }
    };

    Common.prototype.constructor = Common;

    window._g = new Common();

})();

// (function () {
//     Date.prototype.Format = function (fmt) {
//         var o = {
//             "M+": this.getMonth() + 1, //月份
//             "d+": this.getDate(), //日
//             "h+": this.getHours(), //小时
//             "m+": this.getMinutes(), //分
//             "s+": this.getSeconds(), //秒
//             "q+": Math.floor((this.getMonth() + 3) / 3), //季度
//             "S": this.getMilliseconds() //毫秒
//         };
//         if (/(y+)/.test(fmt))
//             fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//         for (var k in o)
//             if (new RegExp("(" + k + ")").test(fmt))
//                 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//         return fmt;
//     };
//     if (typeof template != 'undefined') {
//         template.defaults.imports.$transTime = function (millisec) {
//             if (!millisec) return '';
//             if ((millisec + '').length < 13) millisec *= 1000;
//             var showText = '';
//             var d = new Date();
//             d.setTime(millisec);
//             showText = d.Format('yyyy-MM-dd hh:mm:ss');
//             return showText;
//         };
//         template.defaults.imports.$transDate = function (millisec) {
//             if (!millisec) return '';
//             if ((millisec + '').length < 13) millisec *= 1000;
//             var showText = '';
//             var d = new Date();
//             d.setTime(millisec);
//             showText = d.Format('yyyy-MM-dd');
//             return showText;
//         };
//         template.defaults.imports.$circleImage = function (path) {
//             if (!path) return 'image/logo.png';
//             path = 'http://119.23.145.162:8198' + path + '?s=50';
//             return path.replace('jpg', 'png');
//         };
//         template.defaults.imports.$transAddress = function (address) {
//             if (address.length < 30) return address;
//             else {
//                 // var _address = Substring('0','30',address);
//                 return address.substring(0, 24) + '...';
//             }
//         };
//     }


// var base = {
//         uzStorage: function () {
//             var ls = window.localStorage;
//             if (this.isAndroid && !window.location.host) ls = os.localStorage();
//             return ls;
//         },
//         setLS: function (key, value) {
//             if (arguments.length === 2) {
//                 var v = value;
//                 if (typeof v == 'object') {
//                     v = JSON.stringify(v);
//                     v = 'obj-' + v;
//                 } else {
//                     v = 'str-' + v;
//                 }
//                 var ls = this.uzStorage();
//                 if (ls) {
//                     ls.setItem(key, v);
//                 }
//             }
//         },
//         getLS: function (key) {
//             var ls = this.uzStorage();
//             if (ls) {
//                 var v = ls.getItem(key);
//                 if (!v) {
//                     return;
//                 }
//                 if (v.indexOf('obj-') === 0) {
//                     v = v.slice(4);
//                     return JSON.parse(v);
//                 } else if (v.indexOf('str-') === 0) {
//                     return v.slice(4);
//                 }
//             }
//         },
//         rmLS: function (key) {
//             var ls = this.uzStorage();
//             if (ls && key) ls.removeItem(key);
//         },
//         clearLS: function () {
//             var ls = this.uzStorage();
//             if (ls) ls.clear();
//         },
//         logger: function () {
//             if (_c.env === 'pro' || !_c.debug) return;
//             this.logger = console.log;
//         },
//         j2s: function (obj) {
//             return JSON.stringify(obj);
//         },
//         s2j: function (s) {
//             return JSON.parse(s);
//         },
//         checkNumber: function (number) {
//             return (window.isFinite(number) && number >= 0);
//         },
//         summernote: function (selector, opts) {
//             opts = opts || {};
//             setTimeout(function () {
//                 $(selector).summernote({
//                     height: opts.height || 600,
//                     toolbar: opts.toolbar || [
//                         ['style', ['bold', 'italic', 'underline', 'clear']],
//                         ['font', ['strikethrough']],
//                         ['fontsize', ['fontsize']],
//                         ['color', ['color']],
//                         ['para', ['ul', 'ol', 'paragraph']],
//                         ['height', ['height']],
//                         ['misc', ['link', 'picture', 'codeview', 'undo', 'redo']],
//                     ],
//                     callbacks: {
//                         onInit: opts.onInit
//                     }
//                 });
//             }, 150);
//         },
//         GetQueryString: function (name) {
//             var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//             var r = window.location.search.substr(1).match(reg);
//             if (r != null) return decodeURI(r[2]);
//             return null;
//         },
//         GetQueryObject: function (query) {
//             var search = window.location.search.substr(1);
//             if (!query && search == '') return {};
//             if (query) search = query.replace(/\+/g, ' ');
//             var params = search.split('&');
//             var result = {};
//             for (var i = 0; i < params.length; i++) {
//                 var param = params[i].split('=');
//                 param[1] = decodeURIComponent(param[1]);
//                 // console.log(param[0], param[1])
//                 if (param[1] != '' && '' + Number(param[1]) != 'NaN') {
//                     param[1] = Number(param[1]);
//                 }
//                 result[param[0]] = param[1];
//             }
//             return result;
//         },
//         ToQueryString: function (QueryObject) {
//             var result = [];
//             for (var key in QueryObject) {
//                 result.push(key + '=' + QueryObject[key]);
//             }
//             return result.join('&');
//         },
//         getCookie: function (name) {
//             var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//             if (arr = document.cookie.match(reg))
//                 return decodeURI(arr[2]);
//             else
//                 return null;
//         },
//         setErrorAlert: function (opts) {
//             var domStr = '\
//             <div class="alert alert-' + (opts.type || 'danger') + ' m-t-md">\
//                 <button type="button" class="close" data-dismiss="alert">&times;</button>\
//                 <i class="fa fa-ban-circle"></i><span>' + opts.errorText + '</span>\
//             </div>';
//             var target = opts.target || '#messageArea';
//             $(target).html($(domStr));
//             var _g = this;
//             setTimeout(function () {
//                 _g.removeAlert();
//             },1000);
//         },
//         removeAlert: function (selector) {
//             $(selector || '.alert').remove();
//         },
//         ajax: function (opts) {
//             var _g = this;
//             if (!opts) return;
//             if (opts.lock) this.showLoading();
//             var postData = {
//                 data: JSON.stringify($.extend(true, {}, opts.data))
//             };

//             postData.sessionKey = opts.sessionKey || _g.getCookie('sessionKey');
//             postData.data = JSON.stringify(opts.data);
//             postData.appVersion = '0.0.1';
//             postData.apiVersions = 'v1';
//             postData.deviceCode = 'developer';
//             postData.platform = 0;
//             postData.timestamp = Math.round(new Date().getTime() / 1000);
//             postData.token = _g.dm.tokenKey;
//             postData.token = md5.go(_g.jsonToPostDataStr(_g.ksort(postData)));
//             // console.log(_g.jsonToPostDataStr(_g.ksort(postData)) + _g.dm.tokenKey);
//             // console.log(postData.token);
//             // console.log(postData);
//             // _g.logger(_g.getLS(opts.url));
//             $.ajax({
//                 type: opts.type || 'post',
//                 url: opts.url,
//                 data: postData,
//                 dataType: 'json',
//                 contentType: opts.contentType || 'application/x-www-form-urlencoded',
//                 processData: opts.processData !== false,
//                 success: function (result) {
//                     _g.hideLoading();
//                     // if (result.code != 200) {
//                     //     if (_c.env == 'dev' || _c.env == 'test') {
//                     //         alert(result.message);
//                     //         window.location.href = '/admin/signin.html';
//                     //         return;
//                     //     }
//                     // }
//                     if (result.code === 4005 || result.code === 1000) {
//                         // alert(result.message);
//                         window.location.href = '/admin/signin.html';
//                         return;
//                     }
//                     opts.success && opts.success(result);
//                 },
//                 error: function (err) {
//                     opts.error && opts.error(err);
//                 }
//             });
//         },
//         render: function (temp, data, target) {
//             var htmlStr = template.render(this.getTemplate(temp), data);
//             if (target) $(target).html(htmlStr);
//             this.initChosenSelect();
//             this.initFileInput();
//             var initDateInputOptions = {
//                 format: 'YYYY-MM-DD HH:mm:ss'
//             };
//             initDateInputOptions = $.extend(true, initDateInputOptions, this.pm.options.initDateInput);
//             this.pm.data.DateInputList = this.initDateInput(initDateInputOptions);
//             this.initFormMatch();
//             return htmlStr;
//         },
//         getTemplate: function (url) {
//             var template = '';
//             $.ajax({
//                 url: './html/' + url + '.html?_=' + new Date().getTime(),
//                 async: false,
//                 success: function (result) {
//                     template = result;
//                     _g.loader.check(function () {
//                     });
//                 },
//                 error: function (msg) {
//                     console.log('找不到:' + url + '模板,请检查');
//                 }
//             });
//             return template
//         },
//         openWin: function (url, param) {
//             if (!_g.dm.canOpen) return;
//             _g.dm.canOpen = false;
//             var openUrl = '';
//             if (param) {
//                 if (typeof param == 'object') {
//                     // openUrl = url + ',' + this.j2s(param);
//                     openUrl = url;
//                 } else {
//                     openUrl = url + ',' + param;
//                 }
//             } else {
//                 openUrl = url;
//             }
//             setTimeout(function () {
//                 _g.dm.openPrev = '';
//                 _g.dm.canOpen = true;
//             }, 700);
//             if (this.dm.openPrev == openUrl) return;
//             this.dm.openPrev = url;

//             /*if (url != 'workerUser/wallet' && _g.dm.powerApis.indexOf(url.split('/')[0]) == -1) {
//                 alert('没有权限操作,请联系管理员!');
//                 return;
//             }*/
//             if (!this.loader.finish) return;
//             this.initCommonBjaxBtn();
//             this.pm.methods = {};
//             this.pm.data = {};
//             this.pm.param = {};
//             if (param) {
//                 if (typeof param != 'object') {
//                     $.each(param.split('&'), function (i, val) {
//                         var kv = val.split('=');
//                         _g.pm.param[kv[0]] = kv[1];
//                     });
//                 } else {
//                     _g.pm.param = param;
//                 }
//             }

//             this.$commonBjaxBtn.attr('href', '').attr('href', 'html/' + url + '.html?_=' + new Date().getTime()).trigger('click');
//         },
//         renderBaseModalData: function (temp, data, title) {
//             var htmlStr = template.render(this.getTemplate(temp), data);
//             $('#baseModalLabel').text(title);
//             $('#baseModalContent').html(htmlStr);
//         },
//         openBaseModal: function (temp, data, title) {
//             var htmlStr = template.render(this.getTemplate(temp), data);
//             $('#baseModalLabel').text(title);
//             $('#baseModalContent').html(htmlStr);
//             this.$commonModalBtn.trigger('click');
//             setTimeout(function () {
//                 _g.initChosenSelect();
//                 _g.initDateInput();
//                 var initDateInputOptions = {
//                     format: 'YYYY-MM-DD HH:mm:ss'
//                 };
//                 initDateInputOptions = $.extend(true, initDateInputOptions, _g.pm.options.initDateInput);
//                 _g.pm.data.DateInputList = _g.initDateInput(initDateInputOptions);
//             }, 300);
//         },
//         hideBaseModal: function () {
//             $('#baseModal').trigger('click');
//         },
//         setNowPage: function (path) {
//             this.pm.prev = this.pm.now;
//             this.pm.now = path;
//             var hash = path;
//             if (_.isObject(this.pm.param)) {
//                 var param = this.ToQueryString(this.pm.param);
//                 if (param) hash = path + ',' + encodeURIComponent(param);
//             } else {
//                 hash = path;
//             }
//             window.location.hash = hash;
//         },
//         initPaginator: function (opts) {
//             if (opts.target) {
//                 if (opts.totalCount == 0) {
//                     $(opts.target + ' .pagination').closest('.panel-footer').hide();
//                 } else {
//                     $($(opts.target + ' .pagination')[0]).closest('.panel-footer').show();
//                     $($(opts.target + ' .pagination')[0]).bootstrapPaginator({
//                         currentPage: opts.currentPage,
//                         totalPages: opts.totalPages,
//                         numberOfPages: opts.numberOfPages || 7,
//                         onPageClicked: function (e, originalEvent, type, page) {
//                             e.stopImmediatePropagation();
//                             var currentTarget = $(e.currentTarget);
//                             var pages = currentTarget.bootstrapPaginator("getPages");
//                             var current = pages.current;
//                             if (page != current) {
//                                 opts.onPageClicked && opts.onPageClicked(page);
//                             }
//                         }
//                     });
//                     $(opts.target + ' .pagination').find('ul').addClass('pagination pagination-sm m-t-none m-b-none');
//                     $(opts.target + ' .totalCount').html(opts.totalCount);
//                     $(opts.target + ' .totalPages').html(opts.totalPages);
//                 }
//             } else {
//                 if (opts.totalCount == 0) {
//                     $('#pagination').closest('.panel-footer').hide();
//                 } else {
//                     $('#pagination').closest('.panel-footer').show();
//                     $('#pagination').bootstrapPaginator({
//                         currentPage: opts.currentPage,
//                         totalPages: opts.totalPages,
//                         numberOfPages: opts.numberOfPages || 7,
//                         onPageClicked: function (e, originalEvent, type, page) {
//                             e.stopImmediatePropagation();
//                             var currentTarget = $(e.currentTarget);
//                             var pages = currentTarget.bootstrapPaginator("getPages");
//                             var current = pages.current;
//                             if (page != current) {
//                                 opts.onPageClicked && opts.onPageClicked(page);
//                             }
//                         }
//                     });
//                     $('#pagination').find('ul').addClass('pagination pagination-sm m-t-none m-b-none');
//                     $('#totalCount').html(opts.totalCount);
//                     $('#totalPages').html(opts.totalPages);
//                 }
//             }
//         },
//         initPopup: function (content) {
//             $('.ui-popup__bd').html(content);
//         },
//         initClip: function () {
//             var clipboard2 = new Clipboard('.copyZclip');
//             clipboard2.on('success', function (e) {
//                 console.log(e);
//                 alert("复制成功！")
//             });
//             clipboard2.on('error', function (e) {
//                 console.log(e);
//                 alert("复制失败！请手动复制")
//             });
//         },
//         showPopup: function () {
//             $('.ui-popup').show();
//         },
//         showLoading: function () {
//             document.activeElement.blur();
//             $('.ui-loading').show();
//         },
//         hideLoading: function () {
//             $('.ui-loading').hide();
//         },
//         initFormMatch: function () {
//             $('form').parsley();
//         },
//         initChosenSelect: function () {
//             $('.chosen-select').length && $('.chosen-select').chosen();
//         },
//         initDateInput: function (opts) {
//             opts = opts || {};
//             var DateInputList = [];
//             $('.datepicker-input').each(function () {
//                 var DateInput = $(this).datetimepicker({
//                     locale: 'zh-cn',
//                     sideBySide: true,
//                     showClear: true,
//                     // showTodayButton: true,
//                     format: opts.format || 'YYYY-MM-DD'
//                 });
//                 DateInputList.push(DateInput.data('DateTimePicker'));
//             });
//             this.pm.data.DateInputList = DateInputList;
//             return DateInputList;
//         },
//         initFileInput: function (opts) {
//             // $(':file').filestyle('destroy');
//             $('.filestyle:file').filestyle({
//                 input: true,
//                 icon: false,
//                 buttonText: '选择文件',
//                 buttonName: 'btn btn-default',
//                 classInput: 'form-control inline v-middle input-s',
//                 classButton: 'btn btn-default',
//                 size: 'nr',
//                 iconName: 'glyphicon-folder-open',
//                 disabled: false,
//                 buttonBefore: false,
//                 badge: true,
//                 placeholder: '请选择上传文件'
//             });
//         },
//         initCommonModalBtn: function () {
//             $('#commonModalBtn').remove();
//             var commonModalStr = '\
//                 <span id="commonModalBtn" data-toggle="modal" data-target="#baseModal" class="btn btn-s-md btn-primary"></span>\
//             ';
//             this.$commonModalBtn = $(commonModalStr);
//             this.$commonModalBtn.css({
//                 'position': 'absolute',
//                 'left': '-1px',
//                 'top': '-1px',
//                 'width': '1px',
//                 'height': '1px',
//                 'overflow': 'hidden',
//                 'opacity': 0
//             });
//             $('body').append(this.$commonModalBtn);
//         },
//         initCommonBjaxBtn: function () {
//             $('#commonBjaxBtn').remove();
//             var commonBjaxStr = '\
//                 <a id="commonBjaxBtn" href="" data-bjax="" data-target="#bjax-target" data-el="#content" class="bg-black auto">\
//                     <i class="fa fa-chevron-right text-xs"></i>\
//                     <span>通用按钮</span>\
//                 </a>\
//             ';
//             this.$commonBjaxBtn = $(commonBjaxStr);
//             this.$commonBjaxBtn.css({
//                 'position': 'absolute',
//                 'left': '-1px',
//                 'top': '-1px',
//                 'width': '1px',
//                 'height': '1px',
//                 'overflow': 'hidden',
//                 'opacity': 0
//             });
//             $('body').append(this.$commonBjaxBtn);
//         },
//         checkHash: function () {
//             var hash = window.location.hash.slice(1);
//             if (hash) {
//                 var url = hash.split(',')[0];
//                 var param = hash.split(',')[1];
//                 if (param) param = decodeURIComponent(param);
//                 this.openWin(url, param);
//             }
//         },
//         initPage: function () {
//             // 初始化加载器
//             this.loader = {
//                 need: 1,
//                 loaded: 0,
//                 finish: false,
//                 check: function (callback) {
//                     this.loaded++;
//                     if (this.loaded >= this.need) {
//                         this.finish = true;
//                         callback && callback();
//                     }
//                 }
//             };
//             // 初始化数据管理器 dm = data manager
//             this.dm = {
//                 powerApis: '',
//                 canOpen: true,
//                 openPrev: '',
//                 tokenKey: '7aeeb7da08390a43f73f97e3bc319c79'
//             };
//             // 初始化通用Bjax按钮
//             this.initCommonBjaxBtn();
//             // 初始化通用Modal按钮
//             this.initCommonModalBtn();
//             // 加载公共头部
//             $('#commonHeader').html(_g.getTemplate('common/header-V'));
//             // 加载侧边导航
//             // $('#commonNav').html(_g.getTemplate('common/nav-V'));

//             // 初始化页面管理器 pm = page manager
//             this.pm = {
//                 prev: '', // 上个页面
//                 now: 'index', // 当前页面
//                 param: {}, // 页面要传递的参数, JSON对象
//                 data: {}, // 当前页面存储的数据
//                 methods: {}, // 当前页面存储的方法
//                 options: {}, // 当前页面的配置项
//             };
//             // 检查Hash
//             // this.checkHash();
//             // 绑定弹出层关闭事件
//             $('.ui-popup__close, .ui-popup__bg').click(function () {
//                 $('.ui-popup').hide();
//             });

//             // initClip
//             this.initClip();
//         },
//         exportExcel: function (tableid) {
//             if (getExplorer() == 'ie') {
//                 var curTbl = document.getElementById(tableid);
//                 var oXL = new ActiveXObject("Excel.Application");

//                 //创建AX对象excel
//                 var oWB = oXL.Workbooks.Add();
//                 //获取workbook对象
//                 var xlsheet = oWB.Worksheets(1);
//                 //激活当前sheet
//                 var sel = document.body.createTextRange();
//                 sel.moveToElementText(curTbl);
//                 //把表格中的内容移到TextRange中
//                 sel.select();
//                 //全选TextRange中内容
//                 sel.execCommand("Copy");
//                 //复制TextRange中内容
//                 xlsheet.Paste();
//                 //粘贴到活动的EXCEL中
//                 oXL.Visible = true;
//                 //设置excel可见属性

//                 try {
//                     var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
//                 } catch (e) {
//                     print("Nested catch caught " + e);
//                 } finally {
//                     oWB.SaveAs(fname);

//                     oWB.Close(savechanges = false);
//                     //xls.visible = false;
//                     oXL.Quit();
//                     oXL = null;
//                     //结束excel进程，退出完成
//                     //window.setInterval("Cleanup();",1);
//                     idTmr = window.setInterval("Cleanup();", 1);
//                 }
//             }
//             else {
//                 tableToExcel(tableid)
//             }
//         },
//         openAdminDruid: function () {
//             window.open('/admin/druid/login.html');
//         },
//         openAppDruid: function () {
//             window.open('/app/druid/login.html');
//         },
//         ksort: function (a, b) {
//             var e, f, g, c = {},
//                 d = [],
//                 h = this,
//                 i = !1,
//                 j = {};
//             switch (b) {
//                 case "SORT_STRING":
//                     e = function (a, b) {
//                         return h.strnatcmp(a, b)
//                     };
//                     break;
//                 case "SORT_LOCALE_STRING":
//                     var k = this.i18n_loc_get_default();
//                     e = this.php_js.i18nLocales[k].sorting;
//                     break;
//                 case "SORT_NUMERIC":
//                     e = function (a, b) {
//                         return a + 0 - (b + 0)
//                     };
//                     break;
//                 default:
//                     e = function (a, b) {
//                         var c = parseFloat(a),
//                             d = parseFloat(b),
//                             e = c + "" === a,
//                             f = d + "" === b;
//                         return e && f ? c > d ? 1 : d > c ? -1 : 0 : e && !f ? 1 : !e && f ? -1 : a > b ? 1 : b > a ? -1 : 0
//                     }
//             }
//             for (g in a) a.hasOwnProperty(g) && d.push(g);
//             for (d.sort(e), this.php_js = this.php_js || {}, this.php_js.ini = this.php_js.ini || {}, i = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && "off" !== this.php_js.ini["phpjs.strictForIn"].local_value, j = i ? a : j, f = 0; f < d.length; f++) g = d[f], c[g] = a[g], i && delete a[g];
//             for (f in c) c.hasOwnProperty(f) && (j[f] = c[f]);
//             return i || j
//         },
//         jsonToPostDataStr: function (json) {
//             var PostDataStr = '';
//             for (var i in json) {
//                 PostDataStr += i + '=' + json[i] + '&';
//             }
//             return PostDataStr == '' ? PostDataStr : PostDataStr.slice(0, -1);
//         }
//     };
//     window._g = base;

//     _g.initPage();

//     })();