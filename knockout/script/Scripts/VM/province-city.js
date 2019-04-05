

var page = page || { VM: { datas: {} } };
var province = { Name: "", ID: "" };
var city = { Value: "", Text: "", Selected: false };
var urlService = '/CommonService';
page.VM.datas.provinces = ko.observableArray([province]);
page.VM.datas.cities = ko.mapping.fromJS([city]);

$(function () {
    // ko.applyBindings(page.VM)
});
//加载省份
function getProvinces() {
    url = urlService + '/GetProvinces/';
    $.getJSON(url, {}, function (data) {
        page.VM.datas.provinces(data);
        if (page.VM.ProfileVM) {
            $("#province_sel").val(page.VM.ProfileVM.profile.Province());
            getCities(page.VM.ProfileVM.profile.Province());
        }
    });
}

//根据省加载城市 
function getCities(item, e) { 
    var ProvinceId = (typeof (item) == 'string' ? item : $.trim($(e.currentTarget).val()));
    page.VM.ProfileVM.profile.Province(ProvinceId);
    if (ProvinceId.length == 0) {
        //  emptyCity();
    }
    else {
        $.getJSON(urlService + '/GetCities?province=' + ProvinceId, function (data) {
            page.VM.datas.cities = ko.mapping.fromJS(data, {}, page.VM.datas.cities); 
            if (page.VM.ProfileVM) {
                $("#city_sel").val(page.VM.ProfileVM.profile.City()); 
            }
        })
    }
}

//根据省加载城市 
function setCity(item, e) { 
    page.VM.ProfileVM.profile.City($(e.currentTarget).val());
}