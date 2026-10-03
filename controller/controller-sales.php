<?php
class sales{

    //$this->code()
    private function code(){
        return getCode($_SESSION['edfghl']);
    }

    private function termnalReceipt(){
		$sett = DB::get_row("SELECT receipt_type FROM settings WHERE code = ?",array($this->code()));
		if($sett){
			if ($sett['receipt_type'] === 'THERMNAL') {
                return true; 
            }
            else{
                return false;
            }
		}
		else{
            return false;
        }
	}


    public function save_contract(){

        $data = json_decode($_POST['data'],TRUE);
        extract($data);

        $insert = DB::query("INSERT INTO contracts(
            cont_id,
            title,
            start_date,
            refferedtoas,
            contractnumber,
            tax_id,
            cust_id, 
            code, 
            otherinfo
        ) VALUES(?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE 
            title = VALUES(title),
            start_date = VALUES(start_date),
            refferedtoas = VALUES(refferedtoas),
            contractnumber = VALUES(contractnumber),
            tax_id = VALUES(tax_id), 
            cust_id = VALUES(cust_id), 
            otherinfo = VALUES(otherinfo)
        ",array(
           $cont_id,
           $title,
           date('Y-m-d', strtotime($start_date)),
           $refferedtoas,
           $contractnumber,
           $tax_id,
           $cust_id, 
           $this->code(), 
           $otherinfo
        ));


        $qry = DB::get_row("SELECT TAX_ID FROM contracts WHERE  tax_id = ?", array($tax_id));


        if($qry){
            echo $tax_id;
        }
        else{
            echo 'error';
        }
    }

    //SAVE SALES
    public function save_sales(){

        $payment = flatten(json_decode($_POST['payment'],TRUE));


        $tax = json_decode($_POST['sales'],TRUE);
        $sales = flatten(json_decode($_POST['items'],TRUE));
        
        extract($tax);

        // if(!$this->termnalReceipt()){
        //     $qry = DB::get_row("SELECT profile,tax_id FROM tax WHERE profile = ? AND code = ?",array($profile,$this->code()));
        //     if($qry){
        //         if($qry['tax_id'] !== $tax_id){
        //             output( 'Invoice description already exists!!' );
        //         }
        //     }
        // }

        //No item validation
        if (COUNT($sales) < 1) {
            output( 'Add an item to continue!' );
        }

        //Customer field validation
        if ($cust_id < 1) {
            output("Customer's field required!");
        }

        //Invoice description validation
        if(!$this->termnalReceipt()){
            if (COUNT([$profile]) < 1) {
                output('Invoice description required!');
            }
        }

        //Invoice date validation
        validation::date_validation($invoice_date, 'Invoice date field required!');

        $tax_id = saveTransaction($tax, $sales); 

        if(COUNT([$tax_id]) > 0){
            $pay_id = savePayment($tax_id, $payment, $cust_id);
        }
        else{
            $pay_id = '';
        }

        $mess = 'Added '.$trans_type;
        feedback($user_id,$cust_id,$pay_id,$tax_id,$mess);

    }

    public function delete_payment(){
        $pay_id = $_GET['pay_id'];
        $cust = DB::query("SELECT 
        t.tax_id, 
        c.fullname,
        p.payment
        FROM payment_history as p 
        JOIN tax as t ON p.tax_id = t.tax_id 
        JOIN customers as c ON c.cust_id = t.cust_id 
        WHERE p.pay_id = ? AND p.code = ?",array($pay_id,$this->code()));

        DB::query("DELETE FROM payment_history WHERE pay_id = ?",array($pay_id));
        echo '';

        $fullUserName = getFullname($_SESSION['edfghl']);

        //REWRITE
        $receipt_no = inv_num($pay_id);
        $activity= $fullUserName." deleted the amount of ".$cust[0]['payment']." from".$cust[0]['fullname']." receipt. Receipt no. ".$receipt_no."";
        history($_SESSION['edfghl'],'',$activity);

        smsWarnings($activity,$_SESSION['edfghl']);

    }


    
    public function getInvoiceDetails(){

        $cust_id = $_POST['cust_id'];
        $user_id = $_POST['user_id'];
        $tax_id = $_POST['tax_id'];

        //BEGIN TAXES 
        $tx = DB::get_row("SELECT   
        t.tax_id,
        t.vat,	
        t.nhil,
        t.withholdingtax,
        t.getfund,
        t.subtotal,
        t.discount,	
        t.total,
        t.profile,	
        t.transportation,	
        t.installation,	
        t.location AS site_location,	
        t.trans_type,	
        t.createdAt AS invoice_date,
        t.end_date,
        t.cust_id,	
        t.user_id,	
        t.addbank,
        t.note,
        t.uuid,
        t.prepared_by,
        t.vat_rate,
        t.nhil_rate,
        t.getfund_rate,
        t.withholdingtax_rate,
        t.code,
        c.*,p.pay_type, p.bank_acc_number FROM payment_history as p RIGHT JOIN tax as t ON p.tax_id = t.tax_id JOIN customers as c ON t.cust_id = c.cust_id WHERE t.tax_id = ? AND t.code = ?",array($tax_id,$this->code()));



        $taxes = array(
            'vat' => $tx ?  $tx['vat'] : 0,
            'nhil' => $tx ?  $tx['nhil'] : 0,
            'getfund' => $tx ?  $tx['getfund'] : 0,
            'sub_total' => $tx ? $tx['subtotal'] : 0,
            'discount' => $tx ?  $tx['discount'] : 0,
            'withholdingtax' => $tx? $tx['withholdingtax'] : 0,
            'total' => $tx ?  $tx['total'] : 0,
            'profile' => $tx ? $tx['profile']  :  '',
            'transportation' => $tx ?  $tx['transportation'] : 0,
            'installation' => $tx?  $tx['installation'] : 0,
            'location' => $tx?  $tx['site_location'] : '',
            'prepared_by'  => $tx?  $tx['prepared_by'] : '',
            'previouspayment' => isset($_POST['duplicate']) ? '' : sumPayments($tax_id),
            'newpayment' => 0,
            'balance' => isset($_POST['duplicate']) ? '' :getBalance($tax_id),
            'taxchecked' => $tx? $tx['vat'] > 0 ? true : false : false,
            'withholdingchecked' => $tx? $tx['withholdingtax'] ? true : false : false,
            'user_id' => $tx?  $tx['user_id'] : '',
            'cust_id' => $tx?  $tx['cust_id'] : '',
            'cust_name' =>  $tx ?  $tx['fullname'] : '',
            'cust_email' =>  isset($_POST['duplicate']) ? '' : $tx['email'],
            'cust_phone' =>  isset($_POST['duplicate']) ? '' : $tx['phone'],
            'tax_id' => isset($_POST['duplicate']) ? '' :  $tx['tax_id'],
            'trans_type' => $tx ?  $tx['trans_type'] : '',
            'pay_type' => $tx ?  $tx['pay_type'] : 'Cash',
            'note' =>  isset($_POST['duplicate']) ? '' : $tx['note'],
            'invoice_date' => $tx?  $tx['invoice_date'] : '', 
            'exp_date' => $tx['end_date'] == '1970-01-01 00:00:00' ? '' :  $tx['end_date'],
            'addbank' => $tx? $tx['addbank'] : 0,
            'receipt_date' => '',
            'vat_rate' => $tx? $tx['vat_rate'] : 0,
            'nhil_rate' => $tx? $tx['nhil_rate'] : 0,
            'getfund_rate' => $tx? $tx['getfund_rate'] : 0,
            'withholdingtax_rate' => $tx? $tx['withholdingtax_rate'] : 0,
            'code' => $tx? $tx['code'] : '',
            'bank_acc_number' => isset($_POST['duplicate']) ? '' : $tx['bank_acc_number'],
            'uuid' => $tx? $tx['uuid'] : '',
            "contract" => isset($_POST['duplicate']) ? '' : DB::get_row("SELECT * FROM contracts WHERE tax_id =?", array($tax_id))
        );

        //END TAXES 

        //BEGIN PRODUCTS 
        $allproducts = DB::query("SELECT 
            s_id,
            qty,
            prod_id,
            prod_name,
            duration,
            unit_price AS prod_price,
            total
            FROM 
            sales WHERE tax_id = ? AND code = ?
        ",array($tax_id,$this->code()));

        $prods = []; 

        foreach($allproducts as $v){
            array_push($prods,[

                "duration" => $v['duration'],
                "prod_id" => $v['prod_id'],
                "prod_name" => $v['prod_name'],
                "prod_price" => $v['prod_price'],
                'prodsize' => '',
                "qty" => $v['qty'],
                "s_id" => isset($_POST['duplicate']) ? '' :  $v['s_id'],
                "total" => $v['total'],
            ] );
        };

        $items = array(
            'taxes' => $taxes,
            'products' => $prods
        );

        echo json_encode($items);

    }

    public function delete_invoice(){
        $tax_id = $_GET['tax_id']; 
        $cust = DB::query("SELECT c.fullname,t.trans_type FROM customers as c JOIN tax as t ON c.cust_id = t.cust_id WHERE t.tax_id = ? AND t.code = ?",array($tax_id,$this->code()));
        DB::query("DELETE FROM tax WHERE tax_id = ?", array($tax_id));
        DB::query("DELETE FROM sales WHERE tax_id = ?", array($tax_id));
        DB::query("DELETE FROM payment_history WHERE tax_id = ?", array($tax_id));

        if($cust){
        //REWRITE
        $invoice_no = inv_num($tax_id);

        $fullUserName = getFullname($_SESSION['edfghl']);
        if($cust[0]['trans_type'] == 'invoice'){
            $activity= $fullUserName." deleted Sales Invoice of".$cust[0]['fullname']." Invoice Number".$invoice_no."";
            history($_SESSION['edfghl'],'',$activity);
            smsWarnings($activity,$_SESSION['edfghl']);
        }
        else{
            $activity = $fullUserName." deleted Proforma of".$cust[0]['fullname']." Proforma Number".$invoice_no."";
            history($_SESSION['edfghl'],'',$activity);
        }

    }
    }

    public function addInvoiceNote(){
        $note = $_POST['note'];
        $tax_id = $_POST['tax_id'];
        validation::empty_validation(array('Note'=>$note));
        $note = validation::textboxcleaner($note);
        DB::query("UPDATE tax SET note = ? WHERE tax_id = ?", array($note,$tax_id));
        echo 'Note added successfully!';
    }

    private function getInvoiceSales($cust_id,$trans_type){
        $ref_id = DB::query("SELECT cust_id FROM customers WHERE ref_id = ? AND code = ?",array($cust_id,$this->code()));

        if($ref_id){ 
            $arr = [];
            foreach($ref_id as $v) $arr[] = $v['cust_id'];
            $imp = implode(',',$arr);

            $qry = DB::query("SELECT 
            t.user_id,
            t.cust_id,
            t.tax_id,
            t.createdAt,
            t.total,
            t.profile,
            c.email,
            c.fullname,
            c.phone,
            u.firstname,
            u.lastname
            FROM tax as t JOIN customers as c ON t.cust_id = c.cust_id JOIN users as u ON c.user_id = u.user_id
            WHEREt.trans_type = '".$trans_type."' AND t.cust_id IN(".$imp.")",array($cust_id));

            echo json_encode($qry);
        }
        else{ 
            $qry = DB::query("SELECT 
            t.user_id,
            t.cust_id,
            t.tax_id,
            t.createdAt,
            t.total,
            t.profile,
            c.email,
            c.fullname,
            c.phone,
            u.firstname,
            u.lastname
            FROM tax as t JOIN customers as c ON t.cust_id = c.cust_id JOIN users as u ON c.user_id = u.user_id
            WHERE t.cust_id = ? AND t.trans_type = '".$trans_type."' ",array($cust_id));

            echo json_encode($qry);
        }

    }

    public function getSales(){
        $qry = DB::query('SELECT s.* FROM sales as s JOIN tax as t ON t.tax_id = s.tax_id WHERE t.trans_type = "invoice" AND s.createdAt > DATE_ADD( NOW(),INTERVAL -365 DAY) AND s.code = ?',array($this->code()));
        if($qry){
            echo json_encode($qry);
        }
        else{
            echo json_encode([]);
        }
    }

    public function getProformas(){
        $cust_id = $_GET['cust_id'];
        $this->getInvoiceSales($cust_id,'proforma');
    }

    public function getinvoice(){
        $cust_id = $_GET['cust_id'];
        $this->getInvoiceSales($cust_id,'invoice');
    }


    public function update_payment_history(){

        $data = extract(json_decode($_POST['data'], TRUE));

        $date = date('Y-m-d H:i:s', strtotime($receipt_date));

        //Update payment history 
        DB::query("UPDATE payment_history SET payment = ?,createdAt = ? WHERE pay_id = ?",array($payment,$date,$pay_id));

        // $activity="Updated".$fullname." receipt with the amount of ".$payment."";
        // history($_SESSION['edfghl'],'',$activity);

        echo 'Receipt updated successfully!';
    }
}
