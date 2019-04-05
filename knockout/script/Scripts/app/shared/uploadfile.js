var UPLOADER;
var page = page || { VM: {} };
var uploadfile = {
    option: { title: "标题 ...", "fileCategory": "images" },
    image: ""
};

var MyUploader = function () {
    function init(opt) {
        var defaultUploadOption = {
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: 'pickfiles', // you can pass in id...
            container: $('#uploadimg_form')[0], // ... or DOM Element itself
            url: '/CommonService/upload',
            flash_swf_url: '/Scripts/Moxie.swf',
            silverlight_xap_url: '/Scripts/Moxie.xap',
            filters: {
                max_file_size: '1mb',
                mime_types: [
                    { title: "Image files", extensions: "jpg,jpeg,gif,png" },
                    { title: "Zip files", extensions: "zip" }
                ]
            },
            init: {
                PostInit: function () { },

				FileFiltered:function(up,file){
					//console.info(file.size);
					//console.info(plupload.FILE_SIZE_ERROR);

				},
                FilesAdded: function (up, files) {
					plupload.each(files, function(file) {
				    console.info(file.id);
					});

			 
				},
                UploadProgress: function (up, file) { },
                FileUploaded: function (up, file, info) {
                     
                    //console.log("FileUploaded");
                },
                //调用组件错误处理
                Error: function (up, err) {
                    //console.info(err.code);
                    //console.info(err.message);
                    //console.info(up.settings.filters.max_file_size);
                    //console.info(up.settings.filters.mime_types[0].extensions); 
                    if(err.code==-600)
                    {
                        alert("上传图片最大不能超过" + up.settings.filters.max_file_size);
                        up.removeFile(err.file);
                        $("#uploadfile").modal("hide");
                    }
                    if(err.code==-601)
                    {
                        alert("上传图片类型只能是以下类型：" + up.settings.filters.mime_types[0].extensions);
                        $("#uploadfile").modal("hide");
                    }
				}
            }
        };
        var uploadOption = $.extend(true, defaultUploadOption, opt);

        UPLOADER = new plupload.Uploader(uploadOption);

        UPLOADER.init();
    }

    this.showUpload = function () {
        //console.info($("#uploadfile").modal);
        $("#uploadfile").modal("show");
    }
    this.closeUpload = function () {
        $("#uploadfile").modal("hide");
    }

    this.uploadImage = function (file, imgtype, _callback) {
        uploadFile(file, { FileCategory: "images/" + imgtype, filename: "" }, _callback);
    }

    function uploadFile(file, options, _callback) {
        data = new FormData();
        data.append("file", file);
        data.append("FileCategory", options.FileCategory);
        data.append("filename", options.filename);
        $.ajax({
            data: data,
            type: "POST",
            url: "/CommonService/upload",/*后台上传文件的路径*/
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if ($.isFunction(_callback)) _callback(data);
            }
        });
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
        },
        showUpload: this.showUpload,
        closeUpload: this.closeUpload,
        uploadImage: this.uploadImage
    }
}();

/*  MyUploader 用法 
 * 
 引用样式文件
    <link href="~/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" />

    <script src="~/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js"></script> 
    <script src="~/Scripts/plugins/datetime.js"></script>
引用plupload
    <script src="~/Scripts/plugins/plupload/js/plupload.full.min.js"></script>
    <script src="~/Scripts/plugins/plupload/js/i18n/zh_CN.js"></script> 
引用自身js
    <script src="~/Scripts/app/shared/uploadfile.js"></script>
    
    page.VM.uploadfileVM.option.title("照片上传");
    page.VM.uploadfileVM.option.fileCategory("products/" + (new Date()).format("yyyy-MM-dd"));

    var uploadoption = {
        //browse_button: 'pickfiles',
        //container: $('#image_form')[0],
        init: {
            FileUploaded: function (up, file, info) {
                page.VM.activeContent.PicturesA().push(JSON.parse(info.response).filename);
                page.VM.activeContent.Images(page.VM.activeContent.PicturesA().join(';')); 
            }
        }
    }
    MyUploader.init(uploadoption);

 */
    page.VM.uploadfileVM = ko.mapping.fromJS(uploadfile);
$(function () {

    $('#image_div').on('change.bs.fileinput', function (event, data) { 
        MyUploader.upload($("#file_upload")[0], { multipart_params: { "FileCategory": "images/" +page.VM.uploadfileVM.option.fileCategory() } });
    })
});

