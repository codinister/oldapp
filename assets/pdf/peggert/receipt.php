<?php 

$signature = getSignature($signatures,$fullname,$width="80",$height="30", $actions);
$logo = getLogo($comp_logo,$width="",$height="80", $actions);

$check_cash = $pay_type;
$b = explode('.', $balance)[0];

if($b < 0){
    $balance_text = 'Change:';
    $balance_amount = getAllPayments($tax_id) - $total;
}
elseif($b > 0){
    $balance_text = 'Balance due:';
    $balance_amount =  $total - getPreviousPayment($pay_id,$tax_id,$usserid);
}
else{
    $balance_text = false;
}

$header = '
<br /><br />
<table  cellpadding="0">
<tr>
<td style="width: 70px;">
'.$logo.'
</td>
<td style="width: 460px; color: #a70a36;">
<img  src="../images/peggert-receipt-header.jpg" alt="" />
<br />
<span>  <b>HEAD OFFICE:</b> '.$comp_addr.'</span>
<br />
<span> <b> Other Branches:</b>'.$comp_location.'</span>
<br>
<span>Contact: '.$comp_phone.'</span>
<br>
<span>Email: '.$comp_email.'</span>
<br>
</td>
</tr>
</table>
<img src="../images/peggert-official.jpg" height="30" alt="" />
<br />
<style>
strong{
    font-size: 17px;
}
table{
    text-align: center;
}
</style>
';

$pdf->writeHTMLCell(190,0,'','',$header,0,1);

//DATE
$lineone = '
<br />
<table style="color: #ad0a35;">
<tr>
<td style="width: 100px;">Date: '.date('d M Y',strtotime($rec_date)).'
</td>
<td style="width: 335px;"></td>
<td style="width: 110px;">
<span>No.</span> <strong style="border-bottom: solid 1px #ad0a35;">'.$rec_no.'</strong>
</td>
</tr>
</table>
<br />
';
$pdf->writeHTMLCell(190,0,'','',$lineone,0,1);




//RECIEVED FROM
$linetwo = '

<table style="color: #ad0a35;">
<tr>
<td style="width: 80px; ">Received from: </td>
<td style="width: 453px;border-bottom: solid 1px #ad0a35;">
'.$cust_name.'
</td>
</tr>

</table>
';
$pdf->writeHTMLCell(190,0,'','',$linetwo,0,1);




//THE SUM OF
$linefour = '
<table style="color: #ad0a35;">
<tr>
<td style="width: 100px;">The Sum Of '.$cur.': </td>
<td style="width: 433px;border-bottom: solid 1px #ad0a35;">
'.number_format($payment, 2, '.', ',').'
</td>
</tr>

<tr>
<td style="width: 90px;">Amount in words </td>
<td style="width: 443px;border-bottom: solid 1px #ad0a35;">
'.$obj->words.'
</td>
</tr>
</table>
';
$pdf->writeHTMLCell(190,0,'','',$linefour,0,1);



if($b > 0){
    $payment_purpose = 'PART PAYMENT FOR '.$profile;
}
else{
    $payment_purpose = 'FULL PAYMENT FOR '.$profile;
}

//BEING
$linefive = '
<table style="color: #ad0a35;">
<tr>
<td style="width: 43px;">Being: </td>
<td style="width: 490px;border-bottom: solid 1px #ad0a35;">
'.$payment_purpose.'
</td>
</tr>
</table>
';
$pdf->writeHTMLCell(190,0,'','',$linefive,0,1);



//payment type
$linesix = '
<table style="color: #ad0a35;">
<tr>
<td style="width: 80px;">Payment Type: </td>
<td style="width: 453px;border-bottom: solid 1px #ad0a35;">
'.$check_cash.'
</td>
</tr>
</table>
';
$pdf->writeHTMLCell(190,0,'','',$linesix,0,1);



//Balance DUE
if($balance_text){ 
$lineseven = '
<table style="color: #ad0a35;">
<tr>
<td style="width: 70px;">'.$balance_text.'</td>
<td style="width: 463px;border-bottom: solid 1px #ad0a35;">
'.$cur.' '.number_format($balance_amount, 2, '.', ',').'
</td>
</tr>
</table>
';
$pdf->writeHTMLCell(190,0,'','',$lineseven,0,1);
}






$lineeight = '
<br />
<br />
<table style="text-align: center; color: #ad0a35;">
<tr>
<td>
'.$fullname.'
<div style="border-top: solid 1px #ad0a35;">Received by</div>
</td>
<td>

</td>
<td>
'.$signature.'
<br />
<span>Authorised signature</span>
</td>
</tr>
</table>
';


$pdf->writeHTMLCell(190,0,'','',$lineeight,0,1);


