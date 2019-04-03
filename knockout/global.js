

var g = g || {
    HOST_ROOT: "/", WEB_SERVICE_URL: "", FILE_ROOT: "/Gallery/", DEBUG: true, IsAjaxMocked: true
};

g.log = function (o) {
    if (g.DEBUG)
        console.log(o);
    return false;
}
/* 一些通用方法 */
g.getGuid = function () {
    var guid = "";d
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}
var page = {
    user: { userName: "test", isLogined: false, userType: '', level: 0, levelName: '游客', session: "1234567" },
    data: {},
    cache: {},
    action: getQueryStringByName('action'),
    func: getQueryStringByName('func'),
    VM: {
        datas: {},
        input: {},
        menu: ko.observableArray([])
    }
};

if (typeof define === "function" && define.amd && define.amd.jQuery) {
    define("global", [], function () { return g; });
    define("page", [], function () { return page; });
}

$(function () {

    //代替的是on方法
    $(document).on("click", ".submit", function () {
        /*var disableMe = function ($obj) {
            function enableMe() { $obj.removeAttr("disabled"); }
            $obj.attr("disabled", "disabled");
            setTimeout(enableMe, 3000);

        };
        disableMe($(this));
        return true;*/
        //按钮事件蒙版，防止短时间内重复提交**************************************************
        $.blockUI({
            css: {
                border: 'solid silver 1px', color: '#999999 ', padding: '5px'
            }, message: '<h4><img src="/Content/images/loading-spinner-blue.gif" style="width:22px;height:22px;" /> 处理中，请等待...</h4>'
        });
        setTimeout($.unblockUI, 3000);
        //按钮事件蒙版，防止短时间内重复提交**************************************************
    });


    page.VM.messagelistVM = ko.mapping.fromJS({ count: 0, chats: [] }

    );
    page.VM.notificationlistVM = ko.mapping.fromJS([

    ]);



    g.handleFancybox();
    g.handleDatetimePicker();
    g.handleGoTop();
    g.handlePopover();
    g.handleScrollers();
    g.handleDropdownHover();
});

function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return decodeURIComponent(result[1]);
}

// Handles the go to top button at the footer
g.handleGoTop = function () {
    var offset = 300;
    var duration = 500;

    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {  // ios supported
        $(window).bind("touchend touchcancel touchleave", function (e) {
            if ($(this).scrollTop() > offset) {
                $('.scroll-to-top').fadeIn(duration);
            } else {
                $('.scroll-to-top').fadeOut(duration);
            }
        });
    } else {  // general
        $(window).scroll(function () {
            if ($(this).scrollTop() > offset) {
                $('.scroll-to-top').fadeIn(duration);
            } else {
                $('.scroll-to-top').fadeOut(duration);
            }
        });
    }

    $('.scroll-to-top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    });
};
//绑定日期控件
g.handleDatetimePicker = function () {

    if (!jQuery().datetimepicker) {
        return;
    }
    $(".form_datetime").click(function () {
        if (navigator.userAgent.indexOf("MSIE") > -1 && $.browser.version <= 8) {

            myModal.alert("此功能在IE11以下的的ie浏览器中不能使用，建议更换浏览器为搜狗,360,firefox或chrome浏览器");
            return false;
        }
    });
    $(".form_datetime").datetimepicker({
        autoclose: true,
        minView: "month", //选择日期后，不会再跳转去选择时分秒
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        forceParse: 0,
        pickTime: false,
        pickerPosition: "bottom-right",
        //startDate:"2017-01-01",
        //initialDate:now,
        onSelect: function (dateText, inst) {
            // 不做任何处理
        }
    });


}
$(".fa-calendar").parent().click(function () {
    if (navigator.userAgent.indexOf("MSIE") > -1 && $.browser.version <= 8) {

        myModal.alert("此功能在IE11以下的的ie浏览器中不能使用，建议更换浏览器为搜狗,360,firefox或chrome浏览器");
        return false;
    }
});

g.handleFancybox = function () {
    $(".fancybox").fancybox();
}

g.handlePopover = function () {
    $("body").find('[data-toggle="popover"]').each(function () {
        $(this).popover({
            // trigger: 'hover'
            trigger: 'click'
        });
        $(this).click(function (e) {
            //$(this).popover('toggle');
            //$('[data-toggle="popover"]').popover('hide');
            //$(this).popover('toggle');
            e.preventDefault();
            return false;
        });
    });
    $("body").click(function (e) {
        //console.log(77777);
        //console.log(e);
        $('[data-toggle="popover"]').popover('destroy');
    });
}
//应用/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.js
g.handleScrollers = function () {
    var initSlimScroll = function (el) {
        $(el).each(function () {
            if ($(this).attr("data-initialized")) {
                return; // exit
            }

            var height;

            if ($(this).attr("data-height")) {
                height = $(this).attr("data-height");
            } else {
                height = $(this).css('height');
            }

            $(this).slimScroll({
                allowPageScroll: true, // allow page scroll when the element scroll is ended
                size: '7px',
                color: ($(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : '#bbb'),
                wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                railColor: ($(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : '#eaeaea'),
                position: 'right',
                height: height,
                alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
                disableFadeOut: true
            });

            $(this).attr("data-initialized", "1");
        });
    };

    initSlimScroll('.scroller');
};

// Handle Hower Dropdowns
g.handleDropdownHover = function () {
    $('[data-hover="dropdown"]').not('.hover-initialized').each(function () {
        $(this).dropdownHover();
        $(this).addClass('hover-initialized');
    });
};



g.checkLogin = function () {
    if (!page.user.isLogined) {
        g.showLogin();
        return false;
    }
    else
        return true;
}

g.showLogin = function () {
    $("#login_mdl").modal("show");
}


//发送消息
g.sendAsk = function (item, e) {
    console.log($(e.currentTarget).data("job"));
    console.log($(e.currentTarget).data("com"));
    if (g.checkLogin()) {
    }
    return false;

}


//发送验证码
g.sendCodeWithNumber = function ($n, type, phonenumber) {
    var reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i;
    if (reg.test(phonenumber)) {
        g.sendCode($n, type, phonenumber);
        return false;
    }
    else {
        myModal.alert("请输入正确的手机号!");
    }
}
//获取手机验证码
g.sendCode = function ($n, type, phonenumber) {
    var count = 90;
    function GetNumber($btn) {
        $btn.attr("disabled", "disabled");
        //$btn.text(count + "秒之后再次获取")
        $btn.text("(" + count + ")")
        count--;
        if (count > 0) {
            //console.log(count);
            setTimeout(function () { GetNumber($btn); }, 1000);
        }
        else {
            $btn.text("获取验证码");
            $btn.removeAttr("disabled");
            count = 180;
        }
    }
    $.post("/Service/SendSMSCode", { phonenumber: phonenumber, type: type }, function (data) { console.info(data)})
    GetNumber($n);
}

//获取邮箱验证码
g.sendEmailCode = function ($n, email, userid) {
	if(email==null||email=="")
	{
		alert("请输入email");
		return;
	}
	if(userid==null||userid=="")
	{
		alert("请输入userid");
		return;
	}
    var count = 30;
    function GetNumber($btn) {
        $btn.attr("disabled", "disabled");
        //$btn.text(count + "秒之后再次获取")
        $btn.text("(" + count + ")")
        count--;
        if (count > 0) {
            //console.log(count);
            setTimeout(function () { GetNumber($btn); }, 1000);
        }
        else {
            $btn.text("获取验证码");
            $btn.removeAttr("disabled");
            count = 60;
        }
    }

    $.post("/service/SendEmailVerifycode", { email: email, userid: userid }, function (data) { })
    GetNumber($n);
}

g.AddAntiForgeryToken = function (data, form) {
    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]', form).val();
    return data;
};

//全选
g.selectAll = function (item, e) {
    $input = $(e.currentTarget);
    if ($input.attr("checked")) {
        $input.parents("table").find(":checkbox").attr("checked", "checked");
    }
    else {
        $input.parents("table").find(":checkbox").removeAttr("checked");
    }
    return true;
}

//弹出城市框代码///////////////////////////////////////////////////////////////////////////////////////////////
//选择城市弹出框
function ShowAreaVM(item, e) {
    //console.info(GetUrlRelativePath());
    $n = $(e.currentTarget);
    //console.info($n.text());
    var vm = page.VM.PopupModalVM;
    vm.option.title("选择工作城市");
    vm.option.modallg(true);
    vm.option.showCloseButton(true);
    //当弹出框中确定按钮不可用时，使其可用，此问题在firefox浏览器中出现
    if ($(".submit").attr("disabled") == "disabled") {
        $(".submit").removeAttr("disabled");
    }
    $.post("/service/GetProvinceAndCityInfo", { cityName: $n.text() }, function (data) {
        vm.AreaVM = ko.mapping.fromJS(data, "", vm.AreaVM);
        vm.templateToUse("tmpl_blank");
        vm.templateToUse("tmpl_Area");
        $("#dlgPopupModal").modal("show");

    });
    $.post("/service/GetAreaIDByName", { cityName: $n.text() }, function (data) {
        //console.info(data);
        var arr = data.split(",");
        //console.info(arr[0]);
        $("#" + arr[0]).addClass("itemSelected");
        $("#" + arr[1]).addClass("itemSelectedGreen");
    });


    //console.info($.cookie("CurrentCity"));
    return false;
}
//根据身份改变显示的城市
function changeCity(item, e) {
    var $n = $(e.currentTarget);
    $(".itemProvince").removeClass("itemSelectedGreen");
    $n.addClass("itemSelectedGreen");
    $.post("/service/GetCityInfo", { parent: $n.attr("id") }, function (data) {
        var vm = page.VM.PopupModalVM;
        vm.AreaVM.City = ko.mapping.fromJS(data, "", vm.AreaVM.City);
        //console.info(vm.AreaVM.City.Name);
    });
}

function confirmCity(item, e) {
    //console.info($(e.currentTarget));
    var $n = $(e.currentTarget);
    var cityName = $n.text();

    $.post("/service/SetDefaultCityCookie", { cityName: cityName }, function (data) {
        $("#selectedCity").html(cityName + '<span class="caret"></span>');
        $("#dlgPopupModal").modal("hide");
        var url = GetUrlRelativePath();
        if (url == "/" || url == "/home/index") {
            location.href = "?curCity=" + cityName;
        }

    });

}
//弹出城市框代码///////////////////////////////////////////////////////////////////////////////////////////////
//获取当前网址的相对路径
function GetUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl.toLowerCase();
}



//判断是否是手机端访问，结果为true则表示是。否则是false
function CheckPhoneEnd() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}

//判断求职者是否在该公司面试过
function CheckMianshi(personID) {
    var flag;

    $.ajax({
        type: "GET",
        url: "/service/GetPersonToCompanyIsInterview",
        data: "personID=" + personID,
        async: false,   //默认是异步请求，这里如果使用$.post则获取不到服务器返回的值，因此改为同步请求
        success: function (data) {
            if (data == true) {
                flag = true;
            }
            else {
                flag = false;
            }
        }
    });
    return flag;
}
//判断公司是否认证通过
function IsCompanyAuthentication() {
    var flag;

    $.ajax({
        type: "GET",
        url: "/service/IsCompanyAuthentication",
        data: "",
        async: false,   //默认是异步请求，这里如果使用$.post则获取不到服务器返回的值，因此改为同步请求
        success: function (data) {
            if (data == true) {
                flag = true;
            }
            else {
                flag = false;
            }
        }
    });
    return flag;
}
//通过给定的文本，使符合条件的select option选项处于选中状态
function SelectedOptionText(id, text) {
    var count = $("#" + id + " option").length;
    for (var i = 0; i < count; i++) {
        if ($("#" + id + "").get(0).options[i].text == text) {
            $("#" + id + "").get(0).options[i].selected = true;
            break;
        }
    }
}
//语音播放
function audioPlay() {
    my_jPlayer.jPlayer("setMedia", {
        mp3: $('#audio').val()
    });

    my_jPlayer.jPlayer("play");
}
/*
 * 错题功能
 */
function MyWrong(item, e) {
    location.href = "/Member/WrongQuestions";
}
/*
 * 相似题
 */
function MySimilar(item, e) {
    //console.info("a");
    window.open("/member/mysimilarquestion?iid=" + page.VM.QuestionLibraryVM.IID());
    //console.info("b");

}


/*
 * 解决浏览器缓存
 */
function timestamp(url) {
    //  var getTimestamp=Math.random();
    var getTimestamp = new Date().getTime();
    if (url.indexOf("?") > -1) {
        url = url + "&timestamp=" + getTimestamp
    } else {
        url = url + "?timestamp=" + getTimestamp
    }
    return url;
}

/*
 * 判断文件是否存在
 */
function Exists(url) {
    var isExists;
    $.ajax({
        url: url,
        async:false,
        type: 'HEAD',
        error: function () {
            //file not exists
            //console.info("file not exists ");
            isExists = 0;

        },
        success: function () {
            //file exists
            //console.info("file exists");
            isExists = 1;

        }
    });
    //console.info("isexists:" + isExists);
    if (isExists == 1) {
        return true;
    }
    else {
        return false;
    }
}

////////////////////以下为javascript扩展函数//////////////////////////////////////////////
//扩展jquery 判断是否为空的方法
jQuery.extend({
    IsNullOrEmpty: function (name) {
        if (name == null || name == "" || name == undefined) {
            return true;
        }
        return false;
    },
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
});



/*
===========================================
//得到右边的字符串
===========================================
*/
String.prototype.Right = function (len) {

    if (isNaN(len) || len == null) {
        len = this.length;
    }
    else {
        if (parseInt(len) < 0 || parseInt(len) > this.length) {
            len = this.length;
        }
    }

    return this.substring(this.length - len, this.length);
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

