        /*===============================================
		* BEGIN DATE FORMATTING
		*===============================================
		*/
		//formatDate(dateobject);
		const formatDate = function(dateObject) {
			var d = new Date(dateObject);
			var day = d.getDate();
			var months = d.getMonth() + 1;
			var month;

			switch(months){
				case 1:
				month = 'Jan';
				break;
				case 2:
				month = 'Feb';
				break;
				case 3:
				month = 'Mar';
				break;
				case 4:
				month = 'Apr';
				break;
				case  5:
				month = 'May';
				break;
				case 6:
				month = 'Jun';
				break;
				case 7:
				month = 'Jul';
				break;
				case 8:
				month = 'Aug';
				break;
				case 9:
				month = 'Sep';
				break;
				case 10:
				month = 'Oct';
				break;
				case 11:
				month = 'Nov';
				break;
				case 12:
				month = 'Dec';
				break;
			}
			var year = d.getFullYear();
			if (day < 10) {
				day = "0" + day;
			}
			if (month < 10) {
				month = "0" + month;
			}
			var date = day + " " + month + " " + year;
			return date;
		};
		/*
		*===============================================
		* END DATE FORMATTING
		*===============================================
		*/		

			/*
			* ========================================
			* Error Class
			Errors.warning(response)
			Errors.success(response)
			Errors.loading()
			* ========================================
			*/
			class ErrorHandling{
				
				warning(response){
					const warning = `
					<div class="alert alert-warning alert-dismissible fade show" id="hideme">
					<strong>Warning!</strong> ${response}
					</div>
					`;
					return warning;
				}

				success(response){
					const success = `
					<div class="alert alert-success alert-dismissible fade show" id="hideme">
					<strong>Success!</strong> ${response}
					</div>
					`;
					return success;
				}

				loading(){
					return `<div class="imgbx text-center p-3"><img src="assets/images/load.gif" alt=""></div>`;
				
				}

			}


			var Errors = new ErrorHandling;


		//getIDvalue(input_id);
		function getIDvalue(name){
			return document.getElementById(name).value;
		}

		//setIDvalue(input_id, assign_input_value);	
		function setIDvalue(name, val){
			return document.getElementById(name).value = val;
		}

		//selectID(id_name);
		function selectID(name){
			return document.getElementById(name);
		}

		//getClassValue(input_class);
		function getClassValue(name){
			return document.querySelector(`.${name}`).value;
		}



		//setClassValue(input_class, assign_val);
		function setClassValue(name, val){
			return document.querySelector(`.${name}`).value = val;
		}

		//seoectCoass(class);
		function selectClass(name){
			return document.querySelector(`.${name}`);
		}

		//selectAll(selector);
		function selectAll(name){
			return document.querySelectorAll(name);
		}

		//clog(data);
		var clog = console.log;

		//result(id, data);
		var result = (id, data) => {
			return document.getElementById(id).innerHTML = data;
		}


		//result2(cls, data);
		var result2 = (cls, data) => {
			return document.querySelector(`.${cls}`).innerHTML = data;
		}


		//response(id, response)
		var response = (id, data) => {
			console.log(data);
			if(data.indexOf('errors') != -1){
				result(id, Errors.warning(data));
				setTimeout(function(){
                    document.getElementById('hideme').style.display = 'none';
                }, 3000);
			}
			else{
				result(id, Errors.success(data));
				setTimeout(function(){
                    document.getElementById('hideme').style.display = 'none';
                }, 3000);
			}
		}

		//loading();
		function loading(){
				var load = `<div class="imgbx text-center p-3"><img src="assets/images/load.gif" alt="Loading"></div>`;
				return load;
		}

		function unavailable_output(val,prosizeid,n, status = ''){

			const role = localStorage.getItem('urole').toLowerCase();
			if(role == 'admin'){
				var link = "?page=editinvoice&inv_no="+val['invoice_no']+"&cust_id="+val['cust_id']+"";
			}
			else{
				var link = 'javascript:void(0);'
			}
		
			return `
			<div class="text-dark  row">
			<div class="col-sm-12 col-md-1">	
			<div class="custom-control custom-checkbox" style="margin-top: -14px;">
			<br>
			<input type="checkbox" class="chkAll${val['cat_id']} custom-control-input prods p${val['prod_size']}${val['cat_id']}"  id="${prosizeid}${n}"
			data-prod_name = "${val['prod_name']}"
			data-prod_qty = ${val['product_sold']}
			data-prod_location = "${val['prod_location']}"
			data-prod_size = "${val['prod_size']}"
			data-prod_image = "${val['prod_image']}"
			data-prod_id = "${val['prod_id']}"
			data-cat_id = "${val['cat_id']}"
			data-cat_name = "${val['cat_name']}"
			 ${status}
			>
			<label class="custom-control-label badge badge-success" for="${prosizeid}${n}">
			${n}
			</label>
			</div>

			</div>
			<div class="col-sm-12 col-md-1">
			<a href="javascript:void(0);" data-toggle="modal" data-target="#viewproduct">
			<img src="assets/images/pic.jpg" style="width: 100%;" class="viewimage" data-prod_id = "${val['prod_id']}">
			</a>
			</div>
			<div class="col-sm-12 col-md-5 searchp_word" data-prod_qty = "${Number(val['product_sold'])}"
			data-cat_id = "${val['cat_id']}"
			data-cat_name = "${val['cat_name']}"
			data-prod_size = "${val['prod_size']}"
			>
			<a href="${link}" title="Customer: ${val['fullname']}. 
			Invoice No. ${val['invoice_no']}
			Exp Date: ${formatDate(val['exp_date'])}">
			${val['prod_name']}
			</a>
			
			</div>
			<div class="col-sm-12 col-md-1">${Number(val['product_sold'])}</div>
			<div class="col-sm-12 col-md-3">${val['prod_location']}</div>
			<div class="col-sm-12 col-md-1">${val['prod_size']}</div>
			</div>
			</div>
			`;
			

		}

		function stocks_output(val,prosizeid,n, status = ''){
			return `
			<div class="text-dark  row">
			<div class="col-sm-12 col-md-1">	

			<div class="custom-control custom-checkbox" style="margin-top: -14px;">
			<br>
			<input type="checkbox" class="chkAll${val['cat_id']} custom-control-input prods p${val['prod_size']}${val['cat_id']}"  id="${prosizeid}${n}"
			data-prod_name = "${val['prod_name']}"
			data-prod_qty = ${val['prod_qty']}
			data-prod_location = "${val['prod_location']}"
			data-prod_size = "${val['prod_size']}"
			data-prod_image = "${val['prod_image']}"
			data-prod_id = "${val['prod_id']}"
			data-cat_id = "${val['cat_id']}"
			data-cat_name = "${val['cat_name']}"
			 ${status}
			>
			<label class="custom-control-label badge badge-success" for="${prosizeid}${n}">
			${n}
			</label>
			</div>

			</div>
			<div class="col-sm-12 col-md-1">
			<a href="javascript:void(0);" data-toggle="modal" data-target="#viewproduct"  	>
			<img src="assets/images/pic.jpg" style="width: 100%;" class="viewimage" data-prod_id = "${val['prod_id']}">
			</a>
			</div>
			<div class="col-sm-12 col-md-5 searchp_word" 
			data-prod_qty = "${val['prod_qty']}"
			data-cat_id = "${val['cat_id']}"
			data-cat_name = "${val['cat_name']}"
			data-prod_size = "${val['prod_size']}"
			>
			${val['prod_name']}</div>
			<div class="col-sm-12 col-md-1">${val['prod_qty']}</div>
			<div class="col-sm-12 col-md-3">${val['prod_location']}</div>
			<div class="col-sm-12 col-md-1">${val['prod_size']}</div>

			</div>
			</div>
			`;

        }

		function available_output(val,prosizeid,n, status = ''){
		
			return `
			<div class="text-dark  row">
			<div class="col-sm-12 col-md-1">	
			<div class="custom-control custom-checkbox" style="margin-top: -14px;">
			<br>
			<input type="checkbox" class="chkAll${val['cat_id']} custom-control-input prods p${val['prod_size']}${val['cat_id']}"  id="${prosizeid}${n}"
			data-prod_name = "${val['prod_name']}"
			data-prod_qty = ${val['product_remain']}
			data-prod_location = "${val['prod_location']}"
			data-prod_size = "${val['prod_size']}"
			data-prod_image = "${val['prod_image']}"
			data-prod_id = "${val['prod_id']}"
			data-cat_id = "${val['cat_id']}"
			data-cat_name = "${val['cat_name']}"
			 ${status}
			>
			<label class="custom-control-label badge badge-success" for="${prosizeid}${n}">
			${n}
			</label>
			</div>

			</div>
			<div class="col-sm-12 col-md-1">
			<a href="javascript:void(0);" data-toggle="modal" data-target="#viewproduct">
			<img src="assets/images/pic.jpg" style="width: 100%;" class="viewimage" data-prod_id = "${val['prod_id']}">
			</a>
			</div>
			<div class="col-sm-12 col-md-5 searchp_word" data-prod_qty = "${Number(val['product_remain'])}"
			data-cat_id = "${val['cat_id']}"
			data-cat_name = "${val['cat_name']}"
			data-prod_size = "${val['prod_size']}"
			>${val['prod_name']}</div>
			<div class="col-sm-12 col-md-1">${Number(val['product_remain'])}</div>
			<div class="col-sm-12 col-md-3">${val['prod_location']}</div>
			<div class="col-sm-12 col-md-1">${val['prod_size']}</div>
			</div>
			</div>
			`;
			

		}

		function product_output(val,prodid,n, status = ''){
			//const cur = localStorage.getItem('currency')

			return `
			<div class="text-dark  row">
			<div class="col-sm-12 col-md-1">	

			<div class="custom-control custom-checkbox" style="margin-top: -14px;">
			<br>
			<input type="checkbox" class="custom-control-input prods p${val['prod_id']}${val['cat_id']}"  id="${prodid}${n}"
			data-prod_name = "${val['prod_name']}"
			data-prod_qty = ${val['prod_qty']}
			data-prod_id = "${val['prod_id']}"
			data-cat_id = "${val['cat_id']}"
			data-selling_price = "${val['selling_price']}"
			data-date = "${val['date']}"
			data-cat_name = "${val['cat_name']}"
			 ${status}
			>
			<label class="custom-control-label badge badge-success" for="${prodid}${n}">
			${n}
			</label>
			</div>

			</div>
			<div class="col-sm-12 col-md-2 searchp_word" data-prod_qty = "${val['prod_qty']}">${val['prod_name']}</div>
			<div class="col-sm-12 col-md-2">${val['selling_price']}</div>
			<div class="col-sm-12 col-md-1">${val['prod_qty']}</div>
			<div class="col-sm-12 col-md-1">${val['sold']}</div>
			<div class="col-sm-12 col-md-1">${val['remaining']}</div>

			<div class="col-sm-12 col-md-2">${formatDate(val['date'])}</div>
			<div class="col-sm-12 col-md-1">

			<div class="row p-0">
			<div class="col-sm-12 col-md-6 p-0 ">
			<a href="javascript:void(0);" data-toggle="modal" data-target="#editproduct" class="editproduct" data-prod_id = "${val['prod_id']}"
			data-uprod_name = "${val['prod_name']}"
			data-uprod_qty = "${val['prod_qty']}"
			data-udate = "${val['date']}"
			data-uprod_id = "${val['prod_id']}"
			data-ucat_id = "${val['cat_id']}"
			data-ucat_name = "${val['cat_name']}"
			data-uselling_price = "${val['selling_price']}"
			
			>
			<i class="fa fa-edit editprod" style="font-size: 11px;"></i>
			</a>
			</div>

			<div class="col-sm-12 col-md-6  p-0 text-right">
			<a href="javascript:void(0);" class="deleteproduct" data-prod_id = "${val['prod_id']}">
			<i class="fa fa-trash" style="font-size: 11px;"></i>
			</a>
			</div>
			</div>

			</div>
			</div>
			`;

		}

		var categories = ()=>{


			fetch('router.php?controller=products&task=categories')
			.then(resp => resp.text())
			.then(data => {
			document.getElementById('category').innerHTML = data;
			});
		}


		
		function sms_response(data, results){

			const output = data.split(',')[0];
			const numb = output.replace(/['"]+/g, '');
			const outpt = Number(numb);

			console.log(outpt);

			switch(outpt){
                case  "1000":
                var res = 'Message submited successful';
                break;

                case  "1002":
                var res = 'SMS sending failed';
                break;

                case  "1003":
                var res = 'insufficient balance';
                break;

                case  "1004":
                var res = 'invalid API key';
                break;

                case  "1005":
                var res = 'invalid Phone Number';
                break;

                case  "1006":
                var res = 'invalid Sender ID. Sender ID must not be more than 11 Characters. Characters'; 
                break;

                case  "1007":
                var res = 'Message scheduled for later delivery';
                break;

                case  "1008":
                var res = 'Empty Message';
                break;

                case  "1009":
                var res = 'Empty from date and to date';
                break;

                case  "1010":
                var res = 'No mesages has been sent on the specified dates using the specified api key';
                break;

                case  "1011":
                var res = 'Numeric Sender IDs are not allowed';
                break;

                case  "1012":
                var res = 'Sender ID is not registered. Please contact our support team via senderids@mnotify.com or call 0200896265 for assistance';
                break;
                default:
                var res = 'Completed!';
                break;

            }
            
         


            if(data.indexOf('errors') != -1){
				result(results, Errors.warning(data));
				setTimeout(function(){
                    document.getElementById('hideme').style.display = 'none';
                }, 3000);
			}
			else{
				result(results, Errors.success(res));
				setTimeout(function(){
                    document.getElementById('hideme').style.display = 'none';
                }, 3000);
			}


		}


	
		function get_sub_accounts(arrs, ac_id){
			var output = [];
	
			const data = arrs.filter(v => {
				return v.ac_id == ac_id;
			});
			//BEGIN STEP 1
			data.forEach(v => {
				var par_id1 = v.par_id;
				var ac_id1 = v.ac_id;
				output.push(v.account_name);
				
				
				//Begin Step 2
				const res2 = arrs.filter(va => {
					return (va.par_id == par_id1 && va.par_type == ac_id1);
				});
				res2.forEach(v2 => {
				var par_id2 = v2.par_id;
				var ac_id2 = v2.ac_id;
				output.push(v2.account_name);
				
						
						//Begin Step 3
						const res3 = arrs.filter(va => {
						return (va.par_id == par_id2 && va.par_type == ac_id2);
						});
						res3.forEach(v3 => {
						var par_id3 = v3.par_id;
						var ac_id3 = v3.ac_id;
						output.push(v3.account_name);
				
				
						//Begin Step 4
						const res4 = arrs.filter(va => {
						return (va.par_id == par_id3 && va.par_type == ac_id3);
						});
						res4.forEach(v4 => {
						var par_id4 = v4.par_id;
						var ac_id4 = v4.ac_id;
						output.push(v4.account_name);
				
				
						//Begin Step 5
						const res5 = arrs.filter(va => {
						return (va.par_id == par_id4 && va.par_type == ac_id4);
						});
						res5.forEach(v5 => {
							output.push(v5.account_name);
						})
						//End Stemp 5
				
						 })
						//End Stemp 4
				
						})
						//End Stemp 3
				
						})
						//End Stemp 2
				
						});
						//END STEP 1
						return output;
	
		}


		function get_sub_accounts_id(arrs, ac_id){
			var output = [];
	
			const data = arrs.filter(v => {
				return v.ac_id == ac_id;
			});
			//BEGIN STEP 1
			data.forEach(v => {
				var par_id1 = v.par_id;
				var ac_id1 = v.ac_id;
				output.push(v.ac_id);
				
				
				//Begin Step 2
				const res2 = arrs.filter(va => {
					return (va.par_id == par_id1 && va.par_type == ac_id1);
				});
				res2.forEach(v2 => {
				var par_id2 = v2.par_id;
				var ac_id2 = v2.ac_id;
				output.push(v2.ac_id);
				
						
						//Begin Step 3
						const res3 = arrs.filter(va => {
						return (va.par_id == par_id2 && va.par_type == ac_id2);
						});
						res3.forEach(v3 => {
						var par_id3 = v3.par_id;
						var ac_id3 = v3.ac_id;
						output.push(v3.ac_id);
				
				
						//Begin Step 4
						const res4 = arrs.filter(va => {
						return (va.par_id == par_id3 && va.par_type == ac_id3);
						});
						res4.forEach(v4 => {
						var par_id4 = v4.par_id;
						var ac_id4 = v4.ac_id;
						output.push(v4.ac_id);
				
				
						//Begin Step 5
						const res5 = arrs.filter(va => {
						return (va.par_id == par_id4 && va.par_type == ac_id4);
						});
						res5.forEach(v5 => {
							output.push(v5.ac_id);
						})
						//End Stemp 5
				
						 })
						//End Stemp 4
				
						})
						//End Stemp 3
				
						})
						//End Stemp 2
				
						});
						//END STEP 1
						return output;
	
		}


		/*=======================
		response(id, response )
		result(id, data);
		clog(data);
		selectAll(selector);
		seoectCoass(class);
		setClassValue(input_class, assign_val);
		getClassValue(input_class);
		selectID(id_name);
		setIDvalue(input_id, assign_input_value);	
		getIDvalue(input_id);
		formatDate(dateobject);
		loading()
		product_output(val,prosizeid,n);
		sms_response(data, result);
		=======================*/

		function whatsapp(phone){
			const phn = phone.split(' ').join('');
			const phn2 = phn.split('+233');
			let phn3;
		
			if(phn2.toString().length > 10){
				phn3 = phone;
			}
			else{
				const mobile = (phn2[1])? phn2[1] : phn2[0];
				phn3 = `+233${mobile}`;
			}
			return `http://wa.me/${phn3}`;
		}

	export{formatDate,Errors,getIDvalue,setIDvalue,selectID,getClassValue,setClassValue, selectClass,selectAll, clog, result, response,loading,product_output, categories, available_output, unavailable_output, stocks_output,result2,sms_response,get_sub_accounts,get_sub_accounts_id,whatsapp};
