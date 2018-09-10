;(function ($, window, document, undefined) {

    var pageController = function(ele,opt){
        this.$element = ele;//这个ele就是之后调用时选择器选择的对象$('')
        this.defaults = {
            callback: null,
        };
        this.options = $.extend({}, this.defaults, opt);
    };
    pageController.prototype={
        /**
         * 
         */
        init: function () {
            this.$loading = $('#divLoading');
            this.$divLogin = $('#divLogin');
            this.$tbUsername = $('#tbUsername');
            this.$tbToken = $('#tbToken');
            this.$tbPath = $('#tbPath');
            this.$divTip = $('#divTip');
            this.$divRemember = $('#divRemember');
            this.$spToggle = $('#spToggle');
            this.$btnUpload = $('#btnUpload');
            this.$btnDownload = $('#btnDownload');
            this.$divSuccess = $('#divSuccess');
            this.$divSuccessInfo = $('#divSuccessInfo');
            this.bindEvent();
            this.getUserInfo();
        },
        /**
         * 
         */
        bindEvent: function () {
            var that = this;
            this.$divLogin.on('focus', '.input', function () {
                $('.input').removeClass('error');
                that.$divTip.hide();
            });
            this.$btnUpload.click(this.onOper.bind(this));
            this.$btnDownload.click(this.onOper.bind(this));
            this.$spToggle.click(function () {
                var $this = $(this);
                $this.toggleClass('on');
                that.$divRemember.toggleClass('off');
            });
        },
        /**
         * 
         */
        onOper: function (e) {
            var that = this,
                $elem = $(e.target),
                type = $elem.attr('data-type');
            var formObj = this.collectForm();
            var result = this.checkForm(formObj);
            if (result !== true) {
                this.$divTip.text(result).show();
                return;
            }
            //this.$loading.show();
            // 
            var paths = formObj.path.split('/'),
                repo = paths[0],
                path = formObj.path.replace(repo + '/', ''),
                opts = {
                    projectname: repo,
                    filename: path,
                    username: formObj.username,
                    token: formObj.token
                };
            if (type == 'upload') {
                console.log('upload');
                this.getBookmarks(function (bookmarks) {
                    var opt = {
                        username: '',
                        userid: '',
                        token: '',
                        projectid: '',
                        projectname: '',
                        filename: '',
                        callback: function () { },
                        branch: 'master',
                        file_path: 'content.json',
                        commit_message: 'update',
                        content: JSON.stringify(bookmarks),
                        sha: '',
                        start_branch: '',
                        encoding: '',
                        author_email: '',
                        author_name: '',
                        last_commit_id:'',
                    };
                    var newopt = $.extend({}, opt, opts);
                    var controller = $.fn.getGitLabController(newopt);
                    newopt = controller.getUserId(newopt);
                    newopt = controller.getUserProjects(newopt);
                    //console.log(newopt);
                    controller.updateFile(newopt, function (err) {
                        if (err) {
                            that.$divTip.text(err).show();
                        } else {
                            that.$divSuccess.show();
                            that.$divSuccessInfo.text('Upload Success');
                        }
                        that.$loading.hide();
                    });
                    //that.upload(bookmarks, opts, function (err) {
                    //    if (err) {
                    //        that.$divTip.text(err).show();
                    //    } else {
                    //        that.$divSuccess.show();
                    //        that.$divSuccessInfo.text('Upload Success');
                    //    }
                    //    that.$loading.hide();
                    //});
                });
            } else {
                // 
                console.log('download');
                var opt = {
                    username: 'liusimawen',
                    userid: '',
                    token: 'sE6t7B4owedcSXXG5FLo',
                    projectid: '',
                    projectname: 'testbookmarks',
                    filename: 'content.json',
                    callback: function () { },
                };
                var newopt = $.extend({}, opt, opts);
                console.log(newopt);
                var controller = $.fn.getGitLabController(newopt);
                newopt = controller.getUserId(newopt);
                newopt = controller.getUserProjects(newopt);
                var fileinfo = controller.getFileInfo(newopt);
                console.log(fileinfo);
                var J_fileinfo = JSON.parse(fileinfo);
                that.setBookmarks(J_fileinfo, function () {
                    that.$loading.hide();
                    that.$divSuccess.show();
                    that.$divSuccessInfo.text('Download Success');
                });

                //this.download(opts, function (err, bookmarks) {
                //    if (err) {
                //        that.$divTip.text(err).show();
                //        that.$loading.hide();
                //    } else {
                //        that.setBookmarks(bookmarks, function () {
                //            that.$loading.hide();
                //            that.$divSuccess.show();
                //            that.$divSuccessInfo.text('Download Success');
                //        });
                //    }
                //});
            }
            // 
            if (this.$spToggle.hasClass('on')) {
                this.saveUserInfo(formObj);
            } else {
                this.clearUserInfo();
            }
        },
        /**
         * 
         */
        clearUserInfo: function () {
            chrome.storage.local.clear(function () {
                console.log('clear user info success');
            });
        },
        /**
         * 
         */
        saveUserInfo: function (obj) {
            chrome.storage.local.set(obj, function () {
                console.log('save user info success');
            });
        },
        /**
         * 
         */
        getUserInfo: function () {
            var that = this;
            chrome.storage.local.get(['username', 'token', 'path'], function (obj) {
                // console.log(obj);
                var flag = false;
                if (obj.username) {
                    that.$tbUsername.val(obj.username);
                    that.$tbToken.val(obj.token);
                    that.$tbPath.val(obj.path);
                    flag = true;
                }
                that.$divRemember.toggleClass('off', !flag);
                that.$spToggle.toggleClass('on', flag);
            });
        },
        /**
         * 
         */
        checkForm: function (formObj) {
            if (formObj.username == '') {
                this.$tbUsername.addClass('error');
                return 'Username is required';
            }
            if (formObj.token == '') {
                this.$tbToken.addClass('error');
                return 'Token is required';
            }
            if (formObj.path == '') {
                this.$tbPath.addClass('error');
                return 'Path is required';
            }
            return true;
        },
        /**
         * 
         */
        collectForm: function () {
            var obj = {};
            obj.username = this.$tbUsername.val();
            obj.token = this.$tbToken.val();
            obj.path = this.$tbPath.val();
            return obj;
        },
        /**
         * 
         */
        upload: function (bookmarks, opts, cb) {
            var that = this;
            // 
            gitHubController.init(opts.username, opts.token)
                // 
                .getFileInfo({
                    repo: opts.repo,
                    path: opts.path
                }, function (err, getFileInfoRes) {
                    if (err) {
                        // 
                        gitHubController.createJsonFile({
                            repo: opts.repo,
                            branch: 'master',
                            path: opts.path,
                            message: 'first commit',
                            content: bookmarks
                        }, cb);
                    } else {
                        // 
                        gitHubController.updateJsonFile({
                            repo: opts.repo,
                            branch: 'master',
                            path: opts.path,
                            message: 'update',
                            sha: getFileInfoRes.sha,
                            content: bookmarks
                        }, cb);
                    }
                });
        },
        /**
         * 
         */
        download: function (opts, cb) {
            var that = this;
            gitHubController.init(opts.username, opts.token)
                .getJsonFile({
                    repo: opts.repo,
                    branch: 'master',
                    path: opts.path
                }, cb);
        },
        getBookmarks: function (cb) {
            // 
            chrome.bookmarks.getSubTree('1', cb);
        },
        setBookmarks: function (bookmarks, cb) {
            // 
            this.emptyBookmarksFolder('1', function () {
                // 
                addBookmarks('1', bookmarks[0]);
            });

            function addBookmarks(parentId, bookmarks) {
                //console.log(bookmarks);
                var i, len, list = bookmarks.children || [];
                addTask(list.length);
                for (i = 0, len = list.length; i < len; i++) {
                    (function (item) {
                        // 
                        chrome.bookmarks.create({
                            parentId: parentId,
                            index: item.index,
                            title: item.title,
                            url: item.url
                        }, function (newBookmark) {
                            finishTask();
                            if (item.children && item.children.length > 0) {
                                addBookmarks(newBookmark.id, item);
                            }
                        });
                    })(list[i]);
                }
            }

            var taskNum = 0,
                finishNum = 0;

            function addTask(num) {
                taskNum += num;
            }

            function finishTask() {
                finishNum++;
                if (taskNum == finishNum) {
                    cb();
                }
            }
        },
        /**
         * 
         */
        emptyBookmarksFolder: function (id, cb) {
            // 
            chrome.bookmarks.getChildren(id, function (children) {
                var i, len, item, total = 0;
                for (i = 0, len = children.length; i < len; i++) {
                    item = children[i];
                    chrome.bookmarks.removeTree(item.id, removeCallback);
                }

                function removeCallback() {
                    total++;
                    if (len == total) {
                        cb();
                    }
                }
                if (len == 0) {
                    cb();
                }
            });
        }
    };
    
    $.fn.getPageController = function (opt) {
        var obj = new pageController(this, opt);
        obj.init();
        return obj;
    }
})(jQuery, window, document);