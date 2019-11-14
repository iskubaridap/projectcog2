<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/developers/active', function ($request, $response, $args) use ($container) {
        // @session_start();
        // $result = null;
        // $userID = $_SESSION['id'];
    });
};