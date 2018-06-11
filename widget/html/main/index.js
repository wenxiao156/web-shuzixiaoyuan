define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('main/index_view'),
        data: {
           indexList: [{
            icon: '../../image/main/lecture.png',
            title: '讲座',
            url: '../../html/lecture/list_frame.html'
           },{
            icon: '../../image/main/conversation.png',
            title: '茶座',
            url: '../../html/conversation/list_frame.html'
           },{
            icon: '../../image/main/me.png',
            title: '个人',
            url: '../../html/lecture/list_frame.html'
           },{
            icon: '../../image/main/message.png',
            title: '通知',
            url: '../../html/lecture/list_frame.html'
           }] 
        },
        ready: function() {
        },
        methods: {
                    
        }
    });
    
    module.exports = {};
})