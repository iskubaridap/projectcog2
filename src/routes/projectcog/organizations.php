<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();
    $app->post('/organizations/test-function', function ($request, $response, $args) use ($container) {
        test();
    });
    $app->post('/organizations/retrieve/cogworks/all', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $result = null;
        $orgs = null;

        if($loggedUser['organization_id'] == 1 && $loggedUser['position_id'] == 1) {
            $orgs = $container->projectcog->query("
                select * from organizations
            ")->fetchAll(PDO::FETCH_ASSOC);
            foreach($orgs as &$org)
            {
                $imgAry = getCogOrganizationThumbnail($org['id'], $org['image'], $container);
                $org['imageValue'] = $imgAry['imageValue'];
                $org['image'] = $imgAry['path'];
            }
            $result = $orgs;
        } else {
            $result = 'user not allowed!';
        }

        return json_encode($result);
    });
    $app->post('/organizations/retrieve/cogworks/single', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $result = null;
        $tmpAry = array();
        $obj = $container->projectcog->query("
            select * from organizations
            where id = '$id'
        ")->fetch(PDO::FETCH_ASSOC);

        if(is_array($obj)) {
            $tmpAry = getCogOrganizationThumbnail($obj['id'], $obj['image'], $container);
            $obj['imageValue'] = $tmpAry['imageValue'];
            $obj['image'] = $tmpAry['path'];
            $result = $obj;
        }
        return json_encode($result);
    });
    $app->post('/organizations/info/cogworks', function ($request, $response, $args) use ($container) {
        $orgID = $request->getParam('id');
        $result = array();
        
        $result['info'] = array();
        $result['users'] = array();
        $result['projects'] = array();
        $result['cogfiles'] = array();

        $status = $container->projectcog->query("
            select status from statues;
        ")->fetchAll(PDO::FETCH_ASSOC);

        $projectNames = $container->cogworks->query("
            select project from projects
        ")->fetchAll(PDO::FETCH_ASSOC);

        $info = $container->projectcog->query("
            select * from organizations where id = '$orgID';
        ")->fetch(PDO::FETCH_ASSOC);
        $imgAry = getCogOrganizationThumbnail($info['id'], $info['image'], $container);
        $result['info']['id'] = $info['id'];
        $result['info']['organization'] = $info['organization'];
        $result['info']['image'] = $imgAry['path'];
        $result['info']['imageValue'] = $imgAry['imageValue'];
        $result['info']['accountID'] = $info['account_id'];
        $result['info']['statusID'] = $info['status_id'];
        $result['info']['updated'] = ($info['updated'] != null) ? (explode(" ", $info['updated']))[0] : '0000-00-00';
        $result['info']['created'] = (explode(" ", $info['created']))[0];

        $users = $container->projectcog->query("
            select users.id, users.user, users.status_id, users.position_id, statues.status, positions.position from users, positions, statues where users.status_id = statues.id and users.position_id = positions.id and users.organization_id = '$orgID' order by users.user
        ")->fetchAll(PDO::FETCH_ASSOC);

        foreach($users as $user) {
            $tmpObj = array();
            $uID = $user['id'];
            $tmpObj['id']  = $uID;
            $tmpObj['user'] = $user['user'];
            $tmpObj['status'] = $user['status'];
            $tmpObj['statusID'] = $user['status_id'];
            $tmpObj['position'] = $user['position'];
            $tmpObj['positionID'] = $user['position_id'];
            array_push($result['users'], $tmpObj);

            $cogfiles = $container->cogworks->query("
                select id, cog_file, status_id, project_id from cog_files where user_id = '$uID' order by cog_file
            ")->fetchAll(PDO::FETCH_ASSOC);

            if(is_array($cogfiles)) {
                foreach($cogfiles as $cogfile) {
                    $tmpObj2 = array();
                    $tmpObj2['id']  = $cogfile['id'];
                    $tmpObj2['cogfile'] = str_replace('.cog', '', $cogfile['cog_file']);
                    $tmpObj2['project'] = ($cogfile['project_id'] != 0) ? $projectNames[($cogfile['project_id'] - 1)]['project'] : '(Personal File)';
                    $tmpObj2['projectID'] = $cogfile['project_id'];
                    $tmpObj2['userID'] = $uID;
                    $tmpObj2['user'] = $user['user'];
                    $tmpObj2['statusID'] = $cogfile['status_id'];
                    $tmpObj2['status'] = $status[($cogfile['status_id'] - 1)]['status'];
                    array_push($result['cogfiles'], $tmpObj2);
                }
            }
        }

        $projects = $container->cogworks->query("
            select id, project, status_id from projects where organization_id = '$orgID' order by project
        ")->fetchAll(PDO::FETCH_ASSOC);
        
        foreach($projects as $project) {
            $tmpObj = array();
            $proID = $project['id'];
            $projCogCount = $container->cogworks->query("
                select count(id) from cog_files
                where project_id = '$proID'
            ")->fetch(PDO::FETCH_ASSOC);
            $tmpObj['id']  = $proID;
            $tmpObj['project']  = $project['project'];
            $tmpObj['status'] = $status[($project['status_id'] - 1)]['status'];
            $tmpObj['statusID'] = $project['status_id'];
            $tmpObj['cogfiles'] = $projCogCount['count(id)'];
            array_push($result['projects'], $tmpObj);
        }

        if(is_array($info)) {
            return json_encode($result);
        } else {
            return json_encode($info);
        }
    });
};