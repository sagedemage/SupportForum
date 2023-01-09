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
	//status = localStorage.getItem('auth');
	status: boolean = false;

	public logout() {
		const cookies = new Cookies();
		cookies.remove("token");
		localStorage.removeItem("auth");
		window.location.href = "/";
	}

	constructor(public http: HttpClient) {}

	ngOnInit() {
		console.log(this.status);
		const url = 'http://localhost:8000/api/get-decoded-token';
		const cookies = new Cookies();
        const token = cookies.get("token");
		if (token != undefined) {
            const request = this.http.post(url, {"token": token});
            
            request.subscribe({
                next: (response: any) => {
                    console.log(response.auth);
                    if (response.auth === true) {
                        localStorage.setItem('auth', 'true');
						this.status = true;
                    }
                    else {
                        localStorage.setItem('auth', 'false');
						this.status = false;
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

