<?php
class preview{

    public function settings(){
        $code =  $_GET['code'];
        $sett = DB::query("SELECT * FROM settings WHERE code = ?",array($code));
        echo json_encode($sett);
    }

    public function customer(){
        $cust_id =  $_GET['cust_id'];
        $customer = DB::query("SELECT * FROM customers WHERE cust_id = ?",array($cust_id));
        echo json_encode($customer);
    }

    public function user(){
        $user_id =  $_GET['user_id'];
        $users = DB::query("SELECT * FROM users WHERE user_id = ?",array($user_id));
        echo json_encode($users);
    }

    public function tax(){
        $tax_id =  $_GET['tax_id'];
        $tax = DB::query("SELECT * FROM tax WHERE tax_id = ?",array($tax_id));
        echo json_encode($tax);
    }
    
    public function sales(){
        $tax_id =  $_GET['tax_id'];
        $sale = DB::query("SELECT s.*, p.prod_size FROM sales as s LEFT JOIN products as p ON s.prod_id = p.prod_id  WHERE s.tax_id = ?", array($tax_id));
        echo json_encode($sale);
    }

}


