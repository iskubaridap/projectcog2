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
    
        .state('login', {
            url: "/login",
            templateUrl: "assets/views/login.html",
            data: { pageTitle: 'Login', specialClass: 'gray-bg' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'login',
                            files: ['assets/js/app/login/login.js', 'assets/css/app/login/login.css']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ])
                }
            }
        })
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
                            name: 'tasks',
                            files: ['assets/js/app/tasks/tasks.js']
                        },
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
        .state('cog-admin', {
            abstract: true,
            url: "/cogworks/admin",
            templateUrl: "assets/views/common/content.html",
        })
        .state('cog-admin.developers', {
            url: "/:page/developers",
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
        .state('cog-admin.developers-profile', {
            url: "/:page/profile/:id",
            templateUrl: "assets/views/cogworks/developers/developers-cogworks-profile.html",
            data: { pageTitle: 'Developers Profile' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-developers-profile',
                            files: ['assets/js/app/cogworks/developers/cog-developers-profile.js']
                        }
                    ]);
                }
            }
        })
        .state('cog-admin.developers-add', {
            url: "/:page/user/add/:orgID",
            templateUrl: "assets/views/cogworks/developers/developers-cogworks-add.html",
            data: { pageTitle: 'Developers' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-user-add-update',
                            files: ['assets/js/app/cogworks/user/cog-user-add-update.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-admin.developers-update', {
            url: "/:page/user/update/:orgID/:id",
            templateUrl: "assets/views/cogworks/developers/developers-cogworks-add.html",
            data: { pageTitle: 'Developers' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-user-add-update',
                            files: ['assets/js/app/cogworks/user/cog-user-add-update.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-admin.organizations', {
            url: "/organizations",
            templateUrl: "assets/views/cogworks/organizations/organizations-cogworks-main.html",
            data: { pageTitle: 'Organizations' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-organizations',
                            files: ['assets/js/app/cogworks/organizations/cog-organizations.js']
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
        .state('cog-admin.organizations-info', {
            url: "/organizations/info/:id",
            templateUrl: "assets/views/cogworks/organizations/organizations-cogworks-info.html",
            data: { pageTitle: 'Organizations Info' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-organizations-info',
                            files: ['assets/js/app/cogworks/organizations/cog-organizations-info.js']
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
        .state('cog-admin.organizations-add', {
            url: "/:page/organization/add",
            templateUrl: "assets/views/cogworks/organizations/organizations-cogworks-add.html",
            data: { pageTitle: 'Add Organization' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-organizations-add',
                            files: ['assets/js/app/cogworks/organizations/cog-organizations-add.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-admin.organizations-update', {
            url: "/:page/organization/update/:id",
            templateUrl: "assets/views/cogworks/organizations/organizations-cogworks-update.html",
            data: { pageTitle: 'Organizations Update' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-organizations-update',
                            files: ['assets/js/app/cogworks/organizations/cog-organizations-update.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-admin.files', {
            url: "/:page/files/:project",
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
        .state('cog-admin.files-details', {
            url: "/:page/details/:id",
            templateUrl: "assets/views/cogworks/cog-files/cog-files-details.html",
            data: { pageTitle: 'Cogworks File Details' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-details',
                            files: ['assets/js/app/cogworks/files/cog-files-details.js']
                        },
                        {
                            files: ['assets/css/plugins/jsTree/style.min.css','assets/js/plugins/jsTree/jstree.min.js']
                        },
                        {
                            name: 'ngJsTree',
                            files: ['assets/js/plugins/jsTree/ngJsTree.min.js']
                        }
                    ]);
                }
            }
        })
        .state('cog-admin.files-update', {
            url: "/:page/update/:id",
            templateUrl: "assets/views/cogworks/cog-files/cog-files-update.html",
            data: { pageTitle: 'Cogworks File Update' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-update',
                            files: ['assets/js/app/cogworks/files/cog-files-update.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-admin.files-add', {
            url: "/:page/add/:org",
            templateUrl: "assets/views/cogworks/cog-files/cog-files-add.html",
            data: { pageTitle: 'Clone Cogworks File' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-add',
                            files: ['assets/js/app/cogworks/files/cog-files-add.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-admin.projects', {
            url: "/:page/projects",
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
        .state('cog-admin.projects-update', {
            url: "/:page/project/update/:id",
            templateUrl: "assets/views/cogworks/projects/projects-add-update.html",
            data: { pageTitle: 'Project Update' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-projects-update',
                            files: ['assets/js/app/cogworks/projects/cog-projects-update.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-admin.projects-add', {
            url: "/:page/projects/add/:orgID",
            templateUrl: "assets/views/cogworks/projects/projects-add-update.html",
            data: { pageTitle: 'Project New Project' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-projects-add',
                            files: ['assets/js/app/cogworks/projects/cog-projects-add.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-admin.projects-files', {
            url: "/:page/project/cog-files/:project",
            templateUrl: "assets/views/cogworks/projects/projects-cog-files.html",
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
        .state('cog-admin.projects-files-details', {
            url: "/:page/cog-files/details/:id",
            templateUrl: "assets/views/cogworks/projects/projects-cog-files-details.html",
            data: { pageTitle: 'Cogworks File Details' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-details',
                            files: ['assets/js/app/cogworks/files/cog-files-details.js']
                        },
                        {
                            files: ['assets/css/plugins/jsTree/style.min.css','assets/js/plugins/jsTree/jstree.min.js']
                        },
                        {
                            name: 'ngJsTree',
                            files: ['assets/js/plugins/jsTree/ngJsTree.min.js']
                        }
                    ]);
                }
            }
        })
        .state('cog-admin.projects-files-update', {
            url: "/:page/cog-files/update/:id",
            templateUrl: "assets/views/cogworks/projects/projects-cog-files-update.html",
            data: { pageTitle: 'Cogworks File Update' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-update',
                            files: ['assets/js/app/cogworks/files/cog-files-update.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
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
            url: "/:page/active",
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
        .state('cog-developers.add', {
            url: "/user/add",
            templateUrl: "assets/views/cogworks/developers/developers-cogworks-add.html",
            data: { pageTitle: 'Add new Developer' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-user-add-update',
                            files: ['assets/js/app/cogworks/user/cog-user-add-update.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-developers.update', {
            url: "/user/update/:id",
            templateUrl: "assets/views/cogworks/developers/developers-cogworks-update.html",
            data: { pageTitle: 'Update Developer' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-user-add-update',
                            files: ['assets/js/app/cogworks/user/cog-user-add-update.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-developers.profile', {
            url: "/profile/:id",
            templateUrl: "assets/views/cogworks/developers/developers-cogworks-profile.html",
            data: { pageTitle: 'Developers Profile' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-developers-profile',
                            files: ['assets/js/app/cogworks/developers/cog-developers-profile.js']
                        }
                    ]);
                }
            }
        })
        .state('cog-files-add', {
            abstract: true,
            url: "/cogworks/cog-files",
            templateUrl: "assets/views/common/content.html",
        })
        .state('cog-files-add.add', {
            url: "/add",
            templateUrl: "assets/views/cogworks/cog-files/cog-files-add.html",
            data: { pageTitle: 'Clone Cogworks File' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-add',
                            files: ['assets/js/app/cogworks/files/cog-files-add.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
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
            url: "/:page/active/:project",
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
            url: "/details/:id",
            templateUrl: "assets/views/cogworks/cog-files/cog-files-details.html",
            data: { pageTitle: 'Cogworks File Details' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-details',
                            files: ['assets/js/app/cogworks/files/cog-files-details.js']
                        },
                        {
                            files: ['assets/css/plugins/jsTree/style.min.css','assets/js/plugins/jsTree/jstree.min.js']
                        },
                        {
                            name: 'ngJsTree',
                            files: ['assets/js/plugins/jsTree/ngJsTree.min.js']
                        }
                    ]);
                }
            }
        })
        .state('cog-files.clone', {
            url: "/clone/:id",
            templateUrl: "assets/views/cogworks/cog-files/cog-files-clone.html",
            data: { pageTitle: 'Clone Cogworks File' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-clone',
                            files: ['assets/js/app/cogworks/files/cog-files-clone.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-files.update', {
            url: "/update/:id",
            templateUrl: "assets/views/cogworks/cog-files/cog-files-update.html",
            data: { pageTitle: 'Cogworks File Update' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-update',
                            files: ['assets/js/app/cogworks/files/cog-files-update.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
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
            url: "/:page/active",
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
        .state('cog-projects.files', {
            url: "/:page/cog-files/:project",
            templateUrl: "assets/views/cogworks/projects/projects-cog-files.html",
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
        .state('cog-projects.files-details', {
            url: "/cog-files/details/:id",
            templateUrl: "assets/views/cogworks/projects/projects-cog-files-details.html",
            data: { pageTitle: 'Cogworks File Details' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-details',
                            files: ['assets/js/app/cogworks/files/cog-files-details.js']
                        },
                        {
                            files: ['assets/css/plugins/jsTree/style.min.css','assets/js/plugins/jsTree/jstree.min.js']
                        },
                        {
                            name: 'ngJsTree',
                            files: ['assets/js/plugins/jsTree/ngJsTree.min.js']
                        }
                    ]);
                }
            }
        })
        .state('cog-projects.files-update', {
            url: "/cog-files/update/:id",
            templateUrl: "assets/views/cogworks/projects/projects-cog-files-update.html",
            data: { pageTitle: 'Cogworks File Update' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-files-update',
                            files: ['assets/js/app/cogworks/files/cog-files-update.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-projects.update', {
            url: "/update/:id",
            templateUrl: "assets/views/cogworks/projects/projects-add-update.html",
            data: { pageTitle: 'Project Update' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-projects-update',
                            files: ['assets/js/app/cogworks/projects/cog-projects-update.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('cog-projects.add', {
            url: "/add",
            templateUrl: "assets/views/cogworks/projects/projects-add-update.html",
            data: { pageTitle: 'Project New Project' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cog-projects-add',
                            files: ['assets/js/app/cogworks/projects/cog-projects-add.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/css/plugins/dropzone/basic.css','assets/css/plugins/dropzone/dropzone.css','assets/js/plugins/dropzone/dropzone.js']
                        },
                        {
                            files: ['assets/js/plugins/jasny/jasny-bootstrap.min.js', 'assets/css/plugins/jasny/jasny-bootstrap.min.css' ]
                        }
                    ]);
                }
            }
        })
        .state('tasks', {
            abstract: true,
            url: "/tasks",
            templateUrl: "assets/views/common/content.html",
        })
        .state('tasks.todo', {
            url: "/todo",
            templateUrl: "assets/views/cogworks/tasks/tasks-main.html",
            data: { pageTitle: 'Tasks' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'tasks',
                            files: ['assets/js/app/tasks/tasks.js']
                        },
                        {
                            name: 'ui.sortable',
                            files: ['assets/js/plugins/ui-sortable/sortable.js']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
                        }
                    ]);
                }
            }
        })
        .state('pods-what-nots', {
            abstract: true,
            url: "/pods-what-nots",
            templateUrl: "assets/views/common/content.html",
        })
        .state('pods-what-nots.main', {
            url: "/main",
            templateUrl: "assets/views/cogworks/pods-what-nots/pods-what-nots-main.html",
            data: { pageTitle: 'Pods / What-Nots' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'pods-what-nots',
                            files: ['assets/js/app/cogworks/pods-what-nots/pods-what-nots-main.js']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['assets/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['assets/js/plugins/sweetalert/sweetalert.min.js', 'assets/css/plugins/sweetalert/sweetalert.css']
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
    .module('projectcog')
    .config(config)
    .run(function($rootScope, $state, $http, loginService) {
        $rootScope.$on('$stateChangeSuccess', function () {
            loginService.userLogged();
        })
        $rootScope.$state = $state;
    });
