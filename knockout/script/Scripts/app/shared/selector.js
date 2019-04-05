var page = page || { VM: {} };
var _selector = {
    option: { title: "title ...", "level": 3, multiSelector: true, maxSelector: 3, getLevel3Data: false, targetinput: false },
    items: [],
    level3items: [],//{ id: 1, name: "aaa", selected: true }, { id: 2, name: "bbb" }, { id: 3, name: "ccc", selected: false }
    selectedItems: [], //{ id: 1, name: "aaa" }, { id: 2, name: "bbbb" }
    selector: {}
};
var _poslay = $(".pos-lay");   // 设置目标区域

page.VM.selector = ko.mapping.fromJS(_selector);

function closePosLay3() { 
    _poslay.hide();
}
function finishPosLay3() {
     
    closePosLay3();
}

/*  #region 处理三级选项  */
function showLevel3(item, e) {
    var selector = page.VM.selector;
    if (selector.option.level() != 3)
    {
        return true;
    }
    else {
        var level3Data = $.isFunction(selector.option.getLevel3Data) ? selector.option.getLevel3Data(item.id(), ko.mapping.toJS(page.VM.selector.selectedItems)) : [];
        //console.log(333); console.log($.isFunction(selector.option.getLevel3Data));
        ko.mapping.fromJS(level3Data, {}, page.VM.selector.level3items);
        var _position = $(e.currentTarget).position();
        $(".pos-lay").show().css({ top: (_position.top + 20) + "px", left: (_position.left) + "px" });
    }
}
//选择项 
function selectItem(item, e) {
    "use strict";
    var selector = page.VM.selector;
    var $input = $(e.currentTarget);
    //console.info(selector.option.multiSelector());
    if (selector.option.level() != 3 && (selector.option.level() != $input.data("level")))
    {
        return false;
    }    
    
    if (!(selector.option.multiSelector())) {
        selector.selectedItems.removeAll();
        selector.selectedItems.push(ko.mapping.fromJS({ id: $input.data("id"), name: $input.data("name") }));
    }
    else
    {
        if ($input.attr("checked") == "checked") {
            //console.info("选中");
            if (selector.selectedItems().length >= selector.option.maxSelector()) {
                myModal.alert("最多只能选" + selector.option.maxSelector() + "项!");
                return false;
            }
            //console.info(typeof(selector.selectedItems.indexOf));
            //console.info(selector.selectedItems.indexOf());
           
           
            selector.selectedItems.push(ko.mapping.fromJS({ id: $input.data("id"), name: $input.data("name") }));
            //console.info(selector.selectedItems());
        }
        else {
            //console.info("取消");
            //console.info(selector.selectedItems.remove);
            selector.selectedItems.remove(function (item) {
                //console.info(item);
                //console.info(item.id);
                //console.info($input.data("id"));
                
                return item.id == $input.data("id");
            });
            //console.info("取消确认");
        }
    } 
    return true;
}
/*  #endregion 处理三级选项  */

function removeSeleted(item, e) {
    page.VM.selector.selectedItems.remove(function (n) {
        if (n.id == item.id)
        {
            $(".pos-main").find(":checkbox").each(function () {
                if ($(this).data("name")==n.name) {
                    $(this).prop("checked", false);
                }
                //console.info($(this).prop("checked"));
            });
        }
        return n.id == item.id;
    });
}

$(document).mouseup(function (e) {
    if (!_poslay.is(e.target) && _poslay.has(e.target).length === 0) { // Mark 1
        // console.log(); // 功能代码
        closePosLay3();
    }
});

function finishSelect() {
    var a = [];
    //ko对象转换为标准的JS对象进行操作
    var arr = ko.toJS(page.VM.selector.selectedItems());
    //console.info(arr);
    //return false;
    $.each(arr, function (i, n) {
        //console.info(n);
        //console.info(n.name);
        //console.info(typeof(n.name));
        a.push(n.name);
    });
    //console.info("a:"+a);
    //返回输入框值
    $(page.VM.selector.option.targetinput()).val(a.join(','));
    //console.info("targetinput:"+page.VM.selector.option.targetinput());
    $("#selector").modal("hide");
}


/* 查找json树,返回id为n的对象,idfield为id字段,childrenfield为子元素字段名称
*
*/
function traverse(jsontree, node, idfield, childrenfield) {
    var result = false;
    var a = [];
    if ((typeof jsontree == 'object') && (jsontree.constructor == Object.prototype.constructor)) {
        a.push(jsontree);
    }
    else a = jsontree;

    for (var i = 0; i < a.length; i++) {
        var jn = a[i];
        if (jn[idfield] == node) {
            //console.log(jn[childrenfield]);
            result = jn[childrenfield];
            return result;
            break;
        }
        else
            if (jn[childrenfield] && jn[childrenfield].length > 0) {
                result = traverse(jn[childrenfield], node, idfield, childrenfield);
            }
        if (!!result) break;
    }
    return result;
}


