<?php 

$bserver = ''; 
if(!empty($server['fullname'])){
    $bserver = '
        <tr>
        <td style="width: 120px;">SERVER</td>
        <td style="width: 120px;">'.$server['fullname'].'</td>
        </tr>
    ';
}


$cashiername = $cashier['fullname'] ? $cashier['fullname'] : $server['fullname'];

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
<strong style="font-size: 14px;">ESTIMATE</strong>

</td>

</tr>

</table>
<br />
';
$pdf->writeHTMLCell(190,10,'','',$invoice_header,0,1);

$other_details = '
<table>
<tr>
<td style="width: 120px;">
CASHIER
</td>
<td style="width: 120px;">
'.$cashiername.'
</td>
</tr>
'.$bserver.'
<tr>
<td style="width: 120px;">
DATE
</td>
<td style="width: 120px;">
'.date('d M Y',strtotime($invoice_date)).'
</td>
</tr>

<tr>
<td style="width: 120px;">
ESTIMATE #
</td>
<td style="width: 120px;">
'.$invoice_no.'
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
    if(!empty($v['qty'])){
    $row .='
    <tr>
    <td style="width: 80px;">'.$v['prod_name'].'</td>
    <td style="width: 40px;">'.$v['qty'].'</td>
    <td style="width: 60px;">'.$v['unit_price'].'</td>
    <td style="width: 60px;">'.number_format($v['total'], 2, '.', ',').'</td>
    </tr>
    ';
    }
}

$rows = '<table>'.$row.'</table>';

$pdf->writeHTMLCell(190,14,'','',$rows,'',1);



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
'.$thanks.'
</table>
';
$pdf->writeHTMLCell(190,0,'','',$trans,'',1);
