import { Injectable } from "@angular/core";
//import axios from "axios";
import Cookies from "universal-cookie";

import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
    private url = 'http://localhost:8000/api/get-decoded-token';
    constructor(private http: HttpClient) { }
    public isAuthenticated(): boolean {
        const cookies = new Cookies();
        const token = cookies.get("token");
        let status = false;

        if (token != undefined) {
            const request = this.http.post(this.url, {"token": token});
            
            request.subscribe({
                next: (response: any) => {
                    //console.log(response.auth); 
                    status = response.auth;
                    console.log(status);
                },
                error: (e) => {
                    console.log(e);
                },
                complete: () => {
                    console.info('completed')
                }
            });
        }

        return status;
    }
}
