var QuestionLibrary = {
    GID: "",
    IID: "",
    Title: "",
    Sort: "",        //科目
    Type: "",        //题型
    Option1: "",
    Option2: "",
    Option3: "",
    Option4: "",
    Answer: "",
    AnswerContent: "",
    ImgUrl: "",     //图片地址
    VoiceUrl: "",  //音频地址
    VideoUrl: "",  //视频地址
    TextExplain: "",//文字讲解
    SimilarQuestionIids: "", //相似题
    Keywords:"",  //关键词
    Index: 0,     //practice页面右上角题目的索引，从1开始，不上javascript的从0开始
    ExamGID: "",    //考试ExamMain表的gid
    TestType: "",    //测试类型 1：单元练习unit  2：学习测试test 3:仿真考试Simulation
    Total: 0,   //加载题库的总数量
    kewordsHighlight: 0,  //关键词高亮
    dianzanVM: { ding: 0, cai: 0 }, //点赞初始化
    maxPage:0,  //评论最大分页数
    pinglunVM:[]      //评论初始化


};
//会员信息绑定
page.VM.UserVM = ko.mapping.fromJS({ RealName: "", IdCard: "", Role: "" });
page.VM.QuestionLibraryVM = ko.mapping.fromJS(QuestionLibrary);
page.VM.ResultVM = ko.mapping.fromJS({
    sum: 0,
    right: 0,
    wrong: 0

});
//点赞初始化
//page.VM.QuestionLibraryVM.dianzanVM = { ding: 0, cai: 0 };

//未答题初始化
page.VM.ResultVM.no = ko.pureComputed(function () {

    return page.VM.ResultVM.sum() - page.VM.ResultVM.right() - page.VM.ResultVM.wrong();
}, this);
//首正率初始化
page.VM.ResultVM.ratio = ko.pureComputed(function () {
    if (page.VM.ResultVM.sum() <= 0) {
        return 100;
    }

    return ((page.VM.ResultVM.sum() - page.VM.ResultVM.wrong()) / page.VM.ResultVM.sum()).toFixed(4) * 100;
}, this);
//成功答题初始化
page.VM.ResultVM.success = ko.pureComputed(function () {
    if (page.VM.QuestionLibraryVM.TestType() == "Simulation" && page.VM.UserVM.Role() == "科目四") {
        return page.VM.ResultVM.right() * 2;
    }
    else {
        return page.VM.ResultVM.right();
    }

}, this);



//js加载开始///////////////////////////////////////////////
$(function () {
    //初始化为非选择状态
    $("input[name='chk']:checkbox").prop("checked", false);
     //初始化会员信息
    $.ajax({
        url: "/member/GetMemberInfo",
        async: false,
        type:"post",
        data: {},
        success(data) {
            //console.info(data);
            page.VM.UserVM = ko.mapping.fromJS(data, {}, page.VM.UserVM);
        }
    });   
     
    $(".pointbox:first").addClass("pointboxcurrent");
    if (!$.isNumeric($(".pointbox:first").attr("id")))  //非数值，则获取参数错误，刷新页面
    {
        history.back();
        return;
    }
    $.post("/member/GetQuestionLibrary", { iid: $(".pointbox:first").attr("id") }, function (data) {
        //console.info(data);
        page.VM.QuestionLibraryVM = ko.mapping.fromJS(data, {}, page.VM.QuestionLibraryVM);
        page.VM.QuestionLibraryVM = ko.mapping.fromJS({ Index: 1 }, {}, page.VM.QuestionLibraryVM);
        
        RandomChangeOptionOrder();
        ShowSimilarQuestion();

    });

    page.VM.ResultVM.sum($(".pointbox").length);

    //继续上次答案默认值加载开始///////////////////////////////////////////////////
    GetLastExamInit();

    //关键词高亮开关
    $("#kewordsHighlight").click(function () {
        //console.info($(this).prop("checked"));
        if ($(this).prop("checked"))
        {
            page.VM.QuestionLibraryVM.kewordsHighlight(1);
            //title替换
            var keyword = page.VM.QuestionLibraryVM.Keywords();
            var title = keywordHighlight(page.VM.QuestionLibraryVM.Title(), keyword);
            page.VM.QuestionLibraryVM.Title(title);
            //option1替换
            var option1 = keywordHighlight(page.VM.QuestionLibraryVM.Option1(), keyword);
            page.VM.QuestionLibraryVM.Option1(option1);
            //option2替换
            var option2 = keywordHighlight(page.VM.QuestionLibraryVM.Option2(), keyword);
            page.VM.QuestionLibraryVM.Option2(option2);
            //option3替换
            var option3 = keywordHighlight(page.VM.QuestionLibraryVM.Option3(), keyword);
            page.VM.QuestionLibraryVM.Option3(option3);
            //option4替换
            var option4 = keywordHighlight(page.VM.QuestionLibraryVM.Option4(), keyword);
            page.VM.QuestionLibraryVM.Option4(option4);

        }
        else
        {
            page.VM.QuestionLibraryVM.kewordsHighlight(0);
            //title替换
            var keyword = page.VM.QuestionLibraryVM.Keywords();
            var title = cancelKeywordHighlight(page.VM.QuestionLibraryVM.Title());
            page.VM.QuestionLibraryVM.Title(title);
            //option1替换
            var option1 = cancelKeywordHighlight(page.VM.QuestionLibraryVM.Option1());
            page.VM.QuestionLibraryVM.Option1(option1);
            //option2替换
            var option2 = cancelKeywordHighlight(page.VM.QuestionLibraryVM.Option2());
            page.VM.QuestionLibraryVM.Option2(option2);
            //option3替换
            var option3 = cancelKeywordHighlight(page.VM.QuestionLibraryVM.Option3());
            page.VM.QuestionLibraryVM.Option3(option3);
            //option4替换
            var option4 = cancelKeywordHighlight(page.VM.QuestionLibraryVM.Option4());
            page.VM.QuestionLibraryVM.Option4(option4);
        }
    });

    //右上角题库列表点击事件显示中间和下部内容
    $(".pointbox").click(function () {
        //初始化为非选择状态
        $("input[name='chk']:checkbox").prop("checked", false);

        //重置交规图的高度为原来的值
        //$("#jiaoguitu").css({ "height": "179px", "width": "auto" });
        //重置文字讲解部分为隐藏
        //$("#jiaoguitu").parent().next().hide();

        $.jPlayer.pause();  //先停止页面中的所有jplayer播放
        $("#dianzan").hide();  //点赞部分隐藏
        $("#pinglun").hide();   //评论部分隐藏

        var self = $(this);
        //console.info($(this).attr("id"));
        $(".pointboxcurrent").removeClass("pointboxcurrent");
        if (!$(this).hasClass("pointboxcurrent")) {
            $(this).addClass("pointboxcurrent");
        }
        //初始化页面中间题目相关信息
        var index = $(".pointbox").index($(this)) + 1;
        var tmp = new Date().getTime();
        //console.info($.type($(this).attr("id")));
        if (!$.isNumeric(self.attr("id")))  //非数值，则获取参数错误，刷新页面
        {
            location.reload();
            return;
        }
        $.post("/member/GetQuestionLibrary", { iid: $(this).attr("id"), tmp: tmp }, function (data) {
            //console.info( data);
            //console.info("type:" + $.type(data));
            if ($.type(data) === "string") {
                if (data.indexOf("超时已过期，请重新登录！") >= 0) {
                    location.href = "/account/login?error=5";
                }
                else if (data.indexOf("你的帐号已在别处登录，您被强迫下线！") >= 0) {
                    location.href = "/account/login?error=-1";
                }
                else {
                    location.href = "/account/login";
                }
                return;
            }
            page.VM.QuestionLibraryVM = ko.mapping.fromJS(data, {}, page.VM.QuestionLibraryVM);
            page.VM.QuestionLibraryVM = ko.mapping.fromJS({ Index: index }, {}, page.VM.QuestionLibraryVM);

            //console.info(page.VM.QuestionLibraryVM.height());
            //还没答案，随机排序
            if ($.IsNullOrEmpty(self.find("span").text())) {
                //console.info("随机");
                RandomChangeOptionOrder();
            }
            //已有答案，使用记忆的选项排序
            else {
                //console.info("记忆");
                RememberRandomChangeOptionOrder(self);
            }

            GetThisAnswer(self);
            $.unblockUI();
            ShowSimilarQuestion();

            if (page.VM.QuestionLibraryVM.kewordsHighlight() == 1)
            {
                //title替换
                var keyword = page.VM.QuestionLibraryVM.Keywords();
                var title = keywordHighlight(page.VM.QuestionLibraryVM.Title(), keyword);
                page.VM.QuestionLibraryVM.Title(title);
                //option1替换
                var option1 = keywordHighlight(page.VM.QuestionLibraryVM.Option1(), keyword);
                page.VM.QuestionLibraryVM.Option1(option1);
                //option2替换
                var option2 = keywordHighlight(page.VM.QuestionLibraryVM.Option2(), keyword);
                page.VM.QuestionLibraryVM.Option2(option2);
                //option3替换
                var option3 = keywordHighlight(page.VM.QuestionLibraryVM.Option3(), keyword);
                page.VM.QuestionLibraryVM.Option3(option3);
                //option4替换
                var option4 = keywordHighlight(page.VM.QuestionLibraryVM.Option4(), keyword);
                page.VM.QuestionLibraryVM.Option4(option4);
            }
           
        });

    });


    //对错按钮点击事件开始///////////////////////////////////////////////////////////////////////////
    $(".btnRight").click(function () {
        //如果是仿真考试，则答案只能选择一次
        if (page.VM.QuestionLibraryVM.TestType() == "Simulation") {
            if ($(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).find("span").text() > "") {
                return;
            }
        }
        var thisAnswer = "";
        var myAnswer;     //我的答案对于正确答案来说是对是错
        var userAnswer;  //会员所选的答案
        if ($(".btnRight").index($(this)) == 0) {
            userAnswer = "Y";  //×√

            if (page.VM.QuestionLibraryVM.Answer() == "Y") {
                myAnswer = "right";
            }
            else {
                myAnswer = "wrong";
            }

            if (page.VM.QuestionLibraryVM.Answer() == "N") {
                AlertRightAnswer();

            }


        }
        else {
            userAnswer = "N";

            if (page.VM.QuestionLibraryVM.Answer() == "Y") {
                myAnswer = "wrong";
            }
            else {
                myAnswer = "right";
            }
            if (page.VM.QuestionLibraryVM.Answer() == "Y") {
                AlertRightAnswer();
            }

        }
        thisAnswer += userAnswer == "Y" ? "<img src='/gallery/images/system/chs_1.png' style='margin-right:15px;' />" : "<img src='/gallery/images/system/chs_2.png' style='margin-right:15px;' />";
        thisAnswer += page.VM.QuestionLibraryVM.Answer() == userAnswer ? "<img src='/gallery/images/system/right.bmp' style='height:32px;' />" : "<img src='/gallery/images/system/wrong.bmp' style='height:32px;' />";
        thisAnswer += "正确答案：" + (page.VM.QuestionLibraryVM.Answer() == "Y" ? "<img src='/gallery/images/system/chs_1.png' style='margin-right:15px;' />" : "<img src='/gallery/images/system/chs_2.png' style='margin-right:15px;' />")
        //thisAnswer赋值
        $("#thisAnswer").html(thisAnswer);
        ShowOrHideTextPlain();

        if (myAnswer == "wrong") {
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).find("span").text("×");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxnull");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxright");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxcurrent");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).addClass("pointboxwrong")
        }
        else {
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).find("span").text("√");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxnull");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxwrong");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxcurrent");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).addClass("pointboxright");
        }
        if ($.IsNullOrEmpty($.getUrlParam("examMainGid"))) {
            RebindResult();
        }




        UpdateExamAboutByParam(userAnswer);
        playAudioPrompt(page.VM.QuestionLibraryVM.Answer(), userAnswer);


    });
    //对错按钮点击事件结束///////////////////////////////////////////////////////////////////////////

    $(".btn40").click(function () {
        //如果是仿真考试，则答案只能选择一次
        if (page.VM.QuestionLibraryVM.TestType() == "Simulation") {
            if ($(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).find("span").text() > "") {
                return;
            }
        }
        //console.info("ab");
        //当是多选时，按钮作用是使选项处于勾选状态
        if (page.VM.QuestionLibraryVM.Type() == "多选") {
            //console.info("c");
            var index = $(".btn40").index($(this));
            with ($("#datiOption p").eq(index).find(":input")) {
                if (prop("checked")) {
                    prop("checked", false);
                }
                else {
                    prop("checked", true);
                }
            }


        }   //多选操作结束

        //单选操作
        if (page.VM.QuestionLibraryVM.Type() == "单选") {
            var thisAnswer = "";
            var index1 = $(".btn40").index($(this));
            var myAnswer;  //短答案
            var myAnswerContent;  //文本答案
            if (index1 == 0) {
                myAnswerContent = $("#datiOption p").eq(index1).find("span").eq(1).text();
                myAnswer = "A";
            }
            else if (index1 == 1) {
                myAnswerContent = $("#datiOption p").eq(index1).find("span").eq(1).text();
                myAnswer = "B";
            }
            else if (index1 == 2) {
                myAnswerContent = $("#datiOption p").eq(index1).find("span").eq(1).text();
                myAnswer = "C";
            }
            else if (index1 == 3) {
                myAnswerContent = $("#datiOption p").eq(index1).find("span").eq(1).text();
                myAnswer = "D";
            }
            //答案显示部分
            thisAnswer += myAnswer;
            if (myAnswer == page.VM.QuestionLibraryVM.Answer()) {
                thisAnswer += "<img src='/gallery/images/system/right.bmp' style='height:32px;' />";
            }
            else {
                thisAnswer += "<img src='/gallery/images/system/wrong.bmp' style='height:32px;' />";
                AlertRightAnswer();
            }
            thisAnswer += "正确答案：" + page.VM.QuestionLibraryVM.Answer();
            $("#thisAnswer").html(thisAnswer);
            ShowOrHideTextPlain();

            //右上角题目列表部分
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).find("span").text(myAnswer);
            //给data-sequence赋值
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).data("sequence", getOptionSequence());
            //console.info("answer:" + page.VM.QuestionLibraryVM.Answer());
            //console.info("option:"+getOptionSequence());
            //console.info("sequence:" + $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).data("sequence"));
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxnull");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxright");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxcurrent");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxright");
            $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxwrong");
            if (myAnswer == page.VM.QuestionLibraryVM.Answer()) {
                $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).addClass("pointboxright");
            }
            else {
                $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).addClass("pointboxwrong");
            }

            if ($.IsNullOrEmpty($.getUrlParam("examMainGid"))) {
                RebindResult();
            }


            UpdateExamAboutByParam(myAnswerContent);

            playAudioPrompt(page.VM.QuestionLibraryVM.Answer(), myAnswer);
        }  //单选操作结束


    });

    //解决当视频在播放，但是窗口未获取焦点时，点击ESC键不能结束播放的问题
    $(window).keydown(function (event) {
        if (event.keyCode == 27) {
            $.jPlayer.pause();
            $("#jp_container_1").hide();
        }
    })

});  //js页面加载结束

/*
 * 多选提交的处理
 */
function MultiSel(item, e) {
    //如果是仿真考试，则答案只能选择一次
    if (page.VM.QuestionLibraryVM.TestType() == "Simulation") {
        if ($(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).find("span").text() > "") {
            return;
        }
    }
    var arr = [];
    var arrContent = [];
    $("input[name='chk']:checkbox").each(function (index) {
        if ($(this).prop("checked") === true) {
            arrContent.push($(this).val());
            if (index == 0) {
                arr.push("A");
            }
            else if (index == 1) {
                arr.push("B");
            }
            else if (index == 2) {
                arr.push("C");
            }
            else if (index == 3) {
                arr.push("D");
            }
        }
    });
    if (arrContent.length == 0) {
        alert("请选择答案");
        return;
    }

    //答案显示部分开始/////////////////////////////////////////////
    var thisAnswer = "";
    //短答案
    var myAnswer = arr.join();                //短答案，用逗号隔开
    var myAnswerContent = arrContent.join('|');  //文本答案，用竖号隔开
    thisAnswer += myAnswer;

    if (page.VM.QuestionLibraryVM.Answer() != myAnswer) {

        thisAnswer += "<img src='/gallery/images/system/wrong.bmp' style='height:32px;' />";
        playAudio();
        AlertRightAnswer();

    }
    else {

        thisAnswer += "<img src='/gallery/images/system/right.bmp' style='height:32px;' />";

    }
    thisAnswer += "正确答案：" + page.VM.QuestionLibraryVM.Answer();
    //thisAnswer赋值
    $("#thisAnswer").html(thisAnswer);
    ShowOrHideTextPlain();
    //答案显示部分结束/////////////////////////////////////////////

    //右上角题目列表部分
    $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).find("span").text(arr.join().replace(/\,/g, ""));
    //给data-sequence赋值
    $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).data("sequence", getOptionSequence());
    $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxnull");
    $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxright");
    $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxcurrent");
    $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxright");
    $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).removeClass("pointboxwrong");
    if (myAnswer == page.VM.QuestionLibraryVM.Answer()) {
        $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).addClass("pointboxright");
    }
    else {
        $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).addClass("pointboxwrong");
    }



    UpdateExamAboutByParam(myAnswerContent);

    if ($.IsNullOrEmpty($.getUrlParam("examMainGid"))) {
        RebindResult();
    }
    playAudioPrompt(page.VM.QuestionLibraryVM.Answer(), myAnswer);

}

/*
 * $ele:鼠标点击的当前jquery对象
 * 功能：给thisAnswer赋值
 */
function GetThisAnswer($ele) {
    //console.info($ele.find("span").text() == "");
    //console.info($ele.find("span").text() == null);
    //获取题目类型
    var tixing = $ele.data("type");
    if ($ele.find("span").text() == "") {
        $("#thisAnswer").html("");
        //console.info("abc");
    }
    else {
        var daan = $ele.find("span").text();
        var thisAnswer = "";
        //判断题开始////////////////////////////////////////////////////////////////////////////
        if (tixing == "判断") {
            var userAnswer;
            if (daan == "√") {
                if (page.VM.QuestionLibraryVM.Answer() == "Y") {
                    userAnswer = "Y";
                }
                else {
                    userAnswer = "N";
                }
            }
            else {
                if (page.VM.QuestionLibraryVM.Answer() == "Y") {
                    userAnswer = "N";
                }
                else {
                    userAnswer = "Y";
                }
            }


            thisAnswer += userAnswer == "Y" ? "<img src='/gallery/images/system/chs_1.png' style='margin-right:15px;height:32px;' />" : "<img src='/gallery/images/system/chs_2.png' style='margin-right:15px;height:32px;' />";

            //console.info(page.VM.QuestionLibraryVM.Answer());
            //console.info(userAnswer);
            //console.info(page.VM.QuestionLibraryVM.Answer() == userAnswer);
            thisAnswer += page.VM.QuestionLibraryVM.Answer() == userAnswer ? "<img src='/gallery/images/system/right.bmp' style='height:32px;' />" : "<img src='/gallery/images/system/wrong.bmp' style='height:32px;' />";


            thisAnswer += "正确答案：" + (page.VM.QuestionLibraryVM.Answer() == "Y" ? "<img src='/gallery/images/system/chs_1.png' style='margin-right:15px;height:32px;' />" : "<img src='/gallery/images/system/chs_2.png' style='margin-right:15px;height:32px;' />");
            $("#thisAnswer").html(thisAnswer);
           
        }
        //判断题结束////////////////////////////////////////////////////////////////////////////

        //多选题开始//////////////////////////////////////////////////////////////////////////////
        if (tixing == "多选") {
            var DaAn = daan.split('').join();
            thisAnswer += DaAn;
            if (DaAn == page.VM.QuestionLibraryVM.Answer()) {
                thisAnswer += "<img src='/gallery/images/system/right.bmp' style='height:32px;' />";                
            }
            else {
                thisAnswer += "<img src='/gallery/images/system/wrong.bmp' style='height:32px;' />";
                
            }
            thisAnswer += "正确答案：" + page.VM.QuestionLibraryVM.Answer();
            $("#thisAnswer").html(thisAnswer);
            //多选根据答案赋默认值
            var arr1 = daan.split('');
            //console.info(arr1.length);
            for (var i = 0; i < arr1.length; i++) {
                $("#datiOption p").each(function (index) {
                    if ($(this).find(".seloption").text().replace("、", "") == arr1[i]) {
                        $(this).find("[type='checkbox']").prop("checked", true);
                    }
                });
            }
        }
        //多选题结束//////////////////////////////////////////////////////////////////////////////

        //单选题开始//////////////////////////////////////////////////////////////////////////////
        if (tixing == "单选") {

            thisAnswer += daan;
            if (daan == page.VM.QuestionLibraryVM.Answer()) {
                thisAnswer += "<img src='/gallery/images/system/right.bmp' style='height:32px;' />";
            }
            else {
                thisAnswer += "<img src='/gallery/images/system/wrong.bmp' style='height:32px;' />";
            }
            thisAnswer += "正确答案：" + page.VM.QuestionLibraryVM.Answer();
            $("#thisAnswer").html(thisAnswer);

        }
        //单选题结束//////////////////////////////////////////////////////////////////////////////

    }
    ShowOrHideTextPlain();
}

/*
 * 获取继续上次答案默认值加载
 */
function GetLastExamInit() {
    if (!$.IsNullOrEmpty($.getUrlParam("examMainGid"))) {
        $.post("/member/GetLastExamResult", { examMainGid: $.getUrlParam("examMainGid") }, function (data) {
            if ($.isArray(data)) {
                //console.info(page.VM.QuestionLibraryVM.TestType());
                $.each(data, function (index, item) {

                    var $n;
                    if ($.IsNullOrEmpty(item.QuestionsLibraryAndSortGid)) {
                        $n = $(".pointbox[data-questionslibrarygid='" + item.QuestionsLibraryGid + "']");
                    }
                    else {
                        $n = $(".pointbox[data-gid='" + item.QuestionsLibraryAndSortGid + "']");
                    }

                    if (item.StudentAnswer == "Y" || item.StudentAnswer == "N") {
                        //给span赋值
                        if (item.IfRightAnswer == "yes") {
                            $n.find("span").text("√");
                        }
                        else {
                            $n.find("span").text("×");
                        }
                    }


                    if (item.StudentAnswer != "Y" && item.StudentAnswer != "N" && !$.IsNullOrEmpty(item.StudentAnswer)) {   //不是判断题
                        var optionSequenceArr = item.OptionSequence.split('|');

                        if (item.StudentAnswer.indexOf("|") == -1) {  //表示是一个答案
                            $.each(optionSequenceArr, function (index1, item1) {
                                if (item.StudentAnswer == item1) {
                                    $n.find("span").text(getOption(index1));
                                }
                            });
                        }
                        else {  //表示是多个答案
                            var myAnswerArr = item.StudentAnswer.split("|");
                            var thisArr = [];
                            $.each(optionSequenceArr, function (index1, item1) {  //遍历选项
                                $.each(myAnswerArr, function (index2, item2) {
                                    if (item1 == item2) {
                                        thisArr.push(getOption(index1));
                                    }
                                });
                            });

                            $n.find("span").text(thisArr.join().replace(/\,/g, ""));

                        }

                    }

                    if (item.IfRightAnswer == "yes") {
                        $n.removeClass("pointboxnull");
                        $n.addClass("pointboxright");
                    }
                    else if (item.IfRightAnswer == "no") {
                        $n.removeClass("pointboxnull");
                        $n.addClass("pointboxwrong");
                    }
                });

                RememberRandomChangeOptionOrder($(".pointbox:first"));
                GetThisAnswer($(".pointbox:first"));
                RebindResult();

            }

        });
    }
}

/*
 * 练习结果部分重新绑定
 */
function RebindResult() {
    var dui = $(".pointboxright").length;
    var cuo = $(".pointboxwrong").length;
    page.VM.ResultVM.right(dui);
    page.VM.ResultVM.wrong(cuo);
}



/*
 * 上一题按钮点击事件
 */
function LastQuestion(item, e) {
    $.blockUI({
        css: {
            border: 'solid silver 1px', color: '#999999 ', padding: '5px'
        }, message: '<h4><img src="/Content/images/loading-spinner-blue.gif" style="width:22px;height:22px;" /> 处理中，请等待...</h4>',
        timeout: 3000
    });
    if (page.VM.QuestionLibraryVM.Index() <= 1) {
        alert("已经是第一道题");
        $.unblockUI();
        return;
    }
    //初始化为非选择状态
    $("input[name='chk']:checkbox").prop("checked", false);
    var index = page.VM.QuestionLibraryVM.Index() - 2;
    //console.info(index);
    var self = $(".pointbox").eq(index);
    self.click();

}

/*
 * 下一题按钮点击事件
 */
function NextQuestion(item, e) {

    $.blockUI({
        css: {
            border: 'solid silver 1px', color: '#999999 ', padding: '5px'
        },
        message: '<h4><img src="/Content/images/loading-spinner-blue.gif" style="width:22px;height:22px;" /> 处理中，请等待...</h4>',
        timeout: 3000
    });
    var lastIndex = $(".pointbox").length;
    //console.info("start2");
    if (page.VM.QuestionLibraryVM.Index() >= lastIndex) {
        alert("已经是最后一道题");
        $.unblockUI();
        return;
    }
    //初始化为非选择状态
    $("input[name='chk']:checkbox").prop("checked", false);
    var index = page.VM.QuestionLibraryVM.Index();
    //console.info(index);
    var self = $(".pointbox").eq(index);
    //console.info("start3");
    self.click();


}


//题库排序弹出框
function ShowTestPaper(item, e) {
    if (page.VM.ResultVM.no() > 0) {
        myModal.confirm(
        {
            msg: "您还有" + page.VM.ResultVM.no() + "道题没有做，确认要交卷吗？"
        })
        .on(function (e) {
            if (!e) {
                return;
            }
            else {
                popResult();
            }
        });
    }
    else {
        popResult();
    }

}

/*
 * 仿真考试时间到，自动交卷
 */
function AutoShowTestPaper(item, e) {

    if (page.VM.QuestionLibraryVM.TestType() != "Simulation") {
        return;
    }
    popResult();

}

/**
 * 弹出窗口显示成绩
 */
function popResult() {
    var vm = page.VM.PopupModalVM;
    vm.option.title("试卷提交");
    vm.option.modallg(true);
    vm.option.showCloseButton(true);
    vm.option.showOKButton(true);
    //当弹出框中确定按钮不可用时，使其可用，此问题在firefox浏览器中出现
    if ($(".submit").attr("disabled") == "disabled") {
        $(".submit").removeAttr("disabled");
    }
    var Type = page.VM.UserVM.Role();
    var Sum = page.VM.ResultVM.sum();
    var Right = page.VM.ResultVM.right();
    var Wrong = page.VM.ResultVM.wrong();
    var sccess = page.VM.ResultVM.success();
    var Result = "";
    if (sccess >= 90) {
        Result = "恭喜，本次成绩为" + sccess + "分，成绩合格";
    }
    else {
        Result = "很遗憾，本次成绩为" + sccess + "分，成绩不及格";
    }

    vm.TestPaperVM = ko.mapping.fromJS({ Type: Type, Sum: Sum, Right: Right, Wrong: Wrong, Result: Result });
    vm.option.ok = function () { QuitTest(vm); };
    vm.templateToUse("tmpl_blank");
    vm.templateToUse("tmpl_TestPaper");
    $("#dlgPopupModal").modal("show");

    
    UpdateExamResult();
    return false;
}

//退出测试
function QuitTest(vm) {
    $("#dlgPopupModal").modal("hide");
    history.back();
}

/*
 * 更新试卷相关，仅需传入两个参数
 * thisId:本次题的IID
 * userAnswer：用户选择的答案
 * optionSequence:选项顺序
 */
function UpdateExamAboutByParam(userAnswer) {
    //如果在我的错题页面进行操作，或者在相似题，或者在已做测试页面操作，则不生成测试试卷
    if (page.VM.QuestionLibraryVM.TestType() == "myWrong" || page.VM.QuestionLibraryVM.TestType() == "MySimilar" || page.VM.QuestionLibraryVM.TestType() == "CompletedSimulation") {
        console.info("a");
        return;
    }
    //console.info("b");

    if (!$.IsNullOrEmpty($.getUrlParam("examMainGid"))) {
        page.VM.QuestionLibraryVM.ExamGID($.getUrlParam("examMainGid"));
    }
    var examName = page.VM.QuestionLibraryVM.TestType() + "-" + page.VM.UserVM.RealName() + "-" + Date.parse(new Date());
    var ids = [];
    var questionsLibraryAndSortGids = [];

    $(".pointbox").each(function () {
        ids.push($(this).attr("id"));
        questionsLibraryAndSortGids.push($(this).data("gid"));

    });


    var thisquestionsLibraryAndSortGid = $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).data("gid");
    var thisIid = parseInt($(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).attr("id"));
    var optionSequence = $(".pointbox").eq(page.VM.QuestionLibraryVM.Index() - 1).data("sequence");

    //插入或更新考试主表和附表
    UpdateExamAbout(page.VM.QuestionLibraryVM.ExamGID(), examName, questionsLibraryAndSortGids.join(), ids.join(), thisquestionsLibraryAndSortGid, thisIid, userAnswer, page.VM.QuestionLibraryVM.AnswerContent(), optionSequence)
    //console.info("d");

    //记录会员的学习进度
    if (page.VM.QuestionLibraryVM.TestType() == "unitRandom" || page.VM.QuestionLibraryVM.TestType() == "unit") {
        //console.info("gid:" + thisquestionsLibraryAndSortGid);
        $.post("/member/UpdateLearningProgress", { questionLibraryAndSortGid: thisquestionsLibraryAndSortGid }, function (data) {
            //console.info(data);
        });
    }
}

/*
 * 更新试卷相关
 */
function UpdateExamAbout(examgid, examName, questionsLibraryAndSortGids, ids, thisquestionsLibraryAndSortGid, thisIid, userAnswer, standardAnswer, optionSequence) {
    //console.info(examgid);
    //console.info(examName);
    //console.info(questionsLibraryAndSortGids);
    //console.info(ids);
    //console.info(standardAnswer);
    //return;
    $.post("/member/UpdateExamAbout", { examgid: examgid, examName: examName, questionsLibraryAndSortGids: questionsLibraryAndSortGids, ids: ids, thisquestionsLibraryAndSortGid: thisquestionsLibraryAndSortGid, thisIid: thisIid, userAnswer: userAnswer, standardAnswer: standardAnswer, optionSequence: optionSequence }, function (data) {
        if (!$.IsNullOrEmpty(data)) {
            //更新试卷GID
            page.VM.QuestionLibraryVM.ExamGID(data);
            //console.info("examMainUpdate:" + data);
        }
    })
}

/*
更新考试结果
*/
function UpdateExamResult() {
    $.post("/member/UpdateExamResult", {}, function (data) {
        console.info(data);
    });
}

/*
 * 除顺序练习外的其他练习都会随机改变选项的顺序
 * 根据改变的顺序为page.VM.QuestionLibraryVM.Answer（）重新赋值
 */
function RandomChangeOptionOrder() {
    //console.info("aa");
    //除顺序练习外的其他练习都会随机改变选项的顺序
    if (page.VM.QuestionLibraryVM.TestType() != "unit") {
        //console.info("bb");
        //选项随机排序
        $("#datiOption p").each(function (index) {
            if (parseInt(Math.random() * 2) == 0) {
                $(this).prependTo($(this).parent());
            }
        });
        EvalABCD();

        ReConfirmAnswer();

    }
}
/*
 * 选项在随机排序后再根据新排序重新赋值A,B,C,D
 */
function EvalABCD() {
    //
    $("#datiOption p").each(function (index) {
        //console.info($(".seloption").eq(index).text());
        if (index == 0) {
            $(".seloption").eq(0).text("A、");
        }
        else if (index == 1) {
            $(".seloption").eq(1).text("B、");
        }
        else if (index == 2) {
            $(".seloption").eq(2).text("C、");
        }
        else if (index == 3) {
            $(".seloption").eq(3).text("D、");
        }
    });
}
/*
 * 根据随机排序，重新确定正确的a,b,c,d答案
 */
function ReConfirmAnswer() {
    //
    var arr = [];
    //console.info(page.VM.QuestionLibraryVM.Type());
    if (page.VM.QuestionLibraryVM.Type() != "判断") {
        var arrContent = page.VM.QuestionLibraryVM.AnswerContent().split('|');
        //console.info(arrContent);
        $.each(arrContent, function (index, item) {
            var answer1 = arrContent[index];
            $("#datiOption p").each(function (index) {
                if (answer1 == $(this).find("span").eq(1).text()) {
                    arr.push(getOption(index));
                    return;
                }
            });
        });
        //console.info("arr:"+arr.sort().join());
        page.VM.QuestionLibraryVM.Answer(arr.sort().join());
        //console.info(page.VM.QuestionLibraryVM.AnswerContent());
        //console.info(page.VM.QuestionLibraryVM.Answer());
    }
}
/*
 * 根据索引获取对应的A,B,C,D选项
 */
function getOption(index) {
    if (index == 0)
        return "A";
    else if (index == 1)
        return "B";
    else if (index == 2)
        return "C";
    else if (index == 3)
        return "D";
    else
        return "";
}
/*
 * 获取随机排序的选项顺序
 */
function getOptionSequence() {
    if (page.VM.QuestionLibraryVM.Type() == "判断") {
        return "";
    }
    var arr = [];
    $("#datiOption p").each(function (index) {
        arr.push($(this).find("span").eq(1).text());
    });
    return arr.join("|");
}
/*
 * 记忆的随机排序
 */
function RememberRandomChangeOptionOrder(self) {
    //除顺序练习外的其他练习都会随机改变选项的顺序
    if (page.VM.QuestionLibraryVM.TestType() != "unit") {
        if (page.VM.QuestionLibraryVM.Type() != "判断") {
            //读取该题选项记忆排序
            var sequenceArr = self.data("sequence").split("|");
            //console.info("sequenceArr:" + sequenceArr);
            //遍历排序
            $.each(sequenceArr, function (index, item) {
                $("#datiOption p").each(function (index2) {
                    //查看页面中相应的选项和记忆的选项是否相同，如果相同，则调整期位置到最后
                    if ($(this).find("span.seloption").next().text() == item) {
                        $(this).appendTo($(this).parent());
                    }
                });


            });

            EvalABCD();
            ReConfirmAnswer();
        }


    }
}
//语音播放相关代码//////////////////////////////////////////////////
$("#jplayer").jPlayer({
    ready: function (event) {
        $(this).jPlayer("setMedia", {
            title: "Bubble"
        });
    },
    swfPath: "/script/plugins/jplayer",
    supplied: "mp3,m4a,oga",
    wmode: "window",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true,
    remainingDuration: true,
    toggleDuration: true
});
/*
 * 视频播放器预加载
 */
$("#jquery_jplayer_1").jPlayer({
    ready: function () {
        $(this).jPlayer("setMedia", {
            title: "video"

        });
    },
    swfPath: "/scripts/plugins/jplayer",
    //supplied: "flv,m4v",
    supplied: "m4v",
    size: {
        width: "100%",
        height: "100%",
        cssClass: "jp-video-full"
    },
    ended: function () {
        $("#jp_container_1").hide();
    },
    fullWindow: true,
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true,
    keyBindings: {
        closeWindow: { // 自定义关闭窗口函数.
            key: 27, // 监视键盘ESC是否被按下
            fn: function (f) {
                // f is the instance in focus, which is this instance.
                // f.status is the status object.
                // f.play() to execute methods, such as play().
                //alert("Hello World");
                f.stop();
                $("#jp_container_1").hide();

            }
        }
    },
    remainingDuration: true,
    toggleDuration: true,
    //errorAlerts: true,
    //warningAlerts: true,

    error: function () {
        $("#jp_container_1").hide();
    }
});
/*
 * 语音播放
 */
function playAudio(item, e) {

    if ($('#audio').val() == null || $('#audio').val() == "") {
        alert("没有语音文件");
        return;
    }
    var exists = Exists("/gallery/" + $('#audio').val());
    //console.info(exists);
    if (!exists) {
        alert("视频文件不存在");
        return;
    }
    $.jPlayer.pause(); //先停止页面中的所有jplayer播放
    $("#jplayer").jPlayer("setMedia", {
        mp3: "/gallery/" + $('#audio').val()
    });

    $("#jplayer").jPlayer("play");
}
/*
 * 视频播放
 */
function playVideo(item, e) {
    //console.info(page.VM.QuestionLibraryVM.VideoUrl());
    if ($.IsNullOrEmpty(page.VM.QuestionLibraryVM.VideoUrl())) {
        alert("没有视频文件");
        return;
    }
    var exists = Exists("/gallery/" + page.VM.QuestionLibraryVM.VideoUrl());
    //console.info(exists);
    if (!exists) {
        alert("视频文件不存在");
        return;
    }
    $.jPlayer.pause();  //先停止页面中的所有jplayer播放
    //console.info(page.VM.QuestionLibraryVM.VideoUrl());
    //$("#jp_container_1").hide();
    $("#jp_container_1").show();
    $("#jquery_jplayer_1").jPlayer("setMedia", {
        m4v: "/gallery/" + page.VM.QuestionLibraryVM.VideoUrl()
    });

    $("#jquery_jplayer_1").jPlayer("play");
    $(".jp-full-screen").click();  //最大化到全屏
}

/*
 * 仿真考试，当答错时。提示正确答案
 */
function AlertRightAnswer() {
    if (page.VM.QuestionLibraryVM.TestType() == "Simulation") {
        var right;
        if (page.VM.QuestionLibraryVM.Answer() == "Y" || page.VM.QuestionLibraryVM.Answer() == "N") {
            right = page.VM.QuestionLibraryVM.Answer() == "Y" ? "对" : "错";
        }
        else {
            right = page.VM.QuestionLibraryVM.Answer();
        }
        alert("正确答案：" + right);
    }
}
/*
 * 播放提示音
 */
function playAudioPrompt(standardAnswer, myAnswer) {
    var mp3url = "";
    if (standardAnswer == myAnswer) {
        mp3url = "/gallery/audios/system/right.mp3";
    }
    else {
        //当题目答错时显示文字讲解
        mp3url = "/gallery/audios/system/wrong.mp3";
        //显示文字讲解
        //$("#jiaoguitu").parent().next().show();
    }

    $("#jplayer").jPlayer("setMedia", {
        mp3: mp3url

    });

    $("#jplayer").jPlayer("play");
    window.setTimeout(foo, 1000);


}
function foo() {
    //console.info("ade");
    if (page.VM.QuestionLibraryVM.TestType() == "Simulation") {
        //console.info("bind");
        NextQuestion();
    }
};

/**
 * 显示或隐藏文字讲解
 */
function ShowOrHideTextPlain()
{
    if ($("#thisAnswer").html().indexOf("wrong.bmp") >= 0)
    {
        $("#jiaoguitu").parent().next().show();
    }
    else
    {
        $("#jiaoguitu").parent().next().hide();
    }
}

/**
 * 根据相似题是否有值来决定相似题按钮是否隐藏
 */
function ShowSimilarQuestion()
{
    //根据相似题是否有值来决定相似题按钮是否隐藏
    if ($.IsNullOrEmpty(page.VM.QuestionLibraryVM.SimilarQuestionIids())) {
        $("#xst").hide();
    }
    else {
        $("#xst").show();
    }
}

/*
高亮关键词
*/
function keywordHighlight(content, keyword) {
      
    if ($.trim(keyword) == "") {
        return content;//关键字为空则返回  
    }
    
    var words = keyword.split(',');
    //替换关键字   
    for (var w = 0; w < words.length; w++) {
        var r = new RegExp(words[w], "igm");  
        content = content.replace(r, "<span class='text-danger' >" + words[w] + "</span>");//关键字样式  
    }
    return content;
} 
/**
 * 取消高亮
 * @param {any} content
 */
function cancelKeywordHighlight(content) {
    var regExp = new RegExp("<span class='text-danger' >(.+)</span>", "igm");
    content=content.replace(regExp, "$1");   
    return content;
} 

/*
 * 图片在弹出层打开
 */
function Enlarge(item, e) {
    var img = new Image();
    img.src = $("#jiaoguitu").attr("src");  
     var imgHtml = "<img src='" + $("#jiaoguitu").attr("src") + "' />";
    //捕获页
    layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        //area:['600px','500px'],
        area: [img.width + 'px', img.height+'px'],
        content: imgHtml, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function () {
            //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', { time: 5000, icon: 6 });
        }
    });
    
}
function fanhui()
{
    if (confirm("确认要返回吗？返回将离开本页面"))
    {
        history.back();
    }
}

/**分隔符 评论，收藏，点赞，解析*************************************************************************************/
/*
收藏
*/
function cang()
{
    $.post("/member/collection", { questionId: page.VM.QuestionLibraryVM.IID() }, function (data) {
        if (data == "fail") {
            alert("已收藏");
        }
        else {
            alert("收藏成功");
        }
    });
}
/**
 * 文本解析开关
 */
function TextPlainSwitch() {
    $("#jiaoguitu").parent().next().toggle();
}
/**
 * 点赞层开关
 */
function zan()
{
    $("#dianzan").toggle();
    $("#pinglun").hide();
    //点赞自数据库中获取初始值
    $.post("/member/GetDianZanCount", { iid: page.VM.QuestionLibraryVM.IID() }, function (data) {
        //console.info(data);
        page.VM.QuestionLibraryVM.dianzanVM = ko.mapping.fromJS(data, {}, page.VM.QuestionLibraryVM.dianzanVM);
        
    });
}

/*
顶
*/
function up(item, e)
{
    $.post("/member/dianzan", { iid: page.VM.QuestionLibraryVM.IID(), type: 1 }, function (data) {
        page.VM.QuestionLibraryVM.dianzanVM = ko.mapping.fromJS(data, {}, page.VM.QuestionLibraryVM.dianzanVM);
    });
}
/*
踩
*/
function down(item, e)
{
    $.post("/member/dianzan", { iid: page.VM.QuestionLibraryVM.IID(), type: 0 }, function (data) {
        page.VM.QuestionLibraryVM.dianzanVM = ko.mapping.fromJS(data, {}, page.VM.QuestionLibraryVM.dianzanVM);
    });
}



/**
 * 评论层开关
 */
function ping()
{
    $("#pinglun").toggle();
    $("#dianzan").hide();
    $.post("/member/GetPinglunList", { iid: page.VM.QuestionLibraryVM.IID(), pageIndex: 1 }, function (data) {
        if (data != null) {
            $.each(data, function (index, item) {
                var thisTime = parseInt(item.CreateTime.replace(/\D/igm, ""));
                item.CreateTime = new Date(thisTime).Format("yyyy-MM-dd hh:mm");
            });
        }
        page.VM.QuestionLibraryVM.pinglunVM = ko.mapping.fromJS(data, {}, page.VM.QuestionLibraryVM.pinglunVM);
    });
      
    $.post("/member/GetPingLunMaxPage", { iid: page.VM.QuestionLibraryVM.IID(), pageIndex: 3 }, function (data) {
        var maxPage = data;
        page.VM.QuestionLibraryVM = ko.mapping.fromJS({ maxPage: maxPage }, {}, page.VM.QuestionLibraryVM);        
       
    });
}
/**
 * 发表评论
 */
function publishComment()
{
    if ($("#pinglunContent").val() == "")
    {
        alert("请输入评论内容");
        return;
    }
    if ($("#pinglunContent").val().length > 100)
    {
        alert("评论内容不超过100字");
        return;
    }
    $.post("/member/publishComment", { iid: page.VM.QuestionLibraryVM.IID(), content: $("#pinglunContent").val() }, function (data) {
        $.each(data, function (index, item) {
            var thisTime = parseInt(item.CreateTime.replace(/\D/igm, ""));
            item.CreateTime = new Date(thisTime).Format("yyyy-MM-dd hh:mm");
        });
        page.VM.QuestionLibraryVM.pinglunVM = ko.mapping.fromJS(data, {}, page.VM.QuestionLibraryVM.pinglunVM);
        $("#pinglunContent").val("");
    });
    $.post("/member/GetPingLunMaxPage", { iid: page.VM.QuestionLibraryVM.IID(), pageIndex: 3 }, function (data) {
        //console.info(data);
        var maxPage = data;
        page.VM.QuestionLibraryVM = ko.mapping.fromJS({ maxPage: maxPage }, {}, page.VM.QuestionLibraryVM);

    });
}
/**
 * 评论页初始值
 */
var commentPage = 1;
/**
 * 评论上一页
 */
function upPage()
{
    commentPage--;
    if (commentPage < 1)
    {
        commentPage = 1;
        alert("已是最小页");
        return;
        
    }
    //console.info(commentPage);
    $.post("/member/GetPinglunList", { iid: page.VM.QuestionLibraryVM.IID(), pageIndex: commentPage }, function (data) {
        //console.info(data);
        $.each(data, function (index, item) {
            var thisTime = parseInt(item.CreateTime.replace(/\D/igm, ""));
            item.CreateTime = new Date(thisTime).Format("yyyy-MM-dd hh:mm");
        });
        page.VM.QuestionLibraryVM.pinglunVM = ko.mapping.fromJS(data, {}, page.VM.QuestionLibraryVM.pinglunVM);
    });
}
/**
 * 评论下一页
 */
function nextPage()
{
    commentPage++;
    //console.info(commentPage);
    var maxPage= 0;
    $.post("/member/GetPingLunMaxPage", { iid: page.VM.QuestionLibraryVM.IID(), pageIndex: 3 }, function (data) {
        maxPage = data;
        if (commentPage > maxPage)
        {
            commentPage = maxPage;
            alert("已是最大页");
            return;
        }
        $.post("/member/GetPinglunList", { iid: page.VM.QuestionLibraryVM.IID(), pageIndex: commentPage }, function (data) {
            //console.info(data);
            $.each(data, function (index, item) {
                var thisTime = parseInt(item.CreateTime.replace(/\D/igm, ""));
                item.CreateTime = new Date(thisTime).Format("yyyy-MM-dd hh:mm");
            });
            page.VM.QuestionLibraryVM.pinglunVM = ko.mapping.fromJS(data, {}, page.VM.QuestionLibraryVM.pinglunVM);
        });
    });
    
}

/**
 * 
 *  
 * @param {any} e
 */
function shuaxin(item, e) {
    
    //F5:116  shift:16
    //var e = $.Event("keydown");//模拟一个键盘事件
    ////e.keyCode = 16, e.keyCode = 116;
    //e.keyCode = 116;
    //$("#qiangzhishuaxin").trigger(e);//模拟按下回车
    //console.info(e);
    location.reload();

}
 