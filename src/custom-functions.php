<?php

function test()
{
    echo 'hello world!';
}
function getCogFileThumbnail($orgID, $userID, $cogID, $img, $container)
{
    $ary = array();
    $ary['imageValue'] = '';
    $ary['path'] = '';
    if($img == null || strlen($img) <= 0)
    {
        $ary['imageValue'] = '';
        $ary['path'] = 'assets/img/thumbnail/cog-file.svg';
    }
    else
    {
        $ary['imageValue'] = $img;
        $cogInfo = $container->cogworks->query("
            select * from cog_files
            where id = '$cogID';
        ")->fetch(PDO::FETCH_ASSOC);
        $cogUserID = $cogInfo['user_id'];
        $cogProjectID = $cogInfo['project_id'];
        $userInfo = $container->projectcog->query("
            select * from users
            where id = '$cogUserID';
        ")->fetch(PDO::FETCH_ASSOC);
        $userInfoID = $userInfo['id'];
        $userInfoOrgID = $userInfo['organization_id'];

        if($orgID == 1)
        {
            if($userInfoOrgID == 1)
            {
                $ary['path'] = 'cogworks/admin/img/thumbnail/cog-files/' . $cogProjectID . '/' . $img;
            }
            else if($userInfoOrgID == 2) // belongs to no organization
            {
                $ary['path'] = 'cogworks/developers/' . $userInfoID . '/img/thumbnail/cog-files/' . $cogProjectID . '/' . $img;
            }
            else
            {
                $ary['path'] = 'cogworks/organizations/' . $userInfoOrgID . '/img/thumbnail/cog-files/' . $cogProjectID . '/' . $img;
            }
        }
        else if($org == 2)
        {
            $ary['path'] = 'cogworks/developers/' . $userID . '/img/thumbnail/cog-files/' . $cogProjectID . '/' . $img;
        }
        else
        {
            $ary['path'] = 'cogworks/organizations/' . $orgID . '/img/thumbnail/cog-files/' . $cogProjectID . '/' . $img;
        }
    }
    return $ary;
}
function getCogImageThumbnailDirectory($projID, $orgID, $userID, $type)
{
    $path = '';
    $typePath = '';
    $projPath = '';
    if($orgID == 1)
    {
        $path = setCogworksDirectoryPath($orgID) . 'img/thumbnail/' . $type . '/' . $projID . '/';
        $typePath = setCogworksDirectoryPath($orgID) . 'img/thumbnail/' . $type;
        $projPath = setCogworksDirectoryPath($orgID) . 'img/thumbnail/' . $type . '/' . $projID;
    }
    else if($orgID == 2)
    {
        $path = setCogworksDirectoryPath($orgID) . $userID . '/img/thumbnail/' . $type . '/' . $projID . '/';
        $typePath = setCogworksDirectoryPath($orgID) . $userID . '/img/thumbnail/' . $type;
        $projPath = setCogworksDirectoryPath($orgID) . $userID . '/img/thumbnail/' . $type . '/' . $projID;
    }
    else
    {
        $path = setCogworksDirectoryPath($orgID) . $orgID . '/img/thumbnail/' . $type . '/' . $projID . '/';
        $typePath = setCogworksDirectoryPath($orgID) . $orgID . '/img/thumbnail/' . $type;
        $projPath = setCogworksDirectoryPath($orgID) . $orgID . '/img/thumbnail/' . $type . '/' . $projID;
    }
    generateDirectory($typePath);
    generateDirectory($projPath);
    // return json_encode($foobar) . '/' . $typePath . ' - ' . json_encode($foobar2) . '/'. $projPath . ' - ' . $path;
    return $path;
}
// reserve code just in-case it needed
function getCogImageDirectory($projID, $orgID, $userID, $folder)
{
    $path = '';
    $folderPath = '';
    $projPath = '';
    if($orgID == 1)
    {
        $path = setCogworksDirectoryPath($orgID) . 'img/' . $folder . '/' . $projID . '/';
        $folderPath = setCogworksDirectoryPath($orgID) . 'img/' . $folder;
        $projPath = setCogworksDirectoryPath($orgID) . 'img/' . $folder . '/' . $projID;
    }
    else if($orgID == 2)
    {
        $path = setCogworksDirectoryPath($orgID) . $userID . '/img/' . $folder . '/' . $projID . '/';
        $folderPath = setCogworksDirectoryPath($orgID) . $userID . 'img/' . $folder;
        $projPath = setCogworksDirectoryPath($orgID) . $userID . 'img/' . $folder . '/' . $projID;
    }
    else
    {
        $path = setCogworksDirectoryPath($orgID) . $orgID . '/img/' . $folder . '/' . $projID . '/';
        $folderPath = setCogworksDirectoryPath($orgID) . $orgID . 'img/' . $folder;
        $projPath = setCogworksDirectoryPath($orgID) . $orgID . 'img/' . $folder . '/' . $projID;
    }
    generateDirectory($folderPath);
    generateDirectory($projPath);

    return $path;
}
function getCogFileDirectory($projID, $orgID, $userID)
{
    $path = '';
    if($projID == 0)
    {
        if($orgID == 1)
        {
            $path = setCogworksDirectoryPath($orgID) . 'users/' . $userID . '/raw-files/';
        }
        else if($orgID == 2)
        {
            $path = setCogworksDirectoryPath($orgID) . $userID . '/raw-files/';
        }
        else
        {
            $path = setCogworksDirectoryPath($orgID) . $orgID . '/users/' . $userID . '/raw-files/';
        }
    }
    else
    {
        if($orgID == 1)
        {
            $path = setCogworksDirectoryPath($orgID) . 'projects/' . $projID . '/';
        }
        else if($orgID == 2)
        {
            $path = setCogworksDirectoryPath($orgID) . $userID . '/projects/' . $projID . '/';
        }
        else
        {
            $path = setCogworksDirectoryPath($orgID) . $orgID . '/projects/' . $projID . '/';
        }
    }
    return $path;
}
function setCogworksDirectoryPath($orgID)
{
    $path = '';
    switch($orgID)
    {
        case '1':
            $path = $_SERVER['DOCUMENT_ROOT'] . '/cogworks/admin/';
            break;
        case '2':
            $path = $_SERVER['DOCUMENT_ROOT'] . '/cogworks/developers/';
            break;
        default:
            $path = $_SERVER['DOCUMENT_ROOT'] . '/cogworks/organizations/';
    }
    return $path;
}
// reserve code
/* function generateNewDirectory($rootPath, $folder)
{
    $folderAry = explode('/', $folder);
    $path = $rootPath;
    foreach($folderAry as $item)
    {
        $path .= '/' . $item;
        // check first if the $item is not a forward slash for some reason
        if(strlen($item) > 0)
        {
            generateDirectory($path);
        }
    }
} */
function generateDirectory($path)
{
    // check first if the directory exists
    if(!is_dir($path))
    {
        mkdir($path, 0777);
        return false;
    }
    else
    {
        return true;
    }
}
function generateCogworksDefaultDirectories($path)
{
    generateDirectory($path . '/projects');
    generateDirectory($path . '/resources');
    generateDirectory($path . '/resources/audio');
    generateDirectory($path . '/resources/video');
    generateDirectory($path . '/resources/pdf');
    generateDirectory($path . '/resources/extra');
    generateDirectory($path . '/img');
    generateDirectory($path . '/img/thumbnail');
    generateDirectory($path . '/img/thumbnail/cog-files');
    generateDirectory($path . '/img/thumbnail/organizations');
    generateDirectory($path . '/img/thumbnail/pods');
    generateDirectory($path . '/img/thumbnail/profiles');
    generateDirectory($path . '/img/thumbnail/projects');
    generateDirectory($path . '/img/thumbnail/what-nots');
}
function generateCogworksUserDirectories($path)
{
    generateDirectory($path . '/preview');
    generateDirectory($path . '/raw-files');
    generateDirectory($path . '/tmp');
    generateCogworksDefaultDirectories($path);
}
function rrmdir($dir)
{
    if (is_dir($dir))
    {
        $objects = scandir($dir);
        foreach ($objects as $object)
        {
            if ($object != "." && $object != "..")
            {
                if (filetype($dir."/".$object) == "dir")
                {
                    rrmdir($dir."/".$object); 
                }
                else
                {
                    unlink($dir."/".$object);
                }
            }
        }
        reset($objects);
        rmdir($dir);
    }
}

?>