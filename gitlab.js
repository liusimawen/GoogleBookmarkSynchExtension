//(function(arg){…})(param)
//这就相当于定义了一个参数为arg的匿名函数，然后用param作为参数来调用这个匿名函数
(function ($, window, document, undefined) {
    $.put = function (url, data, callback) {
        var finalData = { branch: data.branch, commit_message: data.commit_message, private_token: data.token, content: data.content };
        return $.ajax({
            type: "put",
            url: url,
            data: finalData,//{ branch: 'master', commit_message: 'update', private_token: 'sE6t7B4owedcSXXG5FLo', content: 'asdasd' },
            //contentType: "application/json;charset=utf-8",
            success: function (res) {
                callback && callback(null, res);
            },
            error: function (xhr) {
                callback && callback((xhr.responseJSON && xhr.responseJSON.message) || 'error');
            }
        });
    };
    var gitLabController = window.gitLabController = function(ele,opt){
        this.$element = ele;//这个ele就是之后调用时选择器选择的对象$('')
        this.defaults = {
            username: '',
            userid: '',
            token: '',
            projectid: '',
            projectname: '',
            filename: '',
            callback: function () { },
        };
        this.options = $.extend({}, this.defaults, opt);
    };
    gitLabController.prototype = {
        getUserId: function (opt) {
            //根据username获取user id
            $this = this;
            $.ajax({
                type: "GET",
                async:false,
                url: 'https://gitlab.com/api/v4/users?username=' + opt.username,
                dataType: 'json',
                success: function (res) {
                    opt.userid = res[0].id;
                    //$this.getUserProjects(opt);
                },
                error: function (xhr) {
                    console.log('获取userid失败');
                }
            });
            return opt;
        },
        getUserProjects: function (opt) {
            $this = this;
            $.ajax({
                type: "GET",
                async: false,
                url: 'https://gitlab.com/api/v4/users/' + opt.userid + '/projects?private_token=' + opt.token,
                dataType: 'json',
                success: function (res) {
                    for (pc = 0; pc < res.length; pc++) {
                        if (res[pc].name == opt.projectname) {
                            opt.projectid = res[pc].id;
                        }
                    }
                },
                error: function (xhr) {
                    console.log('error');
                }
            });
            return opt;
        },
        getFileInfo: function (opt) {
            $this = this;
            var fileinfo;
            var encodeFilePath = encodeURI(opt.filename + '/raw');
            $.ajax({
                type: "GET",
                async: false,
                url: 'https://gitlab.com/api/v4/projects/' + opt.projectid + '/repository/files/' + encodeFilePath + '?ref=master&private_token=' + opt.token,
                dataType: 'text',
                success: function (res) {
                    fileinfo= res;
                    //var base64 = new Base64();
                    //console.log(base64.decode(res['content']));
                },
                error: function (xhr) {
                    console.log('error');
                }
            });
            return fileinfo;
        },
        updateFile: function (_opts, cb) {
            var opt = $.extend({
                projectname: '',
                branch: '',
                file_path: '',
                message: '',
                content: '',
                commit_message:''
            }, _opts);
            var data = JSON.stringify(opt);
            var encodeFilePath = encodeURI(opt.file_path);
            var url = 'https://gitlab.com/api/v4/projects/' + opt.projectid
                + '/repository/files/' + encodeFilePath;
                //+ '?branch=master&commit_message=' + opt.commit_message
                //+ '&private_token=' + opt.token + '&content=' + opt.content;
            $.put(url, opt, cb);
            return this;
        },

    };
    $.fn.getGitLabController = function (opt) {
        var obj = new gitLabController(this, opt);
        return obj;
    };
})(jQuery, window, document);