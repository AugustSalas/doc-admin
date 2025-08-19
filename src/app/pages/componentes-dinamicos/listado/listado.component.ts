import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  cols: any[] = [];
  data: any[] = [];
  Ancho = "100%";
  clase: any = [];
  id = "";
  EndPoint: any;
  NombreClase: any;
  NombreClaseSplit: any;

  endpointObject: any;

  constructor(private route: ActivatedRoute,
    private apiService: OpenApiService,
    private dinamicoService: DinamicoService,
    private router: Router

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.EndPoint = this.apiService.BuscarEndpoint(Number.parseInt(this.id))
    this.clase = this.apiService.BuscarEndpointClase(this.EndPoint);
    this.cols = this.apiService.ListaCamposClase(this.clase);

    let tempClase = this.apiService.BuscarClase(this.EndPoint);

    this.NombreClase = tempClase.clase;

    this.NombreClaseSplit = this.apiService.camelCaseToTitleCase(tempClase.clase);

    this.Ancho = (this.cols.length) * 14 + "%";

    this.dinamicoService.getListado(this.EndPoint.ruta).subscribe(resp => {
      this.data = resp;
      console.log(resp);
    })

  }

  nuevoRegistro() {
    return "/formulario/" + this.id + "/new"
  }

  TipoDatoClase(campo) {

    var valorForm: any = [];
    var tipo: any = [];

    try {
      tipo = this.clase.properties[campo].$ref
      valorForm = "Object";
    }
    catch{

    }

    if (tipo == undefined) {
      try {

        valorForm = this.clase.properties[campo].type;

        if (valorForm == "string") {

          if (this.clase.properties[campo].format == "date-time") {
            valorForm = "Date";

          }
        }

      } catch (error) {

      }
    }
    return valorForm;
  }


  TipoDatoValor(valor, campo) {
    var valorForm: any = [];
    var tipo: any = [];

    try {
      tipo = this.clase.properties[campo].$ref
      valorForm = valor[campo];
    }
    catch{

    }

    if (valorForm == undefined) {
      try {

        tipo = this.clase.properties[campo].type;
        if (tipo == "boolean") {

          if (valor == true) {
            valorForm = "Verdadero";
          }
          else {
            valorForm = "Falso";
          }
        }
        else if (tipo == "string") {

          if (this.clase.properties[campo].format == "date-time") {
            let date = new Date(valor);
            valorForm = date.toLocaleString();
          }
          else {
            valorForm = valor;
          }
        }
        else {
          valorForm = valor;
        }
      } catch (error) {
      }
    }
    return valorForm;
  }

  EditarClase(row) {

    this.apiService.BuscarEndpointRuta(this.EndPoint.ruta + "{id}", "put");

    let id = null;
    let nombre = "";
    Object.keys(row).forEach(key => {

      try {
        if (key.toLowerCase() == this.NombreClase.toLowerCase() + "id") {
          nombre = key;
        }
      } catch (error) {

      }
    });

    id = row[nombre];
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/formulario/' + "/" + Number.parseInt(this.id) + "/" + id]));

  }

  NuevaClase() {

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/formulario/' + this.id + "/new"]));
  }

  borrar(act: any, i: number) {

    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${act.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        //  this.actors = this.actors.filter(a => a.actorId !== act.actorId)
        //  this.data = this.actors.filter(a => a.actorId !== act.actorId)
        act.ctrlActivo = false;
        console.log(act)

        let id = null;
        let nombre = "";
        Object.keys(act).forEach(key => {

          try {
            if (key.toLowerCase() == this.NombreClase.toLowerCase() + "id") {
              nombre = key;
            }
          } catch (error) {

          }
        });


        this.dinamicoService.putClase(this.EndPoint.ruta, act, act[nombre]).subscribe(resp => {
          console.log(resp);
          this.ngOnInit();


        })


      }
    })
  }


}
