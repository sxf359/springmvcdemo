var page = page || { VM: {} };
var InterviewOption = {
    option: { title: "title ...", "level": 3, multiSelector: true, maxSelector: 5, getLevel3Data: false, targetinput: false } 
}; 

page.VM.InterviewVM = ko.mapping.fromJS(InterviewOption);





/* 几种用法
 * 
 function showInterviewInfo() {
    page.VM.InterviewVM.option.title("面试信息");     
    $("#selector").modal("show");
}
*/