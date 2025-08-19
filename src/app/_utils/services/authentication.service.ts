import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";

// authentication service is used to LOGIN and LOGOUT of the application
// it posts the creds (username and password) to the backend and check for the response if it has JWT token
// if the response from the backend has jwt token, then the authentication was succesful
// on successful authentication, the user details are stored in the local storage + jwt token

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    // login
    login(email: string, password: string) {
        let grantType: string = "password"

        return this.http.post<any>(`${environment.apiURL}/webresources/auth/login`, { email, password, grantType })
            .pipe(
                // the backend service sends an instance of the user
                // user: any (because .post<any>)
                map(user => {
                    // login successful if the response has jwt token
                    if (user && user.token) {
                        // store user details and jwt token in the local storage to keep the user logged in between page refreshes
                        sessionStorage.setItem('currentUser', JSON.stringify(user));
                        const tokk = jwt_decode(user.token);

                        tokk.privilege_model.privileges =  JSON.parse(tokk.privilege_model.privileges );
                        sessionStorage.setItem('tokenJson', JSON.stringify(tokk));
                        
                        sessionStorage.setItem('perfil', "0");

                        console.log(tokk);
                    }

                    return user;
                })
            );
    }



    // logout
    logout() {
        // remove user from local storage
        sessionStorage.removeItem('currentUser');
    }
}
