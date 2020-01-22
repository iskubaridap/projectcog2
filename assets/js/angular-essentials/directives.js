/**
 * INSPINIA - Responsive Admin Theme
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'Projectcog | Theme';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'Projectcog | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });

            // Colapse menu in mobile mode after click on element
            var menuElement = $('#side-menu a:not([href$="\\#"])');
            menuElement.click(function(){
                if ($(window).width() < 769) {
                    $("body").toggleClass("mini-navbar");
                }
            });

            // Enable initial fixed sidebar
            if ($("body").hasClass('fixed-sidebar')) {
                var sidebar = element.parent();
                sidebar.slimScroll({
                    height: '100%',
                    railOpacity: 0.9,
                });
            }
        }
    };
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.children('.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.children('.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}

/*
    Application Section
*/

function sectionLoaderIndicator($rootScope) {
    return {
        restrict: 'E',
        scope: {
            text: "@",
            object: '='
        },
        templateUrl: 'assets/views/templates/section-loader-indicator.html',
        controller: function($scope, $element){},
        link: function(scope, elem, attrs){
            scope.text = attrs.text;
            try
            {
                scope.error = scope.object.error;
                scope.errorData = scope.object.errorData;
            }
            catch(error)
            {
                scope.error = undefined;
                scope.errorData = undefined;
            }
        }
    };
}

function sectionDataEmpty($rootScope) {
    return {
        restrict: 'E',
        scope: {
            text: '@',
            object: '='
        },
        templateUrl: 'assets/views/templates/section-data-empty.html',
        link: function(scope, elem, attrs){
            scope.text = attrs.text;
        }
    };
}
function sectionCogworksDevelopers($rootScope) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'assets/views/cogworks/sections/developers-cogworks-home-page.html',
        link: function(scope, elem, attrs){}
    };
}
function sectionCogworksFilesProjects($rootScope) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'assets/views/cogworks/sections/files-projects-cogworks-home-page.html',
        link: function(scope, elem, attrs){}
    };
}
function sectionCogworksFilesDetails($rootScope) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'assets/views/cogworks/sections/cog-files-details-section.html',
        link: function(scope, elem, attrs){}
    };
}
function sectionCogworksFilesUpdate($rootScope) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'assets/views/cogworks/sections/cog-files-update-section.html',
        link: function(scope, elem, attrs){}
    };
}
function tasksHome($rootScope) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'assets/views/cogworks/tasks/tasks-home.html',
        link: function(scope, elem, attrs){}
    };
}
/**
 *
 * Pass all functions into module
 */
angular
    .module('projectcog')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('sectionLoaderIndicator', sectionLoaderIndicator)
    .directive('sectionDataEmpty', sectionDataEmpty)
    .directive('sectionCogworksDevelopers', sectionCogworksDevelopers)
    .directive('sectionCogworksFilesProjects', sectionCogworksFilesProjects)
    .directive('sectionCogworksFilesDetails', sectionCogworksFilesDetails)
    .directive('sectionCogworksFilesUpdate', sectionCogworksFilesUpdate)
    .directive('tasksHome', tasksHome);
