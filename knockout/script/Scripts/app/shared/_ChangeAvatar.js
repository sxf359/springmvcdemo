
/* 几种用法
 * 
 *依赖文件:
 
    <link href="~/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" />

    <script src="~/assets/global/plugins/holder.js"></script>
    <script src="~/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js"></script>
    <script src="~/Scripts/plugins/datetime.js"></script>
    <script src="~/Scripts/plugins/plupload/js/plupload.full.min.js"></script>
    <script src="~/Scripts/plugins/plupload/js/i18n/zh_CN.js"></script>
    <script src="~/Scripts/app/shared/_ChangeAvatar.js"></script>

 function showInterviewInvite() {
    page.VM.PopupModalVM.option.title("邀请面试");     
    $("#PopupModal").modal("show");
}
*/

var page = page || { VM: {} };
var ChangeAvatar = {
    option: {
        title: "上传头像",
        modallg: false,
        hideFooter: true,
        showCloseButton: false,
        showOKButton: false,
        ok: false,
        fileSize: 300,
        fileType: "images/avator/" + (new Date()).format("yyyy-MM-dd")
    },
    datas: [],
    data: {}
}; 

page.VM.ChangeAvatarVM = ko.mapping.fromJS(ChangeAvatar);
var changeAvatarVM = page.VM.ChangeAvatarVM;

$(function () { 
    //1.图片选择后先判断图片是否符合条件
    $('.fileinput').on('change.bs.fileinput', function (event, data) {
        if (typeof (data) == "undefined") {
            myModal.alert("图片格式不对?正确的图片文件格式是*.jpg,*.png,*.gif,*.bmp");
            page.headphotoOK = false;
            return false;
        }
        else if (data.size > 1024 * changeAvatarVM.option.fileSize()) {
            myModal.alert("上传图片请不要超过" + changeAvatarVM.option.fileSize() + "K!");
            console.log($(this));
            $('#headphoto_div').fileinput('clear');
            page.headphotoOK = false;
            return false;
        } else {
            $(".logo").attr("src", data.result);
            page.headphotoOK = true;
        }
    }).bind(this);

    //2.设置上传参数,使得上传图片成功后保存图片信息到账户信息表
    var uploadoption = {
        browse_button: 'pickfiles',
        container: $('#image_form')[0],
        init: {
            FileUploaded: function (up, file, info) {
                $("#imgsrc").val(JSON.parse(info.response).filename);
                saveHeadPhoto(JSON.parse(info.response).filename);
            }
        }
    }
    MyUploader.init(uploadoption);

});  

//上传图片
function uploadHeadPhoto() {
    //console.log(changeAvatarVM.option.fileType());

    MyUploader.upload(
        $("#file_headphoto")[0],
        { multipart_params: { "FileCategory": changeAvatarVM.option.fileType(), width: 0, height: 0 } });
    return false;
}

//保存图片路径
function saveHeadPhoto(photopath) { 
    if (page.headphotoOK) {
        var url = "/Account/SaveHeadPhoto";
        var data = {
            photopath: photopath //,        __RequestVerificationToken: verificationToken
        };
        var callback = function () {
            //$("body").hideLoading();
            myModal.info({ msg: '头像上传成功' });
            page.headphotoOK = false;
        };
        //$("body").showLoading();
        $.post(url, data, callback);
    }
    else {
        myModal.alert("请先选择适合大小的照片!");
    }
}