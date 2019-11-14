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

/*
    // This is prove that we can access more than one database in one app
    // Change "pdo" into the first database
    // Change "pdo2" into the second database

    $container['pdo'] = function ($c) { 
        $settings = $c->get('settings')['pdo'];

        return new PDO($settings['dsn'], $settings['username'], $settings['password']); 
    };
    $container['App\Action\HomeAction'] = function ($c) { 
        return new App\Action\HomeAction($c->get('view'), $c->get('logger'), $c['pdo']); 
    };
    $container['pdo2'] = function ($c) { 
        $settings = $c->get('settings')['pdo2'];

        return new PDO($settings['dsn'], $settings['username'], $settings['password']); 
    };
    $container['App\Action\HomeAction'] = function ($c) { 
        return new App\Action\HomeAction($c->get('view'), $c->get('logger'), $c['pdo2']); 
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

    $container['projectcog'] = function ($c) { 
        $settings = $c->get('settings')['projectcog'];

        return new PDO($settings['dsn'], $settings['username'], $settings['password']); 
    };
    $container['App\Action\HomeAction'] = function ($c) { 
        return new App\Action\HomeAction($c->get('view'), $c->get('logger'), $c['projectcog']); 
    };

    $container['cogworks'] = function ($c) { 
        $settings = $c->get('settings')['cogworks'];

        return new PDO($settings['dsn'], $settings['username'], $settings['password']); 
    };
    $container['App\Action\HomeAction'] = function ($c) { 
        return new App\Action\HomeAction($c->get('view'), $c->get('logger'), $c['cogworks']); 
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
