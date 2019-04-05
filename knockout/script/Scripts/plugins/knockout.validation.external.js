/*Validations*/
ko.validation.rules['userNameUsed'] = {
    //val form binded value from html, otherVale what we wanted tobe
    validator: function (val, otherVal) {       
        var isUsed;
        var json = JSON.stringify({ userName: val });
        $.when(
            $.ajax({
                url: '/validation/IsUserNameUsed',
            dataType: "json",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: json,
        async: false,
        })
        ).then(function (data, textStatus, jqXhr) {
            isUsed = (textStatus === 'success') ? data.IsUsed : null;
        });
return isUsed === otherVal;         //if false error message would be shown
},
message: '用户名已存在'
};
ko.validation.rules['equalPwd'] = {
    validator: function (val, mustEqualVal) {
        //console.log(mustEqualVal());
          return val === ($.isFunction(mustEqualVal) ? mustEqualVal() : mustEqualVal);
      },
      message: '两次输入必须相等'
 };
ko.validation.registerExtenders();