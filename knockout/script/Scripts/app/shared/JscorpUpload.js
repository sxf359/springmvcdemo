 
/**
 * 
 必需组件
 
    <link href="~/assets/global/plugins/bootstrap/css/bootstrap.css" rel="stylesheet" />
    <link href="~/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" />
    <link href="~/assets/global/plugins/jcrop/css/jquery.Jcrop.css" rel="stylesheet" />

    <script src="~/Scripts/plugins/jquery-1.10.2.js"></script>
    <script src="~/Scripts/plugins/plupload/js/plupload.full.min.js"></script>
    <script src="~/Scripts/plugins/LMSoft/myUploader.js"></script>
    <script src="~/Scripts/plugins/LMSoft/myModal.js"></script>
    <script src="~/assets/global/plugins/bootstrap/js/bootstrap.js"></script> 
    <script src="~/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js"></script> 
    <script src="~/assets/global/plugins/holder.js"></script>
    <script src="~/assets/global/plugins/jcrop/js/jquery.color.js"></script>
    <script src="~/assets/global/plugins/jcrop/js/jquery.Jcrop.min.js"></script> 
    <script src="~/Scripts/app/JscorpUpload.js"></script>
 */

// The variable jcrop_api will hold a reference to the Jcrop API once Jcrop is instantiated.
var jcrop_api;
var cropOptions = {
    bgOpacity: .6,
    allowSelect: true,
    allowMove: true,
    allowResize: true,
    minSize: [80, 80],
    maxSize: [350, 350],
    aspectRatio: 1.6, //长宽比例
    onSelect: updateCoords
};
function updateCoords(c) {
    $('#crop_x').val(c.x);
    $('#crop_y').val(c.y);
    $('#crop_w').val(c.w);
    $('#crop_h').val(c.h);
};
$(function () { 
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

    // fileinput 初始化
    $('.fileinput').on('change.bs.fileinput', function (event, data) {
        if (typeof (data) == "undefined") {
            myModal.alert("文件格式不对?正确的图片文件格式是*.jpg,*.png,*.gif,*.bmp");
            return false;
        }
        else if (data.size > 1024 * 360) {
            myModal.alert("上传文件请不要超过300K!");
            return false;
        } else {
            //1.先上传图片
            MyUploader.upload(
                $("#file_upload")[0],
                {
                    multipart_params: { "FileCategory": "images/avatar/original", width: $('.fileinput-preview img').width(), height: $('.fileinput-preview img').height() }
                });
            //2.初始化裁剪
            $('.fileinput-preview img').Jcrop(cropOptions, function () {
                jcrop_api = this;
            });
        }
    })

    $('#uploadimg_button').click(function () {
        myModal.alert(parseInt($('#crop_w').val()));
        if (!!!parseInt($('#crop_w').val()))
            myModal.alert('请选择裁剪区域后再上传!');
        else {
            $('#uploadimg_form')[0].submit();
        }
        return false;
    });
})

//兼容IE和火狐   缩小放大、缩放
function zoom(zoom) {
    var $Img = $('.fileinput-preview img');
    if (zoom) {
        $Img.width($Img.width() * 1.1);
        $Img.height($Img.height() * 1.1);
    }
    else {
        $Img.width($Img.width() * 0.9);
        $Img.height($Img.height() * 0.9);
    }
}
//平移
function py(left) {
    var $Img = $('.fileinput-preview img');
    if (left) {
        $Img.css("margin-left", (isNaN(parseInt($Img.css("margin-left"))) ? 0 : parseInt($Img.css("margin-left"))) - 5 + "px");
    }
    else {
        $Img.css("margin-left", (isNaN(parseInt($Img.css("margin-left"))) ? 0 : parseInt($Img.css("margin-left"))) + 5 + "px");
        //console.log((isNaN(parseInt($Img.css("margin-left"))) ? 0 : parseInt($Img.css("margin-left"))));
    }
}
