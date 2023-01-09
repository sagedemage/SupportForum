import { Injectable } from "@angular/core";
import Cookies from 'universal-cookie';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class AuthService {
    status = false;
    constructor(public http: HttpClient) {}
    public isAuthenticated(): boolean {
        const url = 'http://localhost:8000/api/get-decoded-token';
		const cookies = new Cookies();
        const token = cookies.get("token");
		if (token != undefined) {
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
                }
            });
        }

        return this.status;
    }
}
