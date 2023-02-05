import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Cookies from 'universal-cookie';

const url: string = 'http://localhost:8000/api/get-decoded-token';

@Injectable()
export class AuthService {
    status = false;
    constructor(private http: HttpClient) { }
    public async isAuthenticated() {
        const token = new Cookies().get("token");
        if (token !== undefined) {
            const request = this.http.post(url, { "token": token });
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
