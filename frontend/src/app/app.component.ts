import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Cookies from 'universal-cookie';
//import { check_auth_one } from "src/app/auth/check_auth";

const url: string = 'http://localhost:8000/api/get-decoded-token';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	year = new Date().getFullYear();
	status: boolean = false;

	public logout() {
		const cookies = new Cookies();
		cookies.remove("token");
		window.location.href = "/";
	}

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.check_auth();
  	}

	public check_auth() {
		const token = new Cookies().get("token");
		if (token !== undefined) {
            const request = this.http.post(url, {"token": token});
            request.subscribe({
                next: (response: any) => {
                    if (response.auth === true) {
						this.status = true;
                    }
                    else {
						this.status = false;
                    }
                },
                error: (e) => {
                    console.log(e);
                },
            });
        }
  	}
}

