<?php
class crm{

    public function get_crm(){
        $qry = DB::query("SELECT * FROM leads");
        echo json_encode($qry);
    }

}
