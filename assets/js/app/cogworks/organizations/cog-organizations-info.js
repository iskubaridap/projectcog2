var cogOrganizationsInfo = angular.module("cog-organizations-info", []);
function cogOrganizationsInfoCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, cogOrganizationsService, SweetAlert)
{
    var self = this;
    var orgID = $state.params.id;

    var restoreProcess = function(elem, link, objID, type, oldClassName, newClassName , callback) {
        $http.post(link, objID)
        .then(function (response) {
            if(response.data == 'true')
            {
                elem.parent().parent().find('.status').text('Active');
                elem.parent().parent().find('.remove-restore-btn').removeClass('btn-success').addClass('btn-danger').removeClass(oldClassName).addClass(newClassName).text('Remove');
                callback();
                SweetAlert.swal("Success!", type + " is successfully restored.", "success");
            }
            else
            {
                SweetAlert.swal("Failed!", type + " is not been removed. Try it again.", "error");
            }
        }, function (response) {
            SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
        });
    }
    var removeProcess = function(elem, link, objID, type, oldClassName, newClassName , callback) {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "This " + type + " will no longer be active.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false },
        function (isConfirm) {
            if (isConfirm) {
                $http.post(link, objID)
                .then(function (response) {
                    if(response.data == 'true') {
                        elem.parent().parent().find('.status').text('Inactive');
                        elem.parent().parent().find('.remove-restore-btn').removeClass('btn-danger').addClass('btn-success').removeClass(oldClassName).addClass(newClassName).text('Restore');
                        callback();
                        SweetAlert.swal("Deleted!", type + " is successfully removed", "success");
                    } else {
                        SweetAlert.swal("Failed!", type + " is not been removed. Try it again.", "error");
                    }
                }, function (response) {
                    SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
                });
                
            } else {
                SweetAlert.swal("Cancelled", "You cancelled your action", "error");
            }
        });
    }
    var updateUser = function() {
        $element.find('.update-user').off().on('click', function() {
            var elem = $(this);
            var userID = elem.attr('data-id');
            var organizationID = elem.attr('data-org');
            $state.go('cog-admin.developers-update', {page: 'manage', orgID: organizationID, id: userID});
        });
    };
    var restoreUser = function() {
        $element.find('.restore-user').off().on('click', function() {
            var elem = $(this);
            var userID = elem.attr('data-id');
            restoreProcess(elem, './cogworks/developers/activate', {id: userID}, 'User', 'restore-user', 'remove-user', function(){removeUser()});
        });
    };
    var removeUser = function() {
        $element.find('.remove-user').off().on('click', function() {
            var elem = $(this);
            var userID = elem.attr('data-id');
            removeProcess(elem, './cogworks/developers/deactivate', {id: userID}, 'User', 'remove-user', 'restore-user', function(){restoreUser()});
        });
    };
    var updateProject = function() {
        $element.find('.update-project').off().on('click', function() {
            var elem = $(this);
            var projID = elem.attr('data-id');
            $state.go('cog-admin.projects-update', {id: projID, page: 'manage'});
        });
    };
    var restoreProject = function() {
        $element.find('.restore-project').off().on('click', function() {
            var elem = $(this);
            var userID = elem.attr('data-id');
            restoreProcess(elem, './cogworks/projects/activate', {id: userID}, 'Project', 'restore-project', 'remove-project', function(){removeProject()});
        });
    };
    var removeProject = function() {
        $element.find('.remove-project').off().on('click', function() {
            var elem = $(this);
            var userID = elem.attr('data-id');
            var files = parseInt(elem.attr('data-files'));
            if(files > 0) {
                SweetAlert.swal({
                    title: "Cannot Remove Project",
                    text: "There are existing files in this Project. It's either you delete all remaining files or distribute them to other Projects. Then proceed on removing this."
                }, function(isConfirm){
                    if(isConfirm)
                    {}
                });
            } else {
                removeProcess(elem, './cogworks/projects/deactivate', {id: userID}, 'Project', 'remove-project', 'restore-project', function(){restoreProject()});
            }
        });
    };
    var updateCogfile = function() {
        $element.find('.update-cogfile').off().on('click', function() {
            var elem = $(this);
            var fileID = elem.attr('data-id');
            $state.go('cog-admin.files-update', {page: 'manage', id: fileID});
        });
    };
    var restoreCogfile = function() {
        $element.find('.restore-cogfile').off().on('click', function() {
            var elem = $(this);
            var userID = elem.attr('data-id');
            restoreProcess(elem, './cogworks/cog-files/activate', {id: userID}, 'Cogfile', 'restore-cogfile', 'remove-cogfile', function(){removeCogfile()});
        });
    };
    var removeCogfile = function() {
        $element.find('.remove-cogfile').off().on('click', function() {
            var elem = $(this);
            var userID = elem.attr('data-id');
            removeProcess(elem, './cogworks/cog-files/deactivate', {id: userID}, 'Cogfile', 'remove-cogfile', 'restore-cogfile', function(){restoreCogfile()});
        });
    };

    cogOrganizationsService.getOrganizationInfo(self, {id: orgID}, function(data){
        var str = '';

        if(data.users.length > 0) {
            str = '';
            $.each(data.users, function(index, value) {
                str += '<tr>';
                str += '<td>' + value.user + '</td>';
                str += '<td>' + value.position + '</td>';
                str += '<td class="status">' + value.status + '</td>';
                str += '<td>';
                str += '<span class="btn btn-xs btn-success update-user" data-id="' + value.id + '" data-org="' + orgID + '">Update</span> ';
                if(value.positionID != '1') {
                    str += (value.statusID == '1') ? '<span class="remove-restore-btn btn btn-xs btn-danger remove-user" data-id="' + value.id + '">Remove</span>' : '<span class="remove-restore-btn btn btn-xs btn-success restore-user" data-id="' + value.id + '">Restore</span>';
                }
                str += '</td>';
                str += '</tr>';
            });
            $element.find('#organizations-info-users-table-body').empty();
            $element.find('#organizations-info-users-table').data('footable').appendRow(str);
            updateUser();
            removeUser();
            restoreUser();
        }

        if(data.projects.length > 0) {
            str = '';
            $.each(data.projects, function(index, value) {
                str += '<tr>';
                str += '<td>' + value.project + '</td>';
                str += '<td>' + value.cogfiles + '</td>';
                str += '<td class="status">' + value.status + '</td>';
                str += '<td>';
                str += '<span class="btn btn-xs btn-success update-project" data-id="' + value.id + '" data-org="' + orgID + '">Update</span> ';
                str += (value.statusID == '1') ? '<span class="remove-restore-btn btn btn-xs btn-danger remove-project" data-id="' + value.id + '" data-files="' + value.cogfiles + '">Remove</span>' : '<span class="remove-restore-btn btn btn-xs btn-success restore-project" data-id="' + value.id + '" data-files="' + value.cogfiles + '">Restore</span>';
                str += '</td>';
                str += '</tr>';
            });
            $element.find('#organizations-info-projects-table-body').empty();
            $element.find('#organizations-info-projects-table').data('footable').appendRow(str);
            updateProject();
            removeProject();
            restoreProject();
        }
        
        if(data.cogfiles.length > 0) {
            str = '';
            $.each(data.cogfiles, function(index, value) {
                str += '<tr>';
                str += '<td>' + value.cogfile + '</td>';
                str += '<td>' + value.project + '</td>';
                str += '<td class="status">' + value.status + '</td>';
                str += '<td>';
                str += '<span class="btn btn-xs btn-success update-cogfile" data-id="' + value.id + '" data-org="' + orgID + '">Update</span> ';
                str += (value.statusID == '1') ? '<span class="remove-restore-btn btn btn-xs btn-danger remove-cogfile" data-id="' + value.id + '">Remove</span>' : '<span class="remove-restore-btn btn btn-xs btn-success restore-cogfile" data-id="' + value.id + '">Restore</span>';
                str += '</td>';
                str += '</tr>';
            });
            $element.find('#organizations-info-cogfiles-table-body').empty();
            $element.find('#organizations-info-cogfiles-table').data('footable').appendRow(str);
            updateCogfile();
            removeCogfile();
            restoreCogfile();
        }
    });
    self.addNewUser = function(event) {
        var elem = $(event.target);
        $state.go('cog-admin.developers-add', {page: 'manage', orgID: (elem.attr('data-id'))});
    };
    self.addNewProject = function(event) {
        var elem = $(event.target);
        $state.go('cog-admin.projects-add', {page: 'manage', orgID: (elem.attr('data-id'))});
    };
    self.addNewCogfile = function(event) {
        var elem = $(event.target);
        // $state.go('cog-projects.files', {project: id, page: cogProjPage});
        console.log('new cog file');
    };
}

cogOrganizationsInfo.controller('cogOrganizationsInfoCtrl', cogOrganizationsInfoCtrl);