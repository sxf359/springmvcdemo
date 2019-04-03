var Attachment = function () {
    function add(src,o) { 
        src.push(o);
        return src;
    }
    function remove(src, o) {
        $.each(src, function (i, n) {
            if (n.path == o.path)
                src.remove(n);
        }); 
        return src;
    }

    function convertToAtachments(s) {
        var a = [];
        $.each(s.split(":1:"), function (i, n) {
            var b = n.split(":2:");
            if (b.length == 3) {
               a.push({ "type": b[0], "path": b[1], "original": b[2]});
            }
        })
        return a;
    }

    function convertFromAtachments(a) {
        var s = "";
        $.each(a, function (i, n) {
            s += (s.length > 0 ? ":1:" : "") + n.type + ':2:' + n.path + ':2:' + n.original ;
        });
        return s;
    }

    return {
        add: function (src, o) {
            add(src, o);
        },
        remove: function (src, o) {
            remove(src, o);
        },
        convertToAtachments: function (s) {
            convertToAtachments(s);
        },
        convertFromAtachments: function (p) {
            convertFromAtachments(p);
        } 
    }
}()