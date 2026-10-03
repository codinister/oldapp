<?php
	class login{



		public function signin(){

			$arr =json_decode($_POST['data'],TRUE);

			extract($arr);

			validation::empty_validation(
				array(
					'User Name'=>$username, 
					'Password'=>$password
				)
			);

			$user = loginValidation($username);

			if($user){

					$hash_pass = $user['password'];
					$code = $user['code'];

						if(password_verify($password, $hash_pass)) {

							$_SESSION['edfghl'] = $user['user_id'];
							$_SESSION['roleid'] = $user['role_id'];

							//Update inactive users 
							$date = getCurrentDateTime();
							
							DB::query("UPDATE users SET  login_date = ? WHERE user_id = ?",array($date,$_SESSION['edfghl']));

							history($_SESSION['edfghl']);

							$privilege = DB::query("SELECT menu_name  FROM user_menu WHERE menu_parent = 'Privileges' AND  user_id = ?",array($_SESSION['edfghl']));

							$menu = DB::query("SELECT * FROM user_menu WHERE user_id =?",array($_SESSION['edfghl']));

							$sett = DB::query("SELECT * FROM settings WHERE code = ?",array($code));

							$sett[0]['comp_terms'] = html_entity_decode($sett[0]['comp_terms']);


							echo json_encode(
									array(
										'user_id' => $_SESSION['edfghl'],
										'code' => $user? $user['code']: '',
										'firstname' => $user? $user['firstname']: '',
										'lastname' => $user? $user['lastname'] : '',
										'login_date' => $user? $user['login_date'] : '',


										'phone' => $user? $user['phone'] : '',
										'email' => $user? $user['email'] : '',
										'residence' => $user? $user['residence'] : '',
										'photo' => $user? $user['photo'] : '',
										'birthdate' => $user? $user['birthdate'] : '',
										'hire_date' => $user? $user['hire_date'] : '',
										'role_id' => $user? $user['role_id'] : '',
										'signature' => $user? $user['signature'] : '',
										'menus' => $menu? $menu : [],  
										'settings' => $sett ? $sett : [],
										'superadmin' => getSuperadmin($_SESSION['edfghl'])
									)
							);
						}
						else{
							echo json_encode([
								"<span>Invalid Password/Username!</span>"
							]);
							exit;
						}
			}
			else{
				echo json_encode([
					"<span>Invalid Password/Username!</span>"
				]);
				exit;
			}
		}


		public function forgotpassword(){
			$email = $_POST['email'];
			$url = $_POST['url'];
			validation::email_validation($email); 
			
			$slct = DB::get_row("SELECT email,firstname,user_id,username FROM users WHERE email = ?",array($email));

			if($slct){
				if($slct['email']){
					$enc = encryption($slct['user_id']);
					$time = time() + (60 * 30); 
					DB::query("UPDATE users SET passwordresetcode = ?, passwordresetexpiry = ? WHERE email = ?
					",array($enc,$time,$email));

					$sett = DB::get_row('SELECT comp_name FROM settings');
					$comp_name = $sett['comp_name'];

					$message = "
					Dear ".$slct['firstname'].",\n\n

					We have received a request to reset the password for your account with the username '".$slct['username']."'. If you did not initiate this request, please ignore this email.\n\n

					To reset your password, Click on the following link to go to the password reset page:
					\n\n
					<a href='".$url."/index.html?page=resetpassword&c=".$enc."'>".$enc."</a>
					\n\n
					Please note that the link is only valid for 30mins. If you do not reset your password within this time, you will need to request another password reset.
					\n\n
					If you have any questions or concerns, please contact our support team at ".$comp_name.".
					";

					//sendEmail($email,'Password Reset Request',$message);

					echo 'Check your email for a password reset link!';
				}

			}
			else{
				output('Email does not exists!');
			}
		}

		public function resetpassword(){

			$password = $_POST['password'];
			$repassword = $_POST['repassword'];
			$code = $_POST['code'];

			validation::password_validation($password); 
			validation::password_validation($repassword); 

			if($password !== $repassword){
				output('Passwords doesn\'t match!');
			}

			$slct = DB::get_row("SELECT passwordresetcode,passwordresetexpiry FROM users WHERE passwordresetcode = ?",array($code));
			if($slct){
				if($slct['passwordresetcode'] && $slct['passwordresetexpiry']){
					$time = time();
					if($time <= $slct['passwordresetexpiry']){
						DB::query("UPDATE users SET password = ? WHERE passwordresetcode =? ",array(password_hash($password, PASSWORD_BCRYPT),$code));

						DB::query("UPDATE users SET passwordresetcode = '',passwordresetexpiry='' WHERE passwordresetcode =? ",array($code));

						echo 'Password reset!';
					}
					else{
						DB::query("UPDATE users SET passwordresetcode = '',passwordresetexpiry='' WHERE passwordresetcode =? ",array($code));
						output('Invalid password reset link!');
					}
				}
			}
			else{
				output('Invalid password reset link!');
			}

		}
	}
?>

