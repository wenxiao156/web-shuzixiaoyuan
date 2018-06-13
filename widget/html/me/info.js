define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/info_view'),
        data: {
            avatar: '../../image/me/img-avatar.jpeg',
            name: '哈萨克',
            studentId: '3215004210',
            major: '信息管理与信息系统',
            college: '管理学院',
            phone: '13899732898',
            email: '7339829@qq.com',
            messageNum: 3,
        },
        ready: function() {
        },
    });
    
    module.exports = {};
})