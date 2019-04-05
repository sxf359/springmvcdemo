var page = page || { VM: {} };
var login = { Name: "", Password: "", RememberMe: false ,Role:""};

page.VM.loginVM = ko.mapping.fromJS(login);
$(function () {
    //ko.applyBindings(page.VM.loginVM, $("#login_mdl")[0]);
});


function doLogin() {
    var url = "/account/LoginAjax", data = { Name: page.VM.loginVM.Name(), Password: page.VM.loginVM.Password(), RememberMe: !!page.VM.loginVM.RememberMe(), Role: page.VM.loginVM.Role() };
    var callbak = function (data) {
        console.log(data);
        if (data.Code == "0")
            location.href = location.href;
        else
            myModal.alert(data.Message);
    };
    $.post(url, data, callbak);

}