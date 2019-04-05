//滚动加载闭包写法
var ScrollLoad = function () {    
    var _range = 80;             //距下边界高度/单位px
    var _loaded = false;            //是否所有数据已加载完
    var _pageIndex = 1;       
    var _loading = false;           //是否正在加载
    var _totalheight = 0;

    $(window).scroll(function () {
        _Scroll(callback);
    }); 
    function _Scroll(callback) {
        //console.info("a1");
        if (_loaded) return;    //加载完毕，不在执行scroll函数
        //console.info("scroll1");
        var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
        _totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
        //console.info("a2");
        if (($(document).height() - _range) <= _totalheight ) {
            if (_loading) return;
            _loading = true;
            //加载数据过程中调整滚动条到窗口顶部的距离，防止滚动条一直在触发加载区从而导致不停的一页一页加载情况
            $(window).scrollTop($(window).scrollTop() - _range);
            //console.info("_range:" + _range);
            //console.info("a2:"+$(window).scrollTop());
            setTimeout(function () {
                //console.info(typeof callback);
                if (typeof callback !== 'function')
                {
                    throw new TypeError('"callback" argument must be a Function');
                }
                //console.info(_pageIndex);
                callback(_pageIndex);  //此为外部函数调用
                //_loading = false;
            }, 1000);

        }
        //console.info("a3");
    };
    
    return function () {
        //获取距下边界高度
        this.GetRange = function () {
            return _range;
        };      
        //设置距下边界长度/单位px
        this.SetRange = function (value) {
            _range = value;
            //console.info("myrange:" + _range);
        };       
        /*获取是否已加载值*/
        this.GetLoaded = function () {
            return _loaded;
        };
        //设置滚动加载是否已经加载全部数据
        this.SetLoaded = function (value) {
            _loaded = value;
        };
        /*获取页码*/
        this.GetPageIndex = function () {
            return _pageIndex;
        };       
        /*设置页码*/
        this.SetPageIndex = function (value) {
            _pageIndex = value;
        };
        /*重置页码为初始值，在输入搜索条件搜索时使用*/
        this.ResetPageIndex = function () {
            _pageIndex = 1;
        };
        //设置_loading为false
        this.SetLoading = function () {
            _loading = false;
        };
        this.Scroll = function (callback) {
            _Scroll(callback);
        };
    }
    
}();