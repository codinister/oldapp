<?php session_start();
include('library/tcpdf.php');
include('../../model/utils.php');

$pdf = new TCPDF('P','mm','A4');
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->AddPage();

$pdf->SetFont('helvetica', '', 10);


if(isset($_GET['u'])){
    $code = getCode($_GET['u']);
    $user_id = $_GET['u'];
}
elseif(isset($_GET['c'])){
    $code = $_GET['c'];
}


$data = DB::get_row('SELECT * FROM settings WHERE code = ?',array($code));

//SETTINGS
$comp_name = $data['comp_name'];
$comp_logo = $data['comp_logo'];
$comp_location = $data['comp_location'];
$comp_phone = $data['comp_phone'];
$comp_email = $data['comp_email'];
$comp_website = $data['comp_website'];






if(isset($_GET['u'])){
    $custs = DB::query("SELECT * FROM customers WHERE user_id = ?",array($user_id));
    $cnt = COUNT($custs);
}
elseif(isset($_GET['c'])){
    $custs = DB::query("SELECT * FROM customers WHERE code = ?",array($code));
    $cnt = COUNT($custs);
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



    $stock_type = 'ALL SERVICES';


    $table_header = '
    <table style="background-color: white;">
    <tr>
    <td><h2>CUSTOMER REPORT</h2></td> <td><h2> TOTAL: '.$cnt.'</h2></td>
    </tr>
    </table>
    <br />
    <br />
    <table>
    <tr>
    <td style="width: 30px;">#</td>
    <td style="width: 145px;">Fullname</td>
    <td style="width: 120px;">Phone</td>
    <td style="width: 120px;">Email</td>
    <td style="width: 120px;">Location</td>
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
foreach($custs as $k => $v){
    $num = $k + 1;



    $rows .='
        <tr>

        <td style="width: 30px; border-bottom: solid 1px black; border-right: solid 1px black;">
        '.$num.'
        </td>

        <td style="width: 145px; border-bottom: solid 1px black; border-right: solid 1px black;">
        '.$v['fullname'].'
        </td>

        <td style="width: 120px; border-bottom: solid 1px black; border-right: solid 1px black;">
        '.$v['phone'].'
        </td>

        <td style="width: 120px; border-bottom: solid 1px black; border-right: solid 1px black;">
        '.$v['email'].'
        </td>

        
        <td style="width: 120px; border-bottom: solid 1px black; border-right: solid 1px black;">
        '.$v['location'].'
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






//TABLE FOOTER 
ob_start();
$pdf->Output();
