/**
* @projectDescription 该文件用于一些常用的js函数
*
* @author Seaman seamanx@qq.com
* @version 1.0
* @last edited 2015-12-24 
*/

/** 生成一个命名空间
*
* Examples:
* newnamespace(SMSoft.Util);   
* @param {namespaceString} 命名空间名称
* @return {} 返回一个命名空间
*/
function newnamespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';

    for (var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    return parent;
}

var util = newnamespace("SMSoft.Util");

util.helloworld = function () { return "hello word!!"; }


/** 根据QueryString参数名称获取url参数值
*
* Examples:
* util.getQueryStringByName('a');   
* @param {name} 参数名称
* @return {} 返回参数值
*/
util.getQueryStringByName = function (name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return decodeURIComponent(result[1]);
}

//js生成guid
util.getGuid = function () {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

//局部打印
util.printdiv = function (printpage) {
    var headstr = "<html><head><title></title></head><body>";
    var footstr = "</body>";
    var newstr = $(printpage).html();
    var oldstr = document.body.innerHTML;
    document.body.innerHTML = headstr + newstr + footstr;
    window.print();
    document.body.innerHTML = oldstr;
    return false;
}

///去除html标记
String.getTextOnly = function (s) {
    var r = /<[^>]*>/ig;
    var s = arguments[0];
    return s.replace(r, "").replace(/[\t]/ig, "").replace(/[\n]/ig, "");
}

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};

util.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}

util.getPageParams = function (url) {
    url = url || window.location.search.substr(1);
    var params = url.split("&");
    var s = "{";
    $.each(params, function (i, n) {
        s += (s.length > 1 ? "," : "") + "\"" + n.split("=")[0] + "\":\"" + decodeURIComponent(n.split("=")[1]) + "\"";
    });
    s += "}";
    return $.parseJSON(s);
}

util.AjaxtoJSON = function (params) {
    var param = new Object();
    param.serviceName = params.serviceName || "";
    param.methodName = params.methodName || "";
    param.zeroValue = params.zeroValue;
    param.serviceData = params.serviceData;
    param.app = params.app;
    param.async = params.async || false;

    var url = util.getRootUrl(param.app) + "Webservices/" + param.serviceName + ".asmx/" + param.methodName;
    var result;

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: JSON.stringify(param.serviceData),
        async: param.async,
        dataType: "json",
        success: function (data, textResponse) {
            result = $.parseJSON(data.d);
            if (param.zeroValue) {
                result.unshift(param.zeroValue);
            }
        }
    });
    return result;
}

util.getRootUrl = function (_appName) {
    _appName = _appName || "";
    var currentURL = document.URL;
    var rootPosition = currentURL.indexOf("/", 7);
    var relativeHomeUrl = currentURL.substring(0, rootPosition + 1);
    return relativeHomeUrl + (_appName.length > 0 ? _appName + "/" : "");
};

util.cloneAll = function (fromObj, toObj) {
    for (var i in fromObj) {
        if (typeof fromObj[i] == "object") {
            toObj[i] = {};
            util.cloneAll(fromObj[i], toObj[i]);
            continue;
        }
        toObj[i] = fromObj[i];
    }
}

util.myFormatDate = function (_d, format) {
    var d = new Date(_d);
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    var formated = curr_year + "-" + ("0" + curr_month).substr(0, 2) + "-" + ("0" + curr_date).substr(0, 2);
    // alert(formated);
    return formated;
}

util.div = function (exp1, exp2) {
    var n1 = Math.round(exp1); //四舍五入
    var n2 = Math.round(exp2); //四舍五入

    var rslt = n1 / n2; //除

    if (rslt >= 0) {
        rslt = Math.floor(rslt); //返回值为小于等于其数值参数的最大整数值。
    }
    else {
        rslt = Math.ceil(rslt); //返回值为大于等于其数字参数的最小整数。
    }
    return rslt;
}

util.getRootPath = function () {
    var pathName = window.location.pathname.substring(1);
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    //return window.location.protocol + '//' + window.location.host + '/'+ webName + '/';
    return window.location.protocol + '//' + window.location.host + '/' + webName;
};


//元素窗体居中
jQuery.fn.center = function () {
    this.css('position', 'absolute');
    this.css('top', ($(window).height() - this.height()) / 2 + $(window).scrollTop() + 'px');
    this.css('left', ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + 'px');
    return this;
}
//Use the above function as: $('#gbin1div').center();

/* 
*  方法:Array.remove(dx) 通过遍历,重构数组 
*  功能:删除数组元素. 
*  参数:dx删除元素 . 
*/
Array.prototype.remove = function (item) {
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != item) {
            this[n++] = this[i]
        }
    }
    this.length -= 1;
}

util.ajaxPost = function (url, data, successCallback) {
    function deleteItem(item) {
        if (confirm("确实要删除吗?")) {
            $.ajax({
                type: "post",
                url: url,
                data: JSON.stringify(data),
                "contentType": "application/json; charset=utf-8",
                "dataType": "json",
                success: successCallback ? successCallback : false
            });
        }
    }
}

util.closeFancybox = function () {
    $.fancybox.close();
    return false;
}

if (typeof define === "function" && define.amd && define.amd.jQuery) {
    define("util", ["jquery"], function ($) { return util; });
}

//数组去重复数据
Array.prototype.distinct = function () {
    var a = [], b = [];
    for (var prop in this) {
        var d = this[prop];
        if (d === a[prop]) continue; //防止循环到prototype
        if (b[d] != 1) {
            a.push(d);
            b[d] = 1;
        }
    }
    return a;
}

/**
 * json格式转树状结构
 *  jsonData   {json}      json数据
 *  idStr   {String}    idStr的字符串
 *  parentStr   {String}    父idStr的字符串
 *  childrenStr   {String}    children的字符串
 *  return  {Array}     数组
 */
util.transJSTreeData = function (jsonData, option) {
    var result = [], hash = {}, len = jsonData.length,
        option = $.extend(true, { idStr: 'id', parentStr: 'parent', textStr: 'text', childrenStr: 'children' }, option);

    console.log(option);

    for (var i = 0; i < len; i++) {
        hash[jsonData[i][option.idStr]] = jsonData[i];
        hash[jsonData[i][option.idStr]].id = jsonData[i][option.idStr];
        hash[jsonData[i][option.idStr]].text = jsonData[i][option.textStr];
        //加删除线
        hash[jsonData[i][option.idStr]].a_attr = jsonData[i]["Deleted"] ? { Style: 'color:#ccc;text-decoration:line-through ;' } : {};
    }
    for (var j = 0; j < len; j++) {
        var aVal = jsonData[j], hashParent = hash[aVal[option.parentStr]];
        if (hashParent) {    //如果存在父节点,附加到父节点上
            !hashParent[option.childrenStr] && (hashParent[option.childrenStr] = []); //父节点的子节点数组初始化处理
            hashParent[option.childrenStr].push(aVal);
        }
        else {    //根节点
            result.push(aVal);
        }
    }
    console.log(result);
    return result;
}