var tasks = angular.module("tasks", []);
function tasksCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, $sce, tasks, $uibModal)
{
    var self = this;
    self.todoList = new Array();
    self.inProgressList = new Array();
    self.completedList = new Array();

    var saveTodo = function()
    {
        $http.post("./tasks/todo/update", {content: JSON.stringify(self.todoList), state: 1, program: 3})
        .then(function(response){
            $element.find('#todo-loading-indicator').hide();
            $element.find('#todo-loading-error-indicator').hide();
        },function(response){
            $element.find('#todo-loading-indicator').hide();
            $element.find('#todo-loading-error-indicator').show();
        });
    }
    var saveInProgress = function()
    {
        $http.post("./tasks/todo/update", {content: JSON.stringify(self.inProgressList), state: 2, program: 3})
        .then(function(response){
            $element.find('#in-progress-loading-indicator').hide();
            $element.find('#in-progress-loading-error-indicator').hide();
        },function(response){
            $element.find('#in-progress-loading-indicator').hide();
            $element.find('#in-progress-loading-error-indicator').show();
        });
    }
    var saveCompleted = function()
    {
        $http.post("./tasks/todo/update", {content: JSON.stringify(self.completedList), state: 3, program: 3})
        .then(function(response){
            $element.find('#completed-loading-indicator').hide();
            $element.find('#completed-loading-error-indicator').hide();
        },function(response){
            $element.find('#completed-loading-indicator').hide();
            $element.find('#completed-loading-error-indicator').show();
        });
    }

    self.todoOptions = {
        connectWith: ".connectList",
        stop: function(e, ui) {
            $element.find('#todo-loading-indicator').show();
            $element.find('#todo-loading-error-indicator').hide();
            saveTodo();
        },
        update: function(e, ui) {
            $element.find('#todo-loading-indicator').show();
            $element.find('#todo-loading-error-indicator').hide();
            saveTodo();
        }
    };
    self.inProgressOptions = {
        connectWith: ".connectList",
        stop: function(e, ui) {
            $element.find('#in-progress-loading-indicator').show();
            $element.find('#in-progress-loading-error-indicator').hide();
            saveInProgress();
        },
        update: function(e, ui) {
            $element.find('#in-progress-loading-indicator').show();
            $element.find('#in-progress-loading-error-indicator').hide();
            saveInProgress();
        }
    };
    self.completedOptions = {
        connectWith: ".connectList",
        stop: function(e, ui) {
            $element.find('#completed-loading-indicator').show();
            $element.find('#completed-loading-error-indicator').hide();
            saveCompleted();
        },
        update: function(e, ui) {
            $element.find('#completed-loading-indicator').show();
            $element.find('#completed-loading-error-indicator').hide();
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