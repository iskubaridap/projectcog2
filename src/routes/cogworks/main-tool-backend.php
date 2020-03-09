<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\UploadedFile;

return function (App $app) {
    $container = $app->getContainer();
    $app->get('/cogworks/[{cogfile}]', function ($request, $response, $args) use ($container) {
        check_session();
        $obj = json_decode(base64_decode($args['cogfile']), true);
        $result = array();
        $result['user'] = $obj['u'];
        $result['file'] = $obj['c'];
        // return json_encode($result);
        $content .= $container->renderer->fetch('cogworks/cog-main.php', array(
            'root' => ROOT,
            'obj' => json_encode($result)
        ));
        return $response->write($content);
    });


    $app->post('/cogworks/main-tool-backend/test', function ($request, $response, $args) use ($container) {
        echo mtbGetCogfilePath(14, $container);
    });
    $app->post('/cogworks/main-tool-backend/retrieve/cogfiles', function ($request, $response, $args) use ($container) {
        $user = getUserInfo($request->getParam('id'), $container);
        $userID = $user['id'];
        $orgID = $user['organization_id'];
        $position = $user['position_id'];
        $result = array();
        $personalPrj = array();
        $personalPrj['id'] = 0;
        $personalPrj['project'] = 'Personal File';

        if($orgID == 1 && $position == 1) {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1' and organization_id = '$orgID'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        // just making sure we have an array value
        $projects = is_array($projects) ? $projects : array();
        array_push($projects, $personalPrj);
        foreach($projects as $prj) {
            $projectID = $prj['id'];
            if($projectID != 0) {
                $cogfiles = $container->cogworks->query("
                    select * from cog_files
                    where project_id = '$projectID' and status_id = '1'
                    order by cog_file asc
                ")->fetchAll(PDO::FETCH_ASSOC);
            } else {
                // for personal files
                if($orgID == 1 && $position == 1) {
                    $cogfiles = $container->cogworks->query("
                        select * from cog_files
                        where project_id = 0 and status_id = '1'
                        order by cog_file asc
                    ")->fetchAll(PDO::FETCH_ASSOC);
                } else {
                    $cogfiles = $container->cogworks->query("
                        select * from cog_files
                        where project_id = 0 and user_id = '$userID' and status_id = '1'
                        order by cog_file asc
                    ")->fetchAll(PDO::FETCH_ASSOC);
                }
            }

            foreach($cogfiles as $file) {
                $cog = array();
                $cog['id'] = $file['id'];
                $cog['cogfile'] = str_replace('.cog', '', $file['cog_file']);
                $cog['user'] = $file['user_id'];
                $cog['project'] = $prj['project'];
                $cog['projectID'] = $prj['id'];
                $cog['created'] = (explode(" ",$file['created']))[0];
                $cog['updated'] = (explode(" ",$file['updated']))[0];
                $tmpAry = array();

                $tmpAry = getCogFileThumbnail($orgID, $userID, $file['id'], $file['image'], $container);
                $cog['imageValue'] = $tmpAry['imageValue'];
                $cog['image'] = $tmpAry['path'];
                array_push($result, $cog);
            }
        }
        if(count($result) > 0) {
            usort($result, function($a, $b) {
                if ($a['created'] == $b['created']) {
                    return 0;
                }
                return ($a['created'] > $b['created']) ? -1 : 1;
            });
        }
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/projects-cogfiles', function ($request, $response, $args) use ($container) {
        $user = getUserInfo($request->getParam('id'), $container);
        $userID = $user['id'];
        $orgID = $user['organization_id'];
        $position = $user['position_id'];
        $result = array();
        $personalPrj = array();
        $personalPrj['id'] = 0;
        $personalPrj['project'] = 'Personal File';
        $personalPrj['organization_id'] = $orgID;
        $personalPrj['created'] = $user['created'];
        $personalPrj['imageValue'] = '';
        $personalPrj['image'] = ''; // no value for now 'coz i think it doesn't matter

        if($orgID == 1 && $position == 1) {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $projects = $container->cogworks->query("
                select * from projects
                where status_id = '1' and organization_id = '$orgID'
                order by project asc
            ")->fetchAll(PDO::FETCH_ASSOC);
        }
        // just making sure we have an array value
        $projects = is_array($projects) ? $projects : array();
        array_push($projects, $personalPrj);
        foreach($projects as $prj) {
            $project = array();
            $project['id'] = $prj['id'];
            $projectID = $prj['id'];
            $project['project'] = $prj['project'];
            $project['orgID'] = $prj['organization_id'];
            $project['created'] = (explode(" ",$prj['created']))[0];
            $project['cogfiles'] = array();

            $projImgAry = getCogProjectThumbnail($prj['organization_id'], $prj['id'], $prj['image'], $container);
            $project['imageValue'] = $projImgAry['imageValue'];
            $project['image'] = $projImgAry['path'];

            /* foreach($orgs as $org) {
                if($prj['organization_id'] == $org['id']) {
                    $project['organization'] = $org['organization'];
                    break;
                }
            } */
            $cogfiles = $container->cogworks->query("
                select * from cog_files
                where project_id = '$projectID' and status_id = '1'
                order by cog_file asc
            ")->fetchAll(PDO::FETCH_ASSOC);

            foreach($cogfiles as $file) {
                $cog = array();
                $cog['id'] = $file['id'];
                $cog['cogfile'] = $file['cog_file'];
                $cog['user'] = $file['user_id'];
                $cog['created'] = $file['created'];
                $cog['updated'] = $file['updated'];
                $tmpAry = array();

                $tmpAry = getCogFileThumbnail($orgID, $userID, $file['id'], $file['image'], $container);
                $cog['imageValue'] = $tmpAry['imageValue'];
                $cog['image'] = $tmpAry['path'];
                array_push($project['cogfiles'], $cog);
            }
            array_push($result, $project);
        }
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/set-init-value', function ($request, $response, $args) use ($container) {
        header('Content-type: text/html; charset=utf-8');
        $obj = json_decode(base64_decode($request->getParam('value')), true);
        $cogID = $obj['c'];
        $path = mtbGetCogfilePath($cogID, $container);
        $result = array();
        $result['user'] = $obj['u'];
        $result['fileID'] = $cogID;

        $myfile = fopen($path, "r") or die("fail"); //die("Unable to open file!");
        while(!feof($myfile)) {
            $cogfile = fgets($myfile);
        }
        fclose($myfile);
        $result['file'] = json_decode($cogfile, true);
        $cogObj = $container->cogworks->query("
            select * from cog_files
            where id = '$cogID';
        ")->fetch(PDO::FETCH_ASSOC);
        $result['file']['design']['name'] = str_replace('.cog', '', $cogObj['cog_file']);
        $result['file']['content']['design']['name'] = str_replace('.cog', '', $cogObj['cog_file']);
        $result['file']['id'] = $cogID;
        $result['filePath'] = mtbGetCogfilePath($cogID, $container);
        
        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/path/cog-file', function ($request, $response, $args) use ($container) {
        $id = $request->getParam('id');
        $path = mtbGetCogfilePath($id, $container);
        return $path;
    });
    $app->post('/cogworks/main-tool-backend/read-cog-file', function ($request, $response, $args) use ($container) {
        // reserve code
        /* $id = $request->getParam('id');
        $path = mtbGetCogfilePath($id, $container); */
        $path = urldecode($request->getParam('path'));
        $fName = $request->getParam('fName');
        $id = str_replace('.cog', '', $fName);
        $fileLocation = $path . "/" . $fName;
        $cogfile = null;
        $result = null;

        header('Content-type: text/html; charset=utf-8');
        $myfile = fopen($fileLocation, "r") or die("fail"); //die("Unable to open file!");
        
        while(!feof($myfile)) {
            $cogfile = fgets($myfile);
        }
        fclose($myfile);
        $result = json_decode($cogfile, true);
        $cogObj = $container->cogworks->query("
            select * from cog_files
            where id = '$id';
        ")->fetch(PDO::FETCH_ASSOC);
        $result['design']['name'] = str_replace('.cog', '', $cogObj['cog_file']);
        $result['content']['design']['name'] = str_replace('.cog', '', $cogObj['cog_file']);
        $result['id'] = $id;

        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/read-file', function ($request, $response, $args) use ($container) {
        $path = urldecode($request->getParam('path'));
        $fName = $request->getParam('fName');
        $fileLocation = $path . "/" . $fName;

        header('Content-type: text/html; charset=utf-8');
        $myfile = fopen($fileLocation, "r") or die("fail"); //die("Unable to open file!");
        
        while(!feof($myfile)) {
            echo fgets($myfile);
        }
        
        fclose($myfile);
    });
    $app->post('/cogworks/main-tool-backend/pods/update', function ($request, $response, $args) use ($container) {
        $user = getUserInfo($request->getParam('id'), $container);
        $userID = $user['id'];
        $userPosition = $user['position_id'];
        $userOrg = $user['organization_id'];
        $content = addslashes($request->getParam('content'));
        $dateDateTime = getCurrentDate();
        $result = null;
        $result = null;

        $prepare = $container->cogworks->prepare("
            update pods
            set
            pod = '$content',
            updated = '$dateDateTime'
            where organization_id = '$userOrg'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
    $app->post('/cogworks/main-tool-backend/what-nots/update', function ($request, $response, $args) use ($container) {
        $user = getUserInfo($request->getParam('id'), $container);
        $userID = $user['id'];
        $userPosition = $user['position_id'];
        $userOrg = $user['organization_id'];
        $content = addslashes($request->getParam('content'));
        $dateDateTime = getCurrentDate();
        $result = null;
        $result = null;

        $prepare = $container->cogworks->prepare("
            update what_nots
            set
            what_not = '$content',
            updated = '$dateDateTime'
            where user_id = '$userID'
        ");

        $result = $prepare->execute();

        return json_encode($result);
    });
};