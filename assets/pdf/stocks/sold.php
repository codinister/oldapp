<?php session_start();
include('library/tcpdf.php');
include('../../model/utils.php');

$pdf = new TCPDF('P','mm','A4');
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->AddPage();

$pdf->SetFont('helvetica', '', 10);

$code = getCode();

$data = DB::get_row('SELECT * FROM settings WHERE code = ?',array($code));

$products = json_decode(file_get_contents('../uploads/allstocks-'.$_SESSION['edfghl'].'.json'),TRUE);

//SETTINGS
$comp_name = $data['comp_name'];
$comp_logo = $data['comp_logo'];
$comp_location = $data['comp_location'];
$comp_phone = $data['comp_phone'];
$comp_email = $data['comp_email'];
$comp_website = $data['comp_website'];
$industry = $data['industry'];
$currency = $data['currency'];
$stock_ref = $products[0]['type'];
$filterby = $products[0]['filterby'];

$total_prod = 0;
$cnt = COUNT($products);
for($i =0; $i < $cnt; $i++){
    $total_prod += $products[$i]['qty'];
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


//TABLE HEADER

if($industry === 'service provider'){

    $stock_type = 'ALL SERVICES';


    $table_header = '
    <table style="background-color: white;">
    <tr>
    <td><h2>'.$stock_type.'</h2></td> <td><h2> TOTAL: '.$total_prod.'</h2></td>
    </tr>
    </table>
    <br />
    <br />
    <table>
    <tr>
    <td style="width: 30px;">#</td>
    <td style="width: 350px;">Service Name</td>
    <td style="width: 150px;">Service Charge</td>
    </tr>
    </table>
    <style>
    table{
        background-color: #cccccc;
        padding: 6px;
    }
    </style>
    ';
}
elseif($industry === 'rentals'){
    $stock_type = '';
    if($stock_ref === 'available'){
        $stock_type = 'AVAILABLE BILLBOARDS';
        $tb_desc = 'Price ('.$currency.')';
    }
    elseif($stock_ref === 'sold'){
        if($filterby === '2'){
            $tb_desc = 'EXPIRY DATE';
            $stock_type = 'EXPIRING  BILLBOARDS';
        }
        else{
            $tb_desc = 'DATE';
            $stock_type = 'RENTED  BILLBOARDS';
        }
    }
    elseif($stock_ref === 'stock'){
        $stock_type = 'ALL BILLBOARDS';
        $tb_desc = 'Price ('.$currency.')';
    }

    $table_header = '
 
    <table style="background-color: white;">
        <tr>
        <td><h2>'.$stock_type.'</h2></td> <td><h2> TOTAL: '.$total_prod.'</h2></td>
        </tr>
    </table>
    <br />
    <br />
    <table>
    <tr>
    <td style="width: 30px;">#</td>
    <td style="width: 250px;">Board Name</td>
    <td style="width: 100px;">Board Size</td>
    <td style="width: 50px;">Qty</td>
    <td style="width: 100px;">'. $tb_desc.'</td>
    </tr>
    </table>
    <style>
    table{
        background-color: #cccccc;
        padding: 6px;
    }
    </style>
    ';
}
else{

    $stock_type = '';

    if($stock_ref === 'available'){
        $stock_type = 'AVAILABLE ITEMS';
    }
    elseif($stock_ref === 'sold'){
        $stock_type = 'SOLD ITEMS';
    }
    elseif($stock_ref === 'stock'){
        $stock_type = 'ALL ITEMS';
    }


    $table_header = '
    <table style="background-color: white;">
    <tr>
    <td><h2>'.$stock_type.'</h2></td> <td><h2> TOTAL: '.$total_prod.'</h2></td>
    </tr>
    </table>
    <br />
    <br />



    <table>
    <tr>
    <td style="width: 30px;">#</td>
    <td style="width: 300px;">Product Name</td>
    <td style="width: 100px;">Quantity</td>
    <td style="width: 100px;">Price ('.$currency.')</td>
    </tr>
    </table>
    <style>
    table{
        background-color: #cccccc;
        padding: 6px;
    }
    </style>
    ';
}

$pdf->writeHTMLCell(190,5,'','',$table_header,'',1);

//TABLE BODY 
$rows = '';
foreach($products as $k => $v){
    $num = $k + 1;

    if($industry === 'service provider'){
    $rows .='
        <tr>
        <td style="width: 30px; border-right: solid 1px black;">'.$num.'</td>
        <td style="width: 350px; border-right: solid 1px black;">'.$v['prod_name'].'</td>
        <td style="width: 150px; border-right: solid 1px black;">'.number_format($v['price'], 2, '.', ',').'</td>
        </tr>
    ';
    }

//<a href="https://www.kwikpos.shop/stock.php?p='.$v['prod_id'].'">

//<a href="http://www.kwik2pos.com/stock.php?p='.$v['prod_id'].'">


    elseif($industry === 'rentals'){
       


        if($stock_ref === 'available'){
            $td_desc = number_format($v['price'], 2, '.', ',');
        }
        elseif($stock_ref === 'sold'){
            $td_desc = date('d M Y', strtotime($v['date']));
        }
        elseif($stock_ref === 'stock'){
            $td_desc = number_format($v['price'], 2, '.', ',');
        }



        $rows .='
            <tr>
            <td style="width: 30px; border-right: solid 1px black;">'.$num.'</td>
            <td style="width: 250px; border-right: solid 1px black;"><a href="https://www.classicshelter.com/stock.php?p='.$v['prod_id'].'">'.$v['prod_name'].'</a></td>
            <td style="width: 100px; border-right: solid 1px black;">'.$v['length'].'</td>
            <td style="width: 50px; border-right: solid 1px black;">'.$v['qty'].'</td>
            <td style="width: 100px; border-right: solid 1px black;">

            '.$td_desc.'
            
            </td>
            </tr>
        ';
        }
    else{
    $rows .='
        <tr>
        <td style="width: 30px; border-right: solid 1px black;">'.$num.'</td>
        <td style="width: 300px; border-right: solid 1px black;">'.$v['prod_name'].'</td>
  
        <td style="width: 100px; border-right: solid 1px black;">'.$v['qty'].'</td>
        <td style="width: 100px; border-right: solid 1px black;">'.number_format($v['price'], 2, '.', ',').'</td>
        </tr>
    ';
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
ob_start();
$pdf->Output();
