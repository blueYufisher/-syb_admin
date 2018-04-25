import Vue from 'vue'
import axios from 'axios';

// let serverUrl = 'syb'  //本地调试时
// let serverUrl = '..'  //打包部署上线时
var serverUrl = process.env.API_ROOT

let Interface = {
    gainJSON: function (url, callback) {
        return new Promise((resolve, reject) => {
            Vue.http.get(serverUrl + url).then((res) => {
                // console.log(res);
                if (res.body.status) {
                    callback(res);
                    resolve(res);
                } else {
                    reject();
                }
            });
        });
    }
}

export default {
    Infos: {
        selectInfoById: function (id, callback) {
            return Interface.gainJSON('/selectInfoById?id=' + id, callback);
        },
        selectInfoByIdAndType: function (params, callback) {
            // Vue.http.get(serverUrl + '/selectInfoByIdAndType?id=' + id + '&type=' + type).then(function (res) {
            //     callback(res);
            // });
            Vue.http.post(serverUrl + '/selectInfoByIdAndType', params).then(function (res) {
                callback(res);
            });
        },
        limitInfosByTypeAndCurrentPageAndPageSize: function (type, currentPage, pageSize, callback) {
            Vue.http.get(serverUrl + '/limitInfosByTypeAndCurrentPageAndPageSize?type=' + type + '&currentPage=' + currentPage + '&pageSize=' + pageSize)
                .then(function (res) {
                    callback(res);
                });
        },
        selectInfoByNumAndType: function (num, type, callback) {
            Vue.http.get(serverUrl + '/selectInfoByNumAndType?type=' + type + '&num=' + num).then(function (res) {
                callback(res);
            });
        },
        searchInfosByTitleOrNote: function (params, type, currentPage, pageSize, callback) {
            Vue.http.post(serverUrl + '/searchInfosByTitleOrNote?type=' + type + '&currentPage=' + currentPage + '&pageSize=' + pageSize, params)
                .then(function (res) {
                    callback(res);
                });
        },
        addInfo: function (params, callback) {
            Vue.http.post(serverUrl + '/addInfo', params).then(function (res) {
                callback(res);
            });
        },
        deleteInfo: function (id, callback) {
            Vue.http.get(serverUrl + '/deleteInfo?id=' + id).then(function (res) {
                callback(res);
            });
        },
        modifyInfo: function (params, callback) {
            Vue.http.post(serverUrl + '/modifyInfo', params).then(function (res) {
                callback(res);
            });
        }
    },
    Project: {
        selectProjectById: function (id, callback) {
            Vue.http.get(serverUrl + '/selectProjectById?id=' + id).then(function (res) {
                callback(res);
            });
        },
        limitProjectsByCurrentPageAndPageSize: function (currentPage, pageSize, callback) {
            Vue.http.get(serverUrl + '/limitProjectsByCurrentPageAndPageSize?currentPage=' + currentPage + '&pageSize=' + pageSize)
                .then(function (res) {
                    callback(res);
                });
        },
        addProject: function (params, callback) {
            Vue.http.post(serverUrl + '/addProject', params).then(function (res) {
                callback(res);
            });
        },
        deleteProject: function (id, callback) {
            Vue.http.get(serverUrl + '/deleteProject?id=' + id).then(function (res) {
                callback(res);
            });
        },
        modifyProject: function (params, callback) {
            Vue.http.post(serverUrl + '/modifyProject', params).then(function (res) {
                callback(res);
            });
        },
        searchProjectByProjNameOrCompanyName: function (params, currentPage, pageSize, callback) {
            Vue.http.post(serverUrl + '/searchProjectByProjNameOrCompanyName?currentPage=' + currentPage + '&pageSize=' + pageSize, params)
                .then(function (res) {
                    callback(res);
                });
        },
    },
    Files: {
        uploadFile: function (file, callback) {
            return new Promise((resolve, reject) => {
                Vue.http.post(serverUrl + '/uploadFile', file).then((res) => {
                    // console.log(res);
                    if (res.body.status) {
                        callback(res);
                        resolve(res);
                    } else {
                        reject();
                    }
                });
            });
        },
        deleteFile: function (id, callback) {
            Vue.http.get(serverUrl + '/deleteFile?id=' + id).then(res => {
                callback(res);
            })
        },
    },
    Pictures: {
        selectPictureById: function (id, callback) {
            Vue.http.get(serverUrl + '/selectPictureById?id=' + id).then(function (res) {
                callback(res);
            });
        },
        upload: function (file, callback) {
            return new Promise((resolve, reject) => {
                Vue.http.post(serverUrl + '/upload', file).then((res) => {
                    // console.log(res);
                    if (res.body.status) {
                        callback(res);
                        resolve(res);
                    } else {
                        reject();
                    }
                });
            });
        },
        getLimitPics: function (currentPage, pageSize, callback) {
            Vue.http.get(serverUrl + '/getLimitPics?currentPage=' + currentPage + '&pageSize=' + pageSize).then(function (res) {
                callback(res);
            });
        },
        deletePic: function (id, callback) {
            Vue.http.get(serverUrl + '/deletePic?id=' + id).then(res => {
                callback(res);
            })
        },
        modifyPic: function (file, callback) {
            Vue.http.post(serverUrl + '/modifyPic', file).then(res => {
                callback(res);
            })
        },
        updatePic: function (params, callback) {
            Vue.http.post(serverUrl + '/updatePic', params).then(res => {
                callback(res);
            })
        },
        uploadAvatar: function (file, callback) {
            return new Promise((resolve, reject) => {
                Vue.http.post(serverUrl + '/uploadAvatar', file).then((res) => {
                    // console.log(res);
                    if (res.body.status) {
                        callback(res);
                        resolve(res);
                    } else {
                        reject();
                    }
                });
            });
        },
        modifyPicturesByInfo: function (params, callback) {
            return new Promise((resolve, reject) => {
                Vue.http.post(serverUrl + '/modifyPicturesByInfo', params).then((res) => {
                    // console.log(res);
                    if (res.body.status) {
                        callback(res);
                        resolve(res);
                    } else {
                        reject();
                    }
                });
            });
        }
    },
    InfoPicture: {
        insertPictureIdReturnInfoID: function (params, callback) {
            Vue.http.post(serverUrl + '/insertPictureIdReturnInfoID', params).then(res => {
                callback(res);
            })
        },
        updateInfoId: function (params, callback) {
            Vue.http.post(serverUrl + '/updateInfoId', params).then(res => {
                callback(res);
            })
        }
    },
    ProjectPicture: {
        insertPictureIdReturnProjectID: function (params, callback) {
            Vue.http.post(serverUrl + '/insertPictureIdReturnProjectID', params).then(res => {
                callback(res);
            })
        },
        updateProjectId: function (params, callback) {
            Vue.http.post(serverUrl + '/updateProjectId', params).then(res => {
                callback(res);
            })
        }
    },
    File: {
        selectFileById: function (id, callback) {
            Vue.http.get(serverUrl + '/selectFileById?id=' + id).then(function (res) {
                callback(res);
            });
        },
        uploadFile: function (file, callback) {
            return new Promise((resolve, reject) => {
                Vue.http.post(serverUrl + '/uploadFile', file).then((res) => {
                    // console.log(res);
                    if (res.body.status) {
                        callback(res);
                        resolve(res);
                    } else {
                        reject();
                    }
                });
            });
        },
        getLimitFiles: function (currentPage, pageSize, callback) {
            Vue.http.get(serverUrl + '/getLimitFiles?currentPage=' + currentPage + '&pageSize=' + pageSize).then(function (res) {
                callback(res);
            });
        }
    },
    InfoFile: {
        insertFileIdReturnInfoID: function (params, callback) {
            Vue.http.post(serverUrl + '/insertFileIdReturnInfoID', params).then(res => {
                callback(res);
            })
        },
        updateInfoFileByInfoId: function (params, callback) {
            Vue.http.post(serverUrl + '/updateInfoFileByInfoId', params).then(res => {
                callback(res);
            })
        }
    },
    ProjectFile: {
        insertFileIdReturnProjectID: function (params, callback) {
            Vue.http.post(serverUrl + '/insertFileIdReturnProjectID', params).then(res => {
                callback(res);
            })
        },
        updateProjectFileByProjectId: function (params, callback) {
            Vue.http.post(serverUrl + '/updateProjectFileByProjectId', params).then(res => {
                callback(res);
            })
        }
    },
    Type: {
        selectTypeById: function (id, callback) {
            Vue.http.get(serverUrl + '/selectTypeById?id=' + id).then(function (res) {
                callback(res);
            });
        }
    },
    LoginUsers: {
        getIdentifyCode: function (callback) {
            Vue.http.get(serverUrl + '/getIdentifyCode').then(function (res) {
                callback(res);
            });
        },
        loginCheck: function (username, password, code, callback) {
            Vue.http.post(serverUrl + '/login.check?username=' + username + '&password=' + password + '&code=' + code).then(function (res) {
                callback(res);
            });
        },
        getUserByUsername: function (userName, callback) {
            return Interface.gainJSON('/getUserByUsername?userName=' + userName, callback);
        },
        logout: function (callback) {
            return Interface.gainJSON('/logout', callback);
        },
        register: function (params, callback) {
            Vue.http.post(serverUrl + '/register', params).then(res => {
                callback(res);
            })
        }
    },
    Menu: {
        sysmenu: function (callback) {
            return Interface.gainJSON('/sysmenu', callback);
        },
        updateMenuRole: function (params, callback) {
            Vue.http.post(serverUrl + '/system/basic/updateMenuRole', params).then(res => {
                callback(res);
            })
        },
        menuTree: function (rid, callback) {
            return Interface.gainJSON('/system/basic/menuTree/' + rid, callback);
        }
    },
    Role: {
        roles: function (callback) {
            Vue.http.post(serverUrl + '/system/basic/roles').then(res => {
                callback(res);
            })
        },
        deleteRole: function (rid, callback) {
            return Interface.gainJSON('/system/basic/role/' + rid, callback);
        },
        addRole: function (params, callback) {
            Vue.http.post(serverUrl + '/system/basic/addRole', params).then(res => {
                callback(res);
            })
        }
    },
    User: {
        getUsersByKeywords: function (keywords, callback) {
            return Interface.gainJSON('/system/hr/getUsersByKeywords/' + keywords, callback);
        },
        getUserById: function (id, callback) {
            return Interface.gainJSON('/system/hr/id/' + id, callback);
        },
        deleteUser: function (id, callback) {
            return Interface.gainJSON('/system/hr/' + id, callback);
        },
        updateUserRoles: function (params, callback) {
            Vue.http.post(serverUrl + '/system/hr/roles', params).then(res => {
                callback(res);
            })
        },
        updateUser: function (params, callback) {
            Vue.http.post(serverUrl + '/system/hr/', params).then(res => {
                callback(res);
            })
        }
    }
};
