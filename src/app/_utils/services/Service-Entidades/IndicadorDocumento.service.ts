import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class IndicadorDocumentoService {
  constructor(private http: HttpClient) {}

  IndicadorDocumentoFindall() {
    return this.http.get<any[]>(environment.apiURL + "/webresources/indicadordocumento");
  }

  IndicadorDocumentoFind(id: number) {
    return this.http.get<any>(
      environment.apiURL + "/webresources/indicadordocumento/" + id
    );
  }

  IndicadorDocumentoFindByDocumentoFisico(id: number) {
   return this.http.get<any>(
     environment.apiURL + "/webresources/indicadordocumento/ByDocumentoFisico/" + id
   );
 }

 IndicadorDocumentoFindByDocumento(id: number) {
   return this.http.get<any>(
     environment.apiURL + "/webresources/indicadordocumento/ByDocumento/" + id
   );
 }

  IndicadorEdit(id: number, entidad: any) {
    return this.http.put(
      environment.apiURL + "/webresources/indicadordocumento/" + id,
      entidad
    );
  }

  IndicadorDocumentoRemove(id: number) {
    return this.http.delete(
      environment.apiURL + "/webresources/indicadordocumento/" + id
    );
  }

  IndicadorDocumentoCreate(entidad: any) {
    return this.http.post(
      environment.apiURL + "/webresources/indicadordocumento",
      entidad
    );
  }

  IndicadorDocumentoLista(entidad: any) {
   return this.http.post(
     environment.apiURL + "/webresources/indicadordocumento/listadoIndicadorDocumento",
     entidad
   );
 }

}
