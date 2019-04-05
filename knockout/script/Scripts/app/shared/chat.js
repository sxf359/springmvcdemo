var page = page || { VM: {} };
var ChatOption = {
    option: { title: "title ..." }
};

page.VM.ChatVM = ko.mapping.fromJS(ChatOption);
var chat, to = "";
var userID = page.user.userID;
var userName = page.user.userName;
var fromType = page.user.role;
var activeChat = { id: "5d8f8cec-23a2-4336-818f-2891ecd6571e", name: "王二小", avatar: "111", active: true, contents: [] };
var chats = [
    { id: "5d8f8cec-23a2-4336-818f-2891ecd6571e", name: "王二小", avatar: "111", active: true, contents: [] },
    { id: "9769ecbe-c660-4ff2-bd48-b43b23dc7bad", name: "李晓明", avatar: "111", active: false, contents: [] },
    { id: "790904de-e036-42d1-8bd4-b5c5a78008f1", name: "赵总", avatar: "222", active: false, contents: [{ name: "大个儿", message: "哈喽", time: "2016-02-11 01:17:05" }] }
];

$(function () {
    //page.VM.activeChatVM = ko.mapping.fromJS(activeChat);
    page.VM.chatsVM = ko.mapping.fromJS(chats);
    page.VM.activeChatVM = ko.computed(function () {
        var a = ko.utils.arrayFirst(page.VM.chatsVM(), function (item) {
            return item.active();
        });
        return a;
    });

    //添加对自动生成的Hub的引用
    chat = $.connection.lmChat;

    //调用Hub的callback回调方法

    //后端SendChat调用后，产生的addNewMessageToPage回调
    chat.client.addNewMessageToPage = function (id, name, time, message) {
        $('#discussion').append('<li style="color:blue;">' + htmlEncode(name) + "<" + htmlEncode(time) + ">" + '</li><li> ' + htmlEncode(message) + '</li>');
        refreshMsgWindow();
    };
    //后端SendChat调用后，产生的addNewMessageToPage回调
    chat.client.getMessages = function (to, id, name, avatar, time, message) {
        var chatId = id == userID ? to : id;
        //0.先判断是不是自己发送的消息
        if (id == userID) {
            name = "我";
        }
        //1.判断用户是否在对话列表中,如果在,则直接显示,并更新后台,如果不在,不处理
        var a = ko.utils.arrayFirst(page.VM.chatsVM(), function (item) {
            return item.id() == chatId;
        });
        console.log(chatId);
        console.log(ko.toJS(a));
        if (a != null) {
            a.contents.push(ko.mapping.fromJS({ name: name, message: message, time: time }));
        }

        //  $('#discussion').append('<li style="color:blue;">' + htmlEncode(name) + "<" + htmlEncode(time) + ">" + '</li><li> ' + htmlEncode(message) + '</li>');
        refreshMsgWindow();
    };

    //后端SendLogin调用后，产生的loginUser回调
    chat.client.loginUser = function (userlist) {
        reloadUser(userlist);
    };

    //后端SendLogoff调用后，产生的logoffUser回调
    chat.client.logoffUser = function (userlist) {
        reloadUser(userlist);
    };

    //启动链接
    $.connection.hub.start().done(function () {

        //发送上线信息
        chat.server.sendLogin(userID, page.user.userName);

        //点击发送按钮或按下回车键，发送聊天内容
        $('#btn-send').click(function () {
            sendMessage();
        });
        $('#text-msg').keyup(function (event) {
            if (event.keyCode == 13) { sendMessage(); }
        });

        //点击按钮，发送用户下线信息
        $('#close').click(function () {
            chat.server.sendLogoff(userID, userName);
            $("#send").css("display", "none");
        });

        //每隔5秒，发送心跳包信息
        setInterval(function () {
            chat.server.triggerHeartbeat(userID, userName);
        }, 5000);


    });
    //connection = $.connection(signalR_Endpoint);
    connection = $.connection();
    connection.stateChanged(connectionStateChanged);

    $.connection.hub.disconnected(function () {
        console.log("disconnected!");
        setTimeout(function () {
            $.connection.hub.start();
        }, 5000); // Re-start connection after 5 seconds
    });

    $.connection.hub.reconnect = onReconnected;

    //切换聊天用户
    $('a[data-toggle="tab"]').live('shown.bs.tab', function (e) {
        // console.log(e.target);
        var currentID = $(e.target).data("id");
        //page.VM.activeChatVM.id(currentID);
        ko.utils.arrayForEach(page.VM.chatsVM(), function (item) {
            item.active((item.id() == currentID));
        });
    })
});

function onDisconnected(event) { console.log(event); }
function onReconnected(event) { console.log(event); }

//signalR连接状态改变
function connectionStateChanged(state) {
    var stateConversion = { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' };
    console.log('SignalR state changed from: ' + stateConversion[state.oldState]
     + ' to: ' + stateConversion[state.newState]);
}
//发送消息
var sendMessage = function () {
    if ($('#text-msg').val().length == 0) {
        myModal.alert("发送内容不能为空!");
        return false;
    }
    var chatContent = $('#text-msg').val();
    chat.server.sendChat(page.VM.activeChatVM().id(), userID, userName, fromType, chatContent);
    $('#text-msg').val("");
}

//刷新滚动条到最底部
var refreshMsgWindow = function () {
    $(".messageboard").each(function (i, n) {
        $(this).scrollTop($(this).find(".discussion").height());
    });
}

//重新加载用户列表
var reloadUser = function (userlist) {
    $("#userList").children("li").remove();
    for (i = 0; i < userlist.length; i++) {
        $("#userList").append("<li><img src='/Content/images/avatar.jpg' style='width:32px;' /><strong>" + userlist[i].Name + "</strong></li>");
    }
}
//刷新会话列表
var reloadChatSession = function (userlist) {

}


//div内容html化
var htmlEncode = function (value) {
    var encodedValue = $('<div />').html(value).html();
    return encodedValue;
}

/*  用法
 * 
需引用的js:
    <!--Script references. -->
    <!--The jQuery library is required and is referenced by default in _Layout.cshtml. -->
    <!--Reference the SignalR library. -->
    <script src="~/Scripts/jquery.signalR-2.2.0.min.js"></script>
    <!--Reference the autogenerated SignalR hub script. -->
    <script src="~/signalr/hubs"></script>

    <!--SignalR script to update the chat page and send messages.-->
    <script src="~/Scripts/app/shared/chat.js"></script>

*/