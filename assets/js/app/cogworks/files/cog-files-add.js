var cogFilesAdd = angular.module("cog-files-add", []);

function cogFilesAddCtrl($rootScope, $scope, $element, $state, $http, cogProjects, cogDevelopers, cogFiles, SweetAlert) {
    var self = this;
    var cogUser = 0;
    var selectedTempID = 0;
    var orgID = $state.params.org;
    self.cogPage = ($state.params.page == undefined) ? '' : $state.params.page;

    var setTemplateItems = function (ary) {
        var str = '';
        var setString = function (str2, id, ver, folder, template) {
            var str2 = '';
            str2 += '<div class="template-item-wrap">';
            str2 += '<div data-id="' + id + '" class="template-item">';
            str2 += '<span class="template-item-check fa fa-check-circle"></span>';
            str2 += '<div class="template-item-image">';
            str2 += '<img alt="image" class="" src="./assets/cogworks/templates/' + ver + '/' + folder + '/images/preview.jpg">';
            str2 += '</div>' // .template-item-image;
            str2 += '<p class="template-item-name">' + template + '</p>';
            str2 += '</div>' // .template-item;
            str2 += '</div>' // .template-item-wrap;
            return str2;
        }
        $.each(ary, function (index, value) {
            if (index % 3 == 0) {
                str += '<div class="row template-item-row">';
                if (ary[index] != undefined) {
                    str += setString(str, ary[index].id, ary[index].bootstrap_version, ary[index].folder_name, ary[index].template);
                }
                if (ary[index + 1] != undefined) {
                    str += setString(str, ary[index + 1].id, ary[index + 1].bootstrap_version, ary[index + 1].folder_name, ary[index + 1].template);
                }
                if (ary[index + 2] != undefined) {
                    str += setString(str, ary[index + 2].id, ary[index + 2].bootstrap_version, ary[index + 2].folder_name, ary[index + 2].template);
                }
                str += '</div>';
            }
        });
        return str;
    }
    if (self.cogPage == 'manage') {
        cogDevelopers.getActiveOrgDevelopers(self, {
            org: orgID
        }, function (data) {
            if (data != null) {
                cogUser = data[0].id;
            }
        });
        cogProjects.getActiveOrgProjects(self, {
            org: orgID
        }, function () {
            var obj = new Object();
            self.activeProjects = (self.activeProjects == null) ? new Array() : self.activeProjects;
            obj.id = '0';
            obj.project = '(Personal File)';
            self.activeProjects.unshift(obj);
        });
    } else {
        cogProjects.getActiveProjects(self, {}, function () {
            var obj = new Object();
            self.activeProjects = (self.activeProjects == null) ? new Array() : self.activeProjects;
            obj.id = '0';
            obj.project = '(Personal File)';
            self.activeProjects.unshift(obj);
        });
    }

    cogFiles.getAvailableTemplates(self, {}, function (data) {
        var bs3Ary = new Array();
        var bs4Ary = new Array();
        var bs3Str = '';
        var bs4Str = '';
        $.each(data, function (index, value) {
            if (value.bootstrap_version == '3') {
                bs3Ary.push(value);
            } else if (value.bootstrap_version == '4') {
                bs4Ary.push(value);
            }
        });
        $element.find('#bootstrap-3').empty().append(setTemplateItems(bs3Ary));
        $element.find('#bootstrap-4').empty().append(setTemplateItems(bs4Ary));
        $element.find('.template-item').each(function () {
            $(this).off().on('click', function () {
                selectedTempID = $(this).attr('data-id');
                $element.find('.template-item').removeClass('selected');
                $(this).addClass('selected');
                console.log(selectedTempID);
            });
        });
    });

    var processSubmit = function (callback) {
        var formData = new FormData();
        var fileData = $element.find('#cog-new-file-image').prop('files')[0];
        var cogName = $element.find('#cog-new-file-filename').val();
        var cogProject = $element.find('#cog-new-file-project').val();
        var fileUsers = $element.find('#cog-new-file-users').val();
        cogUser = (fileUsers != undefined) ? fileUsers : 0;
        var filename = '';
        var fileAdd = false;
        var cogNameAdd = false;
        var cogProjectAdd = false;

        try {
            filename = fileData.name
        } catch (err) {
            filename = null;
        }

        if ((cogName.trim()).length <= 0 || selectedTempID == 0) {
            if ((cogName.trim()).length <= 0) {
                SweetAlert.swal({
                    title: "File Add Fail",
                    text: "Please provide a filename."
                }, function (isConfirm) {
                    if (isConfirm) {}
                });
            } else if (selectedTempID == 0) {
                SweetAlert.swal({
                    title: "File Add Fail",
                    text: "Please select a template."
                }, function (isConfirm) {
                    if (isConfirm) {}
                });
            }
        } else {
            formData.append('file', fileData);
            formData.append('cogUser', cogUser);
            formData.append('cogName', cogName);
            formData.append('cogProject', cogProject);
            formData.append('cogTemplate', selectedTempID);

            console.log(cogUser)

            $http({
                url: './cogworks/cog-files/add',
                method: "POST",
                data: formData,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (response) {
                console.log(response);
                if (response != 'false') {
                    callback(response);
                } else {
                    SweetAlert.swal({
                        title: "Server Error",
                        text: "Something went wrong. Please try it again."
                    }, function (isConfirm) {
                        if (isConfirm) {}
                    });
                }

            }).error(function (error) {
                SweetAlert.swal({
                    title: "File Add Fail",
                    text: "Something went wrong. Please try it again."
                }, function (isConfirm) {
                    if (isConfirm) {}
                });
            });
        }
    }

    self.reset = function (event) {
        $state.go($state.current, {}, {
            reload: true
        });
    };
    self.submit = function (event) {
        processSubmit(function () {
            SweetAlert.swal({
                title: "File is Added",
                text: "Your new file is now available."
            }, function (isConfirm) {
                if (isConfirm) {
                    $state.go($state.current, {}, {
                        reload: true
                    });
                }
            });
        });
    };
    self.submitAndOpen = function (event) {
        processSubmit(function (data) {
            SweetAlert.swal({
                title: "File is Added",
                text: "Your new file is now available."
            }, function (isConfirm) {
                if (isConfirm) {
                    window.location.href = window.location.protocol + '//' + window.location.host + '/cogworks/' + data.code;
                }
            });
        });
    };
}

cogFilesAdd.controller('cogFilesAddCtrl', cogFilesAddCtrl);