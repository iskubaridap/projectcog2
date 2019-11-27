/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    // Disable for now
    // $urlRouterProvider.otherwise("/home/main");
    $urlRouterProvider.otherwise("/cogworks/home/main");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('cog-home', {
            abstract: true,
            url: "/cogworks/home",
            templateUrl: "assets/views/common/content.html",
        })
        .state('cog-home.main', {
            url: "/main",
            templateUrl: "assets/views/main.html",
            data: { pageTitle: 'Home' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-developers',
                            files: ['assets/js/app/cogworks/developers/cog-developers.js']
                        },
                        {
                            name: 'cog-files',
                            files: ['assets/js/app/cogworks/files/cog-files.js']
                        },
                        {
                            name: 'cog-projects',
                            files: ['assets/js/app/cogworks/projects/cog-projects.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/js/plugins/footable/footable.all.min.js', 'assets/css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['assets/js/plugins/footable/angular-footable.js']
                        }
                    ]);
                }
            }
        })
        .state('cog-developers', {
            abstract: true,
            url: "/cogworks/developers",
            templateUrl: "assets/views/common/content.html",
        })
        .state('cog-developers.active', {
            url: "/active",
            templateUrl: "assets/views/cogworks/developers/developers-cogworks-main.html",
            data: { pageTitle: 'Developers' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-developers',
                            files: ['assets/js/app/cogworks/developers/cog-developers.js']
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
        .state('cog-files', {
            abstract: true,
            url: "/cogworks/cog-files",
            templateUrl: "assets/views/common/content.html",
        })
        .state('cog-files.active', {
            url: "/active",
            templateUrl: "assets/views/cogworks/cog-files/cog-files-main.html",
            data: { pageTitle: 'Cogworks Files' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files',
                            files: ['assets/js/app/cogworks/files/cog-files.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/js/plugins/footable/footable.all.min.js', 'assets/css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['assets/js/plugins/footable/angular-footable.js']
                        }
                    ]);
                }
            }
        })
        .state('cog-files.details', {
            url: "/active/:id",
            templateUrl: "assets/views/cogworks/cog-files/cog-files-details.html",
            data: { pageTitle: 'Cogworks File Details' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-details',
                            files: ['assets/js/app/cogworks/files/cog-files-details.js']
                        }
                    ]);
                }
            }
        })
        .state('cog-projects', {
            abstract: true,
            url: "/cogworks/projects",
            templateUrl: "assets/views/common/content.html",
        })
        .state('cog-projects.active', {
            url: "/active",
            templateUrl: "assets/views/cogworks/projects/projects-main.html",
            data: { pageTitle: 'Projects' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-projects',
                            files: ['assets/js/app/cogworks/projects/cog-projects.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/js/plugins/footable/footable.all.min.js', 'assets/css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['assets/js/plugins/footable/angular-footable.js']
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
