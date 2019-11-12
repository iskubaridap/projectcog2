<?php
/*
    $container['pdo'] = function ($c) { 
        $settings = $c->get('settings')['pdo'];

        return new PDO($settings['dsn'], $settings['username'], $settings['password']); 
    };
    $container['App\Action\HomeAction'] = function ($c) { 
        return new App\Action\HomeAction($c->get('view'), $c->get('logger'), $c['pdo']); 
    };
*/
use Slim\App;

return function (App $app) {
    $container = $app->getContainer();

    // view renderer
    $container['renderer'] = function ($c) {
        $settings = $c->get('settings')['renderer'];
        return new \Slim\Views\PhpRenderer($settings['template_path']);
    };

    // monolog
    $container['logger'] = function ($c) {
        $settings = $c->get('settings')['logger'];
        $logger = new \Monolog\Logger($settings['name']);
        $logger->pushProcessor(new \Monolog\Processor\UidProcessor());
        $logger->pushHandler(new \Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
        return $logger;
    };
};
