window.onload = function () {
    //localStorage.key = "sdas";
    //console.log(localStorage.key);
    //var storage = chrome.storage;
    //console.log("storage is " + storage);
    //var bookmarks = chrome.bookmarks;
    //console.log("bookmarks is " + bookmarks);
    //https://gitlab.com/api/v4/users?username=liusimawen       获取用户信息(信息较少)

    //https://gitlab.com/api/v4/users?private_token=sE6t7B4owedcSXXG5FLo&search=liusimawen

    //https://gitlab.com/api/v4/user?private_token=sE6t7B4owedcSXXG5FLo 获取用户信息（全）
    //https://gitlab.com/api/v4/users/2581265?private_token=sE6t7B4owedcSXXG5FLo 获取用户信息（全）
    //user id 2581265
    //project id 7487744
    //https://gitlab.com/api/v4/users/2581265/projects?private_token=sE6t7B4owedcSXXG5FLo  获取用户下的所有projects信息

    //var encodeFilePath = encodeURI('content.json/raw');//content.json/raw直接获取未编码的文件内容   content.json获取文件对象
    //var projectId = getProjectId('liusimawen', 'testbookmarks', 'sE6t7B4owedcSXXG5FLo');

    //console.log(projectId);
    //var fileInfo = getFileInfo(projectId, 'content.json', 'sE6t7B4owedcSXXG5FLo');
    //console.log(fileInfo);
    //console.log(getUserId('liusimawen', 'sE6t7B4owedcSXXG5FLo'));
    //var opt = {
    //    userName: 'liusimawen',
    //    userId: '',
    //    token: 'sE6t7B4owedcSXXG5FLo',
    //    projectId: '',
    //    projectName: 'testbookmarks',
    //    fileName: 'content.json',
    //    callback: function () { },
    //};
    //var controller = $.fn.getGitLabController(opt);
    //opt = controller.getUserId(opt);
    //opt = controller.getUserProjects(opt);
    //var fileinfo = controller.getFileInfo(opt);
    //var J_fileinfo = JSON.parse(fileinfo);
    ////console.log(fileinfo);
    var pageconc = $.fn.getPageController();
    //pageconc.setBookmarks(J_fileinfo, opt.callback);
};
var test = {

    popup: function(content){
        alert(content);
    },
}
//function getUserId(opt) {//username, token
//    //根据username获取user id
//    $.ajax({
//        type: "GET",
//        async: false,
//        url: 'https://gitlab.com/api/v4/users?username=' + opt.userName,
//        dataType: 'json',
//        success: function (res) {
//            opt.userId = res[0].id;

//            //getUserProjects(opt);
//        },
//        error: function (xhr) {
//            console.log('获取userId失败');
//        }
//    });
//    return opt;
//}
//function getUserProjects(opt) {//userId,token,callback
//    $.ajax({
//        type: "GET",
//        url: 'https://gitlab.com/api/v4/users/' + opt.userId + '/projects?private_token=' + opt.token,
//        dataType: 'json',
//        success: function (res) {
//            for (pc = 0; pc < res.length; pc++) {
//                if (res[pc].name == opt.projectName) {
//                    opt.projectId = res[pc].id;
//                    getFileInfo(opt);
//                }
//            }
//        },
//        error: function (xhr) {
//            console.log('error');
//        }
//    });
//}
//function getFileInfo(opt) {//projectId, fileName, token
//    console.log(opt);
//    var encodeFilePath = encodeURI(opt.fileName+'/raw');
//    $.ajax({
//        type: "GET",
//        url: 'https://gitlab.com/api/v4/projects/'+opt.projectId+'/repository/files/' + encodeFilePath + '?ref=master&private_token='+opt.token,
//        dataType: 'text',
//        success: function (res) {
//            //return res;
//            console.log(res);
//            //var base64 = new Base64();
//            //console.log(base64.decode(res['content']));
//        },
//        error: function (xhr) {
//            console.log('error');
//        }
//    });
//};
//function getProjectId(user, projectName, token,callback) {
//    //根据username获取user id
//    var userId;
//    var projectId;
//    $.ajax({
//        type: "GET",
//        url: 'https://gitlab.com/api/v4/users?username=' + user,
//        dataType: 'json',
//        success: function (res) {
//            userId = res[0].id;
//            //根据userId projectName获取对于projectId
//            callback(userId,token);

//        },
//        error: function (xhr) {
//            console.log('获取userId失败');
//        }
//    });

//    //return projectId;
//}
