//用户角色添加
function AddUserRoleSub(item, e) {
    $n = $(e.currentTarget);

    var investFieldSize = $("[name=chk]:checkbox").size();
    var i = 0;
    var chk = "";

    $("[name=chk]:checkbox").each(function (j) {
        if ($(this).prop("checked") == false) {
            i++;
            //alert(i+":"+j);

        }
        else {
            chk += $(this).val() + ",";
        }

    });
    //alert(i);
    if (i == investFieldSize) {
        //alert(i);
        alert("请选择");
        return false;
    }
    //alert($n.data("rolename"));
    //alert($n.data("roleid"));
    //alert(chk);
    //return false;
    $.post("/admin/UserAdmin/AddUserRoleSub",
        {
            roleName: $n.data("rolename"),
            members: chk
        },
    function (data) {
        if (data.Code == 0) {
            myModal.confirm("角色添加成功!").on(function (r) {
                location.href = "/Admin/UserAdmin/DeleteUserRole/" + $n.data("roleid");
            });
        }
        else {
            myModal.confirm(data.Content)
        }
    });
}

//用户角色移除
function DeleteUserRoleSub(item, e) {
    $n = $(e.currentTarget);

    var investFieldSize = $("[name=chk]:checkbox").size();
    var i = 0;
    var chk = "";

    $("[name=chk]:checkbox").each(function (j) {
        if ($(this).prop("checked") == false) {
            i++;
            //alert(i+":"+j);

        }
        else {
            chk += $(this).val() + ",";
        }

    });
    //alert(i);
    if (i == investFieldSize) {
        //alert(i);
        alert("请选择");
        return false;
    }
    //alert($n.data("roleid"));
    //alert($n.data("rolename"));
    //alert(chk);
    //return false;
    $.post("/admin/UserAdmin/DeleteUserRoleSub",
        {
            rolename: $n.data("rolename"),
            members: chk
        },
    function (data) {
        if (data.Code == 0) {
            myModal.confirm("角色移除成功!").on(function (r) {
                location.href = "/Admin/UserAdmin/DeleteUserRole/" + $n.data("roleid");
            });
        }
        else {
            myModal.confirm(data.Content)
        }
    });
}