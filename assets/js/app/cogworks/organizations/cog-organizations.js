var cogOrganizations = angular.module("cog-organizations", []);

function cogOrganizationsCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, cogOrganizationsService, SweetAlert) {
    var self = this;
    var cogOrgPage = ($state.params.page == undefined) ? '' : $state.params.page;
    self.organizations = undefined;
    
    cogOrganizationsService.getOrganizations(self, {}, function (data) {
        var str = '';
        self.view = 'table';
        
        if(data) {
            $.each(data, function(index, value){
                str += '<tr class="org-row" data-id="' + value.id + '">';
                str += '<td>' + value.organization + '</td>';
                str += '<td class="org-action">';
                str += '<span class="org-info btn btn-success btn-xs" data-id="' + value.id + '">Info</span>&nbsp;';
                // skip when org is admin and developers
                if(value.id != '1' && value.id != '2') {
                    str += '<span class="org-update btn btn-success btn-xs" data-id="' + value.id + '">Update</span>&nbsp;';
                }
                if(value.status_id == '1' && value.id != '1' && value.id != '2') {
                    str += '<span class="org-remove btn btn-danger btn-xs" data-id="' + value.id + '">Remove</span>';
                } else if (value.status_id == '2' && value.id != '1' && value.id != '2') {
                    str += '<span class="org-restore btn btn-warning btn-xs" data-id="' + value.id + '">Restore</span>';
                }
                str += '</td>';
                str += '</tr>';
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

    var viewOrg = function (orgID) {
        $state.go('cog-admin.organizations-info', {
            id: orgID
        });
    };
    var updateOrg = function (orgID) {
        $state.go('cog-admin.organizations-update', {
            page: 'manage',
            id: orgID
        });
    };
    var viewThumnail = function () {};
    var viewList = function () {};
    var removeOrg = function (orgID, callback) {
        SweetAlert.swal({
                title: "Are you sure?",
                text: "This Organization will no longer be active together with it's Users.",
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
                    $http.post("./organizations/info/cogworks/deactivate", {
                            id: orgID
                        })
                        .then(function (response) {
                            if (response.data == 'true') {
                                cogOrganizationsService.getOrganizations(self, {}, function (data) {});
                                try {
                                    callback();
                                } catch(err) {}
                                SweetAlert.swal("Deleted!", "Organization is successfully removed", "success");
                            } else {
                                SweetAlert.swal("Failed!", "Organization is not been removed. Try it again.", "error");
                            }
                        }, function (response) {
                            SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
                        });

                } else {
                    SweetAlert.swal("Cancelled", "You cancelled your action", "error");
                }
            });
    };
    var restoreOrg = function (orgID, callback) {
        $http.post("./organizations/info/cogworks/activate", {
                id: orgID
            })
            .then(function (response) {
                if (response.data == 'true') {
                    cogOrganizationsService.getOrganizations(self, {}, function (data) {});
                    try {
                        callback();
                    } catch(err) {}
                    SweetAlert.swal("Success!", "Organization is successfully restored.", "success");
                } else {
                    SweetAlert.swal("Failed!", "Organization is still not Inactive. Try it again.", "error");
                }
            }, function (response) {
                SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
            });
    }

    /* self.orderByName = function(event)
    {
        self.activeDevelopers = self.activeDevelopers.sort(function(a, b){
            if (a.user < b.user)
                return -1;
            if (a.user > b.user)
                return 1;
            return 0;
        });
    };
    self.orderByPosition = function(event)
    {
        self.activeDevelopers = self.activeDevelopers.sort(function(a, b){
            if (a.position < b.position)
                return -1;
            if (a.position > b.position)
                return 1;
            return 0;
        });
    }; */
    var setEvent = function() {
        $element.find('.org-info').off().on('click', function(){
            var id = $(this).attr('data-id');
            viewOrg(id);
        });
        $element.find('.org-update').off().on('click', function(){
            var id = $(this).attr('data-id');
            updateOrg(id);
        });
        $element.find('.org-remove').off().on('click', function(){
            var id = $(this).attr('data-id');
            removeOrg(id, function(){
                $element.find(('.org-row[data-id="' + id + '"] .org-action .org-remove')).remove();
                $element.find(('.org-row[data-id="' + id + '"] .org-action')).append('<span class="org-restore btn btn-warning btn-xs" data-id="' + id + '">Restore</span>');
                setEvent();
            });
        });
        $element.find('.org-restore').off().on('click', function(){
            var id = $(this).attr('data-id');
            restoreOrg(id, function(){
                $element.find(('.org-row[data-id="' + id + '"] .org-action .org-restore')).remove();
                $element.find(('.org-row[data-id="' + id + '"] .org-action')).append('<span class="org-remove btn btn-danger btn-xs" data-id="' + id + '">Remove</span>');
                setEvent();
            });
        });
    };
    self.tableView = function(event) {
        var str = '';
        cogOrganizationsService.getOrganizations(self, {}, function (data) {
            var str = '';
            self.view = 'table';
            if(data) {
                $.each(data, function(index, value){
                    str += '<tr class="org-row" data-id="' + value.id + '">';
                    str += '<td>' + value.organization + '</td>';
                    str += '<td class="org-action">';
                    str += '<span class="org-info btn btn-success btn-xs" data-id="' + value.id + '">Info</span>&nbsp;';
                    // skip when org is admin and developers
                    if(value.id != '1' && value.id != '2') {
                        str += '<span class="org-update btn btn-success btn-xs" data-id="' + value.id + '">Update</span>&nbsp;';
                    }
                    if(value.status_id == '1' && value.id != '1' && value.id != '2') {
                        str += '<span class="org-remove btn btn-danger btn-xs" data-id="' + value.id + '">Remove</span>';
                    } else if (value.status_id == '2' && value.id != '1' && value.id != '2') {
                        str += '<span class="org-restore btn btn-warning btn-xs" data-id="' + value.id + '">Restore</span>';
                    }
                    str += '</td>';
                    str += '</tr>';
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
    self.view = function (event) {
        var elem = $(event.target);
        viewOrg(elem.attr('data-id'));
    };
    self.update = function (event) {
        var elem = $(event.target);
        updateOrg(elem.attr('data-id'));
    };
    self.remove = function (event) {
        var elem = $(event.target);
        removeOrg(elem.attr('data-id'));
    };
    self.restore = function (event) {
        var elem = $(event.target);
        restoreOrg(elem.attr('data-id'), parseInt(elem.attr('data-files')));
    };
}

cogOrganizations.controller('cogOrganizationsCtrl', cogOrganizationsCtrl);