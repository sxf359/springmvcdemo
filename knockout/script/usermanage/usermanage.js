var mappingOption = {
    'CreateTime': {
        create: function (options) {
            return ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd hh:mm'));
        },
        update: function (options) {
            return options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd');//ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd'));
        }
    }
}

//密码修改弹出框 
function showPasswordManage(item, e) {
    $n = $(e.currentTarget);
    var vm = page.VM.PopupModalVM;
    vm.option.title("修改密码");
    vm.option.modallg(true);
    vm.option.showCloseButton(true);
    vm.option.showOKButton(true);
    //当弹出框中确定按钮不可用时，使其可用，此问题在firefox浏览器中出现 
    if ($(".submit").attr("disabled") == "disabled") {
        $(".submit").removeAttr("disabled");
    }
    vm.PasswordManageVM = ko.mapping.fromJS({ gid: $n.data("gid"), Password: "", ConfirmPassword: "" });

    vm.option.ok = function () { ResetSetPassword(vm); };
    vm.templateToUse("tmpl_blank");
    vm.templateToUse("tmpl_PasswordManage");
    $("#dlgPopupModal").modal("show");
    //alert("a");
    return false;
}


//重置密码
function ResetSetPassword(vm) {
    
        //console.info("abc");
        if (vm.PasswordManageVM.Password() != vm.PasswordManageVM.ConfirmPassword())
        {
            alert("两次输入密码不一致");
            return;
        }
        
        $.post("/admin/usermanage/SetPasswordHash", { userId: vm.PasswordManageVM.gid(), newPassword: vm.PasswordManageVM.Password() }, function (data) {
            if (data.indexOf("无权限") >= 0) {
                myModal.info("您无权进行此项操作");
                $("#dlgPopupModal").modal("hide");
            }
            else {
                myModal.info("修改密码成功");
                $("#dlgPopupModal").modal("hide");
            }
        });
     
}

//锁定会员
function LockUser(item, e) {
    if (confirm("您确认要锁定该会员么")) {
        //console.info("abc");
        $n = $(e.currentTarget);
        $.post("/admin/usermanage/LockUser", { userId: $n.data("gid") }, function (data) {
            if (data.indexOf("无权限") >= 0) {
                myModal.info("您无权进行此项操作");
            }
            else if (data == "success") {
                myModal.info("锁定成功");
                location.reload();
            }
            else {
                myModal.info("锁定失败，重新操作");
            }
        });
    }
}
//解锁会员
function UnLockUser(item, e) {
    if (confirm("您确认要解锁该会员么")) {
        //console.info("abc");
        $n = $(e.currentTarget);
        $.post("/admin/usermanage/UnLockUser", { userId: $n.data("gid") }, function (data) {
            if (data.indexOf("无权限") >= 0) {
                myModal.info("您无权进行此项操作");
            }
            else if (data == "success") {
                myModal.info("解锁成功");
                location.reload();
            }
            else {
                myModal.info("解锁失败，重新操作");
            }
        });
    }
}
 
//删除会员
function DeleteUser(item, e) {
    if (confirm("您确认要删除该会员么，删除后不能恢复，请慎重操作")) {
        //console.info("abc");
        $n = $(e.currentTarget);
        $.post("/admin/usermanage/DeleteUser", { userid: $n.data("gid") }, function (data) {
            if (data.indexOf("无权限") >= 0) {
                myModal.info("您无权进行此项操作");
            }
            else if (data == "success") {
                myModal.info("删除成功");
                location.reload();
            }
            else {
                myModal.info("删除失败，重新操作");
            }
        });
    }
}


//修改会员账号信息弹出框
function ShowUpdateAccountInfo(item, e) {
    $n = $(e.currentTarget);
    var vm = page.VM.PopupModalVM;
    vm.option.title("修改账号信息");
    vm.option.modallg(true);
    vm.option.showCloseButton(true);
    vm.option.showOKButton(true);
    //当弹出框中确定按钮不可用时，使其可用，此问题在firefox浏览器中出现 
    if ($(".submit").attr("disabled") == "disabled") {
        $(".submit").removeAttr("disabled");
    }
    vm.AccountInfoVM = ko.mapping.fromJS({ Id: "", RealName: "", PhoneNumber: "" });
    $.post("/admin/usermanage/ShowUpdateAccountInfo", { }, function (data) {
        vm.AccountInfoVM = ko.mapping.fromJS(data, {}, vm.AccountInfoVM);
    });
    vm.option.ok = function () { UpdateAccountInfo(vm); };
    vm.templateToUse("tmpl_blank");
    vm.templateToUse("tmpl_AccountInfo");
    $("#dlgPopupModal").modal("show");
    //alert("a");
    return false;
}
//修改会员账号信息确认
function UpdateAccountInfo(vm) {

    //console.info("abc");
    if (vm.AccountInfoVM.PhoneNumber() == null || vm.AccountInfoVM.PhoneNumber() == "") {
        alert("手机号不能为空");
        return;
    }
    if (vm.AccountInfoVM.RealName() == null || vm.AccountInfoVM.RealName() == "") {
        alert("真实姓名不能为空");
        return;
    }
    $.post("/admin/usermanage/UpdateAccountInfo", { id: vm.AccountInfoVM.Id(), phone: vm.AccountInfoVM.PhoneNumber(), realName: vm.AccountInfoVM.RealName() }, function (data) {
        if (data.indexOf("无权限") >= 0) {
            myModal.info("您无权进行此项操作");
            $("#dlgPopupModal").modal("hide");
        }
        else {
            myModal.info("修改账号信息成功");
            $("#dlgPopupModal").modal("hide");
        }
    });

}
