var page = page || { VM: {} };
var InterviewInviteOption = {
    option: { title: "title ..." },
    selectedPerson: [],
    positions: [],
    MessageTempls: [],
    position: "",
    date: "",
    time1: "",
	time2:"",
	InterviewAddr:"",
	Linkman:"",
	LinkPhone:"",
    otherrequire: "",
    message: "",
    available: "",
    company: "",
    alias: "",
    hr: "",
    phone: "",
    address: "",
    allowance: 0,
    require: 0,
    balance: 0,
    messaageTemplID: "",
    messaageTempl: "",
    balanceAvailable: 0
};

page.VM.InterviewInviteVM = ko.mapping.fromJS(InterviewInviteOption);
var vm = page.VM.InterviewInviteVM;

page.VM.postionSelectOption = {
    allowClear: true,
    minimumResultsForSearch: -1, //-1时不显示搜索框
    maximumSelectionSize: 5,   // 限制数量   
    formatSelection: function (item) {// 选择结果中的显示  
        var vm = page.VM.InterviewInviteVM;
        var allowance = 0;
        var sel = ko.utils.arrayFirst(vm.positions(), function (n) {
            return n.id() == item.id;
        });
        if (sel != null) {
            vm.allowance(sel.allowance());
            vm.position(sel.id());
            return sel.name();
        }
        return item.text;
    },
    escapeMarkup: function (m) { return m; }
};
page.VM.tempSelectOption = {
    allowClear: true,
    minimumInputLength: 0, //you can specify a min. query length to return results
    minimumResultsForSearch: -1, //-1时不显示搜索框
    maximumSelectionSize: 5,   // 限制数量   
    formatSelection: function (item) {// 选择结果中的显示   
        var sel = ko.utils.arrayFirst(vm.MessageTempls(), function (n) {
            return n.id() == item.id;
        });
        if (sel != null) {
            vm.messaageTemplID(sel.id());
            return sel.name();
        }
        return item.text;
    },
    escapeMarkup: function (m) { return m; }
};
$(function () {

    //职位下拉框数据
    if ($.data(page, "positions") == null) {
        //不使用异步获取，因为异步获取，下拉框初始值加载不上
        //$.get("/Service/GetAllPostionAjax", {}, function (data) {
        //    vm.positions = ko.mapping.fromJS(data, {}, vm.positions);
        //    $.data(page, "positions", data);
        //});
        //同步获取职位下拉框相关数据
        $.ajax({
            type: "post",
            url: "/Service/GetAllPostionAjax",
            data: {},
            async: false,
            success: function (data) {
                vm.positions = ko.mapping.fromJS(data, {}, vm.positions);
                $.data(page, "positions", data);
            }
        });
    }
    $("#dlgInterviewInvite").on("shown.bs.modal", function () {
      
        //获取可用额度
        $.get("/ServiceHR/GetBalanceAvailabel", {}, function (data) { vm.balanceAvailable(data.content + 0.0); });
          
       vm.positions = ko.mapping.fromJS($.data(page, "positions"), {}, vm.positions);
        
    })
});

//发送面试邀请点击事件
function DoInviteInterviewBat() {
    var model = ko.toJS(page.VM.InterviewInviteVM);

    if ($("#form_InterviewInvite").valid()) {
		//console.info("abc");
        //邀请面试前先获取可用额度 
        $.get("/ServiceHR/GetBalanceAvailabel", {}, function (data) {
			//console.info("/ServiceHR/GetBalanceAvailabel");
            model.balanceAvailable = data.Content;
            //计算累计补贴
            var allowanceSum = model.selectedPerson.length * model.allowance;
            //console.info(model.balanceAvailable); 
			//console.info(allowanceSum); 
			//return false;
            //与可用额度判断
            if (model.balanceAvailable < allowanceSum) {
                myModal.alert("当前面试需要付出补贴 " + allowanceSum + " ,您的当前可用额度为" + model.balanceAvailable + " ,请返回修改或先充值!");
                return false;
            }
            else {
				//console.info("/service/InviteInterviewBat");
                $.post("/service/InviteInterviewBat", {
                    JobID: model.position,
                    AppoimentDate: model.date,
                    AppoimentTime: model.time1+model.time2,
                    //AvailableDate: vm.InterviewInviteVM.available,
					InterviewAddr:model.InterviewAddr,
					Linkman:model.Linkman,
					LinkPhone:model.LinkPhone,
                    Allowance: model.allowance,
                    MessageTempl: model.messaageTempl,
                    InterviewRequirement: model.otherrequire,
                    persons: model.selectedPerson
                }, function (data) {
                    if (data.Code == 0) {
                        myModal.confirm("邀请已成功发出!").on(function (r) {
                            $("#dlgInterviewInvite").modal("hide");
                            //location.reload();
                        });
                    }
					else
						{
						//console.info(data.Message);
						myModal.alert(data.Message);
						}
                });
            }
        });
    }
}


