假设html页面有有一个class为add_test_img的标签，需要通过ajax访问后台，
并在add_test_img标签中显示一些相关内容，在内容显示之前，可对add_test_img标签使用遮罩，
防止在数据显示之前，被修改其中的内容


//显示遮罩
$(".add_test_img").showLoading();  
//ajax调用
$.ajax({
    type: "GET",
    url: "Api.php",
    data: {ApiTarget: 'TestImage', op: 'paginateByClassId', prj_id: prj_id, class_id:class_id, page: index, per_page: items_per_page, user_id: user_id, start_date:start_date_str, end_date:end_date_str},
    success: function(response){
        //对返回数据进行处理，并显示
        //......
        //去除遮罩
        $(".add_test_img").hideLoading();
    },
    error: function(xhr) {
        //显示失败信息
        //......
        //去除遮罩
        $(".add_test_img").hideLoading();
    }
});