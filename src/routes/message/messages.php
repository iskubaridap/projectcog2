<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();
    $app->post('/messages/test-function', function ($request, $response, $args) use ($container) {
        test();
    });
};