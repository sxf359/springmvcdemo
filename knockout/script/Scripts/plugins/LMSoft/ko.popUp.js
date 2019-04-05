/*
 * 集成Knockout 和 Twitter Bootstrap Popover
 * 用法:
html:
<a href="#"  id="123456" class="" data-toggle="mypopover" data-bind="popUp: {content: '#person-template', id: '123456',placement:'left'}"> pop up demo! </a>
templ:
    <script type="text/html" id="person-template">
        <button class="close pull-right" type="button" data-dismiss="popover">Close</button>
        <div class="">
        <table border="1" cellpadding="0" cellspacing="0">
            <tr>
                <td>First Name</td>
                <td><input type="text" data-bind="value: firstName, valueUpdate:'keyup'" /></td>
            </tr>
            <tr>
                <td>Last Name</td>
                <td><input type="text" data-bind="value: lastName, valueUpdate:'keyup'" /></td>
            </tr>
            <tr>
                <td>Email Address</td>
                <td><input type="text" data-bind="value: email, valueUpdate:'keyup'" /></td>
            </tr>
        </table>
        </div>
    </script>
 */
ko.bindingHandlers.popUp = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var attribute = ko.utils.unwrapObservable(valueAccessor());
        var templateContent = attribute.content;
        var popOverTemplate = "<div class='popOverClass' id='" + attribute.id + "-popover'>" + $(templateContent).html() + "</div>";
        $(element).popover({
            placement: !!attribute.placement ? attribute.placement : 'right',
            content: popOverTemplate,
            html: true,
            trigger: 'manual'  
        })
            .attr('id', "popover" + attribute.id + "_click")
            .click(function (e) {
                $('[data-toggle="mypopover"]').popover("hide");
                $(this).popover('toggle');
                //e.preventDefault();//阻止事件默认行为。
                e.stopPropagation();//阻止事件冒泡
            })
            .on('shown.bs.popover', function () {
                var thePopover = document.getElementById(attribute.id + "-popover");
                childBindingContext = bindingContext.createChildContext(viewModel);
                ko.applyBindingsToDescendants(childBindingContext, thePopover);
                //关闭按钮处理  
                $(thePopover).find('[data-dismiss="popover"]').click(function (e) {
                    console.log('hide')
                    $('[data-toggle="mypopover"]').popover("hide");
                });
            });
    }
}
function closeMyPopover() {
    $('[data-toggle="mypopover"]').popover('destroy');
}

//$(function () {

//    //$("body").on("click", function (e) {
//    //    console.log(111);
//    //    $('[data-toggle="mypopover"]').popover('hide');
//    //    //e.preventDefault();
//    //    e.stopPropagation();
//    //});
//    $(".popOverClass").on("click", function (e) {
//        console.log(999);
//        //e.preventDefault();
//        e.stopPropagation();
//        return false;
//    });
//})