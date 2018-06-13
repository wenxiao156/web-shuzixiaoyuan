define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/question_view'),
        data: {
            typeList: [{
                name: '学校生活',
                select: 1
            },{
                name: '学习',
                select: 0
            },{
                name: '其他',
                select: 0
            }]        
        },
        ready: function() {
        },
        methods: {
            selectTap: function(index) {
                _.each(main.typeList,function(item,ind) {
                    if(ind == index){
                        item.select = 1;
                    } else {
                        item.select = 0;
                    }
                })
            }
        }
    });
    
    module.exports = {};
})