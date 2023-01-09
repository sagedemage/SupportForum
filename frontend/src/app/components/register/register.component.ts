import { Component } from '@angular/core';
import { PasswordValidator } from './password-validator';
import { FormBuilder, Validators } from '@angular/forms';
//import axios from 'axios';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	submitted = false;
	error = false;
	msg = '';

	constructor(
		private formBuilder: FormBuilder,
		public http: HttpClient
	) { }

	checkoutForm = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		username: ['', Validators.required],
		password: ['', [Validators.required, Validators.minLength(8)]],
		confirm: ['', Validators.required]
	})

	ngOnInit() {
		PasswordValidator();
	}

	onSubmit(): void {
		this.submitted = true;
		this.error = false;
		if (this.checkoutForm.valid) {
			let email = this.checkoutForm.value.email;
			let username = this.checkoutForm.value.username;
			let password = this.checkoutForm.value.password;
			let confirm = this.checkoutForm.value.confirm;

			if (password != confirm) {
				this.error = true;
				this.msg = "Passwords Do Not Match";
			}
			else {
				const url = 'http://localhost:8000/api/register';
				const body = {
					"email": email,
					"username": username,
					"password": password,
					"confirm": confirm
				}
				const request = this.http.post(url, body);

				request.subscribe({
					next: (response: any) => {
						console.log(response.registered);
						if (response.registered === true) {
							console.log(response.success_msg);
						}
						else {
							// display error message
							this.error = true;
							this.msg = response.err_msg;
							console.log(response.err_msg);
						}
					},
					error: (e) => {
						console.log(e);
					},
					complete: () => {
						console.info('completed')
					}
				});

			}
		}
	}
}

