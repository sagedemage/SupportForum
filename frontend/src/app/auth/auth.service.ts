import { Injectable } from "@angular/core";
import Cookies from 'universal-cookie';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class AuthService {
    status = false;
    url: string = 'http://localhost:8000/api/get-decoded-token';
    constructor(private http: HttpClient) {}
    public isAuthenticated(): boolean {
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
                }
            });
        }

        return this.status;
    }
}
