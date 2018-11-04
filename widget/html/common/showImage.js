define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('common/showImage_view'),
        data: {
            isBig: 1,
            img: '../../image/me/img-avatar.jpeg'
        },
        ready: function() {
        },
        methods: {
            openFrameTap: function() {
                changeImage = _g.frameBuilder({
                    name: 'common-changeImage-frame',
                    url: './changeImage_frame.html',
                    rect: {
                        x: 0,
                        y: 0,
                        w: api.winWidth,
                        h: api.winHeight
                    },
                    // animation: {
                    //     type: 'movein',
                    //     subType: 'from_right',
                    //     duration: 200
                    // },
                    pageParam: {
                        isBig: main.isBig
                    }
                });
                changeImage.open();
            }  
        }
    });
    
    module.exports = {};
})