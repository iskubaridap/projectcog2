var cogPodsWhatNots = angular.module("pods-what-nots", []);

function cogPodsWhatNotsCtrl($rootScope, $scope, $element, $state, $http, cogPodsWhatNots, SweetAlert) {
    var self = this;
    var category = new Array();
    self.activePods = undefined;
    self.activeWhatNots = undefined;

    var addWhatNotPod = function (index, value) {
        if (value.length > 0) {
            var pod = category.indexOf(value);

            $element.find('#pods-loading-indicator').show();
            $element.find('#what-nots-loading-indicator').show();
            $element.find('#pods-loading-error-indicator').hide();
            $element.find('#what-nots-loading-error-indicator').hide();

            if (pod >= 0) {
                self.activePods[pod].children.push(self.activeWhatNots.children[index]);
            } else {
                var newPod = {
                    name: value,
                    children: new Array(),
                    expanded: true
                };
                newPod.children.push(self.activeWhatNots.children[index]);
                self.activePods.push(newPod);
            }
            self.activeWhatNots.children.splice(index, 1);
            $http.post("./cogworks/pods/update", {
                    content: JSON.stringify(self.activePods)
                })
                .then(function (response) {
                    $element.find('#pods-loading-indicator').hide();
                }, function (response) {
                    $element.find('#pods-loading-indicator').hide();
                    $element.find('#pods-loading-error-indicator').show();
                });
            $http.post("./cogworks/what-nots/update", {
                    content: JSON.stringify(self.activeWhatNots)
                })
                .then(function (response) {
                    $element.find('#what-nots-loading-indicator').hide();
                }, function (response) {
                    $element.find('#what-nots-loading-indicator').hide();
                    $element.find('#what-nots-loading-error-indicator').show();
                });
        }
    };

    var removePod = function (index) {
        if (index > -1) {
            self.activePods.splice(index, 1);
        }
        $http.post("./cogworks/pods/update", {
                content: JSON.stringify(self.activePods)
            })
            .then(function (response) {
                if (response.data == 'true') {
                    SweetAlert.swal("Deleted!", "File is successfully removed", "success");
                } else {
                    SweetAlert.swal("Failed!", "File is not been removed. Try it again.", "error");
                }
            }, function (response) {
                SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
            });
    };
    var removeWhatNotPod = function (whatNotIndex, podIndex) {
        if (whatNotIndex > -1) {
            self.activePods[podIndex].children.splice(whatNotIndex, 1);
        }
        $http.post("./cogworks/pods/update", {
                content: JSON.stringify(self.activePods)
            })
            .then(function (response) {
                if (response.data == 'true') {
                    SweetAlert.swal("Deleted!", "File is successfully removed", "success");
                } else {
                    SweetAlert.swal("Failed!", "File is not been removed. Try it again.", "error");
                }
            }, function (response) {
                SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
            });
    };
    var removeWhatNots = function (index) {
        if (index > -1) {
            self.activeWhatNots.children.splice(index, 1);
        }
        $http.post("./cogworks/what-nots/update", {
                content: JSON.stringify(self.activeWhatNots)
            })
            .then(function (response) {
                if (response.data == 'true') {
                    SweetAlert.swal("Deleted!", "File is successfully removed", "success");
                } else {
                    SweetAlert.swal("Failed!", "File is not been removed. Try it again.", "error");
                }
            }, function (response) {
                SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
            });
    };

    var sweetAlert = function (action) {
        SweetAlert.swal({
                title: "Are you sure?",
                text: "This file will no longer be available.",
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
                    action();
                } else {
                    SweetAlert.swal("Cancelled", "You cancelled your action", "error");
                }
            });
    };

    cogPodsWhatNots.getActivePods(self, {}, function (data) {
        $.each(data, function (key, value) {
            category.push(value.name);
        });
        $element.find(".pods-cat").autocomplete({
            source: category
        });
    });
    cogPodsWhatNots.getActiveWhatNots(self, {}, function (data) {});

    self.deleteWhatNotPod = function (event) {
        var elem = $(event.target);
        var index = elem.attr('data-index');
        var parentIndex = elem.parent().parent().parent().attr('data-index');

        sweetAlert(function () {
            removeWhatNotPod(index, parentIndex);
        });

    };
    self.deletePod = function (event) {
        var elem = $(event.target);
        var index = elem.attr('data-index');

        if (self.activePods[index].children.length > 0) {
            SweetAlert.swal({
                    title: "Wait!",
                    text: "There are other files exists within this Pod. Removing this will also delete the other files.",
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
                        removePod(index);
                    } else {
                        SweetAlert.swal("Cancelled", "You cancelled your action", "error");
                    }
                });
        } else {
            sweetAlert(function () {
                removePod(index);
            });
        }
    };
    self.addWhatNot = function (event) {
        var elem = $(event.target);
        var index = elem.attr('data-index');
        var value = (elem.parent().parent().find('.pods-cat').val()).trim();

        addWhatNotPod(index, value);
    };
    self.deleteWhatNot = function (event) {
        var elem = $(event.target);
        var index = elem.attr('data-index');

        sweetAlert(function () {
            removeWhatNots(index);
        });
    };
}

cogPodsWhatNots.controller('cogPodsWhatNotsCtrl', cogPodsWhatNotsCtrl);