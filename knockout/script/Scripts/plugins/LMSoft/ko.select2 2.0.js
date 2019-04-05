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
            {Id: "east", Name: "正东"}
        ]  
  
self.orientationCategories = ko.observableArray(orientationCategoriesData);  
  
self.orientation_1 = ko.observable(["east"]);  

 * 
 */
ko.bindingHandlers.select2 = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = ko.toJS($.extend({ minimumResultsForSearch: -1 }, valueAccessor()));//默认不现实搜索框
        var allBindings = allBindingsAccessor();
        var lookupKey = allBindings.lookupKey;
        //g.log(options);
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