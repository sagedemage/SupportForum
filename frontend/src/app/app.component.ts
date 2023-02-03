import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Cookies from 'universal-cookie';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	year = new Date().getFullYear();
	status: boolean = false;
	url: string = 'http://localhost:8000/api/get-decoded-token';

	public logout() {
		const cookies = new Cookies();
		cookies.remove("token");
		window.location.href = "/";
	}

	constructor(private http: HttpClient) {}

	ngOnInit() {
		const token = new Cookies().get("token");
		if (token != undefined) {
            const request = this.http.post(this.url, {"token": token});
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

	public check_auth() {
		const token = new Cookies().get("token");
		if (token != undefined) {
            const request = this.http.post(this.url, {"token": token});
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

