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
        //                 $.ajax({
        //     url: "http://120.77.204.252:80/admin/login.do",
        //     type: 'post',
        //     data: JSON.stringify({data: {
        //         account: '100000',
        //         password: '13456',
        //         seccode: 'seccode'
        //     }}),
        //     dataType:"json",
        //     contentType: 'application/json', //'application/x-www-form-urlencoded'
        //     processData: false, //!== false,
        //     success: function (result) {
        //         console.log(result)
                
        //     }
        // })

                // _g.openWin({
                //     name: 'basicInfo',
                //     url: '../me/basicInfo_frame.html'
                // })
                Http.ajax({
                    url: 'admin/login.do',
                    data: {
                        account: '100000',
                        password: '13456',
                        seccode: 'seccode'
                    },
                    success: function(result) {
                        console.log(1111)
                    },
                    error: function(error) {
                        console.log(2222)
                    }
                })
            }
        }
    });
    
    module.exports = {};
})