<?php 
$signature = getSignature($signatures,$fullname,$width="80",$height="30", $actions);
$logo = getLogo($comp_logo,$width="130",$height="60", $actions);

//INVOICE HEADER 
if($trans_type === 'proforma'){
    $invoice_no_type = 'PROFORMA #';
    $invoice_to_type = 'PROFORMA TO:';
    $invoice_desc = 'PROFORMA INVOICE';
}
else{
    $invoice_no_type = 'SALES INVOICE #';
    $invoice_to_type = 'SALES INVOICE TO:';
    $invoice_desc = 'SALES INVOICE';
}


$siteloc = '';
if($site_location){
    $siteloc = '<span style="font-size: 9px; font-weight: bold;">
    &nbsp;&nbsp;SITE LOC:</span>
    <span>'.$site_location.'</span>';
}

$invoice_header = '
    <table >
        <tr>
            <td style="width: 120px;">
            '.$logo.'
            <div>
            '.$invoice_desc.'
            </div>
            </td>
            <td style="width: 410px;">
            <strong>'.strtoupper($comp_name).'</strong>
            <br /><br />
            <table cellpadding="0">
                <tr>
                    <td>
                    <span>'.$comp_location.'</span>
                    <br />
                    <span>&nbsp;'.$comp_phone.'</span>
                    <br />
                    <span>&nbsp;&nbsp;'.$comp_email.'</span>
                    <br />
                    <span>&nbsp;&nbsp;'.$comp_website.'</span>
                    <br />
                    <br />
                    </td>
                    <td>
                    <span style="font-size: 9px; font-weight: bold;">
                    '.$invoice_to_type.'
                    </span>
                    <br />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;'.$cust_name.'</span>
                    <br />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;'.$cust_phone.'</span>
                    <br />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;'.$cust_location .'</span>
                    <br />
                    <br />
                    <span style="font-size: 9px; font-weight: bold;">
                    &nbsp;&nbsp;'.$invoice_no_type.':
                    </span>
                    <span>'.$invoice_no.'</span>
                    <br />
                    <span style="font-size: 9px; font-weight: bold;">
                    &nbsp;&nbsp;DATE:
                    </span>
                    <span>'.date('d M Y', strtotime($invoice_date)).'</span>
                    <br />
                    <br />
                    <span style="font-size: 9px; font-weight: bold;">
                    &nbsp;&nbsp;PROFILE:
                    </span>
                    <span>'.$profile.'</span>
                    <br />
                  '.$siteloc.'
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

$pdf->writeHTMLCell(190,50,'','',$invoice_header,0,1);


//TABLE HEADER
$table_header = '
<table>
<tr>
<td style="width: 30px;">#</td>
<td style="width: 300px;">Description</td>
<td style="width: 100px;">Qty</td>
<td style="width: 100px;">Total</td>
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
$rows = '';
foreach($items as $k => $v){
    $num = $k + 1;
    $rows .='
        <tr>
        <td style="width: 30px; border-right: solid 1px black;">'.$num.'</td>
        <td style="width: 300px; border-right: solid 1px black;">'.$v['prod_name'].'</td>
  
        <td style="width: 100px; border-right: solid 1px black;">'.$v['qty'].'</td>
        <td style="width: 100px; border-right: solid 1px black;">'.number_format($v['total'], 2, '.', ',').'</td>
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


//TABLE FOOTER 






//Sub Total
$sub_total = '
<tr>
<td style="width: 150px; ">SUB TOTAL '.$cur.'</td>
<td style="width: 100px;">'.number_format($subtotal, 2, '.', ',').'</td>
</tr>
';

//DISCOUNT 
$discounts = '';
$disc = 100 * $discount;
$discnt = $disc / $subtotal;
if($discount){ 
$discounts = '
<tr>   
<td style="width: 150px;">Discount  ('.floor($discnt).'%)</td>
<td style="width: 100px;">'.number_format($discount, 2, '.', ',').'</td>
</tr>
';
}
 
//NHIL
$nhils = '';
if($nhil){ 
$nhils = '
<tr>
<td style="width: 150px;">NHIL ('.$nhilx.'%)</td>
<td style="width: 100px;">'.number_format($nhil, 2, '.', ',').'</td>
</tr>
';
}


//WITHHOLDING TAX
$withholdingtaxs = '';
if($withholdingtax){ 
$withholdingtaxs = '
<tr>
<td style="width: 150px;">WITHHOLDING TAX ('.$withholdingtaxx.'%)</td>
<td style="width: 100px;">'.number_format($withholdingtax, 2, '.', ',').'</td>
</tr>
';
}

//GETFUNDS 
$getfunds = '';
if($nhil){ 
$getfunds = '
<tr>
<td style="width: 150px;">GETFUND ('.$getfundx.'%)</td>
<td style="width: 100px;">'.number_format($getfund, 2, '.', ',').'</td>
</tr>
';
}

//VAT
$vats = '';
if($vat){ 
$vats = '
<tr>
<td style="width: 150px;">VAT ('.$vatx.'%)</td>
<td style="width: 100px;">'.number_format($vat, 2, '.', ',').'</td>
</tr>
';
}

//TRANSPORTATION
$transportations = '';
if($transportation){
$transportations = '
<tr>
<td style="width: 150px;">Transportation '.$cur.'</td>
<td style="width: 100px;">'.number_format($transportation, 2, '.', ',').'</td>
</tr>
';
}

$installations = '';
if($installation){
$installations = '
<tr>
<td style="width: 150px;">Installation '.$cur.'</td>
<td style="width: 100px;">'.number_format($installation, 2, '.', ',').'</td>
</tr>
';
}
 
$totals = '
<tr>
<td style="width: 150px;">TOTAL '.$cur.'</td>
<td style="width: 100px;">'.number_format($total, 2, '.', ',').'</td>
</tr>
';


$trans = '
<table   style="padding: 0;">
<tr>
<td style="width: 280px;">
<table   style="padding: 0;">
<tr>
<td>
'.$bank.'
</td>
</tr>
</table>
</td>

<td>
<table>
'.$sub_total.'
'.$withholdingtaxs.'
'.$discounts.'
'.$nhils.'
'.$getfunds.'
'.$vats.'
'.$transportations.'
'.$installations.'
'.$totals.'
</table>
</td>

</tr>
<style>
table{
    padding: 6px;
}
</style>
</table>
';
$pdf->writeHTMLCell(190,0,'','',$trans,'',1);


$sign = '
<table>
<tr>
<td style="width: 330px;"></td>
<td style="width: 100px;"></td>
<td style="width: 100px;">
<div>
'.$signature.'
<br />
</div>
Signature
</td>
</tr>
<style>
table{
    padding: 6px;
}
div{
    border-bottom: solid 1px black;
}
</style>
</table>
';

$pdf->writeHTMLCell(190,0,'','',$sign,'',1);

$notes = '';
if($note){ 
$notes = '
<div>
<h4 style="font-size: 10px">NOTE</h4>
<p style="font-size: 10px">
'.$note.'
</p>
</div>
';
}
$pdf->writeHTMLCell(190,0,'','',$notes,'',1);

$terms = '';
if($terms_conditions AND $trans_type === 'proforma'){
$terms = '<div style="font-size: 9px;">'.html_entity_decode($terms_conditions).'</div>';
}
$pdf->writeHTMLCell(190,0,'','',$terms,'',1);


