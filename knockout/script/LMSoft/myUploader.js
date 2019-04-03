
var UPLOADER;

var MyUploader = function () {
    if (navigator.userAgent.indexOf("MSIE") > -1 && $.browser.version < 11) {
        alert("此功能在IE11以下的的ie浏览器中不能使用，建议更换浏览器为搜狗,360,firefox或chrome浏览器");
        return false;
    }
    function init(opt) {
        var defaultUploadOption = {
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: 'pickfiles', // you can pass in id...
            container: $('#uploadimg_form')[0], // ... or DOM Element itself
            url: '/CommonService/upload',
            flash_swf_url: '/Scripts/Moxie.swf',
            silverlight_xap_url: '/Scripts/Moxie.xap',
            filters: {
                max_file_size: '10mb',
                mime_types: [
                    { title: "Image files", extensions: "jpg,gif,png,jpeg" },
                    { title: "Zip files", extensions: "zip" },
                    { title: "Word files", extensions: "doc,docx" }
                ]
            },
            init: {
                PostInit: function () { },
                FilesAdded: function (up, files) { },
                UploadProgress: function (up, file) { },
                FileUploaded: function (up, file, info) {
                    // saveAvatar(JSON.parse(info.response).filename);  
                },
                Error: function (up, err) { }
            }
        };
        var uploadOption = $.extend(true, defaultUploadOption, opt);

        UPLOADER = new plupload.Uploader(uploadOption);

        UPLOADER.init();

    }
    return {
        init: function (opt) {
            init(opt);
        },
        upload: function (file, option) { //调用方法  MyUploader.upload($("#file_Avatar")[0],{ multipart_params: { "FileCategory": "images/图片类别" } });  
            if (option) UPLOADER.setOption(option); 
            UPLOADER.addFile(file); 
            UPLOADER.start();
            return;
        }
    }
}();

/* 
用法:

//MyUploader上传文件初始化
var uploadoption = {
    browse_button: 'pickfiles',
    container: $('#image_form')[0],
    init: {
        FileUploaded: function (up, file, info) { 
            $("#imgsrc").val(JSON.parse(info.response).filename); 
        }
    }
} 
MyUploader.init(uploadoption);

//上传文件
MyUploader.upload(
    $("#file_upload")[0],
    {
        multipart_params: { "FileCategory": "images/avatar/original", width: $('.fileinput-preview img').width(), height: $('.fileinput-preview img').height() }
    });                 
*/
