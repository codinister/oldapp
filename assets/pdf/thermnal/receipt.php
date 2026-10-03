<?php 

$b = explode('.', $balance)[0];

if(empty($cashier)){
    $bill_fullname = $fullname;
    $bill_server = '';
    $bill_cash_signatures = $signature;
}
else{

    $bill_fullname = $cashier;
    $bill_server = $server;
    $bill_cash_signatures =  $cash_signatures;
}


$bserver = ''; 
if(!empty($bill_server)){
    $bserver = '
        <tr>
        <td style="width: 120px;">SERVER</td>
        <td style="width: 120px;">'.$bill_server.'</td>
        </tr>
    ';
}

$digaddress = '';
if(!empty($digitaladdress)){
$digaddress ='GPS: '.$digitaladdress;
}



$invoice_header = '
<table>
<tr>
<td style="width: 240px; text-align: center;">
<h1>'.strtoupper($comp_name).'</h1>
<span>'.$comp_location.'</span>
<br />
<span>&nbsp;&nbsp;'.$comp_phone.'</span>
<br />

<span>&nbsp;&nbsp;'.$digaddress.'</span>
<br />

</td>
</tr>
</table>
';
$pdf->writeHTMLCell(190,10,'','',$invoice_header,0,1);


$other_details = '
<table>
<tr>
<td style="width: 120px;">
CASHIER
</td>
<td style="width: 120px;">
'.$bill_fullname .'
</td>
</tr>
'.$bserver.'
<tr>
<td style="width: 120px;">
DATE
</td>
<td style="width: 120px;">
'.date('d M Y',strtotime($rec_date)).'
</td>
</tr>

<tr>
<td style="width: 120px;">
RECEIPT #
</td>
<td style="width: 120px;">
'.$rec_no.'
</td>
</tr>

<tr>
<td style="width: 120px;">
CUSTOMER
</td>
<td style="width: 120px;">
'.$cust_name.'
</td>
</tr>

</table>
';
$pdf->writeHTMLCell(190,30,'','',$other_details,0,1);


$table_header = '
<table>
<tr>
<td style="width: 80px; "><strong>ITEM NAME</strong></td>
<td style="width: 40px;"><strong>QTY</strong></td>
<td style="width: 60px;"><strong>PRICE</strong></td>
<td style="width: 60px;"><strong>TOTAL</strong></td>
</tr>
</table>
';

$pdf->writeHTMLCell(190,5,'','',$table_header,'',1);


$qry = DB::query('SELECT prod_name,qty,unit_price,total FROM sales WHERE tax_id = ?',array($tax_id));

$row='';

foreach($qry as $v){ 

    if(!empty($v['prod_name'])){
        $row .='
        <tr>
        <td style="width: 80px;">'.$v['qty'].'</td>
        <td style="width: 40px;">'.$v['qty'].'</td>
        <td style="width: 60px;">'.$v['unit_price'].'</td>
        <td style="width: 60px;">'.number_format($v['total'], 2, '.', ',').'</td>
        </tr>
        ';
    }

}

$rows = '<table>'.$row.'</table>';

$pdf->writeHTMLCell(190,14,'','',$rows,'',1);


$tax = DB::get_row("SELECT subtotal,discount,nhil,getfund,vat,total FROM tax WHERE tax_id =?",array($tax_id));
if($tax){
    $subtotal = $tax['subtotal'];
    $discount = $tax['discount'];
    $nhil = $tax['nhil'];
    $getfund = $tax['getfund'];
    $vat = $tax['vat'];
}
else{
    $subtotal = 0;
    $discount = 0;
    $nhil = 0;
    $getfund = 0;
    $vat = 0;
}

//Sub Total
$sub_total = '
<tr>
<td style="width: 180px;">Sub Total ('.$cur.')</td>
<td style="width: 60px;">'.number_format($subtotal, 2, '.', ',').'</td>
</tr>
';


//DISCOUNT 
$discounts = '';
if($discount){ 
$discounts = '
<tr>   
<td style="width: 180px;">Discount ('.$cur.')</td>
<td style="width: 60px;">'.number_format($discount, 2, '.', ',').'</td>
</tr>
';
}

//NHIS
$nhils = '';
if($nhil){ 
$nhils = '
<tr>
<td style="width: 180px;">NHIL ('.$nhilx.')</td>
<td style="width: 60px;">'.number_format($nhil, 2, '.', ',').'</td>
</tr>
';
}


//GETFUNDS 
$getfunds = '';
if($nhil){ 
$getfunds = '
<tr>
<td style="width: 180px;">GETFUND ('.$getfundx.')</td>
<td style="width: 60px;">'.number_format($getfund, 2, '.', ',').'</td>
</tr>
';
}


//VAT
$vats = '';
if($nhil){ 
$vats = '
<tr>
<td style="width: 180px;">VAT ('.$vatx.')</td>
<td style="width: 60px;">'.number_format($vat, 2, '.', ',').'</td>
</tr>
';
}


$totals = '
<tr>
<td style="width: 180px;"><strong>TOTAL ('.$cur.')</strong></td>
<td style="width: 60px;"><strong>'.number_format($total, 2, '.', ',').'</strong></td>
</tr>
';

$payments = '
<tr>
<td style="width: 180px;">AMOUNT PAID ('.$cur.')</td>
<td style="width: 60px;">'.number_format($payment, 2, '.', ',').'</td>
</tr>
';

$changes = '';
if($change > 0){
    $changes = '
    <tr>
    <td style="width: 180px;">CHANGE ('.$cur.')</td>
    <td style="width: 60px;">'.number_format($change, 2, '.', ',').'</td>
    </tr>
    ';
}


$balance_due = '';
if($b > 0){
    $balance_due = '
    <tr>
    <td style="width: 180px;">AMOUNT DUE ('.$cur.')</td>
    <td style="width: 60px;">'.number_format($balance, 2, '.', ',').'</td>
    </tr>
    ';
}




$thanks = '
<br /><br />
<tr>
<td style="width: 240px; text-align: center;"><strong>Thank you!</strong></td>
</tr>
<tr>
<td style="width: 240px; text-align: center;"><strong>Please come again</strong></td>
</tr>
';


$trans = '
<br /><br />
<table>
'.$sub_total.'
'.$discounts.'
'.$nhils.'
'.$getfunds.'
'.$vats.'
'.$totals.'
'.$payments.'
'.$changes.'
'.$balance_due.'
'.$thanks.'
</table>
';
$pdf->writeHTMLCell(190,0,'','',$trans,'',1);
