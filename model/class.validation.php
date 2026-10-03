<?php
class Validation{
	/*-------------------------------------------------------------------------
	validation::empty_validation(
	array(
	'Name'=>$name, 
	'Age'=>$age, 
	'City'=>$city
	)
	);
	validation::string_validation(
	array(
	'Name'=>$name, 
	'Age'=>$age, 
	'City'=>$city
	)
	);
	validation::numbers_validation(
	array(
	'Number'=>$number
	)
	);
	validation::phone_validation(
	array(
	'Phone no.'=>$phone
	)
	);
	validation::email_validation($email); 
	validation::phone_validation(array('Phone'=>$phone));
	validation::password_validation($password); 
	validation::date_validation($date, $err_message);
	validation::password_compare($password,$repassword)
	validation::website_validation($url); 
	validation::password_lenght($password);
	$message = validation::textboxcleaner($_POST['message']);

	------------------------------------------------------------------*/


	public static function textboxcleaner($data){
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}

	public static function ctypeDigit($arr, $mess){
		if(is_array($arr)){
			$im = implode('', $arr);
			$res = preg_replace("/\s/", "", $im);
			if(strlen($res) > 0){
				if(ctype_digit($res) < 1){
					template::output(false, $mess);
				}
			}
		}
	}

	public static function ctypeAlnum($arr, $mess){
		if(is_array($arr)){
			$im = implode('', $arr);
			$res = preg_replace("/\s/", "", $im);
			if(strlen($res) > 0){
				if(ctype_alnum($res) < 1){
					template::output(false, $mess);
				}
			}
	    }
	}

	public static function emptyArray($arr, $mess){
		if(in_array('', $arr, true) > 0){
			template::output(false, $mess);
		}
	}


	public static function empty_validation($var = array()){
		if(is_array($var)){
			foreach($var as $k=>$v){
				if(empty($v)){
					?>
					<span style='font-size:0;'>errors</span>
					<?php 
					echo $k, ' Field Required!'; 
					exit;
				}
			}
		}	
	}


	public static function string_validation($var=array()){	
			if(is_array($var)){
				foreach($var as $k=>$v){
					 if(!is_string($v)){ ?>
					<span style='font-size:0;'>errors</span>
					Avoid special characters in <?php echo $k; ?> field!
					<?php 
					exit; 
					} 	
				}
			}
	}
	
	public static function numbers_validation($var=array()){	
			if(is_array($var)){
				foreach($var as $k=>$v){
					 if(filter_var($v, FILTER_VALIDATE_INT) === false){
						 ?>
					<span style='font-size:0;'>errors</span>
					Only numbers required in <?php echo $k;?> field!
					<?php 
					exit;
					} 
				}
			}
	}
	public static function phone_validation($var=array()){	
			if(is_array($var)){
				foreach($var as $k=>$v){
					if(preg_match("/[^0-9\s.\()+-]/", $v)){
					?>
		
					<span style='font-size:0;'>errors</span>
					Avoid <?php echo preg_replace("/[0-9\s.\()+-]/", " ", $v); ?> in <?php echo $k;?> field!;
			
					<?php 
					exit;
					} ?>
					<?php
				}
				if(strlen($v)<10){
					?>
						<span style='font-size:0;'>errors</span>
					<?php echo $k; ?> should be within 10-20 digits long!
					<?php	
					exit;					
				}
			}
	}
	public static function email_validation($email){	
		if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
			?>
			<span style='font-size:0;'>errors</span>
			<?php echo $email, ' is not a valid email'; ?>
			<?php
			exit;	
		}	
	}	
	

	public static function password_lenght($password){
		if(strlen($password)<6){
			?>
			<span style='font-size:0;'>errors</span>
			Password should be atleast 6 digits
			<?php		
			exit;
		}
	}

	public static function password_compare($password,$repassword){
		if($password != $repassword ){
			?>
			<span style='font-size:0;'>errors</span>
			Password do not match!
			<?php		
			exit;
		}
	}

	public static function password_validation($password){	
		if(preg_match("/[^A-Za-z0-9@_#,%&\/\^\$-*+?]+/", $password)){
			?>
			<span style='font-size:0;'>errors</span>
			Avoid <?php echo preg_replace("/[A-Za-z0-9@_#,%&\/\^\$-*+?]+/", " ", $password); ?> in password field!
			<?php
			exit;
		}
		elseif(strlen($password)<6){
			?>
			<span style='font-size:0;'>errors</span>
			Password should be atleast 6 digits
			<?php		
			exit;
		} 
	}
	public static function website_validation($url){	
		if (filter_var($url, FILTER_VALIDATE_URL) === false) {
		?>
		<span style='font-size:0;'>errors</span>
		<?php echo $url,' is not a valid URL'; 
		exit;	
		}
	}	
	public static function only_string_validation($var=array()){	
		if(is_array($var)){
			foreach($var as $k=>$v){
				if(preg_match("/[^a-zA-Z\s-]/", $v)){ ?>
				<span style='font-size:0;'>errors</span>
				Avoid numbers & special characters in <?php echo $k; ?> field!
				<?php 
				exit; 
				} 	
			}
		}
	}
	
	public static function has_specchar($x,$excludes=array()){
		if (is_array($excludes)&&!empty($excludes)) {
			foreach ($excludes as $exclude) {
				$x=str_replace($exclude,'',$x);        
			}    
		}    
		if (preg_match('/[^a-z0-9 ]+/i',$x)) {
			return true;        
		}
		return false;
	}
	public static function special_validation($var=array()){
		/*----------------- validation::special_validation($var=array()); --------------*/		
				if(is_array($var)){
					$excludes = array("+","-",".","_","-","(",",","&",")","'");
					foreach($var as $k=>$v){
					if(self::has_specchar($v,$excludes)){
						?>
						<span style='font-size:0;'>errors</span>
						Avoid special characters in <?php echo $k;?> field!
						<?php 
						exit;
						} 	
					}
				}	
		}
	//validation::date_validation($date, $err_message);
	public static function date_validation($date, $err_message){
		$d = date("Y-m-d", strtotime($date));
		$dd = date("Y", strtotime($date));
		if( ($d == '1970-01-01') OR ($dd == '1970')){
			echo "<span style='font-size:0;'>errors</span>";	
			echo $err_message; 
			exit;		
		}
	}

	public static function file_type_validation($type){
			switch($type){
				case 'image/jpeg':
				case 'image/jpg':
				break;
				default :
					?>
					<span style='font-size:0;'>errors</span>
					Only JPG files are allowed!
					<?php 
					exit;
			}
	}	

	public static function file_size_validation($size){
			if($size > 10000000){
				?>
					<span style='font-size:0;'>errors</span>
					File size is too large!
					<?php 
					exit;
			}
	}
}	

?>