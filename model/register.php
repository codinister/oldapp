<?php
require_once('utils.php');
extract(json_decode($_POST['data'],TRUE));

$role_id = 111;


validation::email_validation($email); 
validation::phone_validation(array('Phone'=>$phone));
validation::password_validation($password); 


if($industry === 'retailing'){
    $receipt_type = 'THERMNAL';
}
else{
    $receipt_type = 'A5';
}

$app_status = 'active';

$nextWeek = strtotime('+14 days');
$app_exp_date =  date('Y-m-d', $nextWeek);

$slct = DB::get_row("SELECT username FROM users WHERE username = ?",array($username));
if($slct){
    output('Username is already in use!');
}

$slct2 = DB::get_row("SELECT phone FROM users WHERE phone = ?",array($phone));
if($slct2){
    output('Phone is already in use!');
}

$slcts = DB::get_row("SELECT comp_email FROM settings WHERE comp_email = ?",array($email));
if($slcts){
    output('Email is already in use!');
}

$maxid = DB::get_row("SELECT MAX(user_id) AS user_id FROM users");
if($maxid){
    if($maxid['user_id']){
        $id = $maxid['user_id'] + 1;
        $code = encryption($id);
    }
    else{
        $code = encryption(1);
    }
}
else{
    $code = encryption(1);
}
$code = encryption($email);


DB::query("INSERT INTO users(firstname,lastname,username,password,phone,code,role_id)  VALUES (?,?,?,?,?,?,?)",array($firstname,$lastname,$username,password_hash($password, PASSWORD_BCRYPT),$phone,$code,$role_id));


$user = DB::get_row("SELECT user_id FROM users WHERE code = ?",array($code));

$user_id = $user['user_id'];
$users = 3;

DB::query("INSERT INTO user_menu(menu_name,menu_parent,menu_id,user_id,code) VALUES
('Dashboard','null','1','".$user_id."','".$code."'),
('Sell','null','2','".$user_id."','".$code."'),
('Users','null','3','".$user_id."','".$code."'),
('Products','null','4','".$user_id."','".$code."'),
('SMS','null','5','".$user_id."','".$code."'),
('Settings','null','6','".$user_id."','".$code."'),
('Salesinvoice','Privileges','7','".$user_id."','".$code."'),
('Addrowsbutton','Privileges','8','".$user_id."','".$code."'),
('Unitprice','Privileges','9','".$user_id."','".$code."'),
('Invoicedesc','Privileges','10','".$user_id."','".$code."')
");

DB::query("INSERT INTO settings(comp_name,comp_email,version,industry,code,receipt_type,app_expiry_date,app_status,users,sms_api_url) VALUES(?,?,?,?,?,?,?,?,?,'https://apps.mnotify.net/smsapi')",array($compname,$email,'trial',$industry,$code,$receipt_type,$app_exp_date,$app_status,$users));

if(  (strToLower($industry) == 'retailing') ){
    DB::query("INSERT INTO customers(fullname,user_id,code) VALUES('Anonymous',?,?) ",array($user_id,$code));
}

echo '';


