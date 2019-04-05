
var menu = [
    {
        Code: "00", "Caption": "首页", "Css": "icon-home", "Active": true, "Url": "/home"
    },
    {
        Code: "01", "Caption": "在投剧本", "Css": "icon-home", "Active": false, "Url": "javascript:void(0)",
        "Children": [
        { Code: "0101", "Caption": "综艺", "Css": "icon-bulb", "Active": false, "Url": "/juben?category=zy", opened: false },
        { Code: "0102", "Caption": "剧情", "Css": "icon-bulb", "Active": false, "Url": "/juben?category=jq", opened: false }
        ]
    },
    {
        Code: "01", "Caption": "人气偶像", "Css": "icon-home", "Active": false, "Url": "/actors/Home/all?rq"
    },
    {
        Code: "01", "Caption": "作品展示", "Css": "icon-home", "Active": false, "Url": "/juben"
    },
    {
        Code: "01", "Caption": "个人中心", "Css": "icon-home", "Active": false, "Url": "/profile"
    },
    {
        Code: "01", "Caption": "积分商城", "Css": "icon-home", "Active": false, "Url": "/shop"
    }
];

//ko.applyBindings(page.VM);
//ko.applyBindings(page.VM.menu, $(".header-navigation")[0]);
$(function () {
    var isAjaxMocked =global.IsAjaxMocked;
    if (isAjaxMocked) {
        $.mockjax({
            url: '/WebServices/getTopMenu',
            status: 200,
            responseTime: 250,
            responseText:  JSON.stringify( { "d": JSON.stringify(menu) })
        });
    }
    $.post(
        '/WebServices/getTopMenu',
        null,
        function (data) { 
            var o = JSON.parse(data);
            page.VM.menu = ko.mapping.fromJS(o, {}, page.VM.menu);
            page.VM.menu.opend = ko.observableArray([]);
        })
        .error(function (xhr) {
            alert('無法取得資料!');
        });
});


function changeMenu(item) {
    var a = ko.utils.arrayFilter(page.VM.menu.opend(), function (i) {
        return i.id() == item.id;
    });
    if (a.length == 0)
        page.VM.menu.opend.push(ko.mapping.fromJS(item));

    $('#pageTopTabs a[href="#' + item.id + '"]').tab('show'); // Select tab by name
}

function removeMenu(item) {
    page.VM.menu.opend.remove(item);
    $('#pageTopTabs a:last').tab('show') // Select last tab
}