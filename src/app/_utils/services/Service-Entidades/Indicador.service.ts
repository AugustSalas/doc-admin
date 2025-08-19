import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
  })
  
export class IndicadorService {
   constructor(private http: HttpClient, ) { }

   IndicadorFindall() {
    return this.http.get<any[]>(environment.apiURL + '/webresources/indicador');
 }

 
    IndicadorFind (id: number){
    return this.http.get<any>( environment.apiURL + '/webresources/indicador/' + id ); 
 } 


    IndicadorEdit (id: number, entidad: any){
    return this.http.put( environment.apiURL + '/webresources/indicador/' + id , entidad ); 
 } 


    IndicadorRemove (id: number){
    return this.http.delete( environment.apiURL + '/webresources/indicador/' + id ); 
 } 

    IndicadorCreate ( entidad: any){
    return this.http.post( environment.apiURL + '/webresources/indicador',entidad ); 
 } 







}