define(function(require, exports, module) {

    // api.call({
    //     type: 'tel_prompt',
    //     number: '10086'
    // });

    // window.leftBtnTap = function() {
    //     alert(111)
    // };

    window.rightBtnTap = function() {
        alert(222)
    };

    $('#button').click(function() {
        _g.openWin({
            name: 'test2',
            url: '../main/test.html',
            header: {
                title: '111111111',
                leftIcon: 'icon-xiangyoujiantou',
                leftText: '返回',
                rightText: 'ceshi'
            },
            bounces: true
            // animation: { type: 'none' }
        });
    });

    setTimeout(function() {
        _g.openWin({
            name: 'test2',
            url: '../main/test.html',
            header: {
                title: '111111111',
                leftIcon: 'icon-xiangyoujiantou',
                leftText: '返回'
            },
            bounces: true
            // animation: { type: 'none' }
        });
    }, 1000)


    // _g.viewAppear(function() {
    //     alert(1)
    //     api.openWin({
    //         name: 'main-index-win',
    //         url: 'index.html',
    //         pageParam: {
    //             name: 'value'
    //         }
    //     });
    // })

    // alert(new Date('10 28,2016 11:11:11'))

    module.exports = {};

});