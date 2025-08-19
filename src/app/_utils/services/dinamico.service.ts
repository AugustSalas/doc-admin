import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DinamicoService {

  constructor(private http: HttpClient,) { }


  formateado(data, tipos) {
    data.forEach(element => {

      Object.keys(element).forEach(key => {
        try {
          if (tipos.properties[key].type == "string" && tipos.properties[key].format == "date-time") {
            element[key] = new Date(element[key]).toLocaleDateString();
          }
        }
        catch {

        }

      });

    });
    return data;
  }

  formateadoDate(element, tipos) {

    Object.keys(element).forEach(key => {
      try {
        if (tipos.properties[key].type == "string" && tipos.properties[key].format == "date-time") {

          element[key] = new Date(element[key]);
        }
      }
      catch {

      }

    });

    return element;
  }

  getClase(entidad) {

  }

  getListado(url) {
    //return this.http.get(`${URL_API}/openapi.json`).pipe(map(this.crearListaItem));
    return this.http.get<any[]>(environment.apiURL + url);
  }


  getIndividual(url, id) {
    //return this.http.get(`${URL_API}/openapi.json`).pipe(map(this.crearListaItem));
    return this.http.get<any>(environment.apiURL + url + "/" + id);
  }

  postClase(url, entidad) {
    //return this.http.get(`${URL_API}/openapi.json`).pipe(map(this.crearListaItem));
    return this.http.post<any>(environment.apiURL + url, entidad);
  }

  putClase(url, entidad, id) {
    //return this.http.get(`${URL_API}/openapi.json`).pipe(map(this.crearListaItem));
    return this.http.put(environment.apiURL + url + "/" + id, entidad);
  }


  imprimirReporte(url, entidad): Observable<any> {

    return this.http.post(environment.apiURL + url, entidad, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });


  }

  imprimirReporteGet(url): Observable<any> {

    return this.http.get(environment.apiURL + url, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });


  }

  imprimirReportePlain(url, entidad): Observable<any> {

    return this.http.post(environment.apiURL + url, entidad, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "text/plain")
    });


  }


}
