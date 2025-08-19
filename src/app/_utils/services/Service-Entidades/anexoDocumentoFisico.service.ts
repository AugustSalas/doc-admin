import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AnexoDocumentoFisicoService {

   constructor(private http: HttpClient, ) { }

   AnexoFindallByDocumento(id) {
      return this.http.get<any>(environment.apiURL + '/webresources/anexodocumentofisico/documentoFisico/' + id);
   }

   DocumentoOriginalBase64(id) {
      return this.http.get<any>(environment.apiURL + '/webresources/documentofisicooriginal/minio/' + id);
   }



}
