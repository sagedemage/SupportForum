import { Component } from '@angular/core';

import { PasswordValidator } from './password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	ngOnInit() {
		PasswordValidator();
  	}
}

//PasswordValidator();
