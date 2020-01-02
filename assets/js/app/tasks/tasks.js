var tasks = angular.module("tasks", []);
function tasksCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, $sce, tasks, $uibModal, SweetAlert)
{
    var self = this;
    var elementID = '';
    self.todoList = new Array();
    self.inProgressList = new Array();
    self.completedList = new Array();
    self.priorityLevelEdit = '';

    var changePriority = function(_priority)
    {
        $http.post("./tasks/update/priority", {id: elementID, priority: _priority})
        .then(function(response){
            // console.log(response.data)
        },function(response){
            // console.log(response.data)
        });
    }
    var changeState = function(_state)
    {
        $http.post("./tasks/update/state", {id: elementID, state: _state})
        .then(function(response){
            // console.log(response.data)
        },function(response){
            // console.log(response.data)
        });
    }
    var saveTodo = function()
    {
        $element.find('#todo-loading-indicator').show();
        $element.find('#todo-loading-error-indicator').hide();

        $http.post("./tasks/todo/update", {content: JSON.stringify(self.todoList), state: 1, id: elementID, program: 3})
        .then(function(response){
            // console.log(response.data);
            $element.find('#todo-loading-indicator').hide();
            $element.find('#todo-loading-error-indicator').hide();
        },function(response){
            $element.find('#todo-loading-indicator').hide();
            $element.find('#todo-loading-error-indicator').show();
        });
    }
    var saveInProgress = function()
    {
        $element.find('#in-progress-loading-indicator').show();
        $element.find('#in-progress-loading-error-indicator').hide();
            
        $http.post("./tasks/todo/update", {content: JSON.stringify(self.inProgressList), state: 2, id: elementID, program: 3})
        .then(function(response){
            // console.log(response.data);
            $element.find('#in-progress-loading-indicator').hide();
            $element.find('#in-progress-loading-error-indicator').hide();
        },function(response){
            $element.find('#in-progress-loading-indicator').hide();
            $element.find('#in-progress-loading-error-indicator').show();
        });
    }
    var saveCompleted = function()
    {
        $element.find('#completed-loading-indicator').show();
        $element.find('#completed-loading-error-indicator').hide();

        $http.post("./tasks/todo/update", {content: JSON.stringify(self.completedList), state: 3, id: elementID, program: 3})
        .then(function(response){
            // console.log(response.data);
            $element.find('#completed-loading-indicator').hide();
            $element.find('#completed-loading-error-indicator').hide();
        },function(response){
            $element.find('#completed-loading-indicator').hide();
            $element.find('#completed-loading-error-indicator').show();
        });
    }
    var updatePriority = function(aryObj, id, priority){
        $.each(aryObj, function(index, value){
            if(value.id == id)
            {
                value.priority = priority;
                changePriority(priority);
                switch(priority){
                    case '1':
                        value.statusClass = 'danger';
                        break;
                    case '2':
                        value.statusClass = 'warning';
                        break;
                    case '3':
                        value.statusClass = 'success';
                        break;
                    case '4':
                        value.statusClass = 'info';
                        break;
                }
                return false;
            }
        });
        return aryObj;
    };
    var deleteTask = function(aryObj, id, priority){
        var indexObj = '';
        $.each(aryObj, function(index, value){
            if(value.id == id)
            {
                indexObj = index;
                if (indexObj > -1) {
                    aryObj.splice(indexObj, 1);
                }
                return false;
            }
        });
        return aryObj;
    };
    self.removeTask = function(event){
        var elem = $(event.target);
        var id = elem.attr('data-id');
        var status = elem.attr('data-status');

        SweetAlert.swal({
            title: "Are you sure?",
            text: "This task will be removed.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false },
        function (isConfirm) {
            if (isConfirm) {
                $http.post("./tasks/deactivate", {id: id})
                .then(function (response) {
                    if(response.data == 'true')
                    {
                        switch(status){
                            case 'todo':
                                deleteTask(self.todoList, id);
                                saveTodo();
                                break;
                            case 'inProgress':
                                deleteTask(self.inProgressList, id);
                                saveInProgress();
                                break;
                            case 'completed':
                                deleteTask(self.completedList, id);
                                saveCompleted();
                                break;
                        }
                        SweetAlert.swal("Deleted!", "Task is successfully removed", "success");
                    }
                    else
                    {
                        // SweetAlert.swal("Failed!", "This Task is not been removed. Try it again.", "error");
                    }
                }, function (response) {
                    SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
                });
                
            } else {
                SweetAlert.swal("Cancelled", "You cancelled your action", "error");
            }
        });
    };
    self.todoOptions = {
        connectWith: ".connectList",
        over: function(e, ui) {
            // using this event for now
            changeState(1);
        },
        stop: function(e, ui) {
            saveTodo();
        },
        update: function(e, ui) {
            saveTodo();
        }
    };
    self.inProgressOptions = {
        connectWith: ".connectList",
        over: function(e, ui) {
            // using this event for now
            changeState(2);
        },
        stop: function(e, ui) {
            saveInProgress();
        },
        update: function(e, ui) {
            saveInProgress();
        }
    };
    self.completedOptions = {
        connectWith: ".connectList",
        over: function(e, ui) {
            // using this event for now
            changeState(3);
        },
        stop: function(e, ui) {
            saveCompleted();
        },
        update: function(e, ui) {
            saveCompleted();
        }
    };
    
    tasks.getTodo(self, {}, function(data){
        if (data.todo !== null && data.todo !== undefined)
        {
            if(data.todo != false)
            {
                self.todoList = JSON.parse(data.todo.todo_list_content);
            }
            if(data.inProgress != false)
            {
                self.inProgressList = JSON.parse(data.inProgress.todo_list_content);
            }
            if(data.completed != false)
            {
                self.completedList = JSON.parse(data.completed.todo_list_content);
            }
        }
        else
        {
            loginService.userLogged(data);
        }
    });
    self.moveElement = function(event){
        var elem = $(event.target);
        elementID = elem.attr('data-id');
    };
    self.editTask = function(event){
        var elem = $(event.target);
        elem.find('.task-edit-wrap').show();
        $element.find('.task-edit-wrap').find('.task-priority-wrap').hide();
    };
    self.exitEditTask = function(event){
        var elem = $(event.target);
        $element.find('.task-edit-wrap').hide();
        $element.find('.task-edit-wrap').find('.task-priority-wrap').hide();
    };
    self.changePriority = function(event, action){
        var id = $(event.target).attr('data-id');
        var priority = $(event.target).val();
        switch(action)
        {
            case 'todo':
                console.log('todo');
                updatePriority(self.todoList, id, priority);
                saveTodo();
                break;
            case 'inProgress':
                console.log('inProgress');
                updatePriority(self.inProgressList, id, priority);
                saveInProgress();
                break;
            case 'completed':
                console.log('completed');
                updatePriority(self.completedList, id, priority);
                saveCompleted();
                break;
        }
    }
    self.changePriorityBtn = function(event){
        $(event.target).parent().parent().find('.task-priority-wrap').show();
    }

    self.add = function(event)
    {
        var modalInstance = $uibModal.open({
            templateUrl: 'assets/views/cogworks/tasks/tasks-add-modal.html',
            windowClass: "animated fadeIn",
            controller: function taskAddController($scope, $uibModalInstance) {
                $scope.userIDAry = new Array();
                $scope.priority = 4;

                $http.post("./users/retrieve/organization-users")
                .then(function(response){
                    $scope.todoUsers = response.data;
                    $scope.toggleSelection = function toggleSelection(userID) {
                        var idx = $scope.userIDAry.indexOf(userID);
                        if (idx > -1) {
                            // is currently selected
                            $scope.userIDAry.splice(idx, 1);
                        }
                        else {
                            // is newly selected
                            $scope.userIDAry.push(userID);
                        }
                    };
                }, function(response){
                    $scope.todoUsers = null;
                });
                
                $scope.ok = function () {
                    //$uibModalInstance.close();
                    if($scope.userIDAry.length > 0 && (($scope.todoTask ? $scope.todoTask : '')).trim().length > 0)
                    {
                        $http.post("./tasks/create", {users: JSON.stringify($scope.userIDAry), content: $scope.todoTask, state: 1, type: 1, priority: $scope.priority, program: 3})
                        .then(function(response){
                            if(typeof response.data == 'object')
                            {
                                $.each(response.data, function(index, value){
                                    self.todoList.push(value);
                                });
                                saveTodo();
                                $uibModalInstance.dismiss();
                            }
                            else
                            {
                                $('#todo-modal-error').text('Something went wrong while processing. Please try it again or report the issue to the admin.');
                            }
                        }, function(response){
                            $('#todo-modal-error').text('Something went wrong in the server. Please try it again or report the issue to the admin.');
                        });
                    }
                    else
                    {
                        $('#todo-modal-error').text('Please fill in all necessary values before you proceed.');
                    }
                };
                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });
    }
}

tasks.controller('tasksCtrl', tasksCtrl);