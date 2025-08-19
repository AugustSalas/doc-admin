import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContactoService {
    constructor(private http: HttpClient,) { }


    ContactoFindall() {
        return this.http.get<any[]>(environment.apiURL + '/webresources/contacto');
    }

    GetTC() {
        return this.http.get<any[]>(environment.apiURL + '/webresources/tipocontacto');
     }
  
     GetTratamiento() {
        return this.http.get<any[]>(environment.apiURL + '/webresources/tratamiento');
     }

    ContactoCreate(entidad: any) {
        return this.http.post(environment.apiURL + '/webresources/contacto', entidad);
    }

    ContactoFind(id: number) {
        return this.http.get<any>(environment.apiURL + '/webresources/contacto/' + id);
    }

    ContactoEdit(id: number, entidad: any) {
        return this.http.put(environment.apiURL + '/webresources/contacto/' + id, entidad);
    }

    ContactoRemove(id: number) {
        return this.http.delete(environment.apiURL + '/webresources/contacto/' + id);
    }


}