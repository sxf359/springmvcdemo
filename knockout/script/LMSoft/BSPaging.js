/*
 * bootstrap 风格分页
 */
var filter = function (f, o, v) {
    var self = this;
    self.filterField = f;
    self.filterOperation = o;
    self.filterValue = v;
    return self;
}
var operaton = function (n, c, o) {
    var self = this;
    self.name = n;
    self.caption = c;
    self.operaton = o;
    return self;
}

var availbleValues = function (v, o) {
    var self = this;
    self.value = v;
    self.option = o; //是选取还是输入,多选还是单选,下拉框,日期选取,滑动数字,还是其他...
    return self;
}

var availableFilter = function (c, f, t, o, v) {
    var self = this;
    self.caption = c;
    self.field = f;
    self.datatype = t;
    self.operations = o;
    self.availbleValues = v;
    return self;
}

var operations = [];
operations.push(new operaton("LIKE", "含有", "like '%{0}%'"));
operations.push(new operaton("BEGINWITH", "开头是", "like '{0}%'"));
operations.push(new operaton("ENDWITH", "结尾是", "like '%{0}'"));
operations.push(new operaton("EQ", "等于", "= '{0}'"));
operations.push(new operaton("GQ", "大于等于", ">= '{0}'"));
operations.push(new operaton("LQ", "小于等于", "<= '{0}'"));
operations.push(new operaton("NQ", "不等于", "<> '{0}'"));
operations.push(new operaton("CONTAIN", "属于", "in '({0})'"));
operations.push(new operaton("BETWEEN", "介于", "between '{0}' and '{1}'"));

function BSPaging(_obj, _option) {

    var pageingHTML = ' ';
    var defaultOption = {
        pageSize: 10,
        pageSizes: [10, 20, 50, 100, '全部'],//[[10, 10], [20, 20], [50, 50], [100, 100], ["全部", '100  percent']],
        availableFilters: [],
        filter: false,// ko.observableArray([]),
        defaultFilter: new filter(),
        sorter: ko.observable({}),//Array([[1, "asc"]]),
        ajaxOption: {
            type: "post",
            url: "/WebServices/WebService.asmx/getPageingdata",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: {}
        },
        pageingHTML: pageingHTML,
        mappingOption: {},
        dataContainer: "body",
        data: false,
        succeedCallback: false,
        autoQuery: true
    };
    defaultOption = $.extend(true, defaultOption, _option);
    var ajaxOption = defaultOption.ajaxOption;
    _obj.pageing = {};

    _obj.pageing.rowCount = ko.observable(0);
    _obj.pageing.pageSize = ko.observable(defaultOption.pageSize);
    _obj.pageing.sorter = ko.observable(defaultOption.sorter);
    _obj.pageing.pageSize.subscribe(function (newValue) {
        //console.log("页面大小改为: " + newValue);
        //_obj.pageing.pageSize(newValue);
        _obj.pageing.changePageSize(newValue);
    });
    _obj.pageing.pageSizes = ko.observableArray(defaultOption.pageSizes);
    _obj.pageing.pageIndex = ko.observable(1);
    _obj.pageing.pageTotal = ko.observable(0);
    // _obj.pageing.append(pageingHTML);

    _obj.pageing.changeSorter = function (data, event) {
        var th = $(event.target);
        if (th.hasClass("sorting_asc")) {
            th.removeClass("sorting_asc").addClass("sorting_desc");
        }
        else if (th.hasClass("sorting_desc")) {
            th.removeClass("sorting_desc").addClass("sorting");
        }
        else {
            th.removeClass("sorting").addClass("sorting_asc");
        }
        //console.log(data);
    }

    _obj.pageing.btns = ko.observableArray();
    var getData = function (wantIndex, succeed) {
        $.ajax({
            type: ajaxOption.type,
            url: ajaxOption.url,
            contentType: ajaxOption.contentType,
            dataType: ajaxOption.dataType,
            data: JSON.stringify({
                pageIndex: wantIndex,
                pageSize: _obj.pageing.pageSize(),
                filter: defaultOption.filter ? ($.isFunction(defaultOption.filter) ? defaultOption.filter() : defaultOption.filter) : '',
                sorter: defaultOption.sorter ? ($.isFunction(defaultOption.sorter) ? defaultOption.sorter() : defaultOption.sorter) : []

            }),
            success: function (data, textStatus, jqXHR) {
                _obj.data = ko.mapping.fromJS(data.d, defaultOption.mappingOption, _obj.data);
                //console.log(_obj.data)
                _obj.pageing.rowCount(data.rowCount);
                _obj.pageing.pageIndex(wantIndex);
                _obj.pageing.pageTotal(Math.ceil((_obj.pageing.rowCount() / _obj.pageing.pageSize())));

                //分页数字
                var pageCount = _obj.pageing.pageTotal();
                var start = (_obj.pageing.pageIndex() - 5) > 0 ? _obj.pageing.pageIndex() - 5 : 0;
                var end = (start + 9) < pageCount ? start + 9 : pageCount;
                if (end == pageCount)
                { var start = (pageCount - 9) > 0 ? pageCount - 9 : 0;; }
                _obj.pageing.btns.removeAll();
                for (var i = start; i < end; i++) {
                    _obj.pageing.btns.push(ko.mapping.fromJS(i + 1));
                }
                //回调函数
                if ((typeof defaultOption.succeedCallback) == 'function') defaultOption.succeedCallback(data, textStatus, jqXHR);
                else {
                }
            }
        });
    }
    _obj.pageing.refresh = function () {
        getData(_obj.pageing.pageIndex());
    }
    _obj.pageing.prePageClick = function () {
        var wantIndex = _obj.pageing.pageIndex() - 1;
        if (wantIndex <= 0) return;
        getData(wantIndex);
    }
    _obj.pageing.nextPageClick = function () {
        var wantIndex = _obj.pageing.pageIndex() + 1;
        if (wantIndex - 1 > (_obj.pageing.rowCount() / _obj.pageing.pageSize())) return;
        getData(wantIndex);
    }
    _obj.pageing.firstPageClick = function () {
        getData(1);
    }
    _obj.pageing.lastPageClick = function () {
        getData(_obj.pageing.pageTotal());
    }
    _obj.pageing.changePageSize = function (item) {
        //console.log(item); 
        _obj.pageing.pageSize(item);
        getData(1);
    }
    _obj.pageing.btnClick = function (item) {
        getData(item);
    }
    _obj.pageing.query = function (filter, sorter, wantIndex) {
        if (filter) defaultOption.filter = filter;
        if (sorter) defaultOption.sorter = sorter;
        console.log(filter);
        console.log(sorter);
        getData(wantIndex ? wantIndex : 1);
        return false;
    }
    if (defaultOption.autoQuery) getData(1);
}

