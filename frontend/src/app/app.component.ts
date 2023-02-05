import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	year = new Date().getFullYear();
	auth = new AuthService(this.http, this.router);

	constructor(
		private http: HttpClient, 
		private router: Router
	) {}
}

