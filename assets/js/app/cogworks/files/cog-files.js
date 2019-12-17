var cogFiles = angular.module("cog-files", []);
function cogFilesCtrl($rootScope, $scope, $element, $state, $http, $timeout, cogFiles, SweetAlert, $stateParams)
{
    var self = this;
    self.activeFiles = undefined;
    cogFiles.getActiveFiles(self);

    var detailFile = function(id)
    {
        $state.go('cog-files.details', {'id': id});
        // $state.go('cog-files.details');
    };
    var openFile = function(id)
    {
        console.log(id);
    };
    var duplicateFile = function(id)
    {
        console.log(id);
    };
    var updateFile = function(id)
    {
        $state.go('cog-files.update', {'id': id});
    };
    var viewThumnail = function()
    {
        $element.find('.section-list').hide();
        $element.find('.section-thumbnail').show();
    };
    var viewList = function()
    {
        var str = '';
        $element.find('.section-list').show();
        $element.find('.section-thumbnail').hide();
        $.each(self.activeFiles, function(index, value){
            str += '<tr>';
            str += '<td>' + value.cogfile + '</td>';
            str += '<td>' + value.project + '</td>';
            str += '<td>' + value.updated + '</td>';
            str += '<td>' + value.created + '</td>';
            str += '</tr>';
        });
        $element.find('#cogworks-files-table-body').empty();
        $element.find('#cogworks-files-table').data('footable').appendRow(str);
        $element.find('#cogworks-files-table tr').each(function(){
            if($(this).hasClass('footable-even'))
            {
                $(this).removeClass('footable-even');
            }
            else if($(this).hasClass('footable-odd'))
            {
                $(this).removeClass('footable-odd');
            }
        });
    };
    var removeFile = function(id)
    {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "This file will no longer be available.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false },
        function (isConfirm) {
            if (isConfirm) {
                $http.post((root + "cogworks/cog-files/deactivate"), {id: id})
                .then(function (response) {
                    if(response.data == 'true')
                    {
                        cogFiles.getActiveFiles(self);
                        SweetAlert.swal("Deleted!", "File is successfully removed", "success");
                    }
                    else
                    {
                        SweetAlert.swal("Failed!", "File is not been removed. Try it again.", "error");
                    }
                }, function (response) {
                    SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
                });
                
            } else {
                SweetAlert.swal("Cancelled", "You cancelled your action", "error");
            }
        });
    };

    self.orderByName = function(event)
    {
        self.activeFiles = self.activeFiles.sort(function(a, b){
            if (a.cogfile < b.cogfile)
                return -1;
            if (a.cogfile > b.cogfile)
                return 1;
            return 0;
        });
    };
    self.orderByProject = function(event)
    {
        self.activeFiles = self.activeFiles.sort(function(a, b){
            if (a.project < b.project)
                return -1;
            if (a.project > b.project)
                return 1;
            return 0;
        });
    };
    self.orderByUpdated = function(event)
    {
        self.activeFiles = self.activeFiles.sort(function(a, b){
            if (a.updated < b.updated)
                return -1;
            if (a.updated > b.updated)
                return 1;
            return 0;
        });
    };
    self.orderByCreated = function(event)
    {
        self.activeFiles = self.activeFiles.sort(function(a, b){
            if (a.created < b.created)
                return -1;
            if (a.created > b.created)
                return 1;
            return 0;
        });
    };
    self.viewThumbnail = function(event)
    {
        viewThumnail();
    };
    self.viewList = function(event)
    {
        viewList();
    };
    self.open = function(event)
    {
        var elem = $(event.target);
        openFile(elem.attr('data-id'));
        // $('#myModal').modal('show');
    };
    self.details = function(event)
    {
        var elem = $(event.target);
        detailFile(elem.attr('data-id'));
    };
    self.duplicate = function(event)
    {
        var elem = $(event.target);
        duplicateFile(elem.attr('data-id'));
    };
    self.update = function(event)
    {
        var elem = $(event.target);
        updateFile(elem.attr('data-id'));
    };
    self.remove = function(event)
    {
        var elem = $(event.target);
        removeFile(elem.attr('data-id'));
    };
}

cogFiles.controller('cogFilesCtrl', cogFilesCtrl);