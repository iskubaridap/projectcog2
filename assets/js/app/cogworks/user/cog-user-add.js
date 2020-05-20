var cogUserAdd = angular.module("cog-user-add", []);

function cogUserAddCtrl($rootScope, $scope, $element, $state, $http, $timeout, cogPositions, cogUsers, cogOrganizationsService, accountsService, SweetAlert) {
    var self = this;
    var userID = ($state.params.id == undefined) ? 0 : $state.params.id;
    var org = ($state.params.orgID == undefined) ? 0 : $state.params.orgID;
    var cogProjPage = ($state.params.page == undefined) ? '' : $state.params.page;
    var account = 0;
    self.userCategory = 'new'; //  keeping this just in-case it might became handy in the future
    cogPositions.getPositions(self, {}, function (data) {
        self.positionsInitValue = data[0].id;
    });

    var setUserObj = function () {
        self.userCategory = 'new';
        self.title = "Add a new User";
        self.userObj = new Object();
        self.userObj.firstname = '';
        self.userObj.middlename = '';
        self.userObj.email = '';
        self.userObj.address = '';
        self.userObj.country = '';
        self.userObj.image = 'assets/img/thumbnail/thumbnail-profile-pic.png';
        self.userObj.imageValue = 'thumbnail-profile-pic.png';
    };

    // this is to get the org's account id if the logged user is the super admin
    if (org != 0 && cogProjPage == 'manage') {
        cogOrganizationsService.getOrganization(self, {
            id: org
        }, function (data) {
            if (data != 'null') {
                account = data.account_id;
                setUserObj();
            } else {
                self.userObj = null;
            }

        });
    } else {
        setUserObj();
    }

    var highlightInput = function (id) {
        if ((($element.find(id).val()).trim()).length <= 0) {
            $element.find(id).parent().addClass('has-error');
        } else if ((($element.find(id).val()).trim()).length > 0 && $element.find(id).parent().hasClass('has-error')) {
            $element.find(id).parent().removeClass('has-error');
        }
    };
    var initHighlightInput = function () {
        highlightInput('#cog-user-firstname');
        highlightInput('#cog-user-middlename');
        highlightInput('#cog-user-lastname');
        highlightInput('#cog-user-email');
        highlightInput('#cog-user-position-option');
        highlightInput('#cog-user-password');
    };
    self.reset = function (event) {
        $state.go($state.current, {}, {
            reload: true
        });
    };
    self.submit = function (event) {
        var formData = new FormData();
        var fileData = $element.find('#cog-user-image').prop('files')[0];
        var firstname = $element.find('#cog-user-firstname').val();
        var middlename = $element.find('#cog-user-middlename').val();
        var lastname = $element.find('#cog-user-lastname').val();
        var email = $element.find('#cog-user-email').val();
        var password = $element.find('#cog-user-password').val();
        var address = $element.find('#cog-user-address').val();
        var country = $element.find('#cog-user-country').val();
        var position = $element.find('#cog-user-position-option').val();
        var filename = '';

        try {
            filename = fileData.name
        } catch (err) {
            filename = null;
        }

        if ((firstname.trim()).length <= 0 ||
            (middlename.trim()).length <= 0 ||
            (lastname.trim()).length <= 0 ||
            (email.trim()).length <= 0 ||
            ((password.trim()).length <= 0) ||
            (position.trim()).length <= 0) {
            SweetAlert.swal({
                title: "Process Fail",
                text: "Please value on all that are highlighted."
            }, function (isConfirm) {
                if (isConfirm) {
                    initHighlightInput();
                }
            });
        } else if (!(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)).test(email)) {
            SweetAlert.swal({
                title: "Process Fail",
                text: "Please put a proper email."
            }, function (isConfirm) {
                if (isConfirm) {
                    $element.find('#cog-user-email').parent().removeClass('has-error').addClass('has-error');
                }
            });
        } else {
            initHighlightInput();

            formData.append('file', fileData);
            formData.append('id', userID);
            formData.append('name', (firstname + ' ' + lastname));
            formData.append('firstname', firstname);
            formData.append('middlename', middlename);
            formData.append('lastname', lastname);
            formData.append('org', org);
            formData.append('account', account);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('position', position);
            formData.append('address', address);
            formData.append('country', country);

            $http({
                url: './cogworks/developers/add',
                method: "POST",
                data: formData,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (response) {
                SweetAlert.swal({
                    title: "Process Success",
                    text: "New user has been added."
                }, function (isConfirm) {
                    if (isConfirm) {
                        $state.go($state.current, {}, {reload: true});
                    }
                });
            }).error(function (error) {
                SweetAlert.swal({
                    title: "Process Fail",
                    text: "Something went wrong. Please try it again."
                }, function (isConfirm) {
                    if (isConfirm) {}
                });
            });
        }
    };
}

cogUserAdd.controller('cogUserAddCtrl', cogUserAddCtrl);