<?php 
include('library/tcpdf.php');
include('../../model/utils.php');


$tax_id = base64_decode($_GET['inv']);

$uid = DB::get_row("SELECT user_id FROM tax WHERE tax_id = ?",array($tax_id)); 
if($uid){
    $usserid = $uid['user_id'];
}

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

function days($d){

    $num = $d + 0; 

    if($num === 1){
        return '1st';
    }
    if($num === 2){
        return '2nd';
    }
    if($num === 3){
        return '3rd';
    }
    if($num > 3 && $num <  21){
        return $num.'th';
    }

    if($num === 21){
        return $num.'21st';
    }
    if($num === 22){
        return $num.'22nd';
    }
    if($num === 23){
        return $num.'23rd';
    }

    if($num > 23 && $num <  31){
        return $num.'th';
    }

    if($num === 31){
        return $num.'31st';
    }

}


function number_to_string($num){
    switch($num){
        case 1: 
            return 'One'; 
        break;
        case 2: 
            return 'Two'; 
        break;
        case 3: 
            return 'Three'; 
        break;
        case 4: 
            return 'Four'; 
        break;
        case 5: 
            return 'Five'; 
        break;
        case 6: 
        return 'Six'; 
        break;
        case 7: 
            return 'Seven'; 
        break;
        case 8: 
            return 'Eight'; 
        break;
        case 9: 
            return 'Nine'; 
        break;
        case 10: 
            return 'Ten'; 
        break;
        case 11: 
            return 'Elleven'; 
        break;
        case 12: 
            return 'Twelve'; 
        break;
        case 13: 
            return 'Thirteen'; 
        break;
        case 14: 
            return 'Fourteen'; 
        break;
        case 15: 
            return 'Fifteen'; 
        break;
        case 16: 
            return 'Sixteen'; 
        break;
        case 17: 
            return 'Seventeen'; 
        break;
        case 18: 
            return 'Eighteen'; 
        break;
        case 19: 
            return 'Nineteen'; 
        break;
        case 20: 
            return 'Twenty'; 
        break;
        case 21: 
            return 'Twenty One'; 
        break;
        case 22: 
            return 'Twenty Two'; 
        break;
        case 23: 
            return 'Twenty Three'; 
        break;
        case 24: 
            return 'Twenty Four'; 
        break;
        case 25: 
            return 'Twenty Five'; 
        break;
        case 26: 
            return 'Twenty Six'; 
        break;
        case 27: 
            return 'Twenty Seven'; 
        break;
        case 28: 
            return 'Twenty Eight'; 
        break;
        case 29: 
            return 'Twenty Nine'; 
        break;
        case 30: 
            return 'Thirty'; 
        break;
        default: 
        return 0;
    }

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
    $nhilx = $sett['nhil'];
    $withholdingtaxx = $sett['withholdingtax'];
    $getfundx = $sett['getfund'];
    $vatx = $sett['vat'];
    $covidx = $sett['covid'];
    $receipt_type = $sett['receipt_type'];
}

//GET TAXES
$txs = DB::get_row("SELECT t.*,t.createdAt as invoice_date,c.location as custloc , c.* FROM tax as t JOIN customers as c ON t.cust_id = c.cust_id WHERE t.tax_id = ? AND t.code = ?",array($tax_id,getCode($usserid))); 
if($txs){
    $invoice_date = $txs['invoice_date'];
    $cust_name = $txs['fullname'];
    $note = $txs['note'];
    $cust_phone = $txs['phone'];
    $cust_email = $txs['email'];
    $cust_location = $txs['custloc'];
    $site_location = $txs['location'];
    $profile = $txs['profile'];
    $subtotal = $txs['subtotal'];
    $discount = $txs['discount'];
    $nhil = $txs['nhil'];
    $withholdingtax = $txs['withholdingtax'];
    $getfund = $txs['getfund'];
    $vat = $txs['vat'];
    $covid = $txs['covid'];
    $transportation = $txs['transportation'];
    $installation = $txs['installation'];
    $total = $txs['total'];
    $note  = $txs['note'];
    $tax_id  = $txs['tax_id'];
    $trans_type  = $txs['trans_type'];
    $user_id  = $txs['user_id'];
}

$contract = DB::get_row("SELECT * FROM contracts WHERE tax_id = ?", array($tax_id)); 
if($contract){
    $title = $contract['title']; 
    $start_date = $contract['start_date']; 
    $refferedtoas = $contract['refferedtoas']; 
    $contractnumber = $contract['contractnumber']; 
    $tax_id  = $contract['tax_id']; 
    $cust_id = $contract['cust_id']; 
    $otherinfo = $contract['otherinfo'];
}

if($user_id){
    $us = DB::get_row("SELECT signature,firstname,lastname FROM users WHERE user_id = ?",array($user_id));
    if($us){
        $signatures = $us['signature'];
        $fullname = $us['firstname'].' '.$us['lastname'];
    }
    else{
        $signatures = '';
        $fullname = '';
    }
}

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
         'exp_date' => date('Y-m-d', strtotime($v['exp_date']))
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
 $array[$first_prod_name_index]['duration'] +=  $sub_array['duration'];
 $array[$first_prod_name_index]['total'] += $sub_array['total'];
 // Remove this entry.
 unset($array[$index]);
}
 }
);

// If you want new indexes.
$grandtotal = new toWords($total);

$items = array_values($array);

$arrs = array();
$agreed_monthly_rate = array();
$totalperiod = 0; 
foreach($items as $k => $v){
    $s = $v['qty'] > 1 ? 'billboards' : 'billboard';
    if($v['duration'] > 0){
        $totalperiod = $v['duration'];
    }
    $rentalamount = new toWords(2000);
    array_push($arrs, " ".number_to_string($v['qty'])." (".$v['qty'].") ".$v['psize']." ".$s); 
    array_push($agreed_monthly_rate, 'GHC '.number_format($v['prod_price'], 2, '.', ',').' per month for the '.$v['psize'].' Billboard'); 
}

$sep = COUNT($arrs) > 2 ? ',' : 'and';
$tmns = $totalperiod > 1 ? 'months' : 'month';
$period =  number_to_string($totalperiod).' ('.$totalperiod.') '.$tmns; 
$formatted = implode($sep, $arrs);
$excludingtax = $vat > 0 ? 'including tax' : 'excluding tax';
$sep2 = COUNT($agreed_monthly_rate) > 2 ? ',' : 'and';
$agreed_monthly_rate2 = implode($sep2, $agreed_monthly_rate);


if(strToLower($comp_name) === 'classic roofing systems'){
    $industry = 'classic roofing systems';
}
if(strToLower($comp_name) === 'emagweb solutions'){
    $industry = 'emagweb solutions';
}
if(strToLower($comp_name) === 's.p agency'){
    $industry = 'spagency';
}



$pdf = new TCPDF('P','mm','A4');

$pdf->SetFont('helvetica', '', 11);
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->AddPage();




switch($industry){
    case 'service provider':
        include('services/contract.php');
    break;
    case 'spagency':
        include('spagency/contract.php');
    break;
    case 'retailing':
        include('retail/contract.php');
    break;
    case 'globline business ventures':
        include('globline/contract.php');
    break;
    case 'roofing company':
        include('roofing/contract.php');
    break;

    case 'rentals':
        include('billboard/contract.php');
    break;

    case 'classic roofing systems':
        include('classicroofing/contract.php');
    break;
    case 'emagweb solutions':
        include('emagwebsolutions/invoice.php');
    break;
    default: 
    break;
}



ob_start();
$pdf->Output();

?>