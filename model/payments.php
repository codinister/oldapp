<?php
require_once('utils.php');
extract(json_decode($_POST['data'],TRUE));

validation::email_validation($email); 
validation::date_validation($date, 'Date field required!');
validation::string_validation(array('Amount'=>$amount));

$slct = DB::get_row("SELECT comp_email FROM settings WHERE comp_email = ?",array($email));
if(!$slct){
    output('Email does not exists!');
}

DB::query("UPDATE settings SET app_expiry_date = ?,version ='paid' WHERE comp_email = ?",array(date('Y-m-d', strtotime($date)),$email));

$amnt = number_format($amount, 2, '.', ',');
$exp = date('d M Y', strtotime($date));
$login = '<a href="https://www.kwikpos.shop">Login to your account</a>';

echo '';


