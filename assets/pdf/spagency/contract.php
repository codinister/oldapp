<?php 
$signature = '<img src="../uploads/'.$signatures.'" width="80" height="30" alt="" />';
$logo = '<img src="../uploads/'.$comp_logo.'" width="100" height="85" alt="" />';
$underline =  '<img src="../images/spagency/underline.jpg" alt="" width="100" height="7" />';

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
                    <span>&nbsp;&nbsp;'.$comp_email.'</span>
                    <br />
                    <span>&nbsp;&nbsp;'.$comp_website.'</span>
                    <br />
                    <br />
        
                    </td>
                    <td style="text-align: right;">
                    <br /> <br /><br />
                    '.$underline.'
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

$contract_title = '  
<div>
<table>
<tr>
<td style="border: solid 1px black; text-align: center;">
<br />
<h1>'.$title.'</h1>
<br />
</td>
</tr>
</table>
</div>
<br /><br />
'; 
$pdf->writeHTMLCell(190,5,'','',$contract_title,'',1);

$between = '<div><h3 style="text-align: center;">Between</h3></div><div></div>';
$pdf->writeHTMLCell(190,5,'','',$between,'',1);

$company_details = '
<div style="text-align: center;">
<h2>'.$comp_name.'</h2>
<b>Head Office</b><br /><br />
<b>'.$comp_location.'</b><br /><br />
<span><i>Tel: '.$comp_phone.'</i></span>
<h4>Herein after referred to as </h4>
<h4>"The '.$refferedtoas.'" </h4>
</div>
<br />
';
$pdf->writeHTMLCell(190,5,'','',$company_details,'',1);

$and = ' 
<div style="text-align: center;"><h3> And</h3></div>
<br />
'; 
$pdf->writeHTMLCell(190,5,'','',$and,'',1);

$customername = ' 
<div style="text-align: center;"><h2>'.$cust_name.'</h2></div>
'; 
$pdf->writeHTMLCell(190,5,'','',$customername,'',1);

$refertoas = '
<div style="text-align: center;">
<h4>
Hereinafter referred to as “The Client”
</h4>
</div>
</div> <br />
';
$pdf->writeHTMLCell(190,5,'','',$refertoas,'',1);

$contractnum = '
<div>
<table cellpadding="20"> 
<tr>
<td style="border: solid 1px black; text-align: center; ">

<h3>CONTRACT #</h3>
<h3>'.$contractnumber.'</h3>

</td>
</tr>
</table>
</div><br /><br /><br />
';
$pdf->writeHTMLCell(190,5,'','',$contractnum,'',1);

$day = days(date('d', strtotime($start_date)));
$year = date('M Y', strtotime($start_date));

$narration1 = ' 
<div>
<table >
<tr> 
<td style="width: 530px; text-align: justify;">

This contract agreement is made this <b>'.$day.'</b> day of <b>'.$year.'</b> signed and sealed between these parties <b>'.$comp_name.'</b> (hereby called the (“'.$refferedtoas.'”) and <b>'.$cust_name.'</b> (hereinafter called the “Client”) for the rental of <b>'.$formatted.'</b> at the following locations:

</td> 
</tr>
</table>
</div> 
<br />
<br />
'; 

$pdf->writeHTMLCell(190,5,'','',$narration1,'',1);

$durations = [];
$exp_date = '';
foreach($items as $k => $v){
    $exp_date = $v['exp_date'];
    array_push($durations, $v['duration']);
}

$duration_count = array_sum($durations);

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

$rows = '';
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


$fullpayment = new toWords($total);

$narration2 = ' 
<br /><br /><br />
<div>
<table cellpadding="4"> 
<tr>
<td style="text-align: justify; ">

In pursuance of the said agreement and in consideration of the terms and conditions
hereinafter provided, it is hereby mutually agreed between <b>'.$comp_name.'</b> and <b>'.$cust_name.'</b>, as follows;

</td> 
</tr>
</table>
<br /> <br />
'; 

$pdf->writeHTMLCell(190,5,'','',$narration2,'',1);


$narration3 = '
<table>
<tr> 
<td style="text-align: justify;   margin-left: -32px;">
<ol >

<li>
This contract agreement is for a period of '.$period.' and it’s subject to renewal.
This takes effect from '.$day.' day of '.$year.'.
<br /> 
</li>


<li>


That, the agreed monthly rate to pay is '.$agreed_monthly_rate2.'.

That, the client has agreed to pay a full payment of <b>'.$grandtotal->words.' (GHC '.number_format($total, 2, '.', ',').')</b> '.$excludingtax.', which is equivalent to '.$period.' of Rental for all the locations to commence the contract. 

<br /> 
</li>

<li>
That, the client is supposed to provide an artwork (flexi) for installation or mounting by the
Agency.
</li>

</ol>
</td>
</tr>
</table>
<br />
';
$pdf->writeHTMLCell(190,5,'','',$narration3,'',1);

$otherdetails = '
<div>
'.$otherinfo.'
</div>

<div>
<h3>FLIGHTING / DEFLIGHTING OF FLEXY</h3>
Where the Client requests for removal or replacement of artwork within the contract period,
the Client will be made to pay a flighting/installation fee at a mutually agreed cost after providing a new flexy (Artwork).
</div>

<div>
This contract supersedes all prior agreements, written and oral between the two parties with respect to the subject matter of this contract.
</div>

<div>
In the event of this country being at war or civil unrest or at any time through a law, decree or act of government / landlord for the time being in power, the agency is prevented from installing the billboard or is compelled to discontinue the use of the site, the agency shall give notice in writing to the client outlining all factors involved in the breach of the agreement. An alternative solution shall then be decided upon by both parties that would mutually benefit them.
</div>

<div style="text-align: center; font-style: italic; font-weight: bold;">
Should the artwork get damaged by a storm or wind blow, which is not caused as a result
of the defect of the advertising structure, the Client shall be liable for the reprinting
of the artwork and supply to the Agency for installation
</div>

<div>
Failure to abide by any of the clauses in this agreement, automatically grants rights to the
aggrieved party to;

<ol>
<li>
Seek redress through civilized communication with the offending party, or should this
fail,
</li>
<li>
Seek redress through a written complaint to the offending party and finally
</li>
<li>
Both parties may opt for formal dispute resolution (Arbitration) should the above fail.
</li>
</ol>

<div> 
In the event of any party deciding to withdraw from this contract, written notice of not less than
one (1) months must be served. The withdrawing party will be liable for any costs/fees that are
on account for the termination.
</div>

<div>
The following signatures are in agreement to the terms and conditions outlined in the above hereinafter referred to as CONTRACT.
</div>

';
$pdf->writeHTMLCell(190,5,'','',$otherdetails,'',1);

$signs = '
<br /> <br /><br /><br /><br />
<div>
<table style="width: 600px;">

<tr> 
<td>Contract sign herein</td>
</tr>


<tr> 
<td  style="width: 300px;">  
<h4>'.$comp_name.'</h4>
'.$signature.'
............................
</td>
<td  style="width: 300px; text-align: center;">
<br />
<h4>'.$cust_name.'</h4>


<div></div>
............................


</td>
</tr>
</table>
</div>
';

$pdf->writeHTMLCell(190,5,'','',$signs,'',1);

?>