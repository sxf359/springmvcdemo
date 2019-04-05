var cityData = [
    {
        id: 3, name: "河南",
        child: [{ id: 3e3, name: "河南" }, { id: 5, name: "郑州" }, { id: 6, name: "洛阳" }, { id: 11, name: "新乡" }, { id: 7, name: "开封" }, { id: 8, name: "平顶山" }, { id: 9, name: "安阳" }, { id: 10, name: "鹤壁" }, { id: 12, name: "焦作" }, { id: 13, name: "濮阳" }, { id: 14, name: "许昌" }, { id: 15, name: "漯河" }, { id: 16, name: "三门峡" }, { id: 17, name: "南阳" }, { id: 18, name: "商丘" }, { id: 19, name: "信阳" }, { id: 20, name: "周口" }, { id: 21, name: "驻马店" }, { id: 22, name: "济源" }]
    }, {
        id: 12, name: "河北",
        child: [{ id: 12e3, name: "河北" }, { id: 260, name: "石家庄" }, { id: 261, name: "唐山" }, { id: 262, name: "秦皇岛" }, { id: 263, name: "邯郸" }, { id: 264, name: "邢台" }, { id: 265, name: "保定" }, { id: 266, name: "张家口" }, { id: 267, name: "承德" }, { id: 268, name: "沧州" }, { id: 269, name: "廊坊" }, { id: 270, name: "衡水" }]
    }, {
        id: 7, name: "北京",
        child: [{ id: 7e3, name: "北京" }, { id: 130, name: "北京" }]
    }, {
        id: 8, name: "天津",
        child: [{ id: 8e3, name: "天津" }, { id: 150, name: "天津" }]
    }, {
        id: 6, name: "上海",
        child: [{ id: 6e3, name: "上海" }, { id: 110, name: "上海" }]
    }, {
        id: 9, name: "重庆",
        child: [{ id: 9e3, name: "重庆" }, { id: 170, name: "重庆" }]
    }, {
        id: 10, name: "江苏",
        child: [{ id: 1e4, name: "江苏" }, { id: 220, name: "南京" }, { id: 221, name: "徐州" }, { id: 222, name: "连云港" }, { id: 223, name: "淮安" }, { id: 224, name: "宿迁" }, { id: 225, name: "盐城" }, { id: 226, name: "扬州" }, { id: 227, name: "泰州" }, { id: 228, name: "南通" }, { id: 229, name: "镇江" }, { id: 230, name: "常州" }, { id: 231, name: "无锡" }, { id: 232, name: "苏州" }, { id: 233, name: "宜兴" }, { id: 234, name: "丹阳" }, { id: 235, name: "江都" }, { id: 236, name: "常熟" }, { id: 237, name: "太仓" }, { id: 238, name: "昆山" }]
    }, {
        id: 5, name: "浙江",
        child: [{ id: 5e3, name: "浙江" }, { id: 90, name: "杭州" }, { id: 103, name: "萧山" }, { id: 91, name: "宁波" }, { id: 92, name: "温州" }, { id: 93, name: "台州" }, { id: 94, name: "嘉兴" }, { id: 95, name: "湖州" }, { id: 96, name: "绍兴" }, { id: 97, name: "金华" }, { id: 98, name: "衢州" }, { id: 99, name: "舟山" }, { id: 100, name: "丽水" }, { id: 101, name: "义乌" }, { id: 102, name: "苍南" }]
    }, {
        id: 1, name: "广东",
        child: [{ id: 1e3, name: "广东" }, { id: 275, name: "广州" }, { id: 276, name: "佛山" }, { id: 277, name: "中山" }, { id: 278, name: "珠海" }, { id: 279, name: "东莞" }, { id: 280, name: "深圳" }, { id: 281, name: "惠州" }, { id: 282, name: "清远" }, { id: 283, name: "韶关" }, { id: 284, name: "江门" }, { id: 285, name: "肇庆" }, { id: 286, name: "阳江" }, { id: 287, name: "茂名" }, { id: 288, name: "湛江" }, { id: 289, name: "云浮" }, { id: 290, name: "汕尾" }, { id: 291, name: "汕头" }, { id: 292, name: "潮州" }, { id: 293, name: "揭阳" }, { id: 294, name: "梅州" }, { id: 295, name: "河源" }]
    }, {
        id: 11, name: "山东",
        child: [{ id: 11e3, name: "山东" }, { id: 240, name: "济南" }, { id: 241, name: "青岛" }, { id: 242, name: "淄博" }, { id: 243, name: "枣庄" }, { id: 244, name: "东营" }, { id: 245, name: "潍坊" }, { id: 246, name: "烟台" }, { id: 247, name: "威海" }, { id: 248, name: "济宁" }, { id: 249, name: "泰安" }, { id: 250, name: "日照" }, { id: 251, name: "莱芜" }, { id: 252, name: "德州" }, { id: 253, name: "临沂" }, { id: 254, name: "聊城" }, { id: 255, name: "滨州" }, { id: 256, name: "菏泽" }]
    }, {
        id: 22, name: "山西",
        child: [{ id: 22e3, name: "山西" }, { id: 460, name: "太原" }, { id: 461, name: "大同" }, { id: 462, name: "阳泉" }, { id: 463, name: "长治" }, { id: 464, name: "晋城" }, { id: 465, name: "朔州" }, { id: 466, name: "晋中" }, { id: 467, name: "忻州" }, { id: 468, name: "临汾" }, { id: 469, name: "运城" }, { id: 470, name: "吕梁" }]
    }, {
        id: 23, name: "陕西",
        child: [{ id: 23e3, name: "陕西" }, { id: 480, name: "西安" }, { id: 481, name: "铜川" }, { id: 482, name: "宝鸡" }, { id: 483, name: "咸阳" }, { id: 484, name: "渭南" }, { id: 485, name: "延安" }, { id: 486, name: "汉中" }, { id: 487, name: "榆林" }, { id: 488, name: "安康" }, { id: 489, name: "商洛" }]
    }, {
        id: 17, name: "安徽",
        child: [{ id: 17e3, name: "安徽" }, { id: 360, name: "合肥" }, { id: 361, name: "芜湖" }, { id: 362, name: "蚌埠" }, { id: 363, name: "淮南" }, { id: 364, name: "马鞍山" }, { id: 365, name: "淮北" }, { id: 366, name: "铜陵" }, { id: 367, name: "安庆" }, { id: 368, name: "黄山" }, { id: 369, name: "滁州" }, { id: 370, name: "阜阳" }, { id: 371, name: "宿州" }, { id: 372, name: "巢湖" }, { id: 373, name: "六安" }, { id: 374, name: "亳州" }, { id: 375, name: "宣城" }, { id: 376, name: "池州" }]
    }, {
        id: 14, name: "湖北",
        child: [{ id: 14e3, name: "湖北" }, { id: 300, name: "武汉" }, { id: 301, name: "黄石" }, { id: 302, name: "襄樊" }, { id: 303, name: "十堰" }, { id: 304, name: "荆州" }, { id: 305, name: "宜昌" }, { id: 306, name: "荆门" }, { id: 307, name: "鄂州" }, { id: 308, name: "孝感" }, { id: 309, name: "黄冈" }, { id: 310, name: "咸宁" }, { id: 311, name: "随州" }, { id: 312, name: "仙桃" }, { id: 313, name: "天门" }, { id: 314, name: "潜江" }, { id: 315, name: "恩施" }]
    }, {
        id: 15, name: "湖南",
        child: [{ id: 15e3, name: "湖南" }, { id: 320, name: "长沙" }, { id: 321, name: "株州" }, { id: 322, name: "湘潭" }, { id: 323, name: "衡阳" }, { id: 324, name: "邵阳" }, { id: 325, name: "岳阳" }, { id: 326, name: "常德" }, { id: 327, name: "张家界" }, { id: 328, name: "益阳" }, { id: 329, name: "郴州" }, { id: 330, name: "永州" }, { id: 331, name: "怀化" }, { id: 332, name: "娄底" }, { id: 333, name: "湘西州" }]
    }, {
        id: 16, name: "江西",
        child: [{ id: 16e3, name: "江西" }, { id: 340, name: "南昌" }, { id: 341, name: "景德镇" }, { id: 342, name: "萍乡" }, { id: 343, name: "新余" }, { id: 344, name: "九江" }, { id: 345, name: "鹰潭" }, { id: 346, name: "赣州" }, { id: 347, name: "吉安" }, { id: 348, name: "宜春" }, { id: 349, name: "抚州" }, { id: 350, name: "上饶" }]
    }, {
        id: 4, name: "福建",
        child: [{ id: 4e3, name: "福建" }, { id: 70, name: "福州" }, { id: 71, name: "厦门" }, { id: 72, name: "三明" }, { id: 73, name: "莆田" }, { id: 74, name: "泉州" }, { id: 75, name: "漳州" }, { id: 76, name: "南平" }, { id: 77, name: "龙岩" }, { id: 78, name: "宁德" }, { id: 80, name: "石狮" }, { id: 81, name: "晋江" }, { id: 82, name: "南安" }, { id: 83, name: "惠安" }, { id: 84, name: "永春" }]
    }, {
        id: 2, name: "广西",
        child: [{ id: 2e3, name: "广西" }, { id: 30, name: "南宁" }, { id: 31, name: "柳州" }, { id: 32, name: "桂林" }, { id: 33, name: "梧州" }, { id: 34, name: "北海" }, { id: 35, name: "防城港" }, { id: 36, name: "钦州" }, { id: 37, name: "贵港" }, { id: 38, name: "玉林" }, { id: 39, name: "百色" }, { id: 40, name: "河池" }, { id: 41, name: "贺州" }, { id: 42, name: "来宾" }, { id: 43, name: "崇左" }]
    }, {
        id: 13, name: "海南",
        child: [{ id: 13e3, name: "海南" }, { id: 50, name: "海口" }, { id: 51, name: "三亚" }, { id: 52, name: "五指山" }, { id: 53, name: "琼海" }, { id: 54, name: "儋州" }, { id: 55, name: "文昌" }, { id: 56, name: "万宁" }, { id: 57, name: "东方" }, { id: 58, name: "洋浦" }]
    }, {
        id: 27, name: "云南",
        child: [{ id: 27e3, name: "云南" }, { id: 560, name: "昆明" }, { id: 561, name: "曲靖" }, { id: 562, name: "玉溪" }, { id: 563, name: "保山" }, { id: 564, name: "昭通" }, { id: 565, name: "思茅" }, { id: 566, name: "临沧" }, { id: 567, name: "丽江" }, { id: 568, name: "文山州" }, { id: 569, name: "红河州" }, { id: 570, name: "西双版纳" }, { id: 571, name: "楚雄州" }, { id: 572, name: "大理州" }, { id: 573, name: "德宏州" }, { id: 574, name: "怒江州" }, { id: 575, name: "迪庆州" }]
    }, {
        id: 28, name: "贵州",
        child: [{ id: 28e3, name: "贵州" }, { id: 580, name: "贵阳" }, { id: 581, name: "六盘水" }, { id: 582, name: "遵义" }, { id: 583, name: "安顺" }, { id: 584, name: "铜仁" }, { id: 585, name: "毕节" }, { id: 586, name: "黔西南州" }, { id: 587, name: "黔东南州" }, { id: 588, name: "黔南州" }]
    }, {
        id: 26, name: "四川",
        child: [{ id: 26e3, name: "四川" }, { id: 530, name: "成都" }, { id: 531, name: "自贡" }, { id: 532, name: "攀枝花" }, { id: 533, name: "泸州" }, { id: 534, name: "德阳" }, { id: 535, name: "绵阳" }, { id: 536, name: "广元" }, { id: 537, name: "遂宁" }, { id: 538, name: "内江" }, { id: 539, name: "乐山" }, { id: 540, name: "南充" }, { id: 541, name: "宜宾" }, { id: 542, name: "广安" }, { id: 543, name: "达州" }, { id: 544, name: "巴中" }, { id: 545, name: "雅安" }, { id: 546, name: "眉山" }, { id: 547, name: "资阳" }, { id: 548, name: "阿坝州" }, { id: 549, name: "甘孜州" }, { id: 550, name: "凉山州" }]
    }, {
        id: 18, name: "辽宁",
        child: [{ id: 18e3, name: "辽宁" }, { id: 380, name: "沈阳" }, { id: 381, name: "大连" }, { id: 382, name: "鞍山" }, { id: 383, name: "抚顺" }, { id: 384, name: "本溪" }, { id: 385, name: "丹东" }, { id: 386, name: "锦州" }, { id: 387, name: "葫芦岛" }, { id: 388, name: "营口" }, { id: 389, name: "盘锦" }, { id: 390, name: "阜新" }, { id: 391, name: "辽阳" }, { id: 392, name: "铁岭" }, { id: 393, name: "朝阳" }]
    }, {
        id: 19, name: "吉林",
        child: [{ id: 19e3, name: "吉林" }, { id: 400, name: "长春" }, { id: 401, name: "吉林" }, { id: 402, name: "四平" }, { id: 403, name: "辽源" }, { id: 404, name: "通化" }, { id: 405, name: "白山" }, { id: 406, name: "松原" }, { id: 407, name: "白城" }, { id: 408, name: "延边" }]
    }, {
        id: 20, name: "黑龙江",
        child: [{ id: 2e4, name: "黑龙江" }, { id: 420, name: "哈尔滨" }, { id: 421, name: "齐齐哈尔" }, { id: 422, name: "鹤岗" }, { id: 423, name: "双鸭山" }, { id: 424, name: "鸡西" }, { id: 425, name: "大庆" }, { id: 426, name: "伊春" }, { id: 427, name: "牡丹江" }, { id: 428, name: "佳木斯" }, { id: 429, name: "七台河" }, { id: 430, name: "黑河" }, { id: 431, name: "绥化" }, { id: 432, name: "大兴安岭" }]
    }, {
        id: 21, name: "内蒙古",
        child: [{ id: 21e3, name: "内蒙古" }, { id: 440, name: "呼和浩特" }, { id: 441, name: "包头" }, { id: 442, name: "乌海" }, { id: 443, name: "赤峰" }, { id: 444, name: "通辽" }, { id: 445, name: "鄂尔多斯" }, { id: 446, name: "乌兰察布" }, { id: 447, name: "锡林郭勒" }, { id: 448, name: "呼伦贝尔" }, { id: 449, name: "巴彦淖尔" }, { id: 450, name: "阿拉善盟" }, { id: 451, name: "兴安盟" }]
    }, {
        id: 25, name: "甘肃",
        child: [{ id: 25e3, name: "甘肃" }, { id: 510, name: "兰州" }, { id: 511, name: "金昌" }, { id: 512, name: "白银" }, { id: 513, name: "天水" }, { id: 514, name: "嘉峪关" }, { id: 515, name: "武威" }, { id: 516, name: "定西" }, { id: 517, name: "平凉" }, { id: 518, name: "庆阳" }, { id: 519, name: "陇南" }, { id: 520, name: "张掖" }, { id: 521, name: "酒泉" }, { id: 522, name: "甘南州" }, { id: 523, name: "临夏州" }, { id: 524, name: "兰州新区" }]
    }, {
        id: 29, name: "青海",
        child: [{ id: 29e3, name: "青海" }, { id: 600, name: "西宁" }, { id: 601, name: "海东" }, { id: 602, name: "海北州" }, { id: 603, name: "黄南州" }, { id: 604, name: "海南州" }, { id: 605, name: "果洛州" }, { id: 606, name: "玉树州" }, { id: 607, name: "海西州" }]
    }, {
        id: 24, name: "宁夏",
        child: [{ id: 24e3, name: "宁夏" }, { id: 500, name: "银川" }, { id: 501, name: "石嘴山" }, { id: 502, name: "吴忠" }, { id: 503, name: "固原" }, { id: 504, name: "中卫" }]
    }, {
        id: 30, name: "新疆",
        child: [{ id: 3e4, name: "新疆" }, { id: 610, name: "乌鲁木齐" }, { id: 611, name: "克拉玛依" }, { id: 612, name: "石河子" }, { id: 613, name: "吐鲁番" }, { id: 614, name: "哈密" }, { id: 615, name: "和田" }, { id: 616, name: "阿克苏" }, { id: 617, name: "喀什" }, { id: 618, name: "克孜勒苏州" }, { id: 619, name: "巴音郭楞州" }, { id: 620, name: "昌吉州" }, { id: 621, name: "博尔塔拉州" }, { id: 622, name: "伊犁州" }, { id: 623, name: "阿拉尔" }, { id: 624, name: "阿勒泰" }]
    }, {
        id: 31, name: "西藏",
        child: [{ id: 31e3, name: "西藏" }, { id: 630, name: "拉萨" }, { id: 631, name: "那曲" }, { id: 632, name: "昌都" }, { id: 633, name: "山南" }, { id: 634, name: "日喀则" }, { id: 635, name: "阿里" }, { id: 636, name: "林芝" }]
    }, {
        id: 32, name: "香港",
        child: [{ id: 32e3, name: "香港" }, { id: 640, name: "香港" }]
    }, {
        id: 33, name: "澳门",
        child: [{ id: 33e3, name: "澳门" }, { id: 660, name: "澳门" }]
    }, {
        id: 34, name: "台湾",
        child: [{ id: 34e3, name: "台湾" }, { id: 670, name: "台湾" }]
    }];