import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BucketEntradaMdl } from 'src/app/_modelos/bucketentrada1';

@Injectable()
export class BucketSalidaService {
   constructor(private http: HttpClient, ) { }

   BucketSalidaFindall() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/bucketsalida');
   }

   BucketSalidaFindallRange(inicio, fin) {
      return this.http.get<any[]>(environment.apiURL + '/webresources/bucketsalida/' + inicio +"/" + fin);
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

   BucketSalidaCreate(entidad: BucketEntradaMdl) {
      return this.http.post(environment.apiURL + '/webresources/bucketsalida', entidad);
   }

   BucketSalidaFind(id: number) {
      return this.http.get<any>(environment.apiURL + '/webresources/bucketsalida/' + id);
   }

   BucketSalidaEdit(entidad: BucketEntradaMdl) {
      return this.http.put(`${environment.apiURL}/webresources/bucketsalida/${entidad.bucketEntradaId}`, entidad)
   }

   AutorizarEstatus(id:number, entidad:any) {
      return this.http.put( environment.apiURL + '/webresources/documentofisico/' + id , entidad ); 
   }

   BucketSalidaRemove(id: number) {
      return this.http.delete(`${environment.apiURL}/webresources/bucketsalida/${id}`)
   }

}