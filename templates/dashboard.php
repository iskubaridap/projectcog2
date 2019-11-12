<!--
* INSPINIA - Responsive Admin Theme
* Version 2.7.1
*
-->

<!DOCTYPE html>
<html ng-app="mcafee">
    <head>

        <meta http-equiv="Content-type" content="text/html;charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <!-- Page title set in pageTitle directive -->
        <title page-title></title>
        
        <link rel="icon" type="image/png" href="<?= $root; ?>assets/img/icon/favicon.png">

        <!-- Font awesome -->
        <link href="<?= $root; ?>assets/font-awesome/css/font-awesome.css" rel="stylesheet">

        <!-- Bootstrap and Fonts -->
        <link href="<?= $root; ?>assets/css/bootstrap.min.css" rel="stylesheet">

        <!-- Main Inspinia CSS files -->
        <link href="<?= $root; ?>assets/css/animate.css" rel="stylesheet">
        <link id="loadBefore" href="<?= $root; ?>assets/css/style.css" rel="stylesheet">


    </head>

    <!-- ControllerAs syntax -->
    <!-- Main controller with serveral data used in Inspinia theme on diferent view -->
    <body ng-controller="MainCtrl as main">
        <!-- Main view  -->
        <div ui-view></div>
        
        <script>
            var root = '<?= $root; ?>';
        </script>
        <!-- jQuery and Bootstrap -->
        <script src="<?= $root; ?>assets/js/jquery/jquery-3.1.1.min.js"></script>
        <script src="<?= $root; ?>assets/js/plugins/jquery-ui/jquery-ui.min.js"></script>
        <script src="<?= $root; ?>assets/js/bootstrap/bootstrap.min.js"></script>

        <!-- MetsiMenu -->
        <script src="<?= $root; ?>assets/js/plugins/metisMenu/jquery.metisMenu.js"></script>

        <!-- SlimScroll -->
        <script src="<?= $root; ?>assets/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

        <!-- Peace JS -->
        <script src="<?= $root; ?>assets/js/plugins/pace/pace.min.js"></script>

        <!-- Custom and plugin javascript -->
        <script src="<?= $root; ?>assets/js/extra/dashboard/inspinia.js"></script>

        <!-- Main Angular scripts-->
        <script src="<?= $root; ?>assets/js/angular/angular.min.js"></script>
        <script src="<?= $root; ?>assets/js/angular/angular-sanitize.js"></script>
        <script src="<?= $root; ?>assets/js/plugins/oclazyload/dist/ocLazyLoad.min.js"></script>
        <script src="<?= $root; ?>assets/js/angular-translate/angular-translate.min.js"></script>
        <script src="<?= $root; ?>assets/js/ui-router/angular-ui-router.min.js"></script>
        <script src="<?= $root; ?>assets/js/bootstrap/ui-bootstrap-tpls-1.1.2.min.js"></script>
        
        <!-- Anglar App Script -->
        <script src="<?= $root; ?>assets/js/angular-essentials/app.js"></script>
        <script src="<?= $root; ?>assets/js/angular-essentials/services.js"></script>
        <script src="<?= $root; ?>assets/js/angular-essentials/config.js"></script>
        <script src="<?= $root; ?>assets/js/angular-essentials/translations.js"></script>
        <script src="<?= $root; ?>assets/js/angular-essentials/directives.js"></script>
        <script src="<?= $root; ?>assets/js/angular-essentials/controllers.js"></script>
        
    </body>
</html>
