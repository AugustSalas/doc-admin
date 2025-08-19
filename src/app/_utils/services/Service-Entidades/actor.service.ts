import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActorMdl } from 'src/app/_modelos/actor';

@Injectable()
export class ActorsService {
   constructor(private http: HttpClient, ) { }

   ActorFindall() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/actor');
   }

   ActorFindallAdmins() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/actor/listasistentes');
   }
  

   GetUsuario() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/usuario');
   }

   GetTipoActor() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/tipoactor');
   }

   GetTratamiento() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/tratamiento');
   }
 
   ActorFind (id: number){
      return this.http.get<any>( environment.apiURL + '/webresources/actor/' + id ); 
   } 
 
 
   ActorEdit (id: number, entidad: any){
      return this.http.put( environment.apiURL + '/webresources/actor/' + id , entidad ); 
   } 
 
 
   ActorRemove (id: number){
      return this.http.delete( environment.apiURL + '/webresources/actor/' + id ); 
   } 

   ActorCreate ( entidad: any){
      return this.http.post( environment.apiURL + '/webresources/actor',entidad ); 
   } 
 
}