import { Injectable, Inject } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environments/environment'; 



@Injectable()
    export class IntUsuPerService{
        constructor(private http: HttpClient,  ) { } 

        IntUsuPerFindall (){
            return this.http.get<any[]>( environment.apiURL + '/webresources/usuario'); 
         }
          
         GetIntermedia(id:number){
            return this.http.get<any>( environment.apiURL + '/webresources/iusuarioperfil/' + id)
         }

         GetListPerfilByUsuarioId(id:number){
            return this.http.get<any>( environment.apiURL + '/webresources/iusuarioperfil/list/' + id)
         }

         GetGrupoOrganizacionalByDependenciaId(id:number){
            return this.http.get<any>( environment.apiURL + '/webresources/grupoorganizacional/list/' + id)
         }


         GetPerfil (){
            return this.http.get<any>( environment.apiURL + '/webresources/perfil')
         }

         GetDependencia (){
            return this.http.get<any>( environment.apiURL + '/webresources/dependencia')
         }

       
         IntUsuPerCreate (entidad: any){
            return this.http.post( environment.apiURL + '/webresources/usuario/iusuarioperfil',entidad ); 
         } 
       
       
         IntUsuPerFind (id: number){
            return this.http.get<any>( environment.apiURL + '/webresources/usuario/iusuarioperfil/' + id ); 
         } 
       

          IntUsuPerEdit (id: number, entidad: any){
            return this.http.put( environment.apiURL + '/webresources/usuario/iusuarioperfil/' + id , entidad ); 
         } 
       
       
         IntUsuPerRemove (id: number){
            return this.http.delete( environment.apiURL + '/webresources/usuario/iusuarioperfil/' + id ); 
         } 
    }