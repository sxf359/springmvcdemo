var IndustryData = [
{ id: 0, name: "不限" },
{ id: 1, name: "计算机软件/硬件" },
{ id: 2, name: "计算机系统/维修服务" },
{ id: 3, name: "通信(设备/运营/增值服务)" },
{ id: 4, name: "互联网/电子商务" },
{ id: 5, name: "网络游戏" },
{ id: 6, name: "电子技术/半导体/集成电路" },
{ id: 7, name: "仪器仪表/工业自动化" },
{ id: 8, name: "会计/审计" },
{ id: 9, name: "金融(投资/证券/基金)" },
{ id: 10, name: "金融(银行/保险)" },
{ id: 11, name: "贸易/进出口" },
{ id: 12, name: "批发/零售" },
{ id: 13, name: "快速消费品(食品/饮料/烟酒/日化)" },
{ id: 14, name: "服装/纺织/皮革" },
{ id: 15, name: "家具/家电/工艺品/玩具" },
{ id: 16, name: "办公用品及设备" },
{ id: 17, name: "机械/设备/重工" },
{ id: 18, name: "汽车/摩托车/零配件" },
{ id: 19, name: "制药/生物工程" },
{ id: 20, name: "医疗护理/美容/保健/卫生" },
{ id: 21, name: "医疗设备/器械" },
{ id: 22, name: "广告/市场推广" },
{ id: 23, name: "会展/博览" },
{ id: 24, name: "影视/媒体/艺术/传播/出版" },
{ id: 25, name: "印刷/包装/造纸" },
{ id: 26, name: "房地产开发" },
{ id: 27, name: "建筑与工程" },
{ id: 28, name: "家居/室内设计/装潢" },
{ id: 29, name: "物业管理/商业中心" },
{ id: 30, name: "中介服务/家政服务" },
{ id: 31, name: "专业服务(咨询/财会/法律)" },
{ id: 32, name: "检测/认证" },
{ id: 33, name: "教育/培训" },
{ id: 34, name: "学术/科研" },
{ id: 35, name: "餐饮/娱乐/休闲" },
{ id: 36, name: "酒店/旅游" },
{ id: 37, name: "交通/运输/物流" },
{ id: 38, name: "航天/航空" },
{ id: 39, name: "能源(石油/化工/矿产)" },
{ id: 40, name: "能源(采掘/冶炼/原材料加工)" },
{ id: 41, name: "电力/水利/新能源" },
{ id: 42, name: "政府部门/事业单位" },
{ id: 43, name: "非盈利机构/行业协会" },
{ id: 44, name: "农业/渔业/林业/牧业" },
{ id: 100, name: "其他行业" }];

//行业选择select2专用
var IndustryDataSelect2 = $.map(IndustryData, function (obj) {
    obj.id = obj.name;
    obj.text = obj.name;
    return obj;
});