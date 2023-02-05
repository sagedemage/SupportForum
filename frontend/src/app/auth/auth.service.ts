import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { check_auth_one } from "src/app/auth/check_auth";

@Injectable()
export class AuthService {
    status = false;
    constructor(private http: HttpClient) {}
    public async isAuthenticated() {
        this.status = check_auth_one(this.http)
        return this.status;
    }
}
