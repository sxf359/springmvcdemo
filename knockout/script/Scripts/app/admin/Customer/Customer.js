function FrozenCustomer(item, e) {
    $.post("/admin/customer/FrozenCustomer", { gid: $(e.currentTarget).data("gid") }, function (data) {
        layer.alert(data, {
            title: "冻结操作",
            btn: ['确定']
        },
            function (index, item) {
                //layer.close(index);
                location.reload();
            });
    });
}
function UnFrozenCustomer(item, e) {
    $.post("/admin/customer/UnFrozenCustomer", { gid: $(e.currentTarget).data("gid") }, function (data) {
        layer.alert(data, {
            title: "解冻操作",
            btn: ['确定']

        },
            function (index, item) {
                //layer.close(index);
                location.reload();
            });
    });
}
function DeleteCustomer(item, e) {
    layer.confirm("确认要删除吗，删除后不能恢复", { title: "删除确认" }, function (index) {
        layer.close(index);
        $.post("/admin/customer/DeleteCustomer", { gid: $(e.currentTarget).data("gid") }, function (data) {
            layer.alert(data, {
                title: "删除操作",
                btn: ['确定']
            },
                function (index, item) {
                    //layer.close(index);
                    location.reload();
                });
        });
    });


}

function QueryReview(item, e) {
    //console.info("start");
    console.info($(e.currentTarget));
    $(e.currentTarget).parent().parent().next().toggle();
}

//手机端查看回访
function QueryReviewPhone(item, e) {
    //console.info("start");
    console.info($(e.currentTarget).parent().parent().parent().parent());
    $(e.currentTarget).parent().parent().parent().parent().parent().parent().parent().next().toggle();
}

//查看客户资料
function showCustomer(item, e) {
    //alert("a");
    $n = $(e.currentTarget);
    var vm = page.VM.PopupModalVM;
    vm.option.title("查看客户资料");
    vm.option.modallg(true);
    vm.option.showCloseButton(true);
    vm.option.showOKButton(false);
    //当弹出框中确定按钮不可用时，使其可用，此问题在firefox浏览器中出现
    if ($(".submit").attr("disabled") == "disabled") {
        $(".submit").removeAttr("disabled");
    }
    $.post("/service/GetCustomer", { gid: $n.data("gid") }, function (data) {
        vm.CustomerVM = ko.mapping.fromJS({ Name: "", Phone: "", CompanyName: "", Sort: "", Intentionality: "",CreateBy:"", Mark: "" });
        vm.CustomerVM = ko.mapping.fromJS(data, {}, vm.CustomerVM);
        vm.templateToUse("tmpl_blank");
        vm.templateToUse("tmpl_QueryCustomer");
        $("#dlgPopupModal").modal("show");
    });

    return false;
}

//删除单个回访记录
function CustomerReviewDelete(item, e) {
    var $n = $(e.currentTarget);
    console.info($n);
    layer.confirm("确认要删除该回访记录吗？", { title: "单个删除回访确认" }, function (index) {
        layer.close(index);
        $.post("/admin/customer/CustomerReviewDelete", { gid: $(e.currentTarget).data("gid") }, function (data) {
            layer.alert(data, { title: "单个删除回访", btn: ['确定'] }, function (index, item) {
                if (data != "删除回访记录成功") {
                    layer.close(index);
                }
                else {
                    location.reload();
                }

            });
        });
    });
}