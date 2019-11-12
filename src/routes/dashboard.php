<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/dashboard', function ($request, $response, $args) use ($container) {
        
        $content .= $container->renderer->fetch('dashboard.php', array(
                'root' => ROOT
        ));

        return $response->write($content);
    });
};
