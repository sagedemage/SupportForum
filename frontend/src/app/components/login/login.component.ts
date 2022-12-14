import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
		console.log(this.checkoutForm.value);
	}

}
