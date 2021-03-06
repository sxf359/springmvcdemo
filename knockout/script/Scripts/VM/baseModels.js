
//职位类别
var JobClassModel = { GID: "", JobClassCode: "", JobClassName: "", JobClassAlias: "", SubJobClass: [] };
var SubJobClassModel = { GID: "", JobClassCode: "", JobClassName: "", JobClassAlias: "", SubJobClass: [] };
 
//公司
var CompanyModel = {
    GID: '', AdminID: "", Name: "", Alias: "", Nature: "", Type: "", Industry: "", Capital: "", Scale: "", Address: "", MapAddress: "",
    CV: "", Url: "", Email: "", IsEmailOpen: "", Phone: "", IsPhoneOpen: "", Fax: "", LinkMan: "", LinkMobile: "", LinkAddress: "",
    PostCode: "", Labels: "", LOGO: "", Videos: "", Pictures: "", IsVIP: "", IsCertificated: "", CertificatedDate: "", CertificatedMemo: "",
    Licence: "", Wechat: "", AllowanceAmountLimit: "", AllowanceDayLimit: ""
}
//职位
var JobModel = {
    GID: '', CompanyID: "", HrID: "", JobClass: "", JobType: "", JobName: "", Last: "", Amount: "", Department: "", Industry: "",
    Region: "", Salary: "", ClosingDate: "", IsClosed: "", IsSuspend: "", SuspendDate: "", SuspendReason: "", Description: "", Benefit: "",
    requirement: "", InterviewMemo: "", InterviewAddr: "", Contact: "", Phone: "", Email: "", IsTop: "", IsUrgent: "", RefreshDate: "", RefreshCount: ""
}

//view model
var JobViewModel = { job: JobMode, company: CompanyModel };
var CompanyViewModel = { GID: '' };


var CarouselModel = { GID: '', Seq: 0, Image: "", Memo: "", Active: "True", Url: "", Active: false };

var mappingOption = {
    'CreateTime': {
        create: function (options) {
            return ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd hh:mm'));
        },
        update: function (options) {
            return options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd');//ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd'));
        }
    },
    'ReleaseTime': {
        create: function (options) {
            return ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd'));
        },
        update: function (options) {
            return options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd');//ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd'));
        }
    },
    'VotingBegin': {
        create: function (options) {
            return ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd'));
        },
        update: function (options) {
            return options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd');//ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd'));
        }
    },
    'VotingEnd': {
        create: function (options) {
            return ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd'));
        },
        update: function (options) {
            return options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd');//ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd'));
        }
    },
    'CloseDate': {
        create: function (options) {
            return ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd hh:mm'));
        },
        update: function (options) {
            return options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd');//ko.observable(options.data == null ? null : StringToDate(ChangeDateFormat(options.data)).format('yyyy-MM-dd'));
        }
    }
};