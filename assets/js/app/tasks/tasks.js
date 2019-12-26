var tasks = angular.module("tasks", []);
function tasksCtrl($rootScope, $scope, $element, $state, $http, $timeout, $sce, tasks, SweetAlert)
{
    var self = this;
    tasks.getTodo(self, {}, function(data){
        console.log(data);
        if (data.todo !== null)
        {
            if(data.todo != false)
            {
                self.todoLists = function() {
                    return $sce.trustAsHtml(data.todo.todo_list_content);
                };
            }
            if(data.inProgress != false)
            {
                self.inProgressLists = function() {
                    return $sce.trustAsHtml(data.inProgress.todo_list_content);
                };
            }
            if(data.completed != false)
            {
                self.completedLists = function() {
                    return $sce.trustAsHtml(data.completed.todo_list_content);
                };
            }
        }
    });
}

tasks.controller('tasksCtrl', tasksCtrl);