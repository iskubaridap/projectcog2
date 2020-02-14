<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\UploadedFile;

return function (App $app) {
    $container = $app->getContainer();
    $app->post('/cogworks/pods/retrieve/active', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];

        $pods = $container->cogworks->query("
            select * from pods
            where organization_id = '$userOrg' and status_id = '1'
        ")->fetch(PDO::FETCH_ASSOC);

        return json_encode($pods);
    });
    $app->post('/cogworks/what-nots/retrieve/active', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];

        $whatNots = $container->cogworks->query("
            select * from what_nots
            where user_id = '$userID' and status_id = '1'
        ")->fetch(PDO::FETCH_ASSOC);

        return json_encode($whatNots);
    });
    $app->post('/cogworks/pods/update', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $content = addslashes($request->getParam('content'));
        $dateDateTime = getCurrentDate();
        $result = null;
        $result = null;

        $prepare = $container->cogworks->prepare("
            update pods
            set
            pod = '$content',
            updated = '$dateDateTime'
            where organization_id = '$userOrg'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
    $app->post('/cogworks/what-nots/update', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $content = addslashes($request->getParam('content'));
        $dateDateTime = getCurrentDate();
        $result = null;
        $result = null;

        $prepare = $container->cogworks->prepare("
            update what_nots
            set
            what_not = '$content',
            updated = '$dateDateTime'
            where user_id = '$userID'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
};