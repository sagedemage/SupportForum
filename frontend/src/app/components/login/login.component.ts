import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
		private formBuilder: FormBuilder,
		public http: HttpClient,
		private router: Router,
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
			const url = 'http://localhost:8000/api/login';
			const request = this.http.post(url, {"username": username, "password": password});
            
            request.subscribe({
                next: (response: any) => {
                    console.log(response.auth);
                    if (response.auth === true) {
                        // set cookie
						const cookies = new Cookies();
						cookies.set("token", response.token);
						console.log(response.success_msg);
						this.router.navigateByUrl('/dashboard');
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
