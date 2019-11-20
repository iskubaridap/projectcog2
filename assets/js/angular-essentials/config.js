/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/home/main");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('home', {
            abstract: true,
            url: "/home",
            templateUrl: "assets/views/common/content.html",
        })
        .state('home.main', {
            url: "/main",
            templateUrl: "assets/views/main.html",
            data: { pageTitle: 'Home' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'developers',
                            files: ['assets/js/app/developers/developers.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('developers', {
            abstract: true,
            url: "/developers",
            templateUrl: "assets/views/common/content.html",
        })
        .state('developers.active', {
            url: "/active",
            templateUrl: "assets/views/developers/developers-main.html",
            data: { pageTitle: 'Developers' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'developers',
                            files: ['assets/js/app/developers/developers.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('minor', {
            url: "/minor",
            templateUrl: "assets/views/common/content.html"
        })
        .state('minor.page', {
            url: "/minor/page",
            templateUrl: "assets/views/minor.html",
            data: { pageTitle: 'Minor view' }
        })
        .state('mailbox', {
            abstract: true,
            url: "/mailbox",
            templateUrl: "assets/views/common/content.html",
        })
            .state('mailbox.inbox', {
                url: "/inbox",
                templateUrl: "assets/views/mailbox/mailbox.html",
                data: { pageTitle: 'Mail Inbox' }
            })
            .state('mailbox.email_view', {
                url: "/email_view",
                templateUrl: "assets/views/mailbox/mail_detail.html",
                data: { pageTitle: 'Mail detail' }
            })
            .state('mailbox.email_compose', {
                url: "/email_compose",
                templateUrl: "assets/views/mailbox/mail_compose.html",
                data: { pageTitle: 'Mail compose' }
            })
            .state('mailbox.email_template', {
                url: "/email_template",
                templateUrl: "assets/views/mailbox/email_template.html",
                data: { pageTitle: 'Mail compose' }
            })
}
angular
    .module('mcafee')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
