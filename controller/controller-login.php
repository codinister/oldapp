<?php
	class login{

		public function signin(){

			$username = $_POST['username']; 
			$password = $_POST['password'];

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

							$accesscontrols = DB::query("SELECT *  FROM accesscontrol WHERE code  = ?",array($code));

							$sett = DB::query("SELECT * FROM settings WHERE code = ?",array($code));

							$sett[0]['comp_terms'] = html_entity_decode($sett[0]['comp_terms']);


							echo json_encode(
									array(
										'user_id' => $_SESSION['edfghl'],
										'code' => $user? $user['code']: '',
										'firstname' => $user? $user['firstname']: '',
										'lastname' => $user? $user['lastname'] : '',
										'login_date' => $user? $user['login_date'] : '',

				'accesscontrol' => $accesscontrols,
										'phone' => $user? $user['phone'] : '',
										'email' => $user? $user['email'] : '',
										'residence' => $user? $user['residence'] : '',
										'photo' => $user? $user['photo'] : '',
										'birthdate' => $user? $user['birthdate'] : '',
										'hire_date' => $user? $user['hire_date'] : '',
										'role_id' => $user? $user['role_id'] : '',
										'signature' => $user? $user['signature'] : '', 
										'settings' => $sett ? $sett : [],
								
									)
							);
						}
						else{
							echo "Invalid Password/Username!";
							exit;
						}
			}
			else{
				echo "Invalid Password/Username!";
				exit;
			}
		}


	}
?>

