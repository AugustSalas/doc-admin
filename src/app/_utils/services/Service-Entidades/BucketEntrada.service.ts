import { Injectable, Inject } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environments/environment'; 
import { BucketEntradaMdl } from 'src/app/_modelos/bucketentrada1';

@Injectable()
    export class BucketEntradaService{
        constructor(private http: HttpClient,  ) { } 

        BucketEntradaFindall (){
            return this.http.get<any[]>( environment.apiURL + '/webresources/bucketentrada'); 
         }

         BucketEntradaFindallRange (inicio, fin){
            return this.http.get<any[]>( environment.apiURL + '/webresources/bucketentrada/' + inicio +"/" + fin); 
         }
         
         AutorizarEstatusDocumento(id:number, entidad:any) {
            return this.http.put( environment.apiURL + '/webresources/documentofisico/' + id , entidad ); 
         }

         LeidoDocumento(id:number) {
            return this.http.get<any>( environment.apiURL + '/webresources/bucketentrada/toggle/'+ id ); 
         }
      

         BucketEntradaUrgentesFindall (){
            return this.http.get<any[]>( environment.apiURL + '/webresources/bucketentrada/urgentes'); 
         } 

         GetGrupoOrganizacional(){
            return this.http.get<any[]>( environment.apiURL + '/webresources/grupoorganizacional');
         }
       
         GetDocumento(){
            return this.http.get<any[]>( environment.apiURL + '/webresources/documento');
         }

         GetOrganizacion(){
            return this.http.get<any[]>( environment.apiURL + '/webresources/organizacion');
         }
         

         AutorizarEstatus(id:number, entidad:any) {
            return this.http.put( environment.apiURL + '/webresources/documentofisico/' + id , entidad ); 
         }

       
         BucketEntradaCreate (entidad: BucketEntradaMdl){
            return this.http.post( environment.apiURL + '/webresources/bucketentrada',entidad ); 
         } 
       
       
         BucketEntradaFind (id: number){
            return this.http.get<any>( environment.apiURL + '/webresources/bucketentrada/' + id ); 
         } 
       
         DocumentoRelacionadoFind (id: number){
            return this.http.get<any>( environment.apiURL + '/webresources/documentofisico/by_documento_relacionado/' + id ); 
         } 

         BucketEntradaEdit(entidad: BucketEntradaMdl) {
            return this.http.put(`${environment.apiURL}/webresources/bucketentrada/${entidad.bucketEntradaId}`, entidad)
          }
       
       
      
          BucketEntradaRemove(id:number,entidad:BucketEntradaMdl){
             return this.http.delete(`${environment.apiURL}/webresources/bucketentrada/${id}`)

          }

    }