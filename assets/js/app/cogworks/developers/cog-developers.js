var cogDevelopers = angular.module("cog-developers", []);
function cogDevelopersCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, cogDevelopers, SweetAlert)
{
    var self = this;
    var cogDevPage = ($state.params.page == undefined) ? '' : $state.params.page;
    self.activeDevelopers = undefined;
    cogDevelopers.getActiveDevelopers(self, {page: cogDevPage}, function(data){
        var str = '';
        self.view = 'table';
        console.log(data);
        if(data) {
            $.each(data, function(index, value){
                str += '<tr class="dev-row" data-id="' + value.id + '">';
                str += '<td>' + value.user + '</td>';
                str += '<td>' + value.position + '</td>';
                str += '<td class="dev-action">';
                str += '<span class="dev-profile btn btn-success btn-xs" data-id="' + value.id + '">Profile</span>&nbsp;';
                str += '<span class="dev-update btn btn-success btn-xs" data-id="' + value.id + '" data-orgid="' + value.organization_id + '">Update</span>&nbsp;';
                if(value.status_id == '1') {
                    str += '<span class="dev-remove btn btn-danger btn-xs" data-id="' + value.id + '">Remove</span>';
                } else if (value.status_id == '2') {
                    str += '<span class="dev-restore btn btn-warning btn-xs" data-id="' + value.id + '">Restore</span>';
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

    var viewUser = function(userID)
    {
        if(cogDevPage == 'manage') {
            $state.go('cog-admin.developers-profile', {page: 'manage', id: userID});
        } else if(cogDevPage == 'user') {
            $state.go('cog-developers.profile', {id: userID});
        }
    };
    var updateUser = function(userID, organizationID)
    {
        console.log(cogDevPage);
        if(cogDevPage == 'manage') {
            $state.go('cog-admin.developers-update', {page: 'manage', orgID: organizationID, id: userID});
        } else if(cogDevPage == 'user') {
            $state.go('cog-developers.update', {id: userID});
        }
    };
    var viewThumnail = function()
    {};
    var viewList = function()
    {};
    var removeUser = function(id, callback)
    {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "This user will no longer be active.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false },
        function (isConfirm) {
            if (isConfirm) {
                $http.post("./cogworks/developers/deactivate", {id: id})
                .then(function (response) {
                    if(response.data == 'true')
                    {
                        cogDevelopers.getActiveDevelopers(self, {page: cogDevPage});
                        try {
                            callback();
                        } catch(err) {}
                        SweetAlert.swal("Deleted!", "User is successfully removed", "success");
                    }
                    else
                    {
                        SweetAlert.swal("Failed!", "User is not been removed. Try it again.", "error");
                    }
                }, function (response) {
                    SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
                });
                
            } else {
                SweetAlert.swal("Cancelled", "You cancelled your action", "error");
            }
        });
    };
    var restoreUser = function(id, callback) {
        $http.post("./cogworks/developers/activate", {id: id})
        .then(function (response) {
            if(response.data == 'true')
            {
                cogDevelopers.getActiveDevelopers(self, {page: cogDevPage});
                try {
                    callback();
                } catch(err) {}
                SweetAlert.swal("Success!", "User is successfully restored.", "success");
            }
            else
            {
                SweetAlert.swal("Failed!", "File is not been removed. Try it again.", "error");
            }
        }, function (response) {
            SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
        });
    }
    var setEvent = function() {
        $element.find('.dev-profile').off().on('click', function(){
            var id = $(this).attr('data-id');
            viewUser(id);
        });
        $element.find('.dev-update').off().on('click', function(){
            var id = $(this).attr('data-id');
            var orgid = $(this).attr('data-orgid');
            updateUser(id, orgid);
        });
        $element.find('.dev-remove').off().on('click', function(){
            var id = $(this).attr('data-id');
            removeUser(id, function(){
                $element.find(('.dev-row[data-id="' + id + '"] .dev-action .dev-remove')).remove();
                $element.find(('.dev-row[data-id="' + id + '"] .dev-action')).append('<span class="dev-restore btn btn-warning btn-xs" data-id="' + id + '">Restore</span>');
                setEvent();
            });
        });
        $element.find('.dev-restore').off().on('click', function(){
            var id = $(this).attr('data-id');
            restoreUser(id, function(){
                $element.find(('.dev-row[data-id="' + id + '"] .dev-action .dev-restore')).remove();
                $element.find(('.dev-row[data-id="' + id + '"] .dev-action')).append('<span class="dev-remove btn btn-danger btn-xs" data-id="' + id + '">Remove</span>');
                setEvent();
            });
        });
    };

    self.tableView = function(event) {
        var str = '';
        cogDevelopers.getActiveDevelopers(self, {page: cogDevPage}, function(data){
            var str = '';
            self.view = 'table';
            if(data) {
                $.each(data, function(index, value){
                    str += '<tr class="dev-row" data-id="' + value.id + '">';
                    str += '<td>' + value.user + '</td>';
                    str += '<td>' + value.position + '</td>';
                    str += '<td class="dev-action">';
                    str += '<span class="dev-profile btn btn-success btn-xs" data-id="' + value.id + '">Profile</span>&nbsp;';
                    str += '<span class="dev-update btn btn-success btn-xs" data-id="' + value.id + '" data-orgid="' + value.organization_id + '">Update</span>&nbsp;';
                    if(value.status_id == '1') {
                        str += '<span class="dev-remove btn btn-danger btn-xs" data-id="' + value.id + '">Remove</span>';
                    } else if (value.status_id == '2') {
                        str += '<span class="dev-restore btn btn-warning btn-xs" data-id="' + value.id + '">Restore</span>';
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
    self.orderByName = function(event)
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
    };
    self.viewByThumnail = function(event)
    {
        viewThumnail();
    };
    self.viewByList = function(event)
    {
        viewList();
    };
    self.view = function(event)
    {
        var elem = $(event.target);
        viewUser(elem.attr('data-id'));
    };
    self.update = function(event)
    {
        var elem = $(event.target);
        updateUser(elem.attr('data-id'), elem.attr('data-orgid'));
    };
    self.remove = function(event)
    {
        var elem = $(event.target);
        removeUser(elem.attr('data-id'));
    };
    self.restore = function(event)
    {
        var elem = $(event.target);
        restoreUser(elem.attr('data-id'));
    };
}

cogDevelopers.controller('cogDevelopersCtrl', cogDevelopersCtrl);