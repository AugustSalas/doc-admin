import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class MembreteService {

   constructor(private http: HttpClient, ) { }

   MembreteFindall() {
      return this.http.get<any[]>(environment.apiURL + '/webresources/membrete');
   }

   MembreteRemove(id: number) {
      return this.http.delete(`${environment.apiURL}/webresources/membrete/${id}`)
   }


}
