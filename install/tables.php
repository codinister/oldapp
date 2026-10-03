<?php

function tables($conn){ 

	$tbl1 = "
	CREATE TABLE IF NOT EXISTS users(
	user_id INT(11) NOT NULL AUTO_INCREMENT,
	firstname VARCHAR(100) NOT NULL,
	lastname VARCHAR(100) NOT NULL,
	phone VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	residence VARCHAR(100) NOT NULL,
	photo VARCHAR(100) NOT NULL,
	hire_date DATE NOT NULL,
	login_date DATETIME NOT NULL,
	createdAt  DATETIME ,
	updatedAt DATETIME,
	birthdate DATE NOT NULL,
	signature VARCHAR(100) NOT NULL,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	status VARCHAR(100)  NOT NULL DEFAULT 'Unblock', 
	role_id INT(11) NOT NULL,
	facebook VARCHAR(100) NOT NULL, 
	twitter VARCHAR(100) NOT NULL, 
	instagram VARCHAR(100) NOT NULL, 
	code VARCHAR(255) NOT NULL,
	passwordresetcode VARCHAR(255) NOT NULL,
	passwordresetexpiry VARCHAR(255) NOT NULL,
	PRIMARY KEY(user_id)
	)ENGINE=InnoDB;
	";
	$conn->query($tbl1);


	$tbl2 = "
	CREATE TABLE IF NOT EXISTS settings(
	comp_id INT(11) NOT NULL AUTO_INCREMENT,
	comp_name VARCHAR(100) NOT NULL,
	comp_addr VARCHAR(100) NOT NULL,
	comp_phone VARCHAR(100) NOT NULL,
	comp_email VARCHAR(100) NOT NULL,
	comp_website VARCHAR(100) NOT NULL,
	comp_terms TEXT NOT NULL,
	comp_logo VARCHAR(100) NOT NULL,
	comp_location VARCHAR(100) NOT NULL,
	comp_bank VARCHAR(100) NOT NULL,
	bank_acc VARCHAR(100) NOT NULL,
	acc_name VARCHAR(100) NOT NULL,
	currency VARCHAR(100) NOT NULL,
	duration VARCHAR(100) NOT NULL,
	version  VARCHAR(100) NOT NULL,
	createdAt  DATETIME ,
	sms_sender_id  VARCHAR(100) NOT NULL,
	sms_api_key  VARCHAR(100) NOT NULL,
	sms_api_url  VARCHAR(100) NOT NULL,
	sms_cc  VARCHAR(100) NOT NULL,
	activate_receipt_sms  VARCHAR(100) NOT NULL,
	vat VARCHAR(100) NOT NULL,
	nhil  VARCHAR(100) NOT NULL,  
	getfund   VARCHAR(100) NOT NULL,  
	covid   VARCHAR(100) NOT NULL,
	withholdingtax  VARCHAR(100) NOT NULL, 
	code VARCHAR(255) NOT NULL,
	industry VARCHAR(255) NOT NULL,
	receipt_type VARCHAR(255) NOT NULL,
	app_expiry_date DATETIME,
	app_status VARCHAR(255) NOT NULL,
	users VARCHAR(255) NOT NULL,
	digitaladdress   VARCHAR(255) NOT NULL,
	PRIMARY KEY(comp_id)
	)ENGINE=InnoDB;
	";
	$conn->query($tbl2);


	$tbl3 = "
	CREATE TABLE IF NOT EXISTS history(
	hist_id int(11) NOT NULL AUTO_INCREMENT,
	activity varchar(100) NOT NULL,
	createdAt  DATETIME ,
	updatedAt DATETIME,
	link TEXT NOT NULL,
	user_id int(11) NOT NULL,
	FOREIGN KEY hist1(user_id) REFERENCES users(user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	code VARCHAR(255) NOT NULL,
	PRIMARY KEY(hist_id)
	) ENGINE=InnoDB;
	";
	$conn->query($tbl3);


	$tbl4 = "
	CREATE TABLE category (
	cat_id int(11) NOT NULL AUTO_INCREMENT,
	cat_name varchar(100) NOT NULL,
	ref varchar(100) NOT NULL,
	createdAt  DATETIME ,
	updatedAt DATETIME,
	code VARCHAR(255) NOT NULL,
	PRIMARY KEY(cat_id)
	) ENGINE=InnoDB";
	$conn->query($tbl4);


	$tbl5 = "
	CREATE TABLE products (
	prod_id INT(11) NOT NULL AUTO_INCREMENT,
	prod_code varchar(100) NOT NULL,
	prod_name varchar(100) NOT NULL,
	prod_size varchar(100) NOT NULL,
	prod_image varchar(100) NOT NULL,
	cat_id int(11) NOT NULL,
	buying_price varchar(100) NOT NULL,
	selling_price varchar(100) NOT NULL,
	createdAt  DATETIME,
	updatedAt DATETIME,
	package  varchar(100) NOT NULL,
	updated_on datetime NOT NULL,
	FOREIGN KEY fkcat(cat_id) REFERENCES category(cat_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	code VARCHAR(255) NOT NULL,
	PRIMARY KEY(prod_id)
	) ENGINE=InnoDB";
	$conn->query($tbl5);


	$tbl6 = "
	CREATE TABLE product_qty (
	qty_id INT(11) NOT NULL AUTO_INCREMENT,
	prod_qty varchar(100) NOT NULL,
	prod_id INT(11) NOT NULL,
	createdAt  DATETIME ,
	updatedAt DATETIME,
	FOREIGN KEY fkqty(prod_id) REFERENCES products(prod_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	code VARCHAR(255) NOT NULL,
	PRIMARY KEY(qty_id)
	) ENGINE=InnoDB";
	$conn->query($tbl6);


	$tbl7 = "
	CREATE TABLE IF NOT EXISTS customers(
	cust_id INT(11) NOT NULL AUTO_INCREMENT,
	fullname VARCHAR(100) NOT NULL,
	phone VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL, 
	location VARCHAR(100) NOT NULL,
	description TEXT,
	createdAt  DATETIME ,
	updatedAt DATETIME,
	user_id INT(11) NOT NULL,
	type VARCHAR(255) NOT NULL,
	ref_id INT(11) NOT NULL,
	ref_type VARCHAR(100) NOT NULL,
	ref VARCHAR(100) NOT NULL,
	FOREIGN KEY fkuss1(user_id) REFERENCES users(user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	code VARCHAR(255) NOT NULL,
	PRIMARY KEY(cust_id)
	)ENGINE=InnoDB;
	";
	$conn->query($tbl7);


	$tbl8 = "
	CREATE TABLE IF NOT EXISTS tax(
	tax_id INT AUTO_INCREMENT NOT NULL,
	vat	 VARCHAR(100) NOT NULL,
	nhil VARCHAR(100) NOT NULL,	
	getfund	 VARCHAR(100) NOT NULL,
	covid VARCHAR(100) NOT NULL,
	withholdingtax VARCHAR(100) NOT NULL,
	vat_rate VARCHAR(100) NOT NULL,
	nhil_rate VARCHAR(100) NOT NULL,	
	getfund_rate VARCHAR(100) NOT NULL,
	covid_rate VARCHAR(100) NOT NULL,
	withholdingtax_rate VARCHAR(100) NOT NULL,
	subtotal  VARCHAR(100) NOT NULL,
	discount VARCHAR(100) NOT NULL,	
	total VARCHAR(100) NOT NULL,	
	profile VARCHAR(100) NOT NULL,
	transportation  VARCHAR(100) NOT NULL,
	installation VARCHAR(100) NOT NULL,
	location  VARCHAR(100) NOT NULL,
	trans_type VARCHAR(100) NOT NULL,
	createdAt  DATETIME ,
	updatedAt DATETIME,
	cust_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	prepared_by  INT(11) NOT NULL,
	note TEXT NOT NULL,
	FOREIGN KEY fkcid(cust_id) REFERENCES customers(cust_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY fkusid(user_id) REFERENCES users(user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	code VARCHAR(255) NOT NULL,
	addbank INT(11) NOT NULL,
	PRIMARY KEY(tax_id)
	)ENGINE=InnoDB;
	";
	$conn->query($tbl8);


	$tbl9 = "
	CREATE TABLE IF NOT EXISTS payment_history(
	pay_id INT(11) NOT NULL AUTO_INCREMENT,
	pay_type VARCHAR(100) NOT NULL,
	payment VARCHAR(100) NOT NULL,
	createdAt  DATETIME ,
	updatedAt DATETIME,
	tax_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	bank_acc_number VARCHAR(255) NOT NULL,
	FOREIGN KEY fkuisid(tax_id) REFERENCES tax(tax_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY fkusserid(user_id) REFERENCES users(user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	code VARCHAR(255) NOT NULL,
	PRIMARY KEY(pay_id)
	)ENGINE=InnoDB;
	";
	$conn->query($tbl9);


	$tbl10 = "
	CREATE TABLE IF NOT EXISTS sales(
	s_id INT(11) AUTO_INCREMENT NOT NULL ,
	qty VARCHAR(100) NOT NULL,
	prod_id INT(11) NOT NULL,
	prod_name VARCHAR(100) NOT NULL,
	duration FLOAT NOT NULL,
	unit_price VARCHAR(100) NOT NULL,
	total VARCHAR(100) NOT NULL,
	tax_id INT(11) NOT NULL,
	createdAt  DATETIME ,
	updatedAt DATETIME,
	code VARCHAR(255) NOT NULL,
	exp_date DATETIME,
	PRIMARY KEY(s_id)
	)ENGINE=InnoDB;
	";
	$conn->query($tbl10);


	$tbl11 = "
	CREATE TABLE IF NOT EXISTS note(
	note_id INT(11) NOT NULL AUTO_INCREMENT,
	subject  VARCHAR(100) NOT NULL,
	title  VARCHAR(100) NOT NULL,
	message TEXT NOT NULL,
	note_type  VARCHAR(100) NOT NULL,
	note_status  VARCHAR(100) NOT NULL,
	createdAt  DATETIME ,
	updatedAt DATETIME,
	user_id INT(11) NOT NULL,
	recp_id INT(11) NOT NULL,
	FOREIGN KEY fknsid(user_id) REFERENCES users(user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY recid(recp_id) REFERENCES users(user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	code VARCHAR(255) NOT NULL,
	PRIMARY KEY (note_id)
	)ENGINE=InnoDB;
	";
	$conn->query($tbl11);
	

	$tbl12 = "
	CREATE TABLE IF NOT EXISTS menu (
	menu_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	menu_name VARCHAR(150) NOT NULL,
	createdAt  DATETIME ,
	updatedAt DATETIME,
	menu_parent VARCHAR(150) NOT NULL
	)ENGINE=InnoDB;
	";
	$conn->query($tbl12);
	

	$tbl13 = "
	CREATE TABLE IF NOT EXISTS user_menu (
	usermenu_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	menu_name VARCHAR(150) NOT NULL,
	menu_parent VARCHAR(150) NOT NULL,
	menu_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	createdAt  DATETIME ,
	updatedAt DATETIME,
	code VARCHAR(255) NOT NULL,
	FOREIGN KEY fmd(user_id) REFERENCES users(user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY fmpoid(menu_id) REFERENCES menu(menu_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
	)ENGINE=InnoDB;
	";
	$conn->query($tbl13);




	$tbl14 = "
	CREATE TABLE IF NOT EXISTS contracts (
	cont_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255) NOT NULL,
	start_date DATETIME, 
	refferedtoas VARCHAR(255) NOT NULL,
	contractnumber VARCHAR(255) NOT NULL,
	tax_id INT(11) NOT NULL,
	cust_id INT(11) NOT NULL,
	code VARCHAR(255) NOT NULL,
	otherinfo TEXT NOT NULL, 
	FOREIGN KEY taxfk(tax_id) REFERENCES tax(tax_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE, 
	FOREIGN KEY cutomerfk(cust_id) REFERENCES customers(cust_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
	)ENGINE=InnoDB;
	";
	$conn->query($tbl14);






	
}

?>
