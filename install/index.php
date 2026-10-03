<?php

	ini_set("display_errors", 1);
	include('tables.php');
	include('createTables.php');

	$dbname = "app";
	$dbuser = "app";
	$dbpwd = "app2023";

	createTables($dbname,$dbuser,$dbpwd);

?>