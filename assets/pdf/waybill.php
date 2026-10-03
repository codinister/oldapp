<?php 
include('library/tcpdf.php');
include('../../model/utils.php');

$tax_id = base64_decode($_GET['inv']);
$uid = DB::get_row("SELECT user_id FROM tax WHERE tax_id = ?", array($tax_id));
if($uid){
    $usserid = $uid['user_id'];
}


if($tax_id){
    $us = DB::get_row('SELECT firstname,lastname,signature FROM users WHERE user_id = ?',array($usserid));
    $fullname = $us['firstname'].' '.$us['lastname'];
    $signatures = $us['signature'];
}
else{
    $fullname = '';
    $signatures = '';
}

//SETTINGS
$sett = DB::get_row("SELECT * FROM settings WHERE code = ?",array(getCode($usserid))); 
if($sett){
    $industry = $sett['industry'];
    $comp_name = $sett['comp_name'];
    $comp_logo = $sett['comp_logo'];
    $comp_location = $sett['comp_location'];
    $comp_phone = $sett['comp_phone'];
    $comp_email = $sett['comp_email'];
    $comp_website = $sett['comp_website'];
    $comp_bank = $sett['comp_bank'];
    $acc_name = $sett['acc_name'];
    $bank_acc = $sett['bank_acc'];
    $terms_conditions = $sett['comp_terms'];
    $cur = $sett['currency'];
    $duration = $sett['duration'];
    $digitaladdress = $sett['digitaladdress'];
    $receipt_type = $sett['receipt_type'];
}


//GET TAXES
$txs = DB::get_row("SELECT t.*,t.user_id as usid, t.createdAt as invoice_date,c.location as custloc , c.* FROM tax as t JOIN customers as c ON t.cust_id = c.cust_id WHERE t.tax_id = ? AND t.code = ?",array($tax_id,getCode($usserid))); 
if($txs){
    $invoice_date = $txs['invoice_date'];
    $cust_name = $txs['fullname'];
    $cust_phone = $txs['phone'];
    $cust_email = $txs['email'];
    $cust_location = $txs['custloc'];
    $site_location = $txs['location'];
    $profile = $txs['profile'];
    $subtotal = $txs['subtotal'];
    $discount = $txs['discount']? $txs['discount'] : 0;
    $nhil = $txs['nhil'];
    $withholdingtax = $txs['withholdingtax'] === '0' ? '' : $txs['withholdingtax'];
    $getfund = $txs['getfund'];
    $vat = $txs['vat'];
    $covid = $txs['covid'];
    $transportation = $txs['transportation'];
    $installation = $txs['installation'];
    $total = $txs['total'];
    $note  = $txs['note'];
    $tax_id  = $txs['tax_id'];
    $trans_type  = $txs['trans_type'];
    $addbank = $txs['addbank'];
    $nhilx = $txs['nhil_rate'];
    $withholdingtaxx = $txs['withholdingtax_rate'];
    $getfundx = $txs['getfund_rate'];	
    $vatx = $txs['vat_rate'];
    $covidx = $txs['covid_rate'];
    $prepared_by = $txs['prepared_by'];
    $user_id  = $txs['usid'];
}


$server = serverPreparedby($user_id); 
$cashier = serverPreparedby($prepared_by); 



//GET PRODUCTS
 $array = DB::query("SELECT 
    s.s_id,
    s.qty,
    s.prod_id,
    s.prod_name,
    s.duration,
    s.unit_price AS prod_price,
    s.total, 
    s.exp_date, 
    p.prod_size AS psize
    FROM 
    sales AS s LEFT JOIN products AS p ON s.prod_id = p.prod_id WHERE s.tax_id = ?
",array($tax_id));

$allproducts = $array;

$duplicate = [];
if(isset($_POST['duplicate'])){
 foreach($allproducts as $v){
     $duplicate[] = array(
         's_id' => '',
         'qty' => $v['qty'],
         'prod_id' => $v['prod_id'],
         'prod_name' => $v['prod_name'],
         'duration' => $v['duration'],
         'prod_price' => $v['prod_price'],
         'total' => $v['total'],
         'exp_date' => $v['exp_date']
     );
 }
}


$prod_name_indexes = []; // To store the index of the first prod_name found.

array_walk(
 $array,
 function ($sub_array, $index) use (&$array, &$prod_name_indexes) {
// Store the index of the first prod_name found.

if (!isset($prod_name_indexes[$sub_array['prod_name']])) {
 $prod_name_indexes[$sub_array['prod_name']] = $index;
}
else { // This prod_name already exists so we'll combine it.
 // Get the index of the previous prod_name.
 $first_prod_name_index = $prod_name_indexes[$sub_array['prod_name']];
 // Sum the az value.
 $array[$first_prod_name_index]['qty'] += $sub_array['qty'];
 $array[$first_prod_name_index]['prod_price'] += $sub_array['prod_price'];

 if(!empty($sub_array['duration'])){
    $array[$first_prod_name_index]['duration'] +=  $sub_array['duration'];
 }

 $array[$first_prod_name_index]['total'] += $sub_array['total'];

 // Remove this entry.
 unset($array[$index]);
}
 }
);



// If you want new indexes.
$items = array_values($array);


if($receipt_type === 'THERMNAL'){
    $pdf = new TCPDF('P','mm','A6');
}
else{
    $pdf = new TCPDF('P','mm','A4');
}

$pdf->SetFont('helvetica', '', 11);
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->AddPage();

$bank = '';
if($addbank == 1){
    $bank = '<br /><div style="width: 300px; font-size: 9px!important;">
    <strong>PAYMENT DETAILS</strong>
    <br /><br />
    <span style="width: 130px;">&nbsp;&nbsp;BANK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <span>'.$comp_bank.'</span>
     <br />
    <span style="width: 130px;">&nbsp;&nbsp;ACCOUNT NAME</span>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$acc_name.'</span>
    <br />
    <span style="width: 130px;">&nbsp;&nbsp;ACCOUNT NO#</span>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$bank_acc.'</span>
    <br />
    </div>
    ';
}

$actions = 'main';
$invoice_no = inv_num($tax_id,$usserid);


$header_top = '../images/header-top.png';
$header_bottom = '../images/header-bottom.png';


if(strToLower($comp_name) === 'emagweb solutions'){
    $industry = 'emagweb solutions';
}
if(strToLower($comp_name) === 's.p agency'){
    $industry = 'spagency';
}
if(strToLower($comp_name) === 'avl roofing systems'){
    $industry = 'avl roofing systems';
}

switch($industry){
    case 'roofing company':
    include('roofing/waybill.php');
    break;
    default: 
    break;

}
ob_start();
$pdf->Output();

?>