define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('lecture/search_view'),
        data: {
            showInfo: 0,
            searchList: [{
                avater: '../../image/lecture/avater.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二手机看卡安洁科技爱空间楼学术报告厅',
                type: '人生类'
            },{
                avater: '../../image/lecture/avater.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            },{
                avater: '../../image/lecture/avater.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            },{
                avater: '../../image/lecture/avater.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }],
        },
        ready: function() {
        },
        methods: {
            searchTap: function() {
                main.showInfo = 1;
            }
        }
    });
    
    module.exports = {};
})