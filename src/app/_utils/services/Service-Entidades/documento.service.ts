import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environments/environment'; 
 
@Injectable() 
export class DocumentoService {
 
   constructor(private http: HttpClient,  ) { } 
 
   DocumentoFindall (){
      return this.http.get<any[]>( environment.apiURL + '/webresources/documento'); 
   } 
 
 
   DocumentoCreate (id: number, entidad: any){
      return this.http.post( environment.apiURL + '/webresources/documento',entidad ); 
   } 
 
 
   DocumentoFind (id: number){
      return this.http.get<any>( environment.apiURL + '/webresources/documento/' + id ); 
   } 
 
 
   DocumentoEdit (id: number, entidad: any){
      return this.http.put( environment.apiURL + '/webresources/documento/' + id , entidad ); 
   } 
 
 
   DocumentoRemove (id: number){
      return this.http.delete( environment.apiURL + '/webresources/documento/' + id ); 
   } 
 
}
