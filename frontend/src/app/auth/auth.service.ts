import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Cookies from 'universal-cookie';
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

const url: string = 'http://localhost:8000/api/get-decoded-token';

@Injectable()
export class AuthService {
    status = new BehaviorSubject(false);
    constructor(
        private http: HttpClient, 
        private router: Router
        ) { }
    public isAuthenticated(): Observable<boolean> {
        const token = new Cookies().get("token");
        if (token !== undefined) {
            const request = this.http.post(url, { "token": token });
            request.subscribe({
                next: (response: any) => {
                    if (response.auth === true) {
                        //this.status = true;
                        this.status.next(true);
                    }
                    else {
                        //this.status = false;
                        this.status.next(false);
                    }
                },
                error: (e) => {
                    console.log(e);
                }
            });
        }
        else {
            this.status.next(false);
        }
        return this.status.asObservable();
    }

    public logout() {
		const cookies = new Cookies();
		cookies.remove("token");
		//window.location.href = "/";
		this.router.navigate(['/']);
	}
}
