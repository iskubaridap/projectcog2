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
        $usersAry = json_decode($request->getParam('users'));
        $content = addslashes($request->getParam('content'));
        $state = $request->getParam('state');
        $type = $request->getParam('type');
        $priority = $request->getParam('priority');
        $program = $request->getParam('program');
        $result = null;
        $items = array();
        $date = null;
        $org = null;

        foreach($usersAry as $id)
        {
            $result = $container->task->exec("
                insert into tasks
                (user_id, task_content, task_type_id, task_state_id, priority_level, program_id, status_id)
                values('$id', '$content', '$type', '$state', '$priority', '$program', 1)
            ");
            $taskObj = $container->task->query("
                select * from tasks
                order by id desc limit 1
            ")->fetch(PDO::FETCH_ASSOC);

            if(!$result)
            {
                break;
            }
            if($date == null)
            {
                $resultObj = $container->task->query("
                    select * from tasks
                    where user_id = '$id'
                    order by created desc limit 1
                ")->fetch(PDO::FETCH_ASSOC);
                $date = date("Y-m-d", strtotime($resultObj['created']));
            }
            $tmpAry = array();
            $user = getUserInfo($id, $container);
            $tmpAry['id'] = $taskObj['id'];
            $tmpAry['content'] = $content;
            $tmpAry['date'] = $date;
            $tmpAry['tagName'] = $user['user'];
            $tmpAry['program'] = $program;
            $tmpAry['priority'] = $priority;

            switch($priority)
            {
                case '1':
                    $tmpAry['statusClass'] = 'danger';
                    break;
                case '2':
                    $tmpAry['statusClass'] = 'warning';
                    break;
                case '3':
                    $tmpAry['statusClass'] = 'success';
                    break;
                case '4':
                    $tmpAry['statusClass'] = 'info';
                    break;
            }
            array_push($items, $tmpAry);
        }

        return json_encode($items);
        // return 'true';
    });
    $app->post('/tasks/update/priority', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $priority = $request->getParam('priority');
        $result = null;
        $dateDateTime = getCurrentDate();

        $prepare = $container->task->prepare("
            update tasks
            set
            priority_level = '$priority',
            updated = '$dateDateTime'
            where id = '$id'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
    $app->post('/tasks/update/state', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $state = $request->getParam('state');
        $result = null;
        $dateDateTime = getCurrentDate();

        $prepare = $container->task->prepare("
            update tasks
            set
            task_state_id = '$state',
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
        $program = $request->getParam('program');
        $result = null;

        $todo = $container->task->query("
            select * from todo_lists
            where organization_id = '$userOrg' and task_state_id = 1 and program_id = '$program' and status_id = '1'
        ")->fetch(PDO::FETCH_ASSOC);
        $inProgress = $container->task->query("
            select * from todo_lists
            where organization_id = '$userOrg' and task_state_id = 2 and program_id = '$program' and status_id = '1'
        ")->fetch(PDO::FETCH_ASSOC);
        $completed = $container->task->query("
            select * from todo_lists
            where organization_id = '$userOrg' and task_state_id = 3 and program_id = '$program' and status_id = '1'
        ")->fetch(PDO::FETCH_ASSOC);

        $result['todo'] = $todo;
        $result['todoCount'] = count(json_decode($todo['todo_list_content']));
        $result['inProgress'] = $inProgress;
        $result['inProgressCount'] = count(json_decode($inProgress['todo_list_content']));
        $result['completed'] = $completed;
        $result['completedCount'] = count(json_decode($completed['todo_list_content']));

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
            values('$content', '$userOrg', '$state', '$program', 1)
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
        $state = $request->getParam('state');
        $program = $request->getParam('program');
        $result = null;
        $dateDateTime = getCurrentDate();

        $todoObj = $container->task->query("
            select * from todo_lists
            where organization_id = '$userOrg' and task_state_id = '$state' and program_id = '$program'
        ")->fetch(PDO::FETCH_ASSOC);

        // reserve code
        /* $taskObj = $container->task->query("
            select * from tasks
            where id = '$id'
        ")->fetch(PDO::FETCH_ASSOC);

        if($taskObj['task_state_id'] != $state)
        {
            $taskPrepare = $container->task->prepare("
                update tasks
                set
                task_state_id = '$state',
                updated = '$dateDateTime'
                where id = '$id'
            ");
            $taskPrepare->execute();
        } */

        if(is_array($todoObj) && count($todoObj) > 0)
        {
            $prepare = $container->task->prepare("
                update todo_lists
                set
                todo_list_content = '$content',
                updated = '$dateDateTime'
                where organization_id = '$userOrg' and task_state_id = '$state' and program_id = '$program'
            ");
            $result = $prepare->execute();
        }
        else
        {
            $result = $container->task->exec("
                insert into todo_lists
                (todo_list_content, organization_id, task_state_id, program_id, status_id)
                values('$content', '$userOrg', '$state', '$program', 1)
            ");
        }

        // return json_encode($result);
        return json_encode($state);
    });
    $app->post('/tasks/deactivate', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $dateDateTime = getCurrentDate();
        $result = null;
        
        $prepare = $container->task->prepare("
            update tasks
            set
            status_id = '2',
            updated = '$dateDateTime'
            where id = '$id'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
};