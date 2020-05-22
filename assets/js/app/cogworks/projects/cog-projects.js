var cogProjectsModule = angular.module("cog-projects", []);

function cogProjectsCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, cogProjects, SweetAlert) {
    var self = this;
    var cogProjPage = ($state.params.page == undefined) ? '' : $state.params.page;
    self.activeProjects = undefined;
    cogProjects.getActiveProjects(self, {page: cogProjPage}, function (data) {
        console.log(data);
        var str = '';
        self.view = 'table';
        if(self.activeProjects) {
            $.each(self.activeProjects, function(index, value){
                str += '<tr class="project-row" data-id="' + value.id + '">';
                str += '<td>' + value.project + ((value.status == '5') ? ' <span class="text-warning">(<i>Org Deleted</i>)</span>' : '') +'</td>';
                str += '<td>' + value.cogfiles + '</td>';
                str += '<td>' + value.created + '</td>';
                str += '<td class="project-action">';
                str += '<span class="project-open btn btn-success btn-xs" data-id="' + value.id + '">Open</span>&nbsp;';
                str += '<span class="project-update btn btn-success btn-xs" data-id="' + value.id + '">Update</span>&nbsp;';
                if($rootScope.positionID != 3 || $rootScope.organizationID <= 2) {
                    str += '<span class="project-update btn btn-success btn-xs" data-id="' + value.id + '" data-files="' + value.cogfiles + '">Update</span>&nbsp;';
                    if(value.status == '1') {
                        str += '<span class="project-remove btn btn-danger btn-xs" data-id="' + value.id + '" data-files="' + value.cogfiles + '">Remove</span>';
                    } else if (value.status == '2') {
                        str += '<span class="project-restore btn btn-warning btn-xs" data-id="' + value.id + '" data-files="' + value.cogfiles + '">Restore</span>';
                    }
                }
                str += '</td>';
                str += '</tr>';
                // i need to use this to make it appear. still not know it doesn't show automatically
                setTimeout(function(){
                    $element.find('#page-table-body').empty();
                    $element.find('#page-table').data('footable').appendRow(str);
                    $element.find('#page-table .remove-sorting').off();
                    $element.find('#page-table .remove-sorting').removeClass('footable-sortable');
                    $element.find('#page-table .remove-sorting .footable-sort-indicator').remove();
                    setEvent();
                }, 0);
            });
        }
    });

    var openProject = function (projID) {
        if (cogProjPage == 'manage') {
            $state.go('cog-admin.projects-files', {
                project: projID,
                page: cogProjPage
            });
        } else if (cogProjPage == 'user') {
            $state.go('cog-projects.files', {
                project: projID,
                page: cogProjPage
            });
        }
    };
    var updateProject = function (projID) {
        if (cogProjPage == 'manage') {
            $state.go('cog-admin.projects-update', {
                id: projID,
                page: cogProjPage
            });
        } else if (cogProjPage == 'user') {
            $state.go('cog-projects.update', {
                id: projID
            });
        }
    }
    var viewFile = function (id) {
        //console.log(id);
    };
    var viewThumnail = function () {};
    var viewList = function () {};
    var removeProject = function (id, files, callback) {
        if (files > 0) {
            SweetAlert.swal({
                title: "Cannot Remove Project",
                text: "There are existing files in this Project. It's either you delete all remaining files or distribute them to other Projects. Then proceed on removing this."
            }, function (isConfirm) {
                if (isConfirm) {}
            });
        } else {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "This Project will no longer be active.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        $http.post("./cogworks/projects/deactivate", {
                                id: id
                            })
                            .then(function (response) {
                                if (response.data == 'true') {
                                    cogProjects.getActiveProjects(self, {
                                        page: cogProjPage
                                    });
                                    try {
                                        callback();
                                    } catch(err) {}
                                    SweetAlert.swal("Deleted!", "Project is successfully removed", "success");
                                } else {
                                    SweetAlert.swal("Failed!", "Project is not been removed. Try it again.", "error");
                                }
                            }, function (response) {
                                SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
                            });

                    } else {
                        SweetAlert.swal("Cancelled", "You cancelled your action", "error");
                    }
                });
        }
    };
    var restoreProject = function (id, callback) {
        $http.post("./cogworks/projects/activate", {
                id: id
            })
            .then(function (response) {
                if (response.data == 'true') {
                    cogProjects.getActiveProjects(self, {
                        page: cogProjPage
                    });
                    try {
                        callback();
                    } catch(err) {}
                    SweetAlert.swal("Success!", "Project is successfully restored.", "success");
                } else {
                    SweetAlert.swal("Failed!", "Project is not been removed. Try it again.", "error");
                }
            }, function (response) {
                SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
            });
    }
    var setEvent = function() {
        $element.find('.project-open').off().on('click', function(){
            var id = $(this).attr('data-id');
            openProject(id);
        });
        $element.find('.project-update').off().on('click', function(){
            var id = $(this).attr('data-id');
            updateProject(id);
        });
        $element.find('.project-remove').off().on('click', function(){
            var id = $(this).attr('data-id');
            var files = parseInt($(this).attr('data-files'));
            removeProject(id, files, function(){
                $element.find(('.project-row[data-id="' + id + '"] .project-action .project-remove')).remove();
                $element.find(('.project-row[data-id="' + id + '"] .project-action')).append('<span class="project-restore btn btn-warning btn-xs" data-id="' + id + '" data-files="' + files + '">Restore</span>');
                setEvent();
            });
        });
        $element.find('.project-restore').off().on('click', function(){
            var id = $(this).attr('data-id');
            var files = parseInt($(this).attr('data-files'));
            restoreProject(id, function(){
                $element.find(('.project-row[data-id="' + id + '"] .project-action .project-restore')).remove();
                $element.find(('.project-row[data-id="' + id + '"] .project-action')).append('<span class="project-remove btn btn-danger btn-xs" data-id="' + id + '" data-files="' + files + '">Remove</span>');
                setEvent();
            });
        });
    };
    self.tableView = function(event) {
        cogProjects.getActiveProjects(self, {page: cogProjPage}, function (data) {
            console.log(data);
            var str = '';
            self.view = 'table';
            if(self.activeProjects) {
                $.each(self.activeProjects, function(index, value){
                    str += '<tr class="project-row" data-id="' + value.id + '">';
                    str += '<td>' + value.project + ((value.status == '5') ? ' <span class="text-warning">(<i>Org Deleted</i>)</span>' : '') +'</td>';
                    str += '<td>' + value.cogfiles + '</td>';
                    str += '<td>' + value.created + '</td>';
                    str += '<td class="project-action">';
                    str += '<span class="project-open btn btn-success btn-xs" data-id="' + value.id + '">Open</span>&nbsp;';
                    if($rootScope.positionID != 3 || $rootScope.organizationID <= 2) {
                        str += '<span class="project-update btn btn-success btn-xs" data-id="' + value.id + '" data-files="' + value.cogfiles + '">Update</span>&nbsp;';
                        if(value.status == '1') {
                            str += '<span class="project-remove btn btn-danger btn-xs" data-id="' + value.id + '" data-files="' + value.cogfiles + '">Remove</span>';
                        } else if (value.status == '2') {
                            str += '<span class="project-restore btn btn-warning btn-xs" data-id="' + value.id + '" data-files="' + value.cogfiles + '">Restore</span>';
                        }
                    }
                    str += '</td>';
                    str += '</tr>';
                    // i need to use this to make it appear. still not know it doesn't show automatically
                    setTimeout(function(){
                        $element.find('#page-table-body').empty();
                        $element.find('#page-table').data('footable').appendRow(str);
                        $element.find('#page-table .remove-sorting').off();
                        $element.find('#page-table .remove-sorting').removeClass('footable-sortable');
                        $element.find('#page-table .remove-sorting .footable-sort-indicator').remove();
                        setEvent();
                    }, 0);
                });
            }
        });
    };
    self.thumbnailView = function(event) {
        self.view = 'thumbnail';
    };
    self.viewByThumnail = function (event) {
        viewThumnail();
    };
    self.viewByList = function (event) {
        viewList();
    };
    self.orderByName = function (event) {
        self.activeProjects = self.activeProjects.sort(function (a, b) {
            if (a.project < b.project)
                return -1;
            if (a.project > b.project)
                return 1;
            return 0;
        });
    };
    self.orderByUpdated = function (event) {
        self.activeProjects = self.activeProjects.sort(function (a, b) {
            if (a.updated < b.updated)
                return -1;
            if (a.updated > b.updated)
                return 1;
            return 0;
        });
    };
    self.orderByCreated = function (event) {
        self.activeProjects = self.activeProjects.sort(function (a, b) {
            if (a.created < b.created)
                return -1;
            if (a.created > b.created)
                return 1;
            return 0;
        });
    };
    self.view = function (event) {
        var elem = $(event.target);
        viewFile(elem.attr('data-id'));
    };
    self.open = function (event) {
        var elem = $(event.target);
        openProject(elem.attr('data-id'));
    };
    self.details = function (event) {
        // reserve
    };
    self.update = function (event) {
        var elem = $(event.target);
        updateProject(elem.attr('data-id'));
    };
    self.remove = function (event) {
        var elem = $(event.target);
        removeProject(elem.attr('data-id'), parseInt(elem.attr('data-files')));
    };
    self.restore = function (event) {
        var elem = $(event.target);
        restoreProject(elem.attr('data-id'), parseInt(elem.attr('data-files')));
    };
}

cogProjectsModule.controller('cogProjectsCtrl', cogProjectsCtrl);