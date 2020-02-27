<?php
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/custom-functions.php';
require __DIR__ . '/../src/routes/cogworks/main-tool-backend-custom-functions.php';

session_start();

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);

// Set up dependencies
$dependencies = require __DIR__ . '/../src/dependencies.php';
$dependencies($app);

// Register middleware
$middleware = require __DIR__ . '/../src/middleware.php';
$middleware($app);

// Register routes
$routes = require __DIR__ . '/../src/routes.php';
$dashboard = require __DIR__ . '/../src/routes/dashboard.php';
$extra = require __DIR__ . '/../src/routes/extra/extra.php';
$login = require __DIR__ . '/../src/routes/login/login.php';
$projectcogUsers = require __DIR__ . '/../src/routes/projectcog/users.php';
$projectcogOrganizations = require __DIR__ . '/../src/routes/projectcog/organizations.php';
$projectcogAccounts = require __DIR__ . '/../src/routes/projectcog/accounts.php';
$cogMainToolBackend = require __DIR__ . '/../src/routes/cogworks/main-tool-backend.php';
$cogDevelopers = require __DIR__ . '/../src/routes/cogworks/developers.php';
$cogProjects = require __DIR__ . '/../src/routes/cogworks/projects.php';
$cogFiles = require __DIR__ . '/../src/routes/cogworks/cog-files.php';
$podsWhatNots = require __DIR__ . '/../src/routes/cogworks/pods-what-nots.php';
$tasks = require __DIR__ . '/../src/routes/task/tasks.php';
$messages = require __DIR__ . '/../src/routes/message/messages.php';

$routes($app);
$dashboard($app);
$extra($app);
$login($app);
$projectcogUsers($app);
$projectcogOrganizations($app);
$projectcogAccounts($app);
$cogMainToolBackend($app);
$cogDevelopers($app);
$cogProjects($app);
$cogFiles($app);
$podsWhatNots($app);
$tasks($app);
$messages($app);

// Run app
$app->run();
