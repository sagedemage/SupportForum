import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    status = false;
    constructor() {}
    public isAuthenticated(): boolean {
        let auth_state = localStorage.getItem('auth');

        if (auth_state === 'true') {
            this.status = true;
        }
        else {
            this.status = false;
        }

        return this.status;
    }
}
