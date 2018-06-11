define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('conversation/detail_view'),
        data: {
            name: '第九十讲毓秀讲堂----漫步人生路',
            poster: '../../image/lecture/desert.jpg',
            description: '汤耀平副书记将为我们剖析人生路上的点点滴滴，为大学生如何充实度过每一天提供指导，指明方向，带来人生启迪！',
            time: '2018-06-05   19:00-21：00',
            position: '龙洞校区行政楼二楼学术报告厅',
            presenter: '汤耀平',
            presenterInfo: '任广东工业大学党委副书记、纪委书记，教授，硕士生导师',
            type: '人生类',
            object: '5级-17级各班班委、入党积极分子以及预备党员、青马工程学员，等等',
            hasApply: 0,
            hasLike: 0,
            likeNum: 23
        },
        ready: function() {
        },
        methods: {
            likeTap: function() {
                main.hasLike = !main.hasLike;
                if(main.hasLike) {
                    main.likeNum --;
                } else {
                    main.likeNum ++;
                }
            },
            applyTap: function() {
                main.hasApply = !main.hasApply; 
            }
        }
    });
    
    module.exports = {};
})