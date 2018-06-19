define(function(require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/beforeApply_view'),
        data: {
            showIndex: 0,
            lectureList: [{
                avater: '../../image/lecture/avater.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二手机看卡安洁科技爱空间楼学术报告厅',
                type: '人生类'
            }, {
                avater: '../../image/lecture/avater.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }, {
                avater: '../../image/lecture/avater.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }, {
                avater: '../../image/lecture/avater.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }],
            conversationList: [{
                avater: '../../image/lecture/avater1.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二手机看卡安洁科技爱空间楼学术报告厅',
                type: '人生类'
            }, {
                avater: '../../image/lecture/avater1.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }, {
                avater: '../../image/lecture/avater1.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }, {
                avater: '../../image/lecture/avater1.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }],
        },
        ready: function() {},
        methods: {
            searchTap: function() {
                _g.openWin({
                    name: 'lecture-search',
                    url: '../lecture/search_frame.html ',
                    bounces: false,
                    slidBackEnabled: false,
                    animation: { type: 'none' }
                });
            },
            changeTap: function(num) {
                console.log(num);
                if (num === 0) {
                    main.showIndex = 0;
                } else {
                    main.showIndex = 1;
                }
            }
        }
    });

    module.exports = {};
})