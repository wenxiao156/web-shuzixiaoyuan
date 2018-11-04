define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/info_view'),
        data: {
            avatar: '../../image/me/img-avatar.jpeg',
            name: '哈萨克',
            studentId: '3215004210',
            lectureNum: 10,
            messageNum: 3,
        },
        ready: function() {
        },
        methods: {
            toDetail: function() {
                _g.openWin({
                    name: 'basicInfo',
                    url: '../me/basicInfo_frame.html'
                })
            }
        }
    });
    
    module.exports = {};
})