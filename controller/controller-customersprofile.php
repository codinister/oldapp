<?php

class customersprofile{

	private function response($qry){
		if($qry){
			echo json_encode($qry);
		}
		else{
			echo json_encode([]);
		}
	}

	public function getCustomers(){
		$qry = DB::query("SELECT c.*, u.firstname, u.lastname FROM customers as c JOIN users as u ON c.user_id = u.user_id WHERE c.code = ?", array(getCode($_SESSION['edfghl']))); 
		$this->response($qry);
	}

	public function getReceipts(){
		$qry = DB::query("SELECT p.*, t.cust_id,t.profile, t.total FROM payment_history AS p JOIN tax AS t ON p.tax_id = t.tax_id WHERE p.code = ?", array(getCode($_SESSION['edfghl']))); 
		$this->response($qry);
	}

	public function getInvoices(){
		$qry = DB::query("SELECT 
		t.*, 
		s.exp_date,
		t.createdAt as sales_date
		FROM tax as t JOIN sales as s ON t.tax_id = s.tax_id WHERE t.trans_type = 'invoice' AND t.code = ?", array(getCode($_SESSION['edfghl']))); 
		$this->response($qry);
	}

	public function getProformas(){
		$qry = DB::query("SELECT * FROM tax WHERE trans_type = 'proforma' AND code = ?", array(getCode($_SESSION['edfghl']))); 
		$this->response($qry);
	}



}





