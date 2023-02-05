import { Injectable } from "@angular/core";
import Cookies from 'universal-cookie';
import { HttpClient } from "@angular/common/http";

const url: string = 'http://localhost:8000/api/get-decoded-token';

@Injectable()
export class AuthService {
    status = false;
    constructor(private http: HttpClient) {}
    public async isAuthenticated() {
        const token = new Cookies().get("token");
        console.log(token);
		if (token !== undefined) {
            const request = this.http.post(url, {"token": token});
            request.subscribe({
                next: (response: any) => {
                    if (response.auth === true) {
						this.status = true;
                        console.log("good");
                    }
                    else {
						this.status = false;
                        console.log("bad");
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
