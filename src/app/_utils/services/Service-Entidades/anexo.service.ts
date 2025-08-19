import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AnexoService {

   constructor(private http: HttpClient, ) { }

   AnexoFindallByDocumento(id) {
      return this.http.get<any>(environment.apiURL + '/webresources/anexo/documento/' + id);
   }




}
