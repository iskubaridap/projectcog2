<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();

    $app->post('/cogworks/projects/retrieve/active', function ($request, $response, $args) use ($container) {
        $loggedUser = identifyLoggedUser($container);
        $userID = $loggedUser['id'];
        $userPosition = $loggedUser['position_id'];
        $userOrg = $loggedUser['organization_id'];
        $page = $request->getParam('page');
        $result = array();

        $user = $container->projectcog->query("
            select * from users
            where id = '$userID'
        ")->fetchAll(PDO::FETCH_ASSOC);

        $orgs = $container->projectcog->query("
            select * from organizations
            order by organization asc
        ")->fetchAll(PDO::FETCH_ASSOC);

        $statues = $container->projectcog->query("
            select status from statues
        ")->fetchAll(PDO::FETCH_ASSOC);

        // This assumes that the user is the Admin
        if($page == 'manage')
        {
            $projects = $container->cogworks->query("
                select * from projects
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        else
        {
            if($userOrg == 2) {
                $projects = $container->cogworks->query("
                    select * from projects
                    where status_id = '1' and user_id = '$userID'
                    order by project asc
                ")->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $projects = $container->cogworks->query("
                    select * from projects
                    where status_id = '1' and organization_id = '$userOrg'
                    order by project asc
                ")->fetchAll(PDO::FETCH_ASSOC);
            }
        }

        foreach($projects as $prj)
        {
            $statusName = str_replace(' ', '-', strtolower($statues[(((int) $prj['status_id']) - 1)]['status']));
            $project = array();
            $project['id'] = $prj['id'];
            $projectID = $prj['id'];
            $project['project'] = $prj['project'];
            $project['orgID'] = $prj['organization_id'];
            $project['userID'] = $prj['user_id'];
            $project['created'] = explode(" ",$prj['created'])[0];
            $project['cogfiles'] = 0;
            $project['status'] = $prj['status_id'];
            $project['statusName'] = $statusName;
            $projImgAry = array();

            $projImgAry = getCogProjectThumbnail($prj['organization_id'], $prj['id'], $prj['image'], $container);
            $project['imageValue'] = $projImgAry['imageValue'];
            $project['image'] = $projImgAry['path'];

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
    $app->post('/cogworks/projects/retrieve/org/active', function ($request, $response, $args) use ($container) {
        $userOrg = $request->getParam('org');
        $userID = $request->getParam('user');
        $result = array();

        $orgs = $container->projectcog->query("
            select * from organizations
            order by organization asc
        ")->fetchAll(PDO::FETCH_ASSOC);
        if($userOrg == 2) {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1' and organization_id = '$userOrg' and user_id = '$userID'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        } else {
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
            $project['created'] = explode(" ",$prj['created'])[0];
            $project['cogfiles'] = 0;
            $project['status'] = $prj['status_id'];
            $projImgAry = array();

            $projImgAry = getCogProjectThumbnail($prj['organization_id'], $prj['id'], $prj['image'], $container);
            $project['imageValue'] = $projImgAry['imageValue'];
            $project['image'] = $projImgAry['path'];

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
        $id = $request->getParam('id');
        $result = null;
        $dateDateTime = getCurrentDate();
        $prepare = $container->cogworks->prepare("
            update projects
            set
            status_id = '2',
            updated = '$dateDateTime'
            where id = '$id'
        ");

        $result = $prepare->execute();
        return json_encode($result);
    });
    $app->post('/cogworks/projects/activate', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $result = null;
        $dateDateTime = getCurrentDate();
        $prepare = $container->cogworks->prepare("
            update projects
            set
            status_id = '1',
            updated = '$dateDateTime'
            where id = '$id'
        ");

        $result = $prepare->execute();
        return json_encode($result);
    });
    $app->post('/cogworks/projects/add', function ($request, $response, $args) use ($container) {
        $result = null;
        $user = identifyLoggedUser($container);
        $userID = $request->getParam('cogUser');
        $name = $request->getParam('cogProjName');
        $orgID = $request->getParam('cogOrgID');
        $file = $request->getUploadedFiles();
        $dateDateTime = getCurrentDate();
        $path = '';
        $result = null;
        $imageName = null;

        $cogOrgID = ($orgID == 0 ? $user['organization_id'] : $orgID);
       
        if(!empty($file)) {
            $uploadedFile = $file['file'];
            $imageName = $file['file']->getClientFilename();

            $result = $container->cogworks->exec("
                insert into projects
                (project, image, organization_id, user_id)
                values('$name', '$imageName', '$cogOrgID', '$userID');
            ");
            
            if($result) {
                $proj = $container->cogworks->query("
                    select * from projects
                    where organization_id = '$cogOrgID' order by id desc limit 1
                ")->fetch(PDO::FETCH_ASSOC);
                $projID = $proj['id'];

                $imagePathAry = getCogImageThumbnailDirectory($projID, $cogOrgID, $userID, 'projects');
                $imagePath = $imagePathAry['path'];
                $uploadedFile->moveTo($imagePath . $imageName);
                chmod($imagePath . $imageName,0777);
            }
            
        } else {
            $result = $container->cogworks->exec("
                insert into projects
                (project, organization_id, user_id)
                values('$name', '$cogOrgID', '$userID');
            ");
            if($result) {
                $proj = $container->cogworks->query("
                    select * from projects
                    where organization_id = '$cogOrgID' order by id desc limit 1
                ")->fetch(PDO::FETCH_ASSOC);
                $projID = $proj['id'];
            }
        }
        
        $path = getCogProjectDirectory($projID, $cogOrgID, $userID);
        
        generateDirectory($path);
        
        return json_encode($result);
    });
    $app->post('/cogworks/projects/retrieve/single', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $result = null;
        $tmpAry = array();
        $obj = $container->cogworks->query("
            select * from projects
            where id = '$id'
        ")->fetch(PDO::FETCH_ASSOC);

        if(is_array($obj)) {
            $tmpAry = getCogProjectThumbnail($obj['organization_id'], $id, $obj['image'], $container);
            $obj['imageValue'] = $tmpAry['imageValue'];
            $obj['image'] = $tmpAry['path'];
            $result = $obj;
        }
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
        if($userPosition == 1)
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
            $project['created'] = explode(" ",$prj['created'])[0];
            $project['cogfiles'] = array();

            $projImgAry = getCogProjectThumbnail($prj['organization_id'], $prj['id'], $prj['image'], $container);
            $project['imageValue'] = $projImgAry['imageValue'];
            $project['image'] = $projImgAry['path'];

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
                $tmpAry = array();

                $tmpAry = getCogFileThumbnail($userOrg, $userID, $file['id'], $file['image'], $container);
                $cog['imageValue'] = $tmpAry['imageValue'];
                $cog['image'] = $tmpAry['path'];
                array_push($project['cogfiles'], $cog);
            }
            array_push($result, $project);
        }
        return json_encode($result);
    });
    $app->post('/cogworks/projects/update', function ($request, $response, $args) use ($container) {
        // @session_start();
       // $result = null;
       // $userID = $_SESSION['id'];
       // $userID = 5; // temporary value...this assumes that i'm nina of jsi
       $userID = 5; // temporary value...this assumes that i'm nina of jsi
       $projID = $request->getParam('id');
       $name = $request->getParam('cogProjName');
       $file = $request->getUploadedFiles();
       $dateDateTime = getCurrentDate();
       $path = '';
       $result = null;
       $imageName = null;

        $projInfo = $container->cogworks->query("
            select * from projects
            where id = '$projID'
        ")->fetch(PDO::FETCH_ASSOC);
        $cogOrgID = $projInfo['organization_id'];
        $cogInfo = $container->cogworks->query("
            select * from cog_files
            where id = '$projID'
        ")->fetch(PDO::FETCH_ASSOC);
        $cogUserID = $cogInfo['user_id'];
       
       if(!empty($file))
       {
            $imagePathAry = getCogImageThumbnailDirectory($projID, $cogOrgID, $cogUserID, 'projects');
            $imagePath = $imagePathAry['path'];
            $uploadedFile = $file['file'];
            $imageName = $file['file']->getClientFilename();
            $uploadedFile->moveTo($imagePath . $imageName);
            chmod($imagePath . $imageName,0777);

            $prepare = $container->cogworks->prepare("
                update projects
                set
                project = '$name',
                image = '$imageName',
                updated = '$dateDateTime'
                where id = '$projID'
            ");
       }
       else
       {
            $prepare = $container->cogworks->prepare("
                update projects
                set
                project = '$name',
                updated = '$dateDateTime'
                where id = '$projID'
            ");
       }

       $result = $prepare->execute();
       return json_encode($result);
   });
};