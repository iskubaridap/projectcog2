<?php

function test()
{
    echo 'hello world!';
}
function getCogFileDirectory($projID, $orgID, $userID)
{
    $basePath = '';
    if($projID == 0)
    {
        if($orgID == 1)
        {
            $basePath = setCogworksDirectoryPath($orgID) . 'users/' . $userID . '/raw-files/';
        }
        else if($orgID == 2)
        {
            $basePath = setCogworksDirectoryPath($orgID) . $userID . '/raw-files/';
        }
        else
        {
            $basePath = setCogworksDirectoryPath($orgID) . $orgID . '/users/' . $userID . '/raw-files/';
        }
    }
    else
    {
        if($orgID == 1)
        {
            $basePath = setCogworksDirectoryPath($orgID) . 'projects/' . $projID . '/';
        }
        else if($orgID == 2)
        {
            $basePath = setCogworksDirectoryPath($orgID) . $userID . '/projects/' . $projID . '/';
        }
        else
        {
            $basePath = setCogworksDirectoryPath($orgID) . $orgID . '/projects/' . $projID . '/';
        }
    }
    return $basePath;
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