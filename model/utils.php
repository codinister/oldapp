<?php 
date_default_timezone_set('Africa/Accra');

	require_once 'class.DB.php';
	require_once 'class.validation.php';
	ini_set('memory_limit','10000M');

	function getCode($user_id){
	    $qry = DB::get_row('SELECT code FROM users WHERE user_id = ?',array($user_id));
		if($qry){
			return $qry['code'];
		}
		else{
			return 'No code found';
		}
	}




	function getSuperadmin($user_id){
	    $qry = DB::get_row('SELECT user_id FROM users WHERE role_id = "111" AND code = ? ',array(getCode($user_id)));
		if($qry){
			return $qry['user_id'];
		}
		else{
			return 'No id found';
		}
	}

	function getCurrency($user_id){
		$qry = DB::get_row('SELECT currency FROM settings WHERE code = ?',array(getCode($user_id)));
		if($qry){
			return $qry['currency'];
		}
		else{
			return 'GHs';
		}
	}

	function getIndustry($user_id){
		$qry = DB::get_row('SELECT industry FROM settings WHERE code = ?', array(getCode($user_id)));
		if($qry){
			if($qry['industry']){
				return $qry['industry'];
			}
		}
	}

	function getCurrentDateTime(){
		$hr = 60 * 60;
		$t = time() + $hr;
		return date('Y-m-d H:i:s', $t);
	}




	function history(
		$user_id,
		$link='',
		$activity='Logged in'
		){
		    $date = getCurrentDateTime();
		
			$inst = DB::query("INSERT INTO history(	
				activity,	
				link,	
				user_id,
				createdAt,
				code
			) VALUES(?,?,?,?,?)",array(
				$activity,$link,$user_id,getCurrentDateTime(),getCode($user_id)
			));

	}

	function insertPlaceholders( $arr, $max_number ) {
		$genPlaceholders = array_fill(0,$max_number,'?');
		$commaSeperatePlaceholders = '('.implode(',', $genPlaceholders).')';
		$count = count($arr) / $max_number;
		$newArr = [];
		for($i = 0; $i < $count; $i++) {
			$newArr[] = $commaSeperatePlaceholders;
		}
		return implode(',', $newArr);
	}

	function output( $message ){
		echo "<span style='font-size:0;'>errors</span>";
		echo $message; 
		exit;
	}

	function file_upload($tmp_name, $type){

		$path = dirname(__DIR__).'/assets/uploads';
		$fext = explode('/', $type);
		$ext = $fext[1];
		$fname = mt_rand(100, 999);
		$picname = 'img'.$fname.'.'.$ext;
		$filepath = $path.'/'.$picname;
				
		move_uploaded_file($tmp_name, $filepath);
				
		return $picname;

	}


	function flatten(array $array) {
		$return = array();
		array_walk_recursive($array, function($a) use (&$return) { $return[] = $a; });
		return $return;
	}
	

	function inv_num($tax_id, $user_id){
		$comp = DB::get_row("SELECT comp_name FROM settings WHERE code = ?", array(getCode($user_id)));
		if($comp){
			$get_max_tax_id = 1000000 + $tax_id;
			$get_first_number = substr($get_max_tax_id,0,1);
			$calc = $get_first_number - 1; 
			$get_remaining_numbers = substr($get_max_tax_id,1);
			$output = $calc.$get_remaining_numbers;
			return substr($comp['comp_name'],0,3).'-'.$output;
		}
		else{
			return '00000000';
		}
	}


	
	function sendSmsApi($to,$msg, $user_id){
		//prepare your url   "https://apps.mnotify.net/smsapi?"
		$sett = DB::get_row("SELECT sms_api_key,sms_sender_id,sms_api_url FROM settings WHERE code = ?",array(getCode($user_id)));

		if($sett){
			$key = $sett['sms_api_key'];
			$sender_id = $sett['sms_sender_id'];
			$api_url = $sett['sms_api_url'];

			$msg = urlencode($msg);
			$url =  $api_url.
			"?key=$key".
			"&to=$to".
			"&msg=$msg".
			"&sender_id=$sender_id";	
			$response  = @file_get_contents($url);
			return $response;
		}
	}






	function smsWarnings($msg,$user_id){
		//Get settings 
		$sett = DB::get_row("SELECT activate_receipt_sms,sms_cc FROM settings WHERE code = ?",array(getCode($user_id)));
		$sms_cc = $sett['sms_cc']? $sett['sms_cc'].',' : '';
		$to = $sms_cc;
		sendSmsApi($to,$msg,$user_id);
	}

	function getFullname($user_id){
		$qry = DB::get_row("SELECT firstname,lastname FROM users WHERE user_id =? AND code = ?",array($user_id,getCode($user_id)));
		return $qry['firstname'].' '.$qry['lastname'];
	}

	function getSmsBalance($user_id){
		$sett = DB::get_row("SELECT sms_api_key,sms_sender_id,sms_api_url FROM settings WHERE code =?",array(getCode($user_id)));
		if($sett){
			$key = $sett['sms_api_key'];
			$api_url = $sett['sms_api_url'];
			$url =  $api_url."/balance?key=$key";
			if($url){
				return @file_get_contents($url);
			}
			else{
				return 0;
			}
		}

	}


	function database_backup_script($user_id){
		require_once 'constants.php';
		
		$fname = 'backup-'.date('d-m-Y-H-i-s').".sql";
		$toDay = 'assets/uploads/'.$fname;

		$domain = $_SERVER['HTTP_HOST'];
		$dbhost = host;
		$dbuser = username;
		$dbpass = password;
		$dbname = dbname;

		//Settings
		$setting = DB::get_row('SELECT comp_name FROM settings WHERE code = ?',array(getCode($user_id)));

		$email = 'emmanuelagyemang3@gmail.com';
		$subject = trim($setting['comp_name']).' Database Backup';
		$message = "This is an auto backup of ".trim($setting['comp_name'])." database";

		if($domain == 'localhost'){
			exec("C://xampp/mysql/bin/mysqldump --opt --host=$dbhost --user=$dbuser --password=$dbpass $dbname > ".$toDay);
		}
		else{
			exec("mysqldump --user=$dbuser --password='$dbpass' --host=$dbhost $dbname > ".$toDay);
			sendFileEmail($email,$subject,$message,$toDay);
		}
		
	}

	function clear_history(){
		DB::query("DELETE FROM history WHERE createdAt < DATE_ADD(CURDATE(), INTERVAL -2 MONTH)");

		$pth = 'assets/uploads/database-backup.txt';

		if(is_file($pth)){
			$date = file_get_contents($pth);
			if(trim($date) <= date('Y-m-d', strtotime('-3 DAY')) ){
				database_backup_script();
				$new_date = date('Y-m-d');
				file_put_contents($pth, $new_date);
			}
		}
		else{
			$date = date('Y-m-d');
			file_put_contents($pth, $date);
		} 
	}

	function low_stocks_qty($code){
		//The product quantity level at which a stock alert be sent
		$low_stocks_qty = DB::get_row('SELECT low_stocks_qty  FROM settings WHERE code = ?',array($code));
		if($low_stocks_qty['low_stocks_qty']){
			return $low_stocks_qty['low_stocks_qty'];
		}
		else{
			return 10;
		}
	}
	
	function low_stocks_reminder_days($code){
		$low_stocks_reminder_days = DB::get_row('SELECT low_stocks_reminder_days FROM settings WHERE code = ?',array($code));
		if($low_stocks_reminder_days){
			if($low_stocks_reminder_days['low_stocks_reminder_days']){
				return $low_stocks_reminder_days['low_stocks_reminder_days'];
			}
			else{
				return 3;
			}
		}
		else{
			return 3;
		}
	}

	
	function low_stocks_date($low_stocks_reminder_days,$code){
		if($low_stocks_reminder_days AND $code){
			$low_stocks_date  = DB::get_row('SELECT low_stocks_date  FROM settings WHERE low_stocks_date  <= DATE_ADD(NOW(), INTERVAL -'.$low_stocks_reminder_days.' DAY) AND code = ?',array($code));
			if($low_stocks_date['low_stocks_date']){
				return $low_stocks_date['low_stocks_date'];
			}
			else{
				return false;
			}
		}
		else{
			return false;
		}
	}


	function getUserLimit($user_id){
		$sett = DB::get_row("SELECT users FROM settings WHERE code = ?",array(getCode($user_id))); 
		$user = DB::query("SELECT * FROM users WHERE code =?",array(getCode($user_id))); 
		$cnt = $sett['users']  - COUNT($user); 
		if($cnt <= 0 ){ 
			output('You have reached your user registration limit!');
				exit;
		}
	}

	function lowStocksProducts($code){

		$low_stocks_qty = low_stocks_qty($code);

		$products = DB::query("
			SELECT 
			IFNULL( SUM(p.prod_qty) - SUM(s.qty), p.prod_qty) as productremaining,
			p.prod_name 
			FROM 
			(
				SELECT 
				pr.prod_name,
				SUM(pq.prod_qty) AS prod_qty, 
				pr.code,
				pr.prod_id
				FROM 
				product_qty as pq JOIN
				products AS pr ON pq.prod_id = pr.prod_id  
				GROUP BY pq.prod_id
			) as p

			LEFT JOIN

			(
				SELECT 
				sl.code,
				SUM(sl.qty) AS qty,
				sl.prod_id
				FROM
				tax as t 
				JOIN 
				sales as sl 
				ON t.tax_id = sl.tax_id 
				WHERE t.trans_type = 'invoice'   GROUP BY sl.prod_id
			) AS s
			ON s.prod_id = p.prod_id

			WHERE p.code = ? 

			GROUP BY p.prod_id,s.prod_id

		",array($code));

		$arr ="LOW STOCKS ALERT\n\n";
		foreach($products as $v){
			if($v['productremaining'] <= $low_stocks_qty){
				$arr .= $v['prod_name']."(".$v['productremaining'].")\n\n";
			}
		}
		return $arr;
	}

	function encryption($plaintext){ 
		// encryption key (must be 256 bits)
		$key = "01234567890123456789012345678901";

		// initialization vector (IV) (must be 16 bytes)
		$iv = random_bytes(16);

		// encrypt the plaintext using AES-256-CBC
		$ciphertext = openssl_encrypt($plaintext, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);

		// base64-encode the encrypted ciphertext and IV for storage
		$encrypted = base64_encode($ciphertext . ':' . $iv);

		return $encrypted;
	}


	/*==============================
	BEGIN OF ADD SALES
	==============================*/ 



	//Change calculator 
	function getChange($payment,$total){
		$change = $payment - $total; 
		if($change > 0){
			return $change;
		}
		else{
			return 0;
		}
	}
	


	function loginValidation($username){
		//if(!file_exists(dirname(dirname(dirname(__DIR__))).'/gzr.txt')) exit;
		$qry = DB::get_row("SELECT s.app_status, s.app_expiry_date, u.* FROM users as u JOIN settings as s ON u.code = s.code WHERE u.username = ? AND s.app_status = 'active' AND u.status = 'Unblock' AND s.app_expiry_date  > NOW() ",array($username));
		return $qry;
	}



	function getCustomerFullname($cust_id){
		$cust = DB::get_row("SELECT fullname FROM customers WHERE cust_id = ?",array($cust_id));
		if($cust){
			if($cust['fullname']){
				return $cust['fullname'];
			}
			else{
				return '';
			}
		}
		else{
			return '';
		}
	}


	function getPayment($pay_id){
		$qry = DB::query("SELECT payment  FROM payment_history WHERE pay_id = ?",array($pay_id));
		if($qry){
			return $qry[0]['payment'];
		}
		else{
			return 0;
		}
	}

	function sumPayments($tax_id){
		$qry = DB::query("SELECT IFNULL(SUM(payment),0) AS payment  FROM payment_history WHERE tax_id = ?",array($tax_id));
		if($qry){
			return $qry[0]['payment'];
		}
		else{
			return 0;
		}
	}

	function getAllPayments($tax_id){
		$qry = DB::query("SELECT IFNULL(SUM(payment),0) AS payments FROM payment_history WHERE tax_id = ?",array($tax_id));
		if($qry){
			return $qry[0]['payments'];
		}
		else{
			return 0;
		}
	}

	function getBalance($tax_id){
		$slct = DB::get_row("SELECT total FROM tax WHERE tax_id = ?",array($tax_id));
		if($slct){
			if($slct['total']){
				$balance = $slct['total'] - getAllPayments($tax_id);
				return $balance;
			}
			else{
				return 0;
			}
		}
		else{
			return 0;
		}
	}
	/*==============================
	END OF ADD SALES
	==============================*/ 

	function getSignature($signatures,$fullname,$width="80",$height="30", $actions=''){
	
		$signature = $signatures ? '<img src="../uploads/'.$signatures.'" width="'.$width.'" height="'.$height.'" alt="" />' : $fullname;

		return $signature;
	}






	function getLogo($comp_logo,$width="100",$height="80", $actions=''){
		if($actions === 'main'){
			$logo = '<img style="margin-top: 33px;" src="../uploads/'.$comp_logo.'" alt="logo" width="'.$width.'" height="'.$height.'" />';
		}
		else{
			$logo = '<img style="margin-top: 33px;" src="../assets/uploads/'.$comp_logo.'" alt="logo" width="'.$width.'" height="'.$height.'" />';
		}
		return $logo;
	}


function saveTransaction($tax,$sales){

extract($tax); 

	DB::query("INSERT INTO tax (
		tax_id,
		vat,
		nhil,
		getfund,
		subtotal, 
		discount,
		total,
		profile,
		transportation,
		installation,
		location,
		trans_type,
		createdAt,
		end_date,
		cust_id,
		user_id,
		prepared_by,
		note,
		code,
		withholdingtax, 
		addbank,
		vat_rate, 
		nhil_rate, 
		getfund_rate,
		withholdingtax_rate, 
		uuid
	)
	VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) 
	ON DUPLICATE KEY UPDATE 
	vat	= VALUES(vat),
	nhil = VALUES(nhil),
	getfund	= VALUES(getfund),
	subtotal = VALUES(subtotal),
	discount = VALUES(discount),
	total = VALUES(total),
	profile = VALUES(profile),
	transportation = VALUES(transportation),
	installation = VALUES(installation),
	location = VALUES(location),
	trans_type = VALUES(trans_type),
	createdAt = VALUES(createdAt),
	end_date = VALUES(end_date),
	cust_id = VALUES(cust_id),
	user_id = VALUES(user_id),
	prepared_by = VALUES(prepared_by),
	note = VALUES(note),
	code = VALUES(code),
	withholdingtax = VALUES(withholdingtax),
	addbank = VALUES(addbank),
	vat_rate = VALUES(vat_rate),
	nhil_rate = VALUES(nhil_rate),
	getfund_rate = VALUES(getfund_rate),
	withholdingtax_rate = VALUES(withholdingtax_rate), 
	uuid = VALUES(uuid)
	", array(
		$tax_id,
		$vat,
		$nhil,
		$getfund,
		$sub_total, 
		$discount,
		$total,
		$profile,
		$transportation,
		$installation,
		$location,
		$trans_type,
		date('Y-m-d H:i:s', strtotime($invoice_date)),
		date('Y-m-d H:i:s', strtotime($exp_date)),
		$cust_id,
		$user_id,
		$prepared_by,
		$note,
		$code,
		$withholdingtax, 
		$addbank,
		$vat_rate, 
		$nhil_rate, 
		$getfund_rate,
		$withholdingtax_rate, 
		$uuid
	));

	$qry = DB::get_row("SELECT tax_id FROM tax WHERE uuid = ?",array($uuid)); 
	if($qry){

		$tax_id = $qry['tax_id'];

		//INSERT INTO SALES 
		$af = array_fill(1,9,'?');
		$af[9] =  $tax_id;
		$placeholders = "(".implode(",",$af).",".date('Y-m-d', strtotime($invoice_date)).")";

		$div = COUNT($sales) / 8;

		$arr = [];
		
		for($i = 0; $i < $div; $i++){
			$arr[$i] = $placeholders;
		}
		
		$values = implode(',', $arr);

		DB::query("INSERT INTO sales(
			s_id,
			qty,
			prod_id,
			prod_name,
			duration,
			unit_price,
			total,
			code,
			tax_id,
			createdAt
		)  VALUES ".$values." 
			ON DUPLICATE KEY UPDATE 
			prod_id = VALUES(prod_id),
			prod_name = VALUES(prod_name),
			unit_price = VALUES(unit_price),
			duration = VALUES(duration),
			qty = VALUES(qty),
			total = VALUES(total),
			createdAt = VALUES(createdAt),
			tax_id = VALUES(tax_id)
		", $sales);
		return $tax_id;
	}
	return '';
}
	

function sendReceiptSms($user_id,$cust_id,$pay_id,$tax_id){

	//Get settings 
	$sett = DB::get_row("SELECT comp_name,activate_receipt_sms,sms_cc FROM settings WHERE code = ?",array(getCode($user_id)));

	if($sett['activate_receipt_sms']){

		//Get customers 
		$cust = DB::get_row("SELECT c.fullname,c.phone, u.firstname FROM customers as c JOIN users as u ON c.user_id = u.user_id WHERE c.cust_id = ?",array($cust_id));

		if($cust){
			$sender = $cust['firstname']; 
			$cust_name = $cust['fullname']; 
			$phone = $cust['phone']; 
			$comp_name = $sett['comp_name'];
			
			$url = 'https://www.kwik2pos.com';
			$mobile = implode('', explode(' ',$phone));
			
			if(!empty($pay_id)){
				$receipt_encoded = base64_encode($pay_id);
				$msg = <<<SMS
				Hi! $cust_name this is $sender from $comp_name please click on the link below to view your receipt.
		
				$url/assets/pdf/receipt.php?rec=$receipt_encoded
				SMS;
			}
			else{
				$inv_encoded = base64_encode($tax_id);
				$msg = <<<SMS
				Hi! $cust_name this is $sender from $comp_name please click on the link below to view your invoice.
				
				$url/assets/pdf/invoice.php?inv=$inv_encoded
				SMS;
			}

			//Message to be sent 
			$to = '';
			if(!empty($pay_id)){
				if($sett['sms_cc'] AND $cust['phone']){
					$to = $sett['sms_cc'].','.$cust['phone'];
				}
				elseif($sett['sms_cc']){
					$to = $sett['sms_cc'];
				}
				elseif($cust['phone']){
					$to = $cust['phone'];
				}
			}
			elseif($cust['phone']){
				$to = $cust['phone'];
			}

			sendSmsApi($to,$msg,$user_id);
		}

	}
}


function  savePayment($tax_id, $payment, $cust_id){
	if($payment[1] > 0){ 
		DB::query("INSERT INTO payment_history(
			pay_type,
			payment,	
			createdAt,
			user_id,
			bank_acc_number,
			code,
			tax_id
		) VALUES(?,?,?,?,?,?,$tax_id) ",$payment);

		DB::query("UPDATE tax SET prepared_by = ? WHERE tax_id = ?",array($_SESSION['edfghl'], $tax_id));

		$qry = DB::get_row("SELECT user_id, MAX(pay_id) AS pay_id FROM payment_history "); 
		if($qry){
			$pay_id = $qry['pay_id']; 
			$user_id = $qry['user_id']; 
		}

		return $pay_id;
	}
	else {
		return '';
	}

}

function feedback($user_id,$cust_id,$pay_id,$tax_id){
	echo $user_id.'-'.$cust_id.'-'.$pay_id.'-'.$tax_id;
}

function getPreviousPayment($pay_id,$tax_id,$user_id){
	$payment = DB::query("SELECT IFNULL(SUM(payment),0) AS payments FROM payment_history WHERE pay_id <= ? AND tax_id =? AND code = ?",array($pay_id,$tax_id,getCode($user_id)));
	if($payment){
		return $payment[0]['payments'];
	}
	else{
		return 0;
	}
}


function serverPreparedby($user_id){
	if(!empty($user_id)){
		$uss = DB::get_row("SELECT signature,firstname,lastname FROM users WHERE user_id = ?",array($user_id));
		if($uss){
			return array(
				'fullname' => $uss['firstname'].' '.$uss['lastname'], 
				'signature' => $uss['signature']
			);
		}
		else{
			return array(
				'fullname' => false, 
				'signature' => false
			);
		}
	}
	else{
		return array(
			'fullname' => false, 
			'signature' => false
		);
	}
}


	//NOT IN USE
	// function getReceiptType($user_id){
	// 	$qry = DB::get_row("SELECT receipt_type FROM settings WHERE code = ?", array(getCode($user_id)));
	// 	if($qry){
	// 		return $qry['receipt_type'];
	// 	}
	// }

	//NOT IN USE
	// function rec_num($user_id){
	// 	$qry = DB::get_row("SELECT MAX(pay_id) as maxid FROM payment_history WHERE code =?",array(getCode($user_id)));
	// 	if($qry['maxid']){
	// 		$addmaxid = 1000000 + $qry['maxid'];
	// 		$zero = substr($addmaxid,0,1);
	// 		$one = substr($addmaxid,1);
	// 		$calc = $zero - 1;
	// 		$output = $calc.$one;
	// 		return $output;
	// 	}
	// 	else{
	// 		return '000001';
	// 	}
	// }


	//NOT IN USE
	// function getMaxTaxID($user_id){
	// 	$qry = DB::get_row("SELECT MAX(tax_id) AS tax_id FROM tax WHERE code =?",array(getCode($user_id)));
	// 	if($qry){
	// 		if($qry['tax_id']){
	// 			return floatval($qry['tax_id']);
	// 		}
	// 		else{
	// 			return 0;
	// 		}
	// 	}
	// 	else{
	// 		return '';
	// 	}
	// }


	//NOT IN USE
	// function getMaxPaymentID($user_id){
	// 	$payid = DB::get_row("SELECT MAX(pay_id) AS pay_id FROM payment_history WHERE code =?",array(getCode($user_id)));
	// 	if($payid){
	// 		if($payid['pay_id']){
	// 			return floatval($payid['pay_id']);
	// 		}
	// 		else{
	// 			return 0;
	// 		}
	// 	}
	// 	else{
	// 		return '';
	// 	}
	// }







