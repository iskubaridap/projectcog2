<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();
    $app->post('/tasks/test-function', function ($request, $response, $args) use ($container) {
        test();
    });
    $app->post('/tasks/retrieve/active', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $result = null;

        $result = $container->task->query("
            select * from tasks
            where user_id = '$userID' and status_id = '1'
            order by created asc
        ")->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($result);
    });
    $app->post('/tasks/retrieve/single', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $id = $request->getParam('id');
        $result = null;

        $result = $container->task->query("
            select * from tasks
            where id = '$id'
        ")->fetch(PDO::FETCH_ASSOC);
        
        return json_encode($result);
    });
    $app->post('/tasks/create', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $id = $request->getParam('id');
        $content = addslashes($request->getParam('content'));
        $type = $request->getParam('type');
        $state = $request->getParam('state');
        $priority = $request->getParam('priority');
        $program = $request->getParam('program');
        $result = null;

        $result = $container->task->exec("
            insert into tasks
            (users_id, task_content, task_type_id, task_state_id, priority_level, program_id, status_id)
            values('$id', '$content', '$type', '$state', '$priority', '$program', 2)
        ");

        return json_encode($result);
    });
    $app->post('/tasks/update', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $id = $request->getParam('id');
        $content = addslashes($request->getParam('content'));
        $state = $request->getParam('state');
        $result = null;
        $date = new DateTime('NOW');
        $dateDateTime = $date->format('Y-m-d H:i:s');

        $prepare = $container->task->prepare("
            update task
            set
            task_content = '$content',
            task_state_id = '$state',
            updated = '$dateDateTime'
            where id = '$id'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
    $app->post('/tasks/deactivate', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $id = $request->getParam('id');
        $result = null;
        $date = new DateTime('NOW');
        $dateDateTime = $date->format('Y-m-d H:i:s');

        $prepare = $container->task->prepare("
            update task
            set
            status_id = '2',
            updated = '$dateDateTime'
            where id = '$id'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
    $app->post('/tasks/retrieve/todo', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $id = $request->getParam('id');
        $result = null;

        $todo = $container->task->query("
            select * from todo_lists
            where organization_id = '$userOrg' and task_state_id = 1
        ")->fetch(PDO::FETCH_ASSOC);
        $inProgress = $container->task->query("
            select * from todo_lists
            where organization_id = '$userOrg' and task_state_id = 2
        ")->fetch(PDO::FETCH_ASSOC);
        $completed = $container->task->query("
            select * from todo_lists
            where organization_id = '$userOrg' and task_state_id = 3
        ")->fetch(PDO::FETCH_ASSOC);

        $todoCount = $container->task->query("
            select count(id) from tasks
            where user_id = '$userID' and task_type_id = 1 and task_state_id = 1
        ")->fetch(PDO::FETCH_ASSOC);
        $inProgressCount = $container->task->query("
            select count(id) from tasks
            where user_id = '$userID' and task_type_id = 1 and task_state_id = 2
        ")->fetch(PDO::FETCH_ASSOC);
        $completedCount = $container->task->query("
            select count(id) from tasks
            where user_id = '$userID' and task_type_id = 1 and task_state_id = 3
        ")->fetch(PDO::FETCH_ASSOC);

        $result['todo'] = $todo;
        $result['todoCount'] = (int) $todoCount['count(id)'];
        $result['inProgress'] = $inProgress;
        $result['inProgressCount'] = (int) $inProgressCount['count(id)'];
        $result['completed'] = $completed;
        $result['completedCount'] = (int) $completedCount['count(id)'];

        return json_encode($result);
    });
    $app->post('/tasks/todo/create', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $content = addslashes($request->getParam('content'));
        $type = $request->getParam('type');
        $state = $request->getParam('state');
        $program = $request->getParam('program');
        $result = null;

        $result = $container->task->exec("
            insert into todo_lists
            (todo_list_content, organization_id, task_state_id, program_id, status_id)
            values('$content', '$userOrg', '$state', '$program', 2)
        ");

        return json_encode($result);
    });
    $app->post('/tasks/todo/update', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $id = $request->getParam('id');
        $content = addslashes($request->getParam('content'));
        $result = null;
        $date = new DateTime('NOW');
        $dateDateTime = $date->format('Y-m-d H:i:s');

        $prepare = $container->task->prepare("
            update todo_lists
            set
            todo_list_content = '$content',
            updated = '$dateDateTime'
            where id = '$id'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
};