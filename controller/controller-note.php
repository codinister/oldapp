<?php

class note{
    
	//$this->code()
	private function code(){
		return getCode($_SESSION['edfghl']);
	}

    public function save_note(){

        $data = json_decode($_POST['data'], TRUE); 

        $data['code'] = $this->code();
        $data['recp_id'] = $_SESSION['edfghl'];

        extract($data);

        $qry = DB::get_row("SELECT title FROM note WHERE title = ? AND note_id != ?", array($title, $note_id));
        if($qry){
            output('Title already exists!');
        }


        DB::query("INSERT INTO note(
            note_id, 
            title,
            message,
            user_id,
            createdAt,
            code,
            recp_id
        ) 
        VALUES(?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE
            title = VALUES(title), 
            message = VALUES(message)
        ",
        array(
            $note_id, 
            $title,
            $message,
            $user_id,
            $createdAt,
            $code,
            $recp_id
        ));

        echo 'Note added successfully!';
    }


    public function delete_note(){
        $note_id = $_GET['note_id'];
        DB::query("DELETE FROM note WHERE note_id = ?",array($note_id));
        echo '';
    }

}