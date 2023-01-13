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
	password_field: HTMLInputElement = (<HTMLInputElement>document.getElementById("password"));
	password_statuses: Map<string, boolean>;

	constructor(
		private formBuilder: FormBuilder,
		public http: HttpClient
	) { 
		this.password_field = (<HTMLInputElement>document.getElementById("password"));
		this.password_statuses = new Map<string, boolean>();
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

	onKey(event: any) {
		if (event.target.value.match(lowerCaseLetters) && !this.password_statuses.get("lower_case")) {
			console.log("increase");
			this.progressbarValue += 33.33;
			this.password_statuses.set("lower_case", true);
			document.getElementById("has_lowercase")!.style.color="green";
		}
		else if (!event.target.value.match(lowerCaseLetters) && 
			this.password_statuses.get("lower_case")) {
			this.progressbarValue -= 33.33;
			this.password_statuses.set("lower_case", false);
			document.getElementById("has_lowercase")!.style.color="darkred";
		}

		if (event.target.value.match(upperCaseLetters) && 
			this.password_statuses.get("upper_case") === false) {
			this.progressbarValue += 33.33;
			this.password_statuses.set("upper_case", true)
			document.getElementById("has_uppercase")!.style.color="green";
		}
		else if (!event.target.value.match(upperCaseLetters) && 
			this.password_statuses.get("upper_case")) {
			this.progressbarValue -= 33.33;
			this.password_statuses.set("upper_case", false);
			document.getElementById("has_uppercase")!.style.color="darkred";
		}

		if (event.target.value.match(numeric) && this.password_statuses.get("number") === false) {
			this.progressbarValue += 33.33;
			this.password_statuses.set("number", true);
			document.getElementById("has_number")!.style.color="green";
		}
		else if (!event.target.value.match(numeric) && this.password_statuses.get("number")) {
			this.progressbarValue -= 33.33;
			this.password_statuses.set("number", false);
			document.getElementById("has_number")!.style.color="darkred";
		}
	}

	ngOnInit() {
		/*PasswordValidator();*/
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

