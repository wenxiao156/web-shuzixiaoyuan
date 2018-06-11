define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/participationRecord_view'),
        data: {
            lectureList: [{
                name: 'xxxx讲座',
                time: '2018-09-23',
                description: '讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述',
            },{
                name: 'xxxx讲座',
                time: '2018-09-23',
                description: '讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述',
            }, {
                name: 'xxxx讲座',
                time: '2018-09-23',
                description: '讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述',
            }],
            talkList: [{
                name: 'xxxx谈话',
                time: '2018-09-23',
                description: '讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述',
            },{
                name: 'xxxx谈话',
                time: '2018-09-23',
                description: '讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述',
            }, {
                name: 'xxxx谈话',
                time: '2018-09-23',
                description: '讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述讲座描述',
            }],
        },
        ready: function() {
        },
    });
    
    module.exports = {};
})