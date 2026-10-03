<?php 

$signature = getSignature($signatures,$fullname,$width="80",$height="30", $actions);
$logo = getLogo($comp_logo,$width="100",$height="80", $actions);

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



//CHECK IF THERE ARE DURATIONS
$durations = [];
$exp_date = '';
foreach($items as $k => $v){
    $exp_date = $v['exp_date'];
    array_push($durations, $v['duration']);
}


$duration_count = array_sum($durations);



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
                    <span>&nbsp;&nbsp;'.$comp_email.'</span>
                    <br />
                    <span>&nbsp;&nbsp;'.$comp_website.'</span>
                    <br />
                    
                    <span style="font-size: 9px; font-weight: bold;">
                    START DATE:
                    </span>
                    <span>'.date('d M Y', strtotime($invoice_date)).'</span>
                    <br />


                    
                    <span style="font-size: 9px; font-weight: bold;">
                    END DATE:
                    </span>
                    <span>'.date('d M Y', strtotime($exp_date)).'</span>
                    <br />



                    <span style="font-size: 9px; font-weight: bold;">
                    PROJECT:
                    </span>
                    <span>'.$profile.'</span>
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
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;'.$cust_location.'</span>
                    <br />
                    <br />
                    <span style="font-size: 9px; font-weight: bold;">
                    &nbsp;&nbsp;'.$invoice_no_type.':
                    </span>
                    <span>'.$invoice_no.'</span>
                    <img src="../images/spagency/underline.jpg" alt="" width="200" height="10" />
                    <br />
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


//TABLE BODY 




//TABLE HEADER
if($duration_count > 0){ 
    $table_header = '
    <table>
    <tr>
    <td style="width: 30px; border-right: solid 1px black; border-left: solid 1px black; border-top: solid 1px black;">#
    </td>
    <td style="width: 50px; border-right: solid 1px black; border-top: solid 1px black;">Qty
    </td>
    <td style="width: 150px; border-right: solid 1px black; border-top: solid 1px black;">Description
    </td>
    <td style="width: 70px; border-right: solid 1px black; border-top: solid 1px black;">Size
    </td>
    <td style="width: 80px; border-right: solid 1px black; border-top: solid 1px black;">Duration
    </td>

    <td style="width: 60px; border-right: solid 1px black; border-top: solid 1px black;">Unit Price
    </td>
    <td style="width: 90px; border-right: solid 1px black; border-top: solid 1px black;">Total
    </td>
    </tr>
    </table>
    <style>
    table{
        background-color: #4d4c52;
        color: white;
        padding: 6px;
    }
    </style>
    ';
}
else{

    $table_header = '
    <table>
    <tr>
    <td style="width: 30px; border-right: solid 1px black; border-left: solid 1px black; border-top: solid 1px black;">#
    </td>
    <td style="width: 60px; border-right: solid 1px black; border-top: solid 1px black;">Qty
    </td>
    <td style="width: 270px; border-right: solid 1px black; border-top: solid 1px black;">Description
    </td>
    <td style="width: 80px; border-right: solid 1px black; border-top: solid 1px black;">Unit Price
    </td>
    <td style="width: 90px; border-right: solid 1px black; border-top: solid 1px black;">Total
    </td>
    </tr>
    </table>
    <style>
    table{
        background-color: #4d4c52;
        color: white;
        padding: 6px;
    }
    </style>
    ';

}

$pdf->writeHTMLCell(190,5,'','',$table_header,'',1);

foreach($items as $k => $v){
    $num = $k + 1;



    if($v['qty'] > 0){
    if($duration_count > 0){ 
    $dur =  $v['duration'] ?  $v['duration'].' '.$duration.'(s)' : '';

    $rows .='
        <tr>
        <td style="width: 30px; border-right: solid 1px black; border-top: solid 1px black;">'.$num.'</td>
        <td style="width: 50px; border-right: solid 1px black;  border-top: solid 1px black;">'.$v['qty'].'</td>
        <td style="width: 150px; border-right: solid 1px black;  border-top: solid 1px black;">'.$v['prod_name'].'</td>
        <td style="width: 70px; border-right: solid 1px black;  border-top: solid 1px black;">'.$v['psize'].'</td>
        <td style="width: 80px; border-right: solid 1px black;  border-top: solid 1px black;">'.$dur.'</td>
        <td style="width: 60px; border-right: solid 1px black;  border-top: solid 1px black;">'.$v['prod_price'].'</td>
        <td style="width: 90px; border-right: solid 1px black;  border-top: solid 1px black;">'.number_format($v['total'], 2, '.', ',').'</td>
        </tr>
    ';
    }
    else{

        $rows .='
        <tr>
        <td style="width: 30px; border-right: solid 1px black; border-top: solid 1px black;">'.$num.'</td>
        <td style="width: 60px; border-right: solid 1px black;  border-top: solid 1px black;">'.$v['qty'].'</td>
        <td style="width: 270px; border-right: solid 1px black;  border-top: solid 1px black;">'.$v['prod_name'].'</td>
        <td style="width: 80px; border-right: solid 1px black;  border-top: solid 1px black;">'.$v['prod_price'].'</td>
        <td style="width: 90px; border-right: solid 1px black;  border-top: solid 1px black;">'.number_format($v['total'], 2, '.', ',').'</td>
        </tr>
    ';
    }
}
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
<td style="width: 160px;">SUB TOTAL '.$cur.'</td>
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
<td style="width: 160px;">Discount  ('.floor($discnt).'%)</td>
<td style="width: 100px;">'.number_format($discount, 2, '.', ',').'</td>
</tr>
';
}
 
//NHIL
$nhils = '';
if($nhil){ 
$nhils = '
<tr>
<td style="width: 160px;">NHIL ('.$nhilx.'%)</td>
<td style="width: 100px;">'.number_format($nhil, 2, '.', ',').'</td>
</tr>
';
}



//WITHHOLDING TAX
$withholdingtaxs = '';
if($withholdingtax){ 
$withholdingtaxs = '
<tr>
<td style="width: 160px;">WITHHOLDING TAX ('.$withholdingtaxx.'%)</td>
<td style="width: 100px;">'.number_format($withholdingtax, 2, '.', ',').'</td>
</tr>
';
}

//GETFUNDS 
$getfunds = '';
if($nhil){ 
$getfunds = '
<tr>
<td style="width: 160px;">GETFUND ('.$getfundx.'%)</td>
<td style="width: 100px;">'.number_format($getfund, 2, '.', ',').'</td>
</tr>
';
}

//VAT
$vats = '';
if($vat){ 
$vats = '
<tr>
<td style="width: 160px;">VAT ('.$vatx.'%)</td>
<td style="width: 100px;">'.number_format($vat, 2, '.', ',').'</td>
</tr>
';
}

//TRANSPORTATION
 
$totals = '
<tr>
<td style="width: 160px;">TOTAL '.$cur.'</td>
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
'.$cpvids.'
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
<h4>NOTE</h4>
<p>
'.$note.'
</p>
</div>
';
}

$pdf->writeHTMLCell(190,0,'','',$notes,'',1);

$terms = '';
if($terms_conditions AND $trans_type === 'proforma'){
$terms = html_entity_decode($terms_conditions);
}
$pdf->writeHTMLCell(190,0,'','',$terms,'',1);


$bottom_footer = '
<table cellpadding="11" style="background-color: #514b4d; color: white;">  
<tr>  
<td style="border-right: solid 1px white; width: 100px;">
<span>YOUR</span>
<br />
<span style="color: #fbb313;">ADVERTISING</span>
<br />
<span>SOLUTION</span>

</td>
<td style="border-right: solid 1px white; width: 130px;">
<table>
<tr>
<td style="width: 33px;"> 
<img src="../images/spagency/telephone.jpg" alt="" width="22" height="22" /> 
</td>
<td>  
<span>CALL US</span>
</td>
</tr>
</table>

</td>
<td style="border-right: solid 1px white; width: 140px;">

<table>
<tr>
<td style="width: 33px;"> 
<img src="../images/spagency/envelope.jpg" alt="" width="20" height="18" />
</td>
<td>  

<span>PRIVATE</span>
<span>&nbsp;&nbsp;&nbsp;MAIL</span>
</td>
</tr>
</table>


</td>
<td style="width: 160px;">



<table>
<tr>
<td style="width: 33px;"> 
<img src="../images/spagency/mobile.jpg" alt="" width="16" height="27" />
</td>
<td>  
<span>'.$comp_phone.'</span>
</td>
</tr>
</table>



</td>

</tr>
</table>
<table >
<tr>
<td  style="background-color: #4d4c52; height: 2px; width: 100px;"></td>
<td  style="background-color: #fbb313; height: 2px;  width: 130px;"></td>
<td  style="background-color: #fbb313; height: 2px;  width: 150px;"></td>
<td  style="background-color: #fbb313; height: 2px;  width: 150px;"></td>
</tr>
</table>
';

$pdf->writeHTMLCell(190,0,'','',$bottom_footer,'',1);
