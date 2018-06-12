define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('main/index_view'),
        data: {
            userName: 'Y丶yin',
            messageNum: 3,
            registration: 1,
            lectureRecord: 32,
            conversationRecord: 21,
            indexList: [{
                icon: '../../image/main/lecture1.png',
                title: '讲座',
                url: '../../html/lecture/list_frame.html'
            },{
                icon: '../../image/main/conversation1.png',
                title: '茶座',
                url: '../../html/conversation/list_frame.html'
            }],
        },
        ready: function() {
        },
        methods: {
                    
        }
    });
    
    module.exports = {};
})