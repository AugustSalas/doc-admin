import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class GrupoOrganizacionalService {

   constructor(private http: HttpClient,) { }

   GOFindall() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/grupoorganizacional');
   }

   GetDependencia() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/dependencia');
   }


   GOFind(id: number) {
      return this.http.get<any>(environment.apiURL + '/webresources/grupoorganizacional/' + id);
   }

   GOFindMembrete(id: number) {
      return this.http.get<any>(environment.apiURL + '/webresources/grupoorganizacional/minio/' + id);
   }

   GOFindPie(id: number) {
      return this.http.get<any>(environment.apiURL + '/webresources/grupoorganizacional/miniopie/' + id);
   }


   GOEdit(id: number, entidad: any) {
      return this.http.put(environment.apiURL + '/webresources/grupoorganizacional/' + id, entidad);
   }


   GORemove(id: number) {
      return this.http.delete(environment.apiURL + '/webresources/grupoorganizacional/' + id);
   }

   GOCreate(entidad: any) {
      return this.http.post(environment.apiURL + '/webresources/grupoorganizacional', entidad);
   }

   GOCreateMembrete(entidad: any) {
      return this.http.post(environment.apiURL + '/webresources/grupoorganizacional/minio', entidad);
   }

   GOCreatePie(entidad: any) {
      return this.http.post(environment.apiURL + '/webresources/grupoorganizacional/minioPie', entidad);
   }

   GrupoOrganizacionalFindall() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/grupoorganizacional');
   }

   GrupoOrganizacionalFindallMembrete() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/grupoorganizacional/membrete');
   }

   GrupoOrganizacionalFindallPie() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/grupoorganizacional/membretepie');
   }

   GrupoOrganizacionalRemove(id: number) {
      return this.http.delete(`${environment.apiURL}/webresources/grupoorganizacional/${id}`)
   }



}
