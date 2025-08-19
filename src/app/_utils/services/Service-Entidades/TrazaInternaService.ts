import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
  })
  
export class TrazaInternaService {
   constructor(private http: HttpClient, ) { }

   TrazaInternaFindallrecibidos() {
      //return this.http.get<any[]>(environment.apiURL + '/webresources/trazainterna');
      return this.http.get<any[]>(environment.apiURL + '/webresources/trazainterna/recibidos');
   }

   TrazaInternaFindallrecibidosRange(inicio, fin) {
      return this.http.get<any[]>(environment.apiURL + '/webresources/trazainterna/recibidos/' + inicio +"/" + fin);
   }


   TrazaInternaFindallenviados() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/trazainterna/enviados');
   }

   TrazaInternaFindallenviadosRange(inicio, fin) {
      return this.http.get<any[]>(environment.apiURL + '/webresources/trazainterna/enviados/' + inicio +"/" + fin);
   }

   TrazaInternaFindallCerradosRecibidos() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/trazainterna/cerradosrecibidos');
   }

   TrazaInternaFindallCerradosRecibidosRange(inicio, fin) {
      return this.http.get<any[]>(environment.apiURL + '/webresources/trazainterna/cerradosrecibidos/' + inicio +"/" + fin);
   }

   
   TrazaInternaFindallEnAtencion() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/trazainterna/enatencion');
   }

      
   TrazaInternaFindallCerradosEnviados() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/trazainterna/cerradosenviados');
   }

   TrazaInternaFindallCerradosEnviadosRange(inicio, fin) {
      return this.http.get<any[]>(environment.apiURL + '/webresources/trazainterna/cerradosenviados/' + inicio +"/" + fin);
   }

   TrazaInternaFindallRespuestas() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/trazainterna/respuestas');
   }

   
   GetGrupoOrganizacional() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/grupoorganizacional');
   }


   GetDocumento() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/documento');
   }


   GetEstatusTurno() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/estatusturno');
   }


   OrganizacionFind(id:number) {
      return this.http.get<any[]>(environment.apiURL + '/webresources/organizacion/list' + id);
   }


   TrazaInternaCreate(entidad: any) {
      return this.http.post(environment.apiURL + '/webresources/trazainterna', entidad);
   }


   BucketEntradaCreate (entidad: any){
      return this.http.post( environment.apiURL + '/webresources/bucketentrada',entidad ); 
   } 


   TrazaInternaFind(id: number) {
      return this.http.get<any>(environment.apiURL + '/webresources/trazainterna/' + id);
   }

   TrazaInternaBuscarTurno(entidad: any) {
      return this.http.post<any>(environment.apiURL + '/webresources/trazainterna/buscarturno/',  entidad);
   }


   
   BucketEntradaFind (id: number){
      return this.http.get<any>( environment.apiURL + '/webresources/bucketentrada/' + id ); 
   } 


    
   TrazainernaEdit (id: number, entidad: any){
      return this.http.put( environment.apiURL + '/webresources/trazainterna/' + id , entidad ); 
   } 


   TrazaInternaRemove(id: number) {
      return this.http.delete(`${environment.apiURL}/webresources/trazainterna/${id}`)
   }

   AutorizarEstatus(id:number, entidad:any) {
      return this.http.put( environment.apiURL + '/webresources/trazainterna/' + id , entidad ); 
   }

   
   AutorizarEstatusDocumento(id:number, entidad:any) {
      return this.http.put( environment.apiURL + '/webresources/documentofisico/' + id , entidad ); 
   }


}