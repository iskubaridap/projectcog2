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
/*
        // This is prove that we can access more than one database in one app
        // Change "pdo" into the first database
        // Change "pdo2" into the second database

        'pdo' => [ 
            'dsn' => 'mysql:host=localhost;dbname=cogworks_2;charset=UTF8',
            'username' => 'root',
            'password' => 'P@ssw0rd',
        ],
        'pdo2' => [ 
            'dsn' => 'mysql:host=localhost;dbname=cogworks;charset=UTF8',
            'username' => 'root',
            'password' => 'P@ssw0rd',
        ],

        'dsn' => 'mysql:host=localhost;dbname=cogworks_original;charset=UTF8',
        'dsn' => 'mysql:host=localhost;dbname=projectcog;charset=UTF8',
*/
/*
    'cogworks_original' => [ 
            'dsn' => 'mysql:host=mysql.projectcog.com;dbname=cogworks;charset=UTF8',
            'username' => 'projectcog_dev',
            'password' => 'pr0j3ctc0gd3v',
        ],
        'projectcog' => [ 
            'dsn' => 'mysql:host=mysql.projectcog.com;dbname=projectcog_2;charset=UTF8',
            'username' => 'projectcog_two',
            'password' => 'P@ssw0rd',
        ],
        'cogworks' => [ 
            'dsn' => 'mysql:host=mysql.projectcog.com;dbname=cogworks_2;charset=UTF8',
            'username' => 'projectcog_two',
            'password' => 'P@ssw0rd',
        ],
        'task' => [ 
            'dsn' => 'mysql:host=mysql.projectcog.com;dbname=task_2;charset=UTF8',
            'username' => 'projectcog_two',
            'password' => 'P@ssw0rd',
        ],
        'message' => [ 
            'dsn' => 'mysql:host=mysql.projectcog.com;dbname=message_2;charset=UTF8',
            'username' => 'projectcog_two',
            'password' => 'P@ssw0rd',
        ]
*/
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],
        'cogworks_original' => [ 
            'dsn' => 'mysql:host=localhost;dbname=cogworks_original;charset=UTF8',
            'username' => 'root',
            'password' => 'P@ssw0rd',
        ],
        'projectcog' => [ 
            'dsn' => 'mysql:host=localhost;dbname=projectcog;charset=UTF8',
            'username' => 'root',
            'password' => 'P@ssw0rd',
        ],
        'cogworks' => [ 
            'dsn' => 'mysql:host=localhost;dbname=cogworks;charset=UTF8',
            'username' => 'root',
            'password' => 'P@ssw0rd',
        ],
        'task' => [ 
            'dsn' => 'mysql:host=localhost;dbname=task;charset=UTF8',
            'username' => 'root',
            'password' => 'P@ssw0rd',
        ],
        'message' => [ 
            'dsn' => 'mysql:host=localhost;dbname=message;charset=UTF8',
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
