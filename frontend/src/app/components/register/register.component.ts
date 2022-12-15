import { Component } from '@angular/core';
import { PasswordValidator } from './password-validator';
import { FormBuilder } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	constructor(
		private formBuilder: FormBuilder
	) {}

	checkoutForm = this.formBuilder.group({
		email: '',
		username: '',
		password: '',
		confirm: ''
	})

	ngOnInit() {
		PasswordValidator();
  	}

	onSubmit(): void {
		let email = this.checkoutForm.value.email;
		let username = this.checkoutForm.value.username;
		let password = this.checkoutForm.value.password;
		let confirm = this.checkoutForm.value.confirm;

		console.log(email);
		console.log(username);
		console.log(password);
		console.log(confirm);

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

