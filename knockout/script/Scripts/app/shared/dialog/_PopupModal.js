var page = page || { VM: {} };
var PopupModal = {
    option: { title: "对话框标题",modallg:false,hideFooter:true,showCloseButton:false,showOKButton:false,
    ok:false },
    templateToUse: "tmpl_blank",
    datas: [],
    data: {}
}; 

page.VM.PopupModalVM = ko.mapping.fromJS(PopupModal);

$(function () {
    createscript();
});

function createscript(){
    var dom = document.getElementsByTagName("head")[0];
    var sc = document.createElement("script");
    sc.setAttribute("type", "text/html");
    sc.setAttribute("id", "tmpl_blank"); 
    dom.appendChild(sc);
}
//$(function () {
//    $("#dlgInterviewInvite").on("shown.bs.modal", function () {

//        //模态框弹出后初始化界面
//        $(".select2").select2({
//            allowClear: true,
//            multiple: false,
//            minimumInputLength: 0, //you can specify a min. query length to return results
//            minimumResultsForSearch: -1, //-1时不显示搜索框
//            maximumSelectionSize: 5,   // 限制数量
//            dropdownParent: "#dlgInterviewInvite",
//            initSelection: function (element, callback) {   // 初始化时设置默认值  
//                var id = $(element).val();
//                if (id !== "") {
//                    $.ajax("/Service/GetAllPostionAjax", {
//                        data: { id: id },
//                        dataType: "json"
//                    }).done(function (data) {
//                        callback(data[0]);
//                    });
//                }
//            },
//            ajax: {
//                cache: false,
//                dataType: "json",
//                type: "GET",
//                url: "/Service/GetAllPostionAjax",
//                data: function (searchTerm) {
//                    return { id: searchTerm };
//                },
//                results: function (data) {
//                    return { results: data };
//                }
//            },
//            formatResult: function (item) { // 搜索列表中的显示
//                return item.name;
//            },
//            formatSelection: function (item) {// 选择结果中的显示 
//                page.VM.InterviewInviteVM.allowance(item.allowance);
//                return item.name;
//            },
//            escapeMarkup: function (m) { return m; }
//        }); 
         
//    })
//});
/* 几种用法
 * 
 function showInterviewInvite() {
    page.VM.PopupModalVM.option.title("邀请面试");     
    $("#dlgPopupModal").modal("show");
}
*/