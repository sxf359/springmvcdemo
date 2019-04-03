var bmap;
var menu = null;
var initlat = "34.16";
var initlng = "208.54";
var initzoom = 5;
function initialize() {
    bmap = new BMap.Map("map_canvas");
    bmap.enableScrollWheelZoom();
    bmap.centerAndZoom(parseToBmapLatlng(initlat, initlng), initzoom);
    bmap.addControl(new BMap.NavigationControl());
    initOverCallback()
}
function loadBaiduMapApi() {
    var a = document.createElement("script");
    a.src = "http://api.map.baidu.com/api?v=1.3&callback=initialize";
    document.body.appendChild(a)
}
function parseToBmapLatlng(b, a) {
    return new BMap.Point(a, b)
}
function fixPosition(a, b) {
    bmap.centerAndZoom(a, b)
}
function addMarker(c) {
    var b = {
        point: null,
        title: null,
        dragable: false,
        func: null,
        multi: false,
        label: false
    };

    var d = $.extend({}, b, c);
    if (d.point == null) {
        alert("请指定标记位置！")
    }
    if (!d.multi) {
        bmap.clearOverlays()
    }
    var a = new BMap.Marker(d.point);
    if (d.title != null) {
        a.setTitle(d.title)
    }
    bmap.addOverlay(a);
    if (d.dragable) {
        a.enableDragging()
    }
    if (d.func != null) {
        a.addEventListener("click", d.func)
    }
    return a
}
function addContextMenu() {
    menu = new BMap.ContextMenu();
    var b = [{
        text: "放大",
        callback: function () {
            bmap.zoomIn()
        }
    }, {
        text: "缩小",
        callback: function () {
            bmap.zoomOut()
        }
    }, {
        text: "在此标记(拖拽标记改变位置,点击标记确定位置)",
        callback: function (c) {
            addMarker({
                point: c,
                dragable: true,
                func: confirmLoc,
                multi: true
            })
        }
    }];
    for (var a = 0; a < b.length; a++) {
        menu.addItem(new BMap.MenuItem(b[a].text, b[a].callback, 100))
    }
    bmap.addContextMenu(menu)
}
function locateWithIp() {
    var a = new BMap.LocalCity();
    a.get(function (b) {
        fixPosition(b.name, b.level)
    })
}
function confirmLoc(a) {
    if (confirm("是否将此位置作为目标地址？")) {

        $("#latitude").val(a.point.lat);
        $("#longitude").val(a.point.lng);
        //bmap=new BMap.Map("map_canvas");
        var sContent = "<h5 style='margin:0 0 5px 0;padding:0.2em 0'>" + $('#street').val() + "</h4>";
        var point = new BMap.Point(a.point.lng, a.point.lat);
        var marker = new BMap.Marker(point);
        var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
        bmap.addOverlay(marker);
        marker.openInfoWindow(infoWindow);

        infoWindow.redraw();

        $("#messagebox").fadeOut(1500);

    }
}
function codeAddress(c) {
    var a = {
        pageCapacity: 8,
        onSearchComplete: function (e) {
            if (b.getStatus() == BMAP_STATUS_SUCCESS) {
                bmap.clearOverlays();
                for (var d = 0; d < e.getCurrentNumPois() ; d++) {
                    if (d == 0) {
                        fixPosition(e.getPoi(d).point, 15)
                    }
                    addMarker({
                        point: e.getPoi(d).point,
                        title: e.getPoi(d).title,
                        multi: true,
                        func: confirmLoc
                    })
                }
            } else {
                alert("没有搜索到相关地址,请手动在地图上选择该地址并点击鼠标右键来选择具体位置！")
            }
        }
    };

    var b = new BMap.LocalSearch(bmap, a);
    b.search(c, {
        forceLocal: true
    })
}
function resetMap() {
    if (menu != null) {
        bmap.removeContextMenu(menu)
    }
    bmap.clearOverlays();
    bmap.centerAndZoom(parseToBmapLatlng(initlat, initlng), initzoom)
}
function initOverCallback() { };