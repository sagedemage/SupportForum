import { Injectable } from "@angular/core";
import axios from "axios";
import Cookies from "universal-cookie";

@Injectable()
export class AuthService {
    constructor() {}

    public isAuthenticated(): boolean {
        const cookies = new Cookies();
        const token = cookies.get("token");
        if (token !== undefined) {
            axios.post(`http://localhost:8000/api/get-decoded-token`, {
                token: token,
            }).then((response) => {
                if (response.data.auth === true) {
                    return true
                }
                else {
                    return false
                }
            })
        }
        return false;
    }
}