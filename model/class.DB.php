<?php
class DB{
	private static $qry;
	public static $rowCount;
	public static $columnCount;
	public static $conn;
	/*
	* Database Connection class
	*/
	public static function conn(){

			require_once('constants.php');
			try{
				$dns = "mysql:host=".host.";dbname=".dbname.";charset=utf8mb4";
				$conn = new PDO($dns, username, password);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				//$conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
			}
			catch(PDOException $e){
				self::errorMessages($e->getMessage());
			}
			return $conn;
		
	}
	/*
	* Get all error messages
	*/
	private static function errorMessages($message, $sql = ""){
		$error = $message;
		if(!empty($sql)){
			$error .= "\r\n SQL ERROR:\r\n".$sql."\r\n";
		}
		self::writeError($error, md5('iloveprogramming'));
		echo $error;
		header('HTTP/1.1 500 Internal Server Error');
		header('Status: 500 Internal Server Error');
	}
	/*
	*Create and write error message into an error log file
	*/
	private static function writeError($error, $filesalt){
		$date = new DateTime();
		$path = dirname(__DIR__).'/assets/logs';
		$file = $path.'/'.$date->format('d-M-Y').md5($date->format('d-M-Y').$filesalt).'.text';
		$content = "\r\nDate: ".$date->format('d M Y')."\r\nTime: ".$date->format('H:i:s')."\r\n".$error."\r\n";
		if(is_dir($path)){
			if(!file_exists($file)){
				$fo = fopen($file, 'a+');
				fwrite($file, $content);
				fclose($fo);
			}
			else{
				$message = $content.file_get_contents($file);
				file_put_contents($file, $message);
			}
		}
		else{
			if(mkdir($path, 0777) === true){
					if(file_exists($file)){
						$fo = fopen($file, 'a+');
						fwrite($file, $content);
						fclose($fo);
					}
					else{
						$message = $content.file_get_contents($file);
						file_put_contents($file, $message);
					}	
			}
		}
	} 
	/*
	* PDO Prepare statement class
	*/
	private static function prepare($sql, $param=" "){
		$arr = $param;
		self::$conn = self::conn();
		try{
		self::$qry = self::$conn->prepare($sql);
		if(!empty($arr)){
			if(is_array($arr)){
			if(array_key_exists(0, $arr)){
				array_unshift($arr, "");
				unset($arr[0]);
				$status = true;
			}
			else{
				$status = false;
			}
			foreach($arr as $k => $v){
				self::$qry->bindValue($status ? intval($k) :':'.$k, $arr[$k] );
			}
			}
		}
		self::$qry->execute();
		}
		catch(PDOException $e){
			self::errorMessages($e->getMessage(), $sql);
		}
	}
	/*
	* query function to perform all SQL functions including
	*insert, delte, update, select, show
	*/
	public static function query($sql, $param = null ){
		$sq = trim($sql);
		$exp = explode(" ", $sq);
		$sqls = strtolower($exp[0]);
		self::prepare($sq, $param);
		if($sqls == 'select' OR $sqls == 'show'){
			return self::$qry->fetchAll(PDO::FETCH_ASSOC);
			self::$qry->closeCursor();
		}
		elseif($sqls === 'insert' OR $sqls === 'delete' OR $sqls === 'update'){
			self::$rowCount = self::$qry->rowCount();
			self::$qry->closeCursor();
		}
		else{
			return NULL;
		}
	}
	/*
	* get single sql table row
	*/
	public static function get_row($sql, $param = null){
			self::prepare($sql, $param);
			$result = self::$qry->fetch(PDO::FETCH_ASSOC);
			self::$columnCount = self::$qry->columnCount();		
			return $result;
			self::$qry->closeCursor();

	}
	/*
	* get a single column
	*/
	public static function get_col($sql, $param = null){
		self::prepare($sql, $param);
		return self::$qry->fetchColumn();
		self::$qry->closeCursor();		
	}
	/*
	* get columns
	*/
	public static function get_cols($sql, $param = null){
		self::prepare($sql, $param);
		return self::$qry->fetchAll(PDO::FETCH_COLUMN);
		self::$rowCount = self::$qry->rowCount();
		self::$columnCount = self::$qry->columnCount();		
		self::$qry->closeCursor();
	}
	//Close database connection
	public static function closeConnection(){
		$conn = self::$conn;
		$conn = null;
	}
	//get last row inserted id 
	public static function lastInsertId(){
		return self::$conn->lastInsertId();
	}
	public static function beginTransaction(){
	     $conn = self::conn();
	     return $conn->beginTransaction();
	}
	public static function commit(){
		$conn = self::conn();
	   return  $conn->commit();
	}
	public static function rollback(){
		$conn = self::conn();
		return $conn->rollback();
	}
}