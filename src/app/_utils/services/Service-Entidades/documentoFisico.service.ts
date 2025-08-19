import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class DocumentoFisicoService {

   constructor(private http: HttpClient, ) { }

   DocumentoFindall() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/documentofisico');
   }

   DocumentoFindallRange(inicio, fin) {
      return this.http.get<any[]>(environment.apiURL + '/webresources/documentofisico/' + inicio +"/" + fin);
   }

   DocumentoTurnos(entidad: any) {
      return this.http.post<any[]>(environment.apiURL + '/webresources/trazainterna/buscarfoliooriginal', entidad);
   }

   DocumentosByNumeroOriginal(entidad: any) {
      return this.http.post<any[]>(environment.apiURL + '/webresources/documentofisico/documentoOriginal/', entidad);
   }

   DocumentoCreate(id: number, entidad: any) {
      return this.http.post(environment.apiURL + '/webresources/documentofisico', entidad);
   }

   DocumentoFind(id: number) {
      return this.http.get<any>(environment.apiURL + '/webresources/documentofisico/' + id);
   }

   DocumentoEdit(id: number, entidad: any) {
      return this.http.put(environment.apiURL + '/webresources/documentofisico/' + id, entidad);
   }

   DocumentoRemove(id: number) {
      return this.http.delete(environment.apiURL + '/webresources/documentofisico/' + id);
   }

   AutorizarEstatus(id:number, entidad:any) {
      return this.http.put( environment.apiURL + '/webresources/documentofisico/' + id , entidad ); 
   }
   

}
