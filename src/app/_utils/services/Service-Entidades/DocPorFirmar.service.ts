import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class DocPorFirmarService {
   constructor(private http: HttpClient, ) { }

   DocXfirmarFindall() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/documentosporfirmar');
   }

   GetGrupoOrganizacional() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/grupoorganizacional');
   }

   GetDocumento() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/documento');
   }

   GetOrganizacion() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/organizacion');
   }

   DocXfirmarCreate(entidad: any) {
      return this.http.post(environment.apiURL + '/webresources/documentosporfirmar', entidad);
   }

   DocXfirmarFind(id: number) {
      return this.http.get<any>(environment.apiURL + '/webresources/documentosporfirmar/' + id);
   }

   DocXfirmarEdit(id:number, entidad:any) {
      return this.http.put( environment.apiURL + '/webresources/documentosporfirmar/' + id , entidad ); 
   }

   DocXfirmarRemove(id: number) {
      return this.http.delete( environment.apiURL + '/webresources/documentosporfirmar/' + id ); 
   }


   AutorizarEstatus(id:number, entidad:any) {
      return this.http.put( environment.apiURL + '/webresources/documento/' + id , entidad ); 
   }

   AutorizarEstatusFisico(id:number, entidad:any) {
      return this.http.put( environment.apiURL + '/webresources/documentofisico/autorizardoc/' + id, entidad ); 
   }

   ActualizaPdfAutorizar(id:number, entidad:any) {
      return this.http.put( environment.apiURL + '/webresources/documentofisico/autorizar' , entidad ); 
   }

   
   BuscarEstatus(id: number) {
      return this.http.get<any>(environment.apiURL + '/webresources/documentofisico/' + id);
   }
  



}