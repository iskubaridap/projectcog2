<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();
    $app->post('/users/test-function', function ($request, $response, $args) use ($container) {
        test();
    });
    $app->post('/users/logged-user', function ($request, $response, $args) use ($container) {
        return json_encode(identifyLoggedUser($container));
    });
    $app->post('/users/retrieve/single', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        return json_encode(getUserInfo($id, $container));
    });
};