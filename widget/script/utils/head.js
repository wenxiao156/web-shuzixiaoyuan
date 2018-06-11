define(function (require, exports, module) {
    var Http = require('U/http');

    var head = new Vue({
        el: '#head',
        template: _g.getTemplate('head/head_view'),
        data: {
            isClick: 0,
            topShow: 'hidden',
            menuShow: 'hidden',
            menuList: [{
                id:'',
                name: '首页',
                href: '../home/index_frame.html',
                isActive: 0
            },{
                id:'',
                name: '业务范围',
                href: '../business/index_frame.html',
                isActive: 0
            },{
                id:'',
                name: '成功案例',
                href: '../project/index_frame.html',
                isActive: 0
            },{
                id:'',
                name: '关于公司',
                href: '../company/index_frame.html',
                isActive: 0
            },{
                id:'',
                name: '联系我们',
                href: '../contact/index_frame.html',
                isActive: 0
            }],
            weChatCode: '../../image/head/img-weChatCode.jpg',
            mobile: '18922448313',
            weChat: 'promeyang',
            email: '442348464@qq.com'
        },
        ready: function() {
            var self = this;
            var path = window.location.pathname;
            function menuActive(){
                if(/home/.test(path.toString())) {
                    self.menuList[0].isActive = 1;
                } else if(/company/.test(path.toString())) {
                    self.menuList[3].isActive = 1;
                } else if(/project/.test(path.toString())) {
                    self.menuList[2].isActive = 1;
                } else if(/business/.test(path.toString())) {
                    self.menuList[1].isActive = 1;
                } else if(/contact/.test(path.toString())) {
                    self.menuList[4].isActive = 1;
                }
            }
            menuActive();
            var clipboard = new Clipboard('#weChat');
            clipboard.on('success', function(e) {
                alert('微信号复制成功!');
                e.clearSelection();
            });
            clipboard.on('error', function(e) {
                alert('微信号复制失败,请手动进行复制!');
            });
        },
        methods: {
            onMenuTap: function() {
                if (this.isClick == 0){
                    this.isClick = 1;
                    this.menuShow = 'visible';
                } else {
                    this.isClick = 0;
                    this.menuShow = 'hidden';
                }
            },
            onSkipTap: function(index) {
                $(".ui-menu__item").click(function () {
                    $(this).addClass("is-click").siblings().removeClass("is-click");
                }); 
                window.location.href = this.menuList[index].href;
            },
            onAdressTap: function() {
                window.location.href = "http://api.map.baidu.com/marker?location=" + 23.132555 + "," + 113.395944 + "&title=广州灵刃信息科技有限公司&content=广州灵刃信息科技有限公司&output=html";
            },
            onPhoneTap: function() {
                var self = this; 
                api.confirm({
                    title: '拨打电话',
                    msg: self.mobile,
                    buttons: ['确认','取消']
                },function(ret, err) {
                    if(ret.buttonIndex === 1) {
                        api.call({
                        type: 'tel',
                        number: self.mobile
                        });   
                    } 
                });
            },
            onEmailTap: function() {
                window.location.href = "mailto:" + this.email;
            },
            onWeChatTap: function() {
                $('#weChatCode').toggle();
                return false;
            },
            onPresseTap: function() {
                api.confirm({
                    title: '长按识别二维码打开微信',
                    buttons: ['确认', '取消']
                }, function(ret, err) {
                    if (ret.buttonIndex === 1) {
                        window.location.href = "weixin://";
                    }
                });
            }
        }
    });

    var _page = {
    	menuVisibility: function() {
    		window.onscroll = function() {
                var top = document.documentElement.scrollTop || document.body.scrollTop;
                if(top >= '300') {
                    head.topShow = 'visible';
                } else {
                	head.topShow = 'hidden';
                }
    	    }
    	},
        QRCodeHidden: function() {
            $(document).click(function(event){
                var target = event.target;
                    if(target.id === 'weChat' || target.id === 'weChatCode'){
                        return false;
                    }else{
                        $('.ui-QRCode').hide();
                    }
            });
        }
    };

    _page.menuVisibility();
    _page.QRCodeHidden();
    module.exports = head;
})