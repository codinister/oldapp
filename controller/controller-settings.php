<?php
class settings{
    
	//$this->code()
	private function code(){
		return getCode($_SESSION['edfghl']);
	}





    private function fileupload($file_name,$file_type,$tmp_name,$logo_image){
        if(!empty($file_name) || !empty($file_type) || !empty($tmp_name)){
            validation::file_type_validation($file_type);
            $fileupload =   file_upload($tmp_name, $file_type);
            return $fileupload;
        }
        else{
            return $logo_image;
        }
    }


    public function update_logo(){

        if(!empty($_FILES['comp_logo']['name'])){	
            $file_name = $_FILES['comp_logo']['name']; 
            $file_type = $_FILES['comp_logo']['type'];	
            $tmp_name = $_FILES['comp_logo']['tmp_name'];
            $logo_image = '';
        }
        else{
            $file_name = '';
            $file_type = '';
            $tmp_name = '';
            $logo_image = '';
        }

        $comp_logo = $this->fileupload($file_name,$file_type,$tmp_name,$logo_image);

        DB::query("
            UPDATE settings SET 
            comp_logo = ?
            WHERE code = ?
        ", array(
            $comp_logo,
            $this->code()
        ));

        echo $comp_logo;

    }

    public function update_settings(){
		extract(json_decode($_POST['data'], TRUE));

		validation::empty_validation(
			array(
                'Company Name' => $comp_name,
                'Company Address' => $comp_addr,
                'Company Phone' => $comp_phone,
                'Company Location' => $comp_location,
                'Company Email' => $comp_email,
                'Currency' => $currency
			) 
		);

        $qry = DB::get_row("SELECT comp_name FROM settings WHERE comp_name = ? AND code != ?",array(
            $comp_name,$this->code()
        ));

        if($qry) output('Company name is already in use!');



		validation::string_validation(
			array(
                'Company Name' => $comp_name,
                'Company Address' => $comp_addr,
                'Company Location' => $comp_location, 
                'Company Phone' => $comp_phone
			)
		);

        //validation::phone_validation(array('Company Phone' => $comp_phone));
		validation::email_validation($comp_email); 

        if($comp_website){
            validation::website_validation($comp_website);  
        }

        if($comp_terms){
            $comp_terms = validation::textboxcleaner($comp_terms);
        }

        if($comp_bank){
            validation::string_validation(
                array('Company Bank' => $comp_bank)
            );
        }


        if($bank_acc){
            validation::string_validation(
                array('Bank Account' => $bank_acc)
            );
        }

        if($acc_name){
            validation::string_validation(
                array('Account Name' => $acc_name)
            );
        }

        if($currency){
            validation::string_validation(
                array('Currency' => $currency)
            );
        }

        if($duration){
            validation::string_validation(
                array('Duration' => $duration)
            );
        }


        if($sms_sender_id){
            validation::string_validation(
                array('Sender ID' => $sms_sender_id)
            );
        }

        if($sms_api_key){
            validation::string_validation(
                array('API Key' => $sms_api_key)
            );
        }

        if($sms_cc){
            validation::string_validation(
                array('SMS CC' => $sms_cc)
            );
        }


        if($vat){
            validation::string_validation(
                array('Vat' => $vat)
            );
        }

        if($nhil){
            validation::string_validation(
                array('NHIL' => $nhil)
            );
        }

        if($getfund){
            validation::string_validation(
                array('GETFUND' => $getfund)
            );
        }

        if($withholdingtax){
            validation::string_validation(
                array('WITHHOLDING TAX' => $withholdingtax)
            );
        }


        DB::query("
            UPDATE settings SET 
            comp_name = ?,
            comp_addr = ?, 
            comp_phone = ?, 
            comp_location = ?,
            comp_email = ?, 
            comp_website = ?, 
            comp_terms = ?, 
            comp_bank = ?, 
            comp_logo = ?, 
            bank_acc  = ?,
            acc_name  = ?,
            currency  = ?,
            duration  = ?,
            sms_sender_id  = ?, 
            sms_api_key  = ?, 
            sms_api_url = ?,  
            sms_cc  = ?, 
            activate_receipt_sms = ?,  
            receipt_type = ?,
            vat  = ?,
            nhil  = ?,   
            getfund  = ?,    
            withholdingtax = ?,
            digitaladdress = ?,
            exp_limit = ?,
            stock_limit = ?,
            exp_reminder_phone = ?,
            daily_sales_report_alert = ?,
            customers_who_owe_alert = ?,
            low_stocks_alert = ?,
            exp_rentals_alert = ?
            WHERE code = ?
        ", array(
            $comp_name ,
            $comp_addr, 
            $comp_phone, 
            $comp_location,
            $comp_email, 
            $comp_website, 
            $comp_terms, 
            $comp_bank, 
            $comp_logo, 
            $bank_acc,
            $acc_name,
            $currency,
            $duration ,
            $sms_sender_id, 
            $sms_api_key , 
            $sms_api_url,  
            $sms_cc,
            $activate_receipt_sms,  
            $receipt_type,
            $vat,
            $nhil,   
            $getfund,    
            $withholdingtax,
            $digitaladdress,
            $exp_limit,
            $stock_limit,
            $exp_reminder_phone,
            $daily_sales_report_alert,
            $customers_who_owe_alert,
            $low_stocks_alert,
            $exp_rentals_alert,
            $this->code()
        ));

        echo 'Settings saved successfully!';
    }


}