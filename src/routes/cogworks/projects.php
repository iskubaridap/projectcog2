<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();

    $app->post('/cogworks/projects/retrieve/active', function ($request, $response, $args) use ($container) {
        // @session_start();
        // $result = null;
        // $userID = $_SESSION['id'];
        $userID = 1;
        $userPosition = 1;
        // $userOrg = 1;
        $userOrg = 5; // this assumes that the user's org is "projectcog"
        $result = array();

        $user = $container->projectcog->query("
            select * from users
            where id = '$userID'
        ")->fetchAll(PDO::FETCH_ASSOC);

        $orgs = $container->projectcog->query("
            select * from organizations
            order by organization asc
        ")->fetchAll(PDO::FETCH_ASSOC);

        // This assumes that the user is the Admin
        if($userPosition == 1 || $userPosition == 2)
        {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        else
        {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1' and organization_id = '$userOrg'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }

        foreach($projects as $prj)
        {
            $project = array();
            $project['id'] = $prj['id'];
            $projectID = $prj['id'];
            $project['project'] = $prj['project'];
            $project['orgID'] = $prj['organization_id'];
            $project['created'] = (explode(" ",$prj['created']))[0];
            $project['cogfiles'] = 0;

            if($prj['image'] == null || strlen($prj['image']) <= 0)
            {
                $project['image'] = 'assets/img/thumbnail/cog-file.svg';
            }

            foreach($orgs as $org)
            {
                if($prj['organization_id'] == $org['id'])
                {
                    $project['organization'] = $org['organization'];
                    break;
                }
            }
            $cogfiles = $container->cogworks->query("
                select count(id) from cog_files
                where project_id = '$projectID' and status_id = '1'
            ")->fetch(PDO::FETCH_ASSOC);

            $project['cogfiles'] = $cogfiles['count(id)'];
            
            array_push($result, $project);
        }
        return json_encode($result);
    });
    $app->post('/cogworks/projects/deactivate', function ($request, $response, $args) use ($container) {
        
        return json_encode($result);
    });
    $app->post('/cogworks/projects/retrieve/single', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $result = null;
        $result = $container->cogworks->query("
            select * from projects
            where id = '$id'
        ")->fetch(PDO::FETCH_ASSOC);
        return json_encode($result);
    });
    $app->post('/cogworks/projects/retrieve/projects-files/active', function ($request, $response, $args) use ($container) {
        // @session_start();
        // $result = null;
        // $userID = $_SESSION['id'];
        $userID = 1;
        $userPosition = 1;
        // $userOrg = 1;
        $userOrg = 5; // this assumes that the user's org is "projectcog"
        $result = array();

        $user = $container->projectcog->query("
            select * from users
            where id = '$userID'
        ")->fetchAll(PDO::FETCH_ASSOC);

        $orgs = $container->projectcog->query("
            select * from organizations
            order by organization asc
        ")->fetchAll(PDO::FETCH_ASSOC);

        // This assumes that the user is the Admin
        if($userPosition == 1 || $userPosition == 2)
        {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        else
        {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1' and organization_id = '$userOrg'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }

        foreach($projects as $prj)
        {
            $project = array();
            $project['id'] = $prj['id'];
            $projectID = $prj['id'];
            $project['project'] = $prj['project'];
            $project['orgID'] = $prj['organization_id'];
            $project['created'] = (explode(" ",$prj['created']))[0];
            $project['cogfiles'] = array();

            if($prj['image'] == null || strlen($prj['image']) <= 0)
            {
                $project['image'] = 'assets/img/thumbnail/cog-file.svg';
            }

            foreach($orgs as $org)
            {
                if($prj['organization_id'] == $org['id'])
                {
                    $project['organization'] = $org['organization'];
                    break;
                }
            }
            $cogfiles = $container->cogworks->query("
                select * from cog_files
                where project_id = '$projectID' and status_id = '1'
                order by cog_file asc
            ")->fetchAll(PDO::FETCH_ASSOC);

            foreach($cogfiles as $file)
            {
                $cog = array();
                $cog['id'] = $file['id'];
                $cog['cogfile'] = $file['cog_file'];
                $cog['user'] = $file['user_id'];
                $cog['created'] = $file['created'];
                $cog['updated'] = $file['updated'];

                if($file['image'] == null || strlen($file['image']) <= 0)
                {
                    $cog['image'] = 'assets/img/thumbnail/cog-file.svg';
                }
                array_push($project['cogfiles'], $cog);
            }
            array_push($result, $project);
        }
        return json_encode($result);
    });
};