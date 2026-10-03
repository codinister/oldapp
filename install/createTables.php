<?php

	function createTables($dbname,$dbuser,$dbpwd){ 
		try{
			$conn = new PDO("mysql:host=localhost;dbname=".$dbname.";charset=utf8mb4", $dbuser, $dbpwd);
			$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			$conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

			if($conn){
			$tb = tables($conn);
			$details = "<?php
			define('host','localhost');
			define('username','$dbuser');
			define('password','$dbpwd');
			define('dbname','$dbname');
			?>";
			file_put_contents(dirname(__DIR__).'/model/constants.php', $details);

			//INSERT MENU
			$conn->query("INSERT INTO menu(menu_id, menu_name,menu_parent) VALUES
			('1', 'Dashboard','null'),
			('2', 'Sell','null'),
			('3', 'Users','null'),
			('4', 'Products','null'),
			('5', 'SMS','null'),
			('6', 'Settings','null'),
			('7', 'Salesinvoice','none'),
			('8', 'Addrowsbutton','none'),
			('9', 'Unitprice','none'),
			('10', 'Invoicedesc','none'),
			('11', 'Assignto','none')
			");

			echo 'Installation completed';
			}
		}
		catch(PDOException $e){
			echo $e;
			exit;
		}
	}

?>