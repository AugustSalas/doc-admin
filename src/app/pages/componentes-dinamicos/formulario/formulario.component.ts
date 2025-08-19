import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { element } from 'protractor';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'ngx-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  usuario: any;

  endpointObject;
  ClaseEnpoint: any;
  endpoint;
  id;
  NombreClase: string = "";
  TipoForma: string = "Edición de ";
  edicionRegistro: any;
  formGroup: FormGroup=null;
  isSave: boolean = true;
  Clase: any;

  ListadoClaseCompleto: string[] = [];
  NombreClaseSplit: any;

  get f() { return this.formGroup.controls; }

  constructor(private route: ActivatedRoute,
    public apiService: OpenApiService,
    private _formbuilder: FormBuilder,
    private dinamicoService: DinamicoService,
    private router: Router
  ) {


  }

  ngOnInit() {

    this.usuario = this.apiService.getCurrentUser();

    const endpoint = this.route.snapshot.paramMap.get('clase');
    const id = this.route.snapshot.paramMap.get('id');
    this.endpoint = endpoint;
    this.id = id;
    this.endpointObject = this.apiService.BuscarEndpoint(Number.parseInt(endpoint));
    this.Clase = this.apiService.BuscarClase(this.endpointObject);
    this.NombreClase = this.Clase.clase;
    this.NombreClaseSplit = this.apiService.camelCaseToTitleCase(this.NombreClase);

    let temp = this.apiService.FiltroPropiedades(this.Clase);
    this.ListadoClaseCompleto = temp.ListadoClaseCompleto;
    let ClaseVacia = temp.ClaseVacia;

    console.log(this.ListadoClaseCompleto);

    if (id !== 'new') {
      this.isSave = false
      this.TipoForma = "Creación de "

      this.dinamicoService.getIndividual(this.endpointObject.ruta, this.id).subscribe(resp => {
        let repTemp = this.dinamicoService.formateadoDate(resp, this.Clase);
        this.edicionRegistro = repTemp;

        this.formGroup = this._formbuilder.group(this.edicionRegistro);

        console.log(resp);
      })

    }
    else {
      this.edicionRegistro = ClaseVacia;
      this.formGroup = this._formbuilder.group(ClaseVacia);

    }

    this.Clase.required.forEach(element => {
      if (this.formGroup.controls[element]) {
        this.formGroup.controls[element].setValidators(Validators.required);
      }
    });
    this.ClaseEnpoint = ClaseVacia;
  }

  Guardar() {

    if (this.formGroup.invalid) {

      this.formGroup.markAllAsTouched();
      //Aquí va la validación del form
      return
    }
    let peticion: Observable<any>

    let temp = this.formGroup.value;

    Swal.fire({

      title: 'Espere',
      text: 'Guardando información',
      icon: 'info'

    });

    Swal.showLoading()

    if (this.id == 'new') {
      temp.ctrlCreadoPor = this.usuario.usuario_id;
      temp.ctrlActualizadoPor = this.usuario.usuario_id;
      temp.ctrlActualizado = new Date();
      temp.ctrlCreado = new Date();
      temp.ctrlActivo = true;
    }
    else {
      temp.ctrlActualizadoPor = this.usuario.usuario_id;
      temp.ctrlActualizado = new Date();
    }

    if (this.isSave) {
      peticion = this.dinamicoService.postClase(this.endpointObject.ruta, temp);

    }
    else {
      peticion = this.dinamicoService.putClase(this.endpointObject.ruta, temp, this.id);

    }



    peticion.subscribe(resp => {
      Swal.fire({
        title: "ok",
        text: 'Realizado correctamente',
        icon: 'success',
      })
    }, error => {
      Swal.fire({
        title: "fail",
        text: 'Error en la peticion',
        icon: 'error'
      })
    })



  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

  }

  fechaCambio(event) {

  }

  IrListado() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/listado/' + this.endpoint]));
  }

  TipoFormulario(nombre) {
    let valor = "";
    try {
      valor = this.Clase.properties[nombre].type
      if (valor == undefined) {
        valor = "Object"
      }

    } catch{
      valor = "Object"
    }
    return valor
  }

  BuscarRutaClase(nombre) {
    let valor = "";
    try {
      valor = this.Clase.properties[nombre].$ref

    } catch{

    }
    return valor
  }

  TipoColumna(tipo) {
    let temp = this.TipoFormulario(tipo);

    if (temp == "Object") {
      return "col-sm-6"
    }
    else if (temp == "boolean") {
      return "col-sm"
    }
    else {
      return "col-sm"
    }

  }

  TipoFormularioFormato(nombre) {
    let valor = "";
    try {
      valor = this.Clase.properties[nombre].format

    } catch{

    }
    return valor
  }


}
