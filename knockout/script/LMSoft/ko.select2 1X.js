/*
 * https://github.com/select2/select2/wiki/knockout.js-integration
 * html:
 <select data-bind="value: selectedState, select2: { data: states, placeholder: 'Select a State', allowClear: true, formatResult: format }" 
 class="select2" style="width: 200px"></select>
Selected: <span data-bind="text: selectedState"></span>

js:

function format(state) {
    var originalOption = state.element;
    return state.text.toUpperCase();
}

function State(id, text, children, disabled) {
    this.id = id;
    this.text = text;
    this.disabled = disabled || false;
    this.children = children;
}
function City(id,text,children,disabled) {
    this.id = id;
    this.text = text;
    this.disabled = disabled || false;
    this.children = children;
}

State.prototype.toString = City.prototype.toString =function() {
    return this.text + "(" + this.id + ")";
};

var ViewModel = function () {

    this.states = [
        new State("AL", "Alabama",[],true),
        new State("AK", "Alaska", [ new City("JU", "Juneau")]),
        new State("AZ", "Arizona"), 
        new State("WV", "West Virginia"),
        new State("WI", "Wisconsin"),
        new State("WY", "Wyoming")
];

this.selectedState = ko.observable("(none)");

};

ko.applyBindings(new ViewModel());
 * 
 */ 

ko.bindingHandlers.select2 = {
    init: function(el, valueAccessor, allBindingsAccessor, viewModel) {
        ko.utils.domNodeDisposal.addDisposeCallback(el, function() {
            $(el).select2('destroy');
        });

        var allBindings = allBindingsAccessor(),
            select2 = ko.utils.unwrapObservable(allBindings.select2);

        $(el).select2(select2);
    },
    update: function (el, valueAccessor, allBindingsAccessor, viewModel) {
        var allBindings = allBindingsAccessor();

        if ("value" in allBindings) {
            if ((allBindings.select2.multiple || el.multiple) && allBindings.value().constructor != Array) {                
                $(el).select2("val", allBindings.value().split(","));
            }
            else {
                $(el).select2("val", allBindings.value());
            }
        } else if ("selectedOptions" in allBindings) {
            var converted = [];
            var textAccessor = function(value) { return value; };
            if ("optionsText" in allBindings) {
                textAccessor = function(value) {
                    var valueAccessor = function (item) { return item; }
                    if ("optionsValue" in allBindings) {
                        valueAccessor = function (item) { return item[allBindings.optionsValue]; }
                    }
                    var items = $.grep(allBindings.options(), function (e) { return valueAccessor(e) == value});
                    if (items.length == 0 || items.length > 1) {
                        return "UNKNOWN";
                    }
                    return items[0][allBindings.optionsText];
                }
            }
            $.each(allBindings.selectedOptions(), function (key, value) {
                converted.push({id: value, text: textAccessor(value)});
            });
            $(el).select2("data", converted);
        }
    }
};
