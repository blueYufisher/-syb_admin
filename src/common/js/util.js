import $ from 'jquery'
import AsyncValidator from 'async-validator'
import api from './interface'

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) {
        s = '0' + s;
    }
    return s;
};

export default {
    typeByEnter: function (event, type, callback) {
        //通过回车输入
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;       //处理兼容性问题
        $("input[name='" + type + "']").bind('input propertychange', function () {
            // $("input[name='sure']").attr("value", $(this).val());
        });
        if (keyCode == "13") {
            callback();
        }
    },
    typeByClick: function (callback) {
        //通过点击输入
        // $("input[name='"+type+"']").bind('input propertychange', function () {
        //     // $("input[name='sure']").attr("value", $(this).val());
        // });
        callback();
    },
    formatDate: function (v, format) {
        /**
         格式化时间显示方式、用法:format="yyyy-MM-dd hh:mm:ss";
         */
        if (!v) return "";
        var d = new Date(v);
        if (typeof v === 'string') {
            if (v.indexOf("/Date(") > -1)
                d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
            else
                d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
        }
        var o = {
            "M+": d.getMonth() + 1,  //month
            "d+": d.getDate(),       //day
            "h+": d.getHours(),      //hour
            "m+": d.getMinutes(),    //minute
            "s+": d.getSeconds(),    //second
            "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
            "S": d.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },
    convertDateToJsonDate: function (strDate) {
        //时间格式转换为Json的时间格式
        var t = new Date(strDate);
        return t.getTime();
    },
    isvalidPhone: function (str) {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        return reg.test(str)
    },
    validateError: function (rules, data, callback) {
        const validator = new AsyncValidator(rules)
        validator.validate(data, (errors, fields) => {
            // let formError = [];
            // if (errors && errors.length) {
            //     console.log("errors:",errors);
            //     errors.forEach(({message, field}) => {
            //         formError[field] = message
            //     })
            // } else {
            //     formError = {}
            // };
            callback(errors);
        })
    },
    uploadPicture: function (file, env) {
        let fd = new FormData();
        fd.append('upfile', file.raw);
        fd.append('title', file.name);
        const isJPG = file.type === 'image/jpeg' || 'image/gif' || 'image/png' || 'image/bmp';
        const isLt2M = file.size / 1024 < 500;

        if (!isJPG) {
            env.$message.error('上传封面图片只能是 gif / jpg / bmp / png 格式!');
        }
        if (!isLt2M) {
            env.$message.error('上传封面图片大小不能超过 500KB!');
        } else {
            env.imageUrl = URL.createObjectURL(file.raw);
            return fd;
        }
    },
    uploadFile: function (file, env) {
        let fd = new FormData();
        fd.append('upfile', file.raw);
        fd.append('title', file.name);
        // const isJPG = file.type === 'image/jpeg' || 'image/gif' || 'image/png' || 'image/bmp';
        // const isLt2M = file.size / 1024 < 500;
        //
        // if (!isJPG) {
        //     env.$message.error('上传封面图片只能是 gif / jpg / bmp / png 格式!');
        // }
        // if (!isLt2M) {
        //     env.$message.error('上传封面图片大小不能超过 500KB!');
        // } else {
        env.fileUrl = file.name;
        return fd;
        // }
    },
    hoverNavSmenu: function () {
        var $nav = $("#navigation");
        $nav
            .on('mouseenter', '.p_menu', function () {
                $(this).find('.smenu').removeClass("disappear");
            })
            .on('mouseleave', '.p_menu', function () {
                $(this).find('.smenu').addClass("disappear");
            });
    },
    initMenu: function (router, store) {
        if (store.state.routes.length > 0) {
            return;
        }
        api.Menu.sysmenu(res => {

        })
            .then(res => {
                // console.log(res);
                if (res && res.status == 200) {
                    var fmtRoutes = formatRoutes(res.body.data);
                    // console.log(fmtRoutes);
                    router.options.routes = fmtRoutes;
                    router.addRoutes(fmtRoutes);
                    store.commit('initMenu', fmtRoutes);
                    router.push({path: '/'});
                }
            })
    },
    filterHTMLTag: function (msg) {
        var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
        msg = msg.replace(/[|]*\n/, '') //去除行尾空格
        msg = msg.replace(/&nbsp;/ig, ''); //去掉npsp
        return msg;
    }
};

export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            component(resolve) {
                if (component.startsWith("Home")) {
                    require(['../../views/' + component + '.vue'], resolve)
                } else if (component.startsWith("/Project")) {
                    require(['../../views' + component + '.vue'], resolve)
                } else if (component.startsWith("/Infos")) {
                    require(['../../views' + component + '.vue'], resolve)
                } else if (component.startsWith("/system")) {
                    require(['../../views' + component + '.vue'], resolve)
                }
                // } else if (component.startsWith("Sal")) {
                //     require(['../views/' + component + '.vue'], resolve)
                // } else if (component.startsWith("Sta")) {
                //     require(['../views/' + component + '.vue'], resolve)
                // } else if (component.startsWith("Sys")) {
                //     require(['../views/' + component + '.vue'], resolve)
                // }
            },
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children
        };
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}

export const isNotNullORBlank = (...args) => {
    for (var i = 0; i < args.length; i++) {
        var argument = args[i];
        if (argument == null || argument == '' || argument == undefined) {
            Message.warning({message: '数据不能为空!'})
            return false;
        }
    }
    return true;
}
