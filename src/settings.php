<?php
/*
        'pdo' => [ 
            'dsn' => 'mysql:host=mysql.projectcog.com;dbname=assess_test;charset=UTF8', 
            'username' => 'dkohler', 
            'password' => 'Projectcog07!',
        ]
        'pdo' => [ 
            'dsn' => 'mysql:host=mysql.projectcog.com;dbname=assess;charset=UTF8', 
            'username' => 'projectcog_dev', 
            'password' => 'pr0j3ctc0gd3v', 
        ]
	'pdo' => [ 
            'dsn' => 'mysql:host=localhost;dbname=assess;charset=UTF8',
            'username' => 'root',
            'password' => 'root', // P@ssw0rd
        ]
        
        //mysql:host=mysql.projectcog.com;dbname=cogworks
*/
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],
        'pdo' => [ 
            'dsn' => 'mysql:host=localhost;dbname=cogworks_2;charset=UTF8',
            'username' => 'root',
            'password' => 'P@ssw0rd',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
    ],
];
