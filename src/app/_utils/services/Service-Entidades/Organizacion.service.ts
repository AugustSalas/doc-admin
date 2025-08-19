import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class OrganizacionService {
   constructor(private http: HttpClient, ) { }


 OrganizacionFindall() {
    return this.http.get<any[]>(environment.apiURL + '/webresources/organizacion');
 }

 GetGO() {
    return this.http.get<any[]>(environment.apiURL + '/webresources/grupoorganizacional');
 }


 OrganizacionFind (id: number){
    return this.http.get<any>( environment.apiURL + '/webresources/organizacion/' + id ); 
 } 


 OrganizacionEdit (id: number, entidad: any){
    return this.http.put( environment.apiURL + '/webresources/organizacion/' + id , entidad ); 
 } 


 OrganizacionRemove (id: number){
    return this.http.delete( environment.apiURL + '/webresources/organizacion/' + id ); 
 } 

 
 ListaOrganizacion (id: number){
   return this.http.get( environment.apiURL + '/webresources/organizacion/list/' + id ); 
} 

 OrganizacionCreate ( entidad: any){
    return this.http.post( environment.apiURL + '/webresources/organizacion',entidad ); 
 } 

}
