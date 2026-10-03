<?php
class productsprofile{

	public function findAllCategories()
    {
        $qry = DB::query("SELECT cat_id, cat_name FROM category WHERE code = ?",
        [getCode($_SESSION['edfghl'])]
        ) ?? [];
		echo json_encode($qry);
    }

    public function findAllProductQty()
    {
        $qry = DB::query(
            "SELECT prod_id, qty_id, prod_qty, createdAt AS quantity_date FROM product_qty WHERE code = ?",
            [getCode($_SESSION['edfghl'])]
        ) ?? [];

		echo json_encode($qry);
    }

    public function findAllProducts()
    {
        $qry = DB::query("SELECT * FROM products WHERE code = ?",
        [getCode($_SESSION['edfghl'])]
        ) ?? [];

		echo json_encode($qry);
    }

    public function findAllSales()
    {
        $qry = DB::query(
            "SELECT c.fullname, c.phone, t.createdAt AS sale_date, t.end_date, s.prod_id, s.qty
            FROM customers AS c
            INNER JOIN tax AS t
                ON t.cust_id = c.cust_id
            INNER JOIN sales AS s
                ON s.tax_id = t.tax_id
            WHERE
                t.code = ?
                AND t.trans_type = 'invoice'",
        [getCode($_SESSION['edfghl'])]
        ) ?? [];

		echo json_encode($qry);
    }

}


