<?php session_start();
include('../library/tcpdf.php');
include('../../../model/utils.php');

$pdf = new TCPDF('P','mm','A4');
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->AddPage();

$pdf->SetFont('helvetica', '', 10);

$code = getCode($_SESSION['edfghl']);

$data = DB::get_row('SELECT * FROM settings WHERE code = ?',array($code));

$products = json_decode(file_get_contents('../../uploads/stocks-'.$_SESSION['edfghl'].'.json'),TRUE);

//SETTINGS
$comp_name = $data['comp_name'];
$comp_logo = $data['comp_logo'];
$comp_location = $data['comp_location'];
$comp_phone = $data['comp_phone'];
$comp_email = $data['comp_email'];
$comp_website = $data['comp_website'];
$industry = $data['industry'];
$currency = $data['currency'];


//LOGO
$logo = '<img style="margin-top: 33px;" src="../../uploads/'.$comp_logo.'" alt="logo" width="160" height="80" />';

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


$total = 0; 

$amount = 0; 
$cnt = COUNT($products); 
for($i = 0; $i < $cnt; $i++){

    $total += $products[$i]['prod_qty'];
    $amount += $products[$i]['selling_price'];

}

$grand_total = $total * $amount;

$title_box = '
    <table border="1" cellpadding="10">
        <tr>
        <td><h2>'.$products[0]['type'].'</h2></td>
        <td><h2> Total Qty: '.$total.'</h2></td>
        <td><h2> Amount: '.number_format($grand_total, 2, '.', ',').'</h2></td>
        </tr>
    </table>
    
';
$pdf->writeHTMLCell(190,10,'','',$title_box,0,1);



$table_header = '
<br /><br />
    <table border="1">
    <tr>
    <td style="width: 283px;">Product Name</td>
    <td style="width: 80px;">Unit Price</td>
    <td style="width: 70px;">Qty</td>
    <td style="width: 100px;">Created on</td>
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
foreach($products as $k => $v){
    $dates = date('d M Y', strtotime($v['createdAt']));

    if($dates === '01 Jan 1970'){
        $date = '---';
    }
    else{
        $date = $dates;
    }

    $rows .='
    <tr>
    <td style="width: 283px;">
    <a style="color: black; text-decoration: none;" href="http://www.kwik2pos.com/product.html?p='.$v['prod_id'].'">'.$v['prod_name'].'</a>
    </td>
    <td style="width: 80px;">'.$v['selling_price'].'</td>
    <td style="width: 70px;">'.$v['prod_qty'].'</td>
    <td style="width: 100px;">'.$date.'</td>
    </tr>
    ';
}




// <a href="https://app.kwik2pos.com/product.html?p='.$v['prod_id'].'">'.$v['prod_name'].'</a>

// <a href="http://www.kwik2pos.com/product.html?p='.$v['prod_id'].'">'.$v['prod_name'].'</a>


$row = '<table border="1">'.$rows.'</table>
    <style>
    table{
        padding: 6px;
    }
    </style>
';


$pdf->writeHTMLCell(190,0,'','',$row,'',1);


//TABLE FOOTER 
ob_start();
$pdf->Output();
