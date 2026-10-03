<?php session_start();

date_default_timezone_set('Africa/Accra');
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once dirname(__FILE__).'/model/utils.php';


if(isset($_GET['controller']) AND isset($_GET['task'])) {
    $task = $_GET['task'];
    $controller = $_GET['controller'];
}
else{
    $task = $_POST['task'];
    $controller = $_POST['controller'];
}

include 'controller/controller-'.$controller.'.php';
$obj = new $controller;
$obj->{$task}();


