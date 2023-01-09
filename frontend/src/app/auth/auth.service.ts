import { Injectable } from "@angular/core";
import Cookies from "universal-cookie";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
    private url = 'http://localhost:8000/api/get-decoded-token';
    status = false;
    constructor(private http: HttpClient) {}
    public isAuthenticated(): boolean {
        const cookies = new Cookies();
        const token = cookies.get("token");
        if (token != undefined) {
            const request = this.http.post(this.url, {"token": token});
            
            request.subscribe({
                next: (response: any) => {
                    console.log(response.auth);
                    if (response.auth === true) {
                        localStorage.setItem('auth', 'true');
                    }
                    else {
                        localStorage.setItem('auth', 'false');
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

        let auth_state = localStorage.getItem('auth');

        console.log(auth_state);

        if (auth_state == 'true') {
            this.status = true;
        }
        else {
            this.status = false;
        }

        return this.status;
    }
}
