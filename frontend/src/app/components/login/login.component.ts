import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
	submitted = false;
	error = false;
	msg = '';

	constructor(
		private formBuilder: FormBuilder
	) {}

	checkoutForm = this.formBuilder.group({
    	username: ['', Validators.required], 
    	password: ['', Validators.required]
  	});

	onSubmit(): void {
		let username = this.checkoutForm.value.username;
		let password = this.checkoutForm.value.password;
		this.submitted = true;
		this.error = false;
		if (this.checkoutForm.valid) {
			axios.post(`http://localhost:8000/api/login`, {
				username: username,
				password: password,
			}).then((response) => {
				const cookies = new Cookies();
				if (response.data.auth === true) {
					// set cookie
					//window.location.href = '/dashboard';
					cookies.set("token", response.data.token);
					console.log(response.data.success_msg);

				}
				else {
					// display error message
					this.error = true;
					this.msg = response.data.err_msg;
					console.log(response.data.err_msg);
				}
			}).catch(e => {
				console.log(e);
			})
		}
	}
}
