import { HttpClient } from '@angular/common/http';
import Cookies from 'universal-cookie';

const url: string = 'http://localhost:8000/api/get-decoded-token';

export function check_auth_one(http: HttpClient): boolean {
    const token = new Cookies().get("token");
    let status = false;
    if (token !== undefined) {
        const request = http.post(url, {"token": token});
        request.subscribe({
            next: (response: any) => {
                if (response.auth === true) {
                    status = true;
                }
                else {
                    status = false;
                }
            },
            error: (e) => {
                console.log(e);
            }
        });
    }
    return status;
}