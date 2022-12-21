import { Component } from '@angular/core';
import { PasswordValidator } from './password-validator';
import { FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	submitted = false;

	constructor(
		private formBuilder: FormBuilder
	) {}

	checkoutForm = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		username: ['', Validators.required],
		password: ['', Validators.required],
		confirm: ['', Validators.required]
	})

	ngOnInit() {
		PasswordValidator();
  	}

	onSubmit(): void {
		this.submitted = true;
		if (this.checkoutForm.valid) {
			let email = this.checkoutForm.value.email;
			let username = this.checkoutForm.value.username;
			let password = this.checkoutForm.value.password;
			let confirm = this.checkoutForm.value.confirm;

			axios.post(`http://localhost:8000/api/register`, {
				email: email,
				username: username,
				password: password,
				confirm: confirm
			}).then((response) => {
				if (response.data.registered === true) {
					// set cookie
					//window.location.href = '/dashboard';
					console.log(response.data.success_msg);
				}
				else {
					// display error message
					console.log(response.data.err_msg);
				}
			}).catch(e => {
				console.log(e);
			})
		}
	}
}

