<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();
    $app->post('/organizations/test-function', function ($request, $response, $args) use ($container) {
        test();
    });
    $app->post('/organizations/retrieve/all', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $result = null;

        if($loggedUser['organization_id'] == 1 && $loggedUser['position_id']) {
            $result = $container->projectcog->query("
                select * from organizations
            ")->fetchAll(PDO::FETCH_ASSOC);
        }

        return json_encode($result);
    });
};