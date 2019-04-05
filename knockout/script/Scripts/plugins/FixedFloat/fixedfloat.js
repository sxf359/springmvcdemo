/*
微信图片固定浮动右边中部代码
*/
var adRightweixin = $(window).width()-120;                  //右边对联广告离网页距离
 
  

//ready事件
$(function() {
    //DOM加载完后执行
    //resizeAdPostion();
    scrollFloat();
    //从加载后，每隔一秒就执行一次
    //setInterval("resizeAdPostion()",1000); 
    //scroll事件
    $(window).scroll(function() {
        //resizeAdPostion();
        scrollFloat();
    });

    $("#close").click(function() {
        $("#oldAdRight").hide();
    });

}); 


//重新设置对联广告左右之间的距离
function resizeAdPostion()
{
   
    var adRightBar = ($(window).width() - 768) / 2 + 770;                  //右边对联广告离网页距离
    
	 
	$("#oldAdRight").css("left",adRightBar+"px");
}

function scrollFloat(){
	  
	//滚动条到顶部高度
	var scrollY=$(window).scrollTop();
	//console.info($("#oldAdRight").offset());
	//浏览器窗口高度
	var clientH = $(window).height();
	//console.info(clientH); 
	var floatY=0; 
	floatY=clientH/2+scrollY-200; 
	//console.info(floatY);
	$("#oldAdRight").css("top",floatY+"px"); 
} 

document.writeln("<div id=oldAdRight style='LEFT:" + adRightweixin + "px; POSITION: absolute; width: 100px; height:100px;background:#ffffff;'>");
document.write('<div style="float:right;" id="close"><i class="fa fa-close"  style="cursor:pointer;display:block;"></i></div>');
document.write('<div><img src="/gallery/images/logo/weixinsmall.jpg" style="width:100px;height:100px;" /></div>');
document.write('<div class="text-center" style="background:#ffffff;">关注jrms968</div>');
document.write('<div class="text-center" style="background:#ffffff;">求职更方便</div>');
document.writeln("</div>");
 