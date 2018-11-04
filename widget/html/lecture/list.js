define(function(require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('lecture/list_view'),
        data: {
            showIndex: 0,
            forecastList: [{
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
            allList: [{
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
            }, {
                avater: '../../image/lecture/avater1.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }],
        },
        ready: function() {
            var url = 'http://127.0.0.1/user/findLectureListPage.do';
            var currentPage = 1;
            var showCount = 5;
            var paging = {"currentPage": currentPage,"showCount": showCount};

            _g.ajax({
                lock: true,
                url: url,
                isAsync: false,
                data: {
                    paging: paging
                },
                success: function(res){
                    if(res.code == 200){
                       /*pc端的代码 if(result.data.paging) {
                    var data1 = { list: result.data.paging.list };
                    _g.initPaginator({
                        currentPage: result.data.paging.currentPage,
                        totalPages: result.data.paging.totalPage,
                        totalCount: result.data.paging.totalResult,
                        onPageClicked: function(page) {
                            console.log(page)
                            data.currentPage = page;
                            getList();
                        }
                    });
                    _g.render('lecture/list-V', data1, '#table');
                    } else {
                        var result = { list: [] };
                        _g.render('lecture/list-V', result, '#table');
                    }*/
                    }
                }
            })

        },
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
            },
            queryldetail: function(id){
                //获取id，
                
                
                //跳转页面,携带id


 
            }
        }
    });

    module.exports = {};
})