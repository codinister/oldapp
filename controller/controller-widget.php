<?php
class widget{

	//$this->code()
	private function code(){
		return getCode($_SESSION['edfghl']);
	}
	
	public function get_mini_report(){
		//Taxes
		$tax = DB::query("SELECT * FROM tax WHERE MONTH(createdAt) = MONTH(CURDATE()) AND YEAR(CURDATE()) = YEAR(createdAt) AND code = ?",array($this->code()));
		
		//Customers 
		$customers = DB::query("SELECT * FROM customers WHERE MONTH(createdAt) = MONTH(CURDATE()) AND YEAR(CURDATE()) = YEAR(createdAt) AND code = ?",array($this->code()));


		//Logins
		$logins = DB::query("SELECT * FROM history WHERE MONTH(createdAt) = MONTH(CURDATE()) AND YEAR(CURDATE()) = YEAR(createdAt) AND activity = 'Logged in'  AND code = ?",array($this->code()));

		$arr = array(
			'tax' => $tax,
			'customers' => $customers,
			'leads' => 0,
			'login' => $logins
		);

		echo json_encode($arr);
	}

	public function getusersonline() {
		$date = getCurrentDateTime();
		DB::query("UPDATE users SET login_date = ? WHERE user_id = ?",array(getCurrentDateTime(),$_SESSION['edfghl']));
		$qry = DB::query("SELECT * FROM users WHERE code = ?",array($this->code()));
		echo json_encode($qry);
	}

	public function gethistory(){
		$user_id = $_SESSION['edfghl'];

		if($_SESSION['roleid'] == 1){
			$qry = DB::query("SELECT h.*, u.firstname,u.lastname FROM history as h JOIN users as u ON u.user_id = h.user_id WHERE u.code = ? ORDER BY h.hist_id DESC",array($this->code()));
			echo json_encode($qry);
		}
		else{
			$qry = DB::query("SELECT h.*, u.firstname,u.lastname FROM history as h JOIN users as u ON u.user_id = h.user_id WHERE h.user_id =? AND u.code = ?  ORDER BY h.hist_id DESC LIMIT 200", array($user_id,$this->code()));
			echo json_encode($qry);
		}

	
	}

	public function get_max_user_id() {
		$max_id = DB::get_row("SELECT MAX(user_id) AS id FROM users");
		echo $max_id['id'];
	}

	public function get_sms_balance(){
		echo getSmsBalance($_SESSION['edfghl']);
	}

	public function send_sms(){
		$to = $_POST['contacts'];
		$msg = $_POST['message'];
		validation::empty_validation(
			array(
			'Message'=>$msg, 
			'Contact'=>$to
			)
		);
		echo sendSmsApi($to,$msg,$_SESSION['edfghl']);
	}

	public function send_pdf_email(){
		$to = $_POST['to'];
        $subject = $_POST['subject'];
        $body = $_POST['message'];

		echo sendEmail($to,$subject,$body);
	}

	public function get_duration_expiry_reminder(){
		$sett = DB::get_row('SELECT duration_reminder FROM settings WHERE code = ?',array($this->code()));

		if($sett){
			$duration_reminder = $sett['duration_reminder'];
			if($duration_reminder){
				$end_date = DB::query('SELECT t.profile,t.end_date,t.tax_id,t.user_id,c.fullname,c.phone,c.email FROM customers as c JOIN tax as t ON c.cust_id = t.cust_id WHERE t.code = ? AND t.end_date > DATE_ADD(NOW(), INTERVAL -'.$duration_reminder.' DAY)',array($this->code()));

				echo json_encode($end_date);
			}
			else{
				echo json_encode([]);
			}

		}
		else{
			echo json_encode([]);
		}
		
	}


	
}