import { Component } from '@angular/core';
//import { PasswordValidator } from './password-validator';
import { FormBuilder, Validators } from '@angular/forms';
//import axios from 'axios';
import { HttpClient } from '@angular/common/http';

const lowerCaseLetters: RegExp = /[a-z]/g;
const upperCaseLetters: RegExp = /[A-Z]/g;
const numeric: RegExp = /[0-9]/g;

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	submitted = false;
	error = false;
	msg = '';
	progressbarValue = 0;
	password_field = (<HTMLInputElement>document.getElementById("password"));
	password_statuses = new Map<string, boolean>();

	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient
	) { 
		this.password_statuses.set("lower_case", false);
		this.password_statuses.set("upper_case", false);
		this.password_statuses.set("number", false);
		this.password_statuses.set("good_length", false);
	}

	checkoutForm = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		username: ['', Validators.required],
		password: ['', [Validators.required, Validators.minLength(8)]],
		confirm: ['', Validators.required]
	})

	public increase_bar(password_status: string, info_id: string) {
		if (!this.password_statuses.get(password_status)) {
			this.progressbarValue += 33.33;
			this.password_statuses.set(password_status, true);
			document.getElementById(info_id)!.style.color="green";
		}
	}

	public decrease_bar(password_status: string, info_id: string) {
		if (this.password_statuses.get(password_status)) {
			this.progressbarValue -= 33.33;
			this.password_statuses.set(password_status, false);
			document.getElementById(info_id)!.style.color="darkred";
		}
	}

	onKey(event: any) {
		if (event.target.value.match(lowerCaseLetters)) {
			this.increase_bar("lower_case", "has_lowercase");
		}
		else {
			this.decrease_bar("lower_case", "has_lowercase");
		}
		if (event.target.value.match(upperCaseLetters)) {
			this.increase_bar("upper_case", "has_uppercase");
		}
		else {
			this.decrease_bar("upper_case", "has_uppercase");
		}

		if (event.target.value.match(numeric)) {
			this.increase_bar("number", "has_number");
		}
		else if (!event.target.value.match(numeric)) {
			this.decrease_bar("number", "has_number");
		}
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

