<?php
class products{
    
	//$this->code()
	private function code(){
		return getCode($_SESSION['edfghl']);
	}

    public function stocks(){
        $stocks = $_POST['stocks'];
        $path = dirname(__DIR__).'/assets/uploads/stocks-'.$_SESSION['edfghl'].'.json';
        if($path){
               file_put_contents($path,$stocks);
        }
     
        echo 'Done';
    }


    public function get_single_product(){
        $qry = DB::get_row("SELECT * FROM products WHERE prod_id = ?",array($_GET['prod_id'])); 
        if($qry){
            echo json_encode($qry);
        }
        else{
            echo '[]';
        }
    }


    private function fileupload($file_name,$file_type,$tmp_name,$prod_image){
        if(!empty($file_name) || !empty($file_type) || !empty($tmp_name)){
            validation::file_type_validation($file_type);
            $fileupload =   file_upload($tmp_name, $file_type);
            return $fileupload;
        }
        else{
            return $prod_image;
        }
    }



    private function get_category($cat_id,$cat_name,$date){
        if(!empty($cat_id)){
            return $cat_id;
        }
        else{
            $qry = DB::get_row('SELECT cat_id FROM category WHERE cat_name = ?  AND code = ? ', array($cat_name,$this->code()));
            if($qry){
                output('Category already exists!');
                exit;
            }

            DB::query("INSERT INTO category(cat_name,ref,createdAt,code) VALUES(?,'product',?,?)", array($cat_name,$date,$this->code()));

            $catid = DB::get_row("SELECT  cat_id FROM category WHERE cat_name = ? AND code =?",array($cat_name,$this->code()));

            if($catid){
                return $catid['cat_id']; 
            }
        }

    }



    private function addproducts(
        $prod_id,
        $prod_name,
        $prod_size,
        $selling_price,
        $cat_id,
        $prod_code,
        $fileupload,
        $date
    ){
        DB::query("INSERT INTO products(
        prod_id,
        prod_name,
        prod_size,
        selling_price,
        cat_id,
        prod_code,
        prod_image,
        createdAt,
        code
        ) VALUES(?,?,?,?,?,?,?,?,?)
        ON DUPLICATE KEY UPDATE 
        prod_name = VALUES(prod_name),
        prod_size = VALUES(prod_size),
        selling_price = VALUES(selling_price),
        cat_id = VALUES(cat_id),
        prod_code = VALUES(prod_code),
        prod_image = VALUES(prod_image),
        createdAt = VALUES(createdAt)
        ",array(
            $prod_id,
            $prod_name,
            $prod_size,
            $selling_price,
            $cat_id,
            $prod_code,
            $fileupload,
            $date,
            $this->code()
        ));

        if(!empty($prod_id)){
            return $prod_id;
        }
        $qry = DB::get_row("SELECT prod_id FROM products WHERE prod_name = ?",array($prod_name)); 
        if($qry){
            return $qry['prod_id'];
        }
    }



    public function save_product(){

        $industry = getIndustry($_SESSION['edfghl']);
        extract(json_decode($_POST['product'], TRUE));  
        $qty = json_decode($_POST['qty'], TRUE);  

        if(isset($_FILES['file'])){
            $file_name = $_FILES['file']['name'];
            $file_type = $_FILES['file']['type'];
            $tmp_name = $_FILES['file']['tmp_name'];
        }
        else{
            $file_name = '';
            $file_type = '';
            $tmp_name = '';
        }

        $date = date('Y-m-d', strtotime($createdAt));

        //Set produt type
        $prod = '';
        if($industry === 'service provider'){
            $prod = 'Service';
        }
        else{
            $prod = 'Product';
        }
        
        //CHECK IF PRODUCT NAME EXISTS
        $qry = DB::get_row('SELECT prod_name FROM products WHERE prod_name = ? AND prod_id != ? AND code = ? ', array($prod_name,$prod_id,$this->code()));
        if($qry){
            output($prod.' name already exists!');
            exit;
        }

        //BEGIN VALIDATION 
        validation::empty_validation(
            array(
                $prod.' Name' => $prod_name,
                'Unit Price' => $selling_price,
                $prod.' Category' => $cat_name
            )
        );

        validation::string_validation(
            array(
                $prod.' Name' => $prod_name,
                'Price' => $selling_price,
                'Category' => $cat_name
            )
        );

        if($industry === 'rentals' || $industry === 'retailing'){

            validation::string_validation(
                array(
                    'Product Size' => $prod_size
                )
            );
        }

        if($prod_size){
            validation::string_validation(
                array(
                    'Product size' => $prod_size
                )
            );
        }

       if($prod_code){
            validation::string_validation(
                array(
                    'Product Code' => $prod_size
                )
            );
        }

        if(empty($cat_name)){
            validation::empty_validation(
                array(
                    'Category name' => $cat_name
                )
            );
        }

        $fileupload = $this->fileupload($file_name,$file_type,$tmp_name,$prod_image);
        
        $catid = $this->get_category($cat_id,$cat_name,$date);

        $prodid = $this->addproducts(
            $prod_id,
            $prod_name,
            $prod_size,
            $selling_price,
            $catid,
            $prod_code,
            $fileupload,
            $date
        );

        if(!empty($qty)){
            $values = array(); 
            $placeholder = array(); 

            foreach($qty as $v){
                array_push($values, 
                    $v['qty_id'], 
                    $prodid,
                    $v['prod_qty'],
                    $v['createdAt'],
                    $this->code()
                ); 
                array_push($placeholder, '(?,?,?,?,?)');

            }

            $arrs = flatten($values); 

            $plc = implode(',', $placeholder); 

            DB::query("INSERT INTO product_qty(
                qty_id, 
                prod_id,
                prod_qty,
                createdAt,
                code
            ) VALUES ".$plc." ON DUPLICATE KEY UPDATE 
                prod_id = VALUES(prod_id),
                prod_qty = VALUES(prod_qty),
                createdAt = VALUES(createdAt)
            ", $arrs);
        }

        if(!empty($prodid)){
            $activity="Added new ".$prod." ".$prod_name."";
            history($_SESSION['edfghl'],'',$activity);

            echo $prod.' saved successfully!';
        }
        else{
            output($prod.'An error occured!');
            exit;
        }
  
    }


    public function update_category(){

        $industry = getIndustry($_SESSION['edfghl']);
        
        //Set produt type
        $prod = '';
        if($industry === 'service provider'){
            $prod = 'Service';
        }
        else{
            $prod = 'Product';
        }



        extract(json_decode($_POST['cat'], TRUE)); 

        //BEGIN VALIDATION 
        validation::empty_validation(
            array(
                $prod.' Category' => $cat_name
            )
        );
        
        validation::string_validation(
            array(
                'Category' => $cat_name
            )
        );
        DB::query("UPDATE category SET cat_name = ? WHERE cat_id =?", array($cat_name,$cat_id)); 
        echo $cat_name.' has been updated!'; 
    }
    
    public function delete_product(){
        DB::query("DELETE FROM products WHERE prod_id = ?", array($_GET['prod_id']));
        echo '';
    }

    public function delete_qty(){
        $id = $_GET['id'];
        DB::query("DELETE FROM product_qty WHERE qty_id = ?", array($id));

        echo '';
    }



    public function app_expiry(){
        $code = $this->code();
        $filename = 'app_expiry_'.$code.'_date';
        updateTextFiles($filename);
        echo 'Completed';
    }

    public function update_app_status(){
        DB::query("UPDATE settings SET app_status = 'expired' WHERE code = ? ",array($this->code()));
    }
    


}
