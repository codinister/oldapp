<?php session_start();
include('library/tcpdf.php');
include('../../model/utils.php');

$pdf = new TCPDF('P','mm','A4');
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->AddPage();

$pdf->SetFont('helvetica', '', 10);

$cust_id = $_GET['t']; 

$usid = DB::get_row("SELECT user_id FROM customers WHERE cust_id = ?",array($cust_id)); 

if($usid){
    $userid = $usid['user_id']; 
}
else{
    $userid = ''; 
}

$code = getCode($userid);

$data = DB::get_row('SELECT * FROM settings WHERE code = ?',array($code));

//SETTINGS
$comp_name = $data['comp_name'];
$comp_logo = $data['comp_logo'];
$comp_location = $data['comp_location'];
$comp_phone = $data['comp_phone'];
$comp_email = $data['comp_email'];
$comp_website = $data['comp_website'];
$currency = $data['currency'];

//HERITAGE CHRISTIAN
$taxid = DB::query("SELECT tax_id FROM tax WHERE cust_id = ? AND trans_type = 'invoice'",array($cust_id));
$taxids = [];
if($taxid){
    foreach($taxid as $v){
        array_push($taxids, $v['tax_id']);
    }
}


$ids = implode(',', $taxids);
$salesQry =  DB::query("SELECT t.* , c.fullname FROM tax as t JOIN customers as c ON t.cust_id = c.cust_id WHERE t.trans_type = 'invoice' AND t.tax_id IN(".$ids.")  "); 

$sales = [];
if($salesQry){
    foreach($salesQry as $v){
        array_push($sales, array(
            "tax_id" => $v['tax_id'],
            "date" =>  date('d M Y', strtotime($v['createdAt'])),
            "inv_no" =>  inv_num($v['tax_id'],$userid),
            "total"  =>  $v['total'],
            "fullname"  =>  $v['fullname'],
            "profile"  =>  $v['profile']
        ));
    }
}


$paymentQry =  DB::query("SELECT t.profile, p.* FROM payment_history as p JOIN tax as t ON p.tax_id = t.tax_id WHERE p.tax_id IN(".$ids.")"); 

$payments = [];
if($paymentQry){
    foreach($paymentQry as $v){
        array_push($payments, array(
            "pay_id" =>  $v['pay_id'],
            "date" =>  $v['createdAt'],
            "rec_no" => inv_num($v['pay_id'],$userid),
            "payment" =>  $v['payment'],
            "profile" =>  $v['profile']
        )); 
    }
}



//LOGO
$logo = '<img style="margin-top: 33px;" src="../uploads/'.$comp_logo.'" alt="logo" width="160" height="80" />';

$invoice_header = '
    <table >
        <tr>
            <td style="width: 120px;">
            '.$logo.'
            </td>
            <td style="width: 410px;">
            <strong>'.strtoupper($comp_name).'</strong>
            <br /><br />
            <table cellpadding="0">
                <tr>
                    <td>
                    <span>'.$comp_location.'</span>
                    <br />
                    <span>&nbsp;&nbsp;'.$comp_phone.'</span>
                    <br />
                    <span>&nbsp;&nbsp;'.$comp_email.'</span>
                    <br />
                    <span>&nbsp;&nbsp;'.$comp_website.'</span>
                    <br />
                    </td>
                </tr>
            </table>
            </td>
        </tr>
    </table>
    <style>
        td{
            text-align: left;
        }
        strong{
            font-size: 18px;
        }
        h4{
            font-size: 8px;
        }
    </style>
';

$pdf->writeHTMLCell(190,10,'','',$invoice_header,0,1);

$fullname = $sales[0]['fullname'];
$grand_total = 0;
$grand_total2 = $sales[0]['grand_total'];

    $table_header = '

    <table style="background-color: white;">
    <tr>
    <td>
    <h2>'.$fullname.'\'s ACCOUNT STATEMENT</h2>
    <hr>
    </td> 
    </tr>
    </table>
    
    <h4>SALES INVOICES</h4>
    <table>
    <tr>
    <td style="width: 138px;">DATE</td>
    <td style="width: 120px;">INVOICE #</td>
    <td style="width: 138px;">INVOICE DESC.</td>
    <td style="width: 138px;">AMOUNT</td>
    </tr>
    </table>
    <style>
    table{
        background-color: #cccccc;
        padding: 6px;
    }
    </style>
    ';

$pdf->writeHTMLCell(190,5,'','',$table_header,'',1);

//TABLE BODY 

foreach($sales as $k => $v){

    $grand_total += $v['total'];
    $rows .='
        <tr>

        <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">
        '.date('d M Y', strtotime($v['date'])).'
        </td>

        <td style="width: 120px; border-bottom: solid 1px black; border-right: solid 1px black;">
        '.$v['inv_no'].'
        </td>
        <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">
        '.$v['profile'].'
        </td>
        <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">'.$currency.' 
        '.number_format($v['total'], 2, '.', ',').'
        </td>
        </tr>
    ';

}

$row = '
<table>
'.$rows.'
</table>

<style>
table{
    border-left: solid 1px black;
    border-right: solid 1px black;
    border-bottom: solid 1px black;
    padding: 6px;
}
</style>
';

$pdf->writeHTMLCell(190,0,'','',$row,'',1);


$invtotal = '
<table>
<tr>
<td style="width: 138px;"></td>
<td style="width: 120px; text-align: right"></td>
<td style="width: 138px; text-align: right">TOTAL:</td>
<td style="width: 138px; border-bottom: solid 1px black; border-left: solid 1px black">'.$currency.' '.number_format($grand_total, 2, '.', ',').'</td>
</tr>
</table><style>
table{
    border-left: none;
    border-right: solid 1px black;
    border-bottom: none;
    padding: 6px;
}
</style>

'; 

$pdf->writeHTMLCell(190,0,'','',$invtotal,'',1);



$table_header2 = '
<br> <br><br> <br><br> <br>
<h4>RECEIPTS</h4>
<table>
<tr>
<td style="width: 138px;">DATE</td>
<td style="width: 120px;">RECEIPT #</td>
<td style="width: 138px;">RECEIPT DESC.</td>
<td style="width: 138px;">AMOUNT</td>
</tr>
</table>
<style>
table{
    background-color: #cccccc;
    padding: 6px;
}
</style>
';

$pdf->writeHTMLCell(190,5,'','',$table_header2,'',1);

//TABLE BODY 


$payment_grand_total = 0;
foreach($payments as $k => $v){
    $payment_grand_total += $v['payment'];

$rows2 .='
    <tr>

    <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">
    '.date('d M Y', strtotime($v['date'])).'
    </td>

    <td style="width: 120px; border-bottom: solid 1px black; border-right: solid 1px black;">
    '.$v['rec_no'].'
    </td>

    <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">
    '.$v['profile'].'
    </td>

    <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">'.$currency.' 
    '.number_format($v['payment'], 2, '.', ',').'
    </td>
    </tr>
';

}

$row2 = '
<table>
'.$rows2.'
</table>

<style>
table{
border-left: solid 1px black;
border-right: solid 1px black;
border-bottom: solid 1px black;
padding: 6px;
}
</style>
';

$pdf->writeHTMLCell(190,0,'','',$row2,'',1);


$invtotal2 = '
<table>
<tr>
<td style="width: 138px;"></td>
<td style="width: 120px; text-align: right"></td>
<td style="width: 138px; text-align: right">TOTAL:</td>
<td style="width: 138px; border-bottom: solid 1px black; border-left: solid 1px black">'.$currency.' '.number_format($payment_grand_total, 2, '.', ',').'</td>
</tr>
</table><style>
table{
border-left: none;
border-right: solid 1px black;
border-bottom: none;
padding: 6px;
}
</style>

'; 

$pdf->writeHTMLCell(190,0,'','',$invtotal2,'',1);








$remaining_balance = $grand_total - $payment_grand_total;

$balance = '
<br /> <br /><br /><br /><br />
<table>
<tr>
<td style="width: 138px;"></td>
<td style="width: 120px; text-align: right"></td>
<td style="width: 138px; text-align: right">AMOUNT DUE:</td>
<td style="width: 138px;">'.$currency.' '.number_format($remaining_balance, 2, '.', ',').'</td>
</tr>
</table>

<style>
table{

    background-color: #cccccc;
    padding: 6px;
}
</style>

'; 

$pdf->writeHTMLCell(190,0,'','',$balance,'',1);









//TABLE FOOTER 
ob_start();
$pdf->Output();
