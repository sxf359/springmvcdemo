require.config({
    baseUrl: "/Scripts/",
    paths: {
        util: "plugins/LMSoft/util",
        jquery: 'plugins/jquery-1.10.2'
    },
    waitSeconds: 15,
    map: {
        // '*': { 'css': 'lib/css' }
    },
    shim: {
        //'util': ['css!../style/1.css']
    }
});