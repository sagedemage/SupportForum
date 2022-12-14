import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
	constructor(
		private formBuilder: FormBuilder
	) {}

	checkoutForm = this.formBuilder.group({
    	username: '',
    	password: ''
  	});

	onSubmit(): void {
		let username = this.checkoutForm.value.username;
		let password = this.checkoutForm.value.password;

		axios.post(`http://localhost:8000/api/login`, {
			username: username,
			password: password,
		}).then((response) => {
			if (response.data.auth === true) {
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
