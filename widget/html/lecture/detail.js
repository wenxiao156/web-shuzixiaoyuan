define(function (require, exports, module) {
    var Http = require('U/http');

    

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('lecture/detail_view'),
        data: {
            name: '第九十讲毓秀讲堂----漫步人生路',
            poster: '../../image/lecture/desert.jpg',
            description: '汤耀平副书记将为我们剖析人生路上的点点滴滴，为大学生如何充实度过每一天提供指导，指明方向，带来人生启迪！',
            time: '2018-06-05   19:00-21：00',
            position: '龙洞校区行政楼二楼学术报告厅',
            presenter: '汤耀平',
            presenterInfo: '任广东工业大学党委副书记、纪委书记，教授，硕士生导师',
            object: '5级-17级各班班委、入党积极分子以及预备党员、青马工程学员，等等',
            isProved: true,
            limitNumOfPep: 0, //限制人数
            sponsor: '', //所属学院
            organization: '', //发布组织
            category: '', //讲座所属类别
            hasApply: 0,
            applyNum: 500, //预报名人数
            hasLike: 0,
            likeNum: 23, //点赞人数
            comment: 0,
            commentList: [{
                avatar: '../../image/lecture/avater.jpg',
                name: '花生壳的回款的恐惧阿卡卡',
                time: '2018-06-10 15:19:02',
                comment: '讲得超棒，很喜欢这个老师！的哈慷慨激昂卡卡打卡机安检'
            },{
                avatar: '../../image/lecture/avater.jpg',
                name: '花生壳',
                time: '2018-06-10 15:19:02',
                comment: '讲得超棒，很喜欢这个老师！'
            },{
                avatar: '../../image/lecture/avater.jpg',
                name: '花生壳',
                time: '2018-06-10 15:19:02',
                comment: '讲得超棒，很喜欢这个老师！'
            }]
        },
        ready: function() {
            //获取上个页面传过来的id

            
            this.queryldetail()//id;

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
                if(main.hasApply) {
                    main.applyNum ++;
                } else {
                    main.applyNum --;
                } 
            },
            queryldetail: function(id){
                var url = 'http://127.0.0.1/user/queryLectureDetail.do';

                _g.ajax({
                    lock: true,
                    url: url,
                    isAsync: false,
                    data: {
                        id: id
                    },
                    success: function(res){
                        if(res.code === 200){
                            this.name = res.data.lecture.name;
                            this.poster = res.data.lecture.imageUrl;
                            this.description = res.data.lecture.content;

                            var time = res.data.lecture.dateStr + res.data.lecture.startTimeStr + '-' + res.data.lecture.endTimeStr;
                            this.time = time;

                            this.position = res.data.lecture.address;

                            //主讲人需要判断是否多个暂时略

                            this.object = res.data.lecture.groupOfPep;
                            this.isProved = res.data.lecture.isProved == 0 ? true:false;
                            this.limitNumOfPep = res.data.lecture.limitNumOfPep;
                            this.sponsor = res.data.lecture.sponsor;
                            this.organization = res.data.lecture.organization;
                            this.category = res.data.lecture.category.name;
                            this.applyNum = res.data.lecture.signUpNum;
                            this.likeNum = res.data.lecture.thumbsUpNum;

                            this.hasApply = res.data.lecture.isSignUp;
                            this.hasLike = res.data.lecture.isThumbsUp;
                        }
                    }
                })
                var apply = confirm("您确定要预报名吗");
                if(apply == true) {
                    main.hasApply = 1;
                }
            },
            changeCommentTap: function() {
                main.comment = 1;
            },
            reportTap: function() {
                main.comment = 0;
            }
        }
    });
    
    module.exports = {};
})