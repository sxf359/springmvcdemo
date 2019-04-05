
/*
 * 职位信息数组
 */
var jobClassX;
$.ajax({
    url: "/service/getjobclass",
    type: "POST",
    data: {},
    async: false,
    success: function (data) {
        jobClassX = data;
        //console.info(jobClassX);
        
    }
});

/*
 * 通过给定的职位信息数组，经过处理返回新的数组元素
 */
function getJobClassData() {
    var result = [];

    $.each(jobClassX, function (i, n) {
        var a = {};
        a.id = n["JobClassCode"];
        a.name = n["JobClassName"];
        a.child = [];
        $.each(n["SubClass"], function (i, n) {
            var b = {};
            b.id = n["JobClassCode"];
            b.name = n["JobClassName"];
            b.child = [];

            $.each(n["Jobs"], function (i, n) {
                var c = {};
                c.id = n["JobClassCode"];
                c.name = n["JobClassName"];
                b.child.push(c);
            });
            a.child.push(b);
        });
        result.push(a);

    });
    return result;
}

/*
 * 获取职位名称信息
 */
function getJobData() {
    var result = [];
    $.each(jobClassX, function (index, item) {
        $.each(item.SubClass, function (index, item) {
            $.each(item.Jobs, function (index, item) {
                var c = {};
                c.id = item.JobClassCode;
                c.name = item.JobClassName;
                result.push(c);
            });
        });
    });
    return result;
}

function getFirstLevel() {
    var result = [];
    $.each(jobClassX, function (index, item) {
        var a = [];
        a.Name = item["JobClassName"];
        result.push(a);
    });
    //console.info(result);
    return result;
}
//根据第一层值获取第二层列表
function getSecondLevel(level1Name) {

    var result = [];
    $.each(jobClassX, function (index, item) {

        if (item["JobClassName"] == level1Name) {
            $.each(item["SubClass"], function (index, item) {
                var a = [];
                a.Name = item.JobClassName;
                result.push(a);
            });
            return false;
        }

    });
    return result;

}
//根据第一层第二层的值获取第三层列表
function getThirdLevel(level1Name,level2Name) {

    var result = [];
    $.each(jobClassX, function (index, item) {
        if (item["JobClassName"] == level1Name) {
            $.each(item["SubClass"], function (index, item) {
                if (item["JobClassName"] == level2Name) {
                    //console.info(level2Name);
                    $.each(item["Jobs"], function (index, item) {
                        var a = [];
                        a.Name = item.JobClassName;
                        result.push(a);
                    });
                    //console.info(result);
                    return false;
                }

            });
            return false;
        }
    });
    return result;

}

/*
 * 职位选择弹出窗口
 * 有两个不可或缺的参数 data-id:元素ID
 * data-multiple：true or false，为true则表示多选，否则为单选，若不设置此项值，则为单选
 */
function ShowSelectorJobClass(item, e) {
    //获取网页元素data-id
    var elementId = $(e.currentTarget).data("id");
    //console.info(elementId);
    if (elementId == null || elementId == undefined) {
        alert("请设置元素data-id");
        return;
    }

    var selector = page.VM.selector;
    if ($.data(page, "jobClassData") == null)
        $.data(page, "jobClassData", getJobClassData());
    var jobClassData = $.data(page, "jobClassData");

    selector.option.title("选择职位类别");
    selector.option.level(3);
    //获取网页元素data-multiple,判断是多选还是单选
    if ($(e.currentTarget).data("multiple") == true) {
        //console.info("abc");
        selector.option.multiSelector(true);
    } else {
        selector.option.multiSelector(false);
        //console.info("def");
    }
    selector.option.targetinput("#" + elementId);


    //selector.selectedItems

    selector.option.getLevel3Data = function (node, selectedItems) {
        var data = traverse(jobClassData, node, "id", "child");
        $.each(selectedItems, function (j, m) {
            $.each(data, function (i, n) {
                if (n.id == m.id) n.selected = ko.observable(true);
            });
        });
        return data;
    }
    ko.mapping.fromJS(jobClassData, {}, selector.items);
    selector.selectedItems(getInitSelectedItems(elementId));
    //selector.selectedItems($("#text_JobClass").val().split(";"));
    $("#selector").modal("show");
}


function getInitSelectedItems(elementId) {
    var result = [];
    //职位初始值
    var currentJob = $("#" + elementId).val();
    var arr = currentJob.split(",");
    //console.info(arr);
    if ($("#" + elementId).val() == null || $("#" + elementId).val() == "") {
        return result;
    }


    var jobArr = getJobData();
    $.each(jobArr, function (index, item) {
        //console.info(item["name"]);
        if ($.inArray(item.name, arr) >= 0) {
            var a = {};
            a.id = item.id;
            a.name = item.name;
            result.push(a);
            //console.info(a);
        }
    });
    return result;
    //console.info(page.VM.selector.selectedItems());
}

