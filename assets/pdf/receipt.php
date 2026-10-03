<?php session_start();
include('library/tcpdf.php');
include('../../model/utils.php');

define("MAJOR", 'Ghana Cedis');
define("MINOR", 'Pesewas');

class toWords
{
    var $pounds;
    var $pence;
    var $major;
    var $minor;
    var $words = '';
    var $number;
    var $magind;
    var $units = array('', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine');
    var $teens = array('Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen');
    var $tens = array('', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety');
    var $mag = array('', 'Thousand', 'Million', 'Billion', 'Trillion');
    
    function __construct($amount, $major = MAJOR, $minor = MINOR)
    {
        $this->__toWords__((int)($amount), $major);
        $whole_number_part = $this->words;
        $strform = number_format($amount, 2);
        $right_of_decimal = (int)substr($strform, strpos($strform,'.')+1);
        $this->__toWords__($right_of_decimal, $minor);
        $this->words = $whole_number_part . ' ' . $this->words;
    }
    
    function __toWords__($amount, $major)
    {
        $this->major  = $major;
        $this->number = number_format($amount, 2);
        list($this->pounds, $this->pence) = explode('.', $this->number);
        $this->words = " $this->major";
        if ($this->pounds == 0)
            $this->words = "Zero $this->words";
        else {
            $groups = explode(',', $this->pounds);
            $groups = array_reverse($groups);
            for ($this->magind = 0; $this->magind < count($groups); $this->magind++) {
                if (($this->magind == 1) && (strpos($this->words, 'hundred') === false) && ($groups[0] != '000'))
                    $this->words = ' and ' . $this->words;
                $this->words = $this->_build($groups[$this->magind]) . $this->words;
            }
        }
    }
    
    function _build($n)
    {
        $res = '';
        $na  = str_pad("$n", 3, "0", STR_PAD_LEFT);
        if ($na == '000')
            return '';
        if ($na[0] != 0)
            $res = ' ' . $this->units[$na[0]] . ' hundred';

        if (($na[1] == '0') && ($na[2] == '0'))

            return $res . ' ' . $this->mag[$this->magind];
        $res .= $res == '' ? '' : ' and';
        $t = (int) $na[1];
        $u = (int) $na[2];
        switch ($t) {
            case 0:
                $res .= ' ' . $this->units[$u];
                break;
            case 1:
                $res .= ' ' . $this->teens[$u];
                break;
            default:
                $res .= ' ' . $this->tens[$t] . ' ' . $this->units[$u];
                break;
        }
        $res .= ' ' . $this->mag[$this->magind];
        return $res;
    }
}

$pay_id = base64_decode($_GET['rec']);

$usid = DB::get_row("SELECT user_id FROM payment_history WHERE pay_id = ?", array($pay_id));
if($usid){
    $usserid = $usid['user_id']; 
}


//SETTINGS
$sett = DB::get_row("SELECT * FROM settings WHERE code = ?",array(getCode($usserid))); 
if($sett){
    $comp_name = $sett['comp_name'];
    $comp_addr = $sett['comp_addr'];
    $industry = $sett['industry'];
    $comp_logo = $sett['comp_logo'];
    $comp_location = $sett['comp_location'];
    $comp_phone = $sett['comp_phone'];
    $comp_email = $sett['comp_email'];
    $comp_website = $sett['comp_website'];
    $comp_bank = $sett['comp_bank'];
    $acc_name = $sett['acc_name'];
    $cur = $sett['currency'];
    $digitaladdress = $sett['digitaladdress'];
    $receipt_type = $sett['receipt_type'];
}

//GET TAXES
$txs = DB::get_row("SELECT t.*,t.user_id as usid,c.location as custloc , c.*,p.createdAt as rec_date, p.* FROM tax as t JOIN payment_history as p ON p.tax_id = t.tax_id JOIN customers as c ON t.cust_id = c.cust_id WHERE p.pay_id = ? AND t.code = ?",array($pay_id,getCode($usserid))); 
if($txs){
    $rec_date = $txs['rec_date'];
    $cust_name = $txs['fullname'];
    $cust_phone = $txs['phone'];
    $cust_email = $txs['email'];
    $cust_location = $txs['custloc'];
    $profile = $txs['profile'];
    $subtotal = $txs['subtotal'];
    $discount = $txs['discount'];
    $pay_type = $txs['pay_type'];
    $bank_acc_number	 = $txs['bank_acc_number'];
    $total = $txs['total'];    
    $tax_id = $txs['tax_id'];
    $pay_id = $txs['pay_id'];
    $payment = getPayment($pay_id);
    $balance = getBalance($tax_id);
    $user_id = $txs['usid'];
    $addbank = $txs['addbank'];
    $nhilx = $txs['nhil_rate'];
    $withholdingtaxx = $txs['withholdingtax_rate'];
    $getfundx = $txs['getfund_rate'];	
    $vatx = $txs['vat_rate'];
    $prepared_by = $txs['prepared_by'];
    $uuid = $txs['uuid'];
}


if($pay_type === 'Cheque'){
    $pay_type = $pay_type.'  ('.$bank_acc_number	.')';
}



$rec_no = inv_num($pay_id,$usserid);

$actions = 'main';

if($receipt_type === 'THERMNAL'){
    $pdf = new TCPDF('P','mm','A6');
}
else{
    $pdf = new TCPDF('L','mm','A5');
}

$pdf->setMargins(10,1,1);
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->AddPage();
$pdf->SetFont('helvetica', '', 11);

// if($tax_id){
//     $change = getChange($payment,$total);
//     $us = DB::get_row('SELECT firstname,lastname,signature FROM users WHERE user_id = ?',array($user_id));
//     $fullname = $us['firstname'].' '.$us['lastname'];
//     $signatures = $us['signature'];
// }
// else{
//     $fullname = '';
//     $signatures = '';
// }



if($prepared_by){
    $us = DB::get_row("SELECT signature,firstname,lastname FROM users WHERE user_id = ?",array($prepared_by));
    if($us){
        $signatures = $us['signature'];
        $fullname = $us['firstname'].' '.$us['lastname'];
        $server = $fullname;
    }
    else{
        $signatures = '';
        $fullname = '';
        $server = '';
    }
}




$obj = new toWords($payment);

$check = '<img style="margin-top: 33px;" src="../images/check.jpg" alt="check" width="10" height="10" />';

if(strToLower($comp_name) === 'classic roofing systems'){
    $industry = 'classic roofing systems';
}

if(strToLower($comp_name) === 'emagweb solutions'){
    $industry = 'emagweb solutions';
}

if(strToLower($comp_name) === 'peggert engineering & company limited'){
    $industry = 'peggert';
}

if(strToLower($comp_name) === 's.p agency'){
    $industry = 'spagency';
}

if(strToLower($comp_name) === 'avl roofing systems'){
    $industry = 'avl roofing systems';
}

switch($industry){

    case 'service provider':
        if($receipt_type === 'THERMNAL'){
            include('thermnal/receipt.php');
        }
        else{
            include('services/receipt.php');
        }
    break;

    case 'spagency':
        if($receipt_type === 'THERMNAL'){
            include('thermnal/receipt.php');
        }
        else{
            include('spagency/receipt.php');
        }
    break;

    case 'retails':
        if($receipt_type === 'THERMNAL'){
            include('thermnal/receipt.php');
        }
        else{
            include('retail/receipt.php');
        }
    break;

    case 'globline business ventures':
        if($receipt_type === 'THERMNAL'){
            include('thermnal/receipt.php');
        }
        else{
            include('globline/receipt.php');
        }
    break;

    case 'roofing company':
        if($receipt_type === 'THERMNAL'){
            include('thermnal/receipt.php');
        }
        else{
            include('roofing/receipt.php');
        }
    break;


    case 'rentals':
        if($receipt_type === 'THERMNAL'){
            include('thermnal/receipt.php');
        }
        else{
            include('billboard/receipt.php');
        }
    break;


    case 'classic roofing systems':
        if($receipt_type === 'THERMNAL'){
            include('thermnal/receipt.php');
        }
        else{
            include('classicroofing/receipt.php');
        }
    break;

    case 'emagweb solutions':
        if($receipt_type === 'THERMNAL'){
            include('thermnal/receipt.php');
        }
        else{
            include('emagwebsolutions/receipt.php');
        }
    break;


        case 'peggert':
        if($receipt_type === 'THERMNAL'){
            include('thermnal/receipt.php');
        }
        else{
            include('peggert/receipt.php');
        }
    break;

    case 'mks roofing systems':
        if($receipt_type === 'THERMNAL'){
            include('thermnal/receipt.php');
        }
        else{
            include('mks/receipt.php');
        }
    break;

    default: 
    break;
}

ob_start();
$pdf->Output();


















