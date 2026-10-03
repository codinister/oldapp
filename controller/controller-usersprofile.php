<?php
class usersprofile{

	private function response($qry){
		if($qry){
			echo json_encode($qry);
		}
		else{
			echo json_encode([]);
		}
	}

	public function userDetails(){
		$qry = DB::query("SELECT * FROM users WHERE code = ?",array(getCode($_SESSION['edfghl'])));
		$this->response($qry);
	}

	public function usersPrivilleges(){
		$qry = DB::query("SELECT * FROM user_menu WHERE code = ?",array(getCode($_SESSION['edfghl'])));
		$this->response($qry);
	}

	public function usersNotes(){
		$qry = DB::query("SELECT * FROM note WHERE code = ?",array(getCode($_SESSION['edfghl'])));
		$this->response($qry);
	}

}