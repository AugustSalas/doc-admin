import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class PerfilService {
   constructor(private http: HttpClient,) { }

   perfilFindall() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/perfil');
   }

   perfilCreate(entidad: any) {
      return this.http.post(environment.apiURL + '/webresources/perfil', entidad);
   }

   perfilFind(id: number) {
      return this.http.get<any>(environment.apiURL + '/webresources/perfil/' + id);
   }

   perfilEdit(id: number, entidad: any) {
      return this.http.put(environment.apiURL + '/webresources/perfil/' + id, entidad);
   }

   perfilRemove(id: number) {
      return this.http.delete(environment.apiURL + '/webresources/perfil/' + id);
   }
}