<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();

    $app->post('/cogworks/cog-files/retrieve/active', function ($request, $response, $args) use ($container) {
        // @session_start();
        // $result = null;
        // $userID = $_SESSION['id'];
        $userPosition = 1;
        $userID = 1;
        $result = array();

        $user = $container->projectcog->query("
            select * from users
            where id = '$userID';
        ")->fetch(PDO::FETCH_ASSOC);

        $orgs = $container->projectcog->query("
            select * from organizations
            order by organization asc
        ")->fetchAll(PDO::FETCH_ASSOC);

        $userOrg = $user['organization_id'];

        // This assumes that the user is the Admin
        if($userPosition == 1)
        {
            $cogFiles = $container->cogworks->query("
                select * from cog_files
                where status_id = '1'
                order by cog_file asc
            ")->fetchAll(PDO::FETCH_ASSOC);
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        else
        {
            $cogFiles = $container->cogworks->query("
                select * from cog_files
                where status_id = '1' and user_id = '$userID' and organization_id = '$userOrg'
                order by cog_file asc
            ")->fetchAll(PDO::FETCH_ASSOC);
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1' and organization_id = '$userOrg'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }

        foreach($cogFiles as $cog)
        {
            $cogFile = array();
            $cogFile['id'] = $cog['id'];
            $cogFile['cogfile'] = $cog['cog_file'];
            $cogFile['user'] = $cog['user_id'];
            $cogFile['orgID'] = $cog['organization_id'];
            $cogFile['projectID'] = $cog['project_id'];
            $cogFile['created'] = (explode(" ",$cog['created']))[0];
            $cogFile['updated'] = (explode(" ",$cog['updated']))[0];
            $cogFile['project'] = '(Personal File)';

            foreach($projects as $prj)
            {
                if($cog['project_id'] == $prj['id'])
                {
                    $cogFile['project'] = $prj['project'];
                    break;
                }
            }
            if($cog['image'] == null)
            {
                $cogFile['image'] = 'assets/img/thumbnail/cog-file.svg';
            }
            array_push($result, $cogFile);
        }
        return json_encode($result);
    });
    $app->post('/cogworks/cog-files/deactivate', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $date = new DateTime('NOW');
        $dateDateTime = $date->format('Y-m-d H:i:s');
        $result = null;
        
        $prepare = $container->cogworks->prepare("
            update cog_files
            set
            status_id = '0'
            where id = '$id'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
};