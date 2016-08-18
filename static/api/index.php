<?php

//Audio File information library
require_once('getid3/getid3.php');

// http://stackoverflow.com/questions/834303/startswith-and-endswith-functions-in-php
function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
    return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== false);
}

// Adaptation of http://stackoverflow.com/questions/4987551/parse-directory-structure-strings-to-json-using-php
function getAudioFileDuration($path) {
    $getID3 = new getID3;
    $mixinfo = $getID3->analyze($path);
    $play_time = $mixinfo['playtime_string'];    
    list($mins , $secs) = explode(':' , $play_time);
    $secs = $mins * 60 + $secs;    
    return $secs;
}

function ReadFolderDirectory($dir,$listDir= array())
{
    $listDir = array();
    if($handler = opendir($dir))
    {
        while (($sub = readdir($handler)) !== FALSE)
        {
            if (
                $sub != "." &&
                $sub != ".." &&
                $sub != "Thumb.db" &&
                $sub != ".htaccess" &&
                $sub != '.DS_Store') {
                if(is_file($dir."/".$sub))
                {
                    $file = (object) [
                        'type' => 'file',
                        'name' => $sub,
                    ];
                    if (endsWith($sub, '.m4a')) {
                        $file->duration = getAudioFileDuration($dir."/".$sub);
                    }
                    $listDir[] = $file;
                } elseif(is_dir($dir."/".$sub)) {
                    $directory = (object) [
                        'type' => 'directory',
                        'name' => $sub,
                    ];
                    $directory->content = ReadFolderDirectory($dir."/".$sub);;
                    $listDir[] = $directory;
                }
            }
        }
        closedir($handler);
    }
    return $listDir;
}

$config = json_decode(file_get_contents('./config.json'));
$config->assets = ReadFolderDirectory("../assets");

echo json_encode($config);
