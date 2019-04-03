/*
 * 根据模板,生成内容到内存中
 * 用法:
 * html:
 <script id="draggableHelper" type="text/x-jquery-tmpl">
<div class="draggableHelper">
    <span data-bind="text: Name"></span>
</div>
</script>
js:
alert(ko.renderTemplateX("draggableHelper", { Name: "Santa Claus" }));
 *
 */



// NOTE:
// Originally it was renderTemplate method
// but there is built-in method in Knockout
// with the same name. Be careful!

ko.renderTemplateX = function (name, data) {
    // create temporary container for rendered html
    var temp = $("<div>");
    // apply "template" binding to div with specified data
    ko.applyBindingsToNode(temp[0], { template: { name: name, data: data} });
    // save inner html of temporary div
    var html = temp.html();
    // cleanup temporary node and return the result
    temp.remove();
    return html;
};


