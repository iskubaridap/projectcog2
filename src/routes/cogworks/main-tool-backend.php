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
    $app->post('/cogworks/main-tool-backend/read-cog-file', function ($request, $response, $args) use ($container) {
        // reserve code
        /* $id = $request->getParam('id');
        $path = mtbGetCogfilePath($id, $container); */
        $path = urldecode($request->getParam('path'));
        $fName = $request->getParam('fName');
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
        $path = $request->getParam('path');

        header('Content-type: text/html; charset=utf-8');
        $myfile = fopen($path, "r") or die("fail"); //die("Unable to open file!");
        
        while(!feof($myfile)) {
        echo fgets($myfile);
        }
        
        fclose($myfile);
    });
};