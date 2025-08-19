import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class GrupoEnvioService {
    constructor(private http: HttpClient,) { }


    GEFindall() {
        return this.http.get<any[]>(environment.apiURL + '/webresources/grupoenvio');
    }

    GetGO() {
        return this.http.get<any[]>(environment.apiURL + '/webresources/grupoorganizacional');
     }
  
     GetOrganizacion() {
        return this.http.get<any[]>(environment.apiURL + '/webresources/organizacion');
     }

    GECreate(entidad: any) {
        return this.http.post(environment.apiURL + '/webresources/grupoenvio', entidad);
    }

    GEFind(id: number) {
        return this.http.get<any>(environment.apiURL + '/webresources/grupoenvio/' + id);
    }

    GEEdit(id: number, entidad: any) {
        return this.http.put(environment.apiURL + '/webresources/grupoenvio/' + id, entidad);
    }

    GERemove(id: number,entidad: any) {
        return this.http.delete(environment.apiURL + '/webresources/grupoenvio/' + id);
    }


}