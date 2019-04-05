/*
 * 一些knockout 自定义绑定
 */
// #region select2
//========  select2 =======================
/* 
 *http://sunxboy.iteye.com/blog/2171364
 * 
 * 该selecct2绑定到select元素上效果最好,在绑定select2之前可以先进行options绑定
 * html:
 <select id="form_input1_orientation" 
 data-bind="options: orientationCategories, optionsValue: 'Id', optionsText: 'Name',  selectedOptions: install().orientation_1, select2: {}">
 </select>  

js:

var orientationCategoriesData = [  
            {Id: "north", Name: "正北"},  
            {Id: "northeast", Name: "东北"},  
            {Id: "northwest", Name: "西北"},  
            {Id: "east", Name: "正东"},  
            {Id: "southeast", Name: "东南"},  
            {Id: "south", Name: "正南"},  
            {Id: "southwest", Name: "西南"},  
            {Id: "west", Name: "正西"}  
        ]  
  
self.orientationCategories = ko.observableArray(orientationCategoriesData);  
  
self.orientation_1 = ko.observable(["east"]);  

 * 
 */ 
ko.bindingHandlers.select2 = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //var options = ko.toJS($.extend({ minimumResultsForSearch: -1 }, valueAccessor() || {}));//默认不现实搜索框
        var options = ko.toJS($.extend({}, valueAccessor() || {}));//默认实现搜索框
        var allBindings = allBindingsAccessor();
        var lookupKey = allBindings.lookupKey;
        //console.info(options);
        setTimeout(function () {
            $(element).select2(options);
        }, 0);

        if (lookupKey) {
            var value = ko.utils.unwrapObservable(allBindings.value);
            $(element).select2('data', ko.utils.arrayFirst(options.data.results, function (item) {
                return item[lookupKey] === value;
            }));
        }

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).select2('destroy');
        });
    },
    update: function (element) {
        $(element).trigger('change');
    }
};
// #endregion select2

// #region popUp
//========  popUp =======================
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

// #endregion popUp

// #region raty
/*用法:
html:
<div id="star" data-bind="raty: { rating: ratingBinding, half: true, readOnly: readOnlyBinding }"></div>
js:
				viewModel = {}

				viewModel['ratingBinding'] = ko.observable(3);
				viewModel['cancelBinding'] = ko.observable(false);
				viewModel['readOnlyBinding'] = ko.observable(false);

				viewModel['computedRating'] = ko.computed({
					write: function(value)
					{
						viewModel['ratingBinding'](value/2);
					},
					read: function()
					{
						return viewModel['ratingBinding']()*2;
					} 
				});

				//We use the throttle to make sure we don't get stuck in a recursive loop
				viewModel['computedRating'].extend({throttle: 1}); 

				viewModel['toggleReadOnly'] = function()
				{
					viewModel['readOnlyBinding'](!viewModel['readOnlyBinding']());
				};

				ko.applyBindings(viewModel)
 * 
 * 
 */
(function ($, ko) {
    $.extend($.fn.raty.defaults,{ path: "/Content/images/raty/", hints: ["很差", "较差", "一般", "较好", "很好"] });
    var isObject = function (obj) { return (typeof obj === typeof {}); };
    var isFunction = function (func) { return (Object.prototype.toString.call(func) === "[object Function]"); };

    ko.bindingHandlers.raty = {
        'init': function (element, valueAccessor) {
            var options = {};
            var value = valueAccessor();

            value = isObject(value) ? value : {};


            if ('rating' in value) {
                var rating = value['rating'];
                var click = !!value['click'] ? value['click'] : function (score, evt) { };
                var start = !!value['start'] ? value['start'] : ko.utils.unwrapObservable(rating);

                value['start'] = start;
                value['click'] = !ko.isWriteableObservable(rating) ? click : function (score, evt) {
                    rating(score);
                    click.call(this, score, evt)
                };
            }

            for (key in value) {
                val = value[key];
                options[key] = ko.utils.unwrapObservable(val);
            }; 
            $(element).raty(options);
        },

        'update': function (element, valueAccessor) {
            var value = valueAccessor();

            if ('rating' in value)
                $(element).raty('click', ko.utils.unwrapObservable(value['rating']));

            if ('readOnly' in value)
                $(element).raty('readOnly', ko.utils.unwrapObservable(value['readOnly']));
        }
    };
})($, ko);
// #endregion raty

// #region renderTemplateX
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
    ko.applyBindingsToNode(temp[0], { template: { name: name, data: data } });
    // save inner html of temporary div
    var html = temp.html();
    // cleanup temporary node and return the result
    temp.remove();
    return html;
};

// #endregion renderTemplateX

