import { Component, OnInit, Inject } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import Swal from 'sweetalert2'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDinamicoData } from 'src/app/_utils/interface/interfaz';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogDinamicoComponent implements OnInit {

  endpointObject;
  ClaseEnpoint: any;
  NombreClase: string = "";
  TipoForma: string = "Edición de ";
  edicionRegistro: any;
  formGroupDialog: FormGroup = null;
  isSave: boolean = true;
  Clase: any;

  ListadoClaseCompleto: string[] = [];
  NombreClaseSplit: any;
  usuario: any;

  get f() { return this.formGroupDialog.controls; }

  constructor(
    public dialogRef: MatDialogRef<DialogDinamicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDinamicoData,
    public apiService: OpenApiService,
    private _formbuilder: FormBuilder,
    private dinamicoService: DinamicoService,
    private router: Router
  ) {

    dialogRef.beforeClosed().subscribe(() => dialogRef.close(this.data));

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    this.usuario = this.apiService.getCurrentUser();

    this.endpointObject = this.apiService.BuscarEndpointPorClase(this.data.rutaEndPoint);
    this.Clase = this.apiService.BuscarClase(this.endpointObject);
    this.NombreClase = this.Clase.clase;
    this.NombreClaseSplit = this.apiService.camelCaseToTitleCase(this.NombreClase);

    let temp = this.apiService.FiltroPropiedades(this.Clase);
    this.ListadoClaseCompleto = temp.ListadoClaseCompleto;
    let ClaseVacia = temp.ClaseVacia;

    console.log(this.ListadoClaseCompleto);

    if (this.data.id !== 'new') {
      this.isSave = false
      this.TipoForma = "Creación de "

      this.dinamicoService.getIndividual(this.endpointObject.ruta, this.data.id).subscribe(resp => {

        let repTemp = this.dinamicoService.formateadoDate(resp, this.Clase);
        this.edicionRegistro = repTemp;

        this.formGroupDialog = this._formbuilder.group(this.edicionRegistro);

        console.log(resp);
      })

    }
    else {
      this.edicionRegistro = ClaseVacia;
      this.formGroupDialog = this._formbuilder.group(this.edicionRegistro);
    }




    this.Clase.required.forEach(element => {
      if (this.formGroupDialog.controls[element]) {
        this.formGroupDialog.controls[element].setValidators(Validators.required);
        if (this.data.ocultos.includes(element)) {

        }
      }
    });

    this.ListadoClaseCompleto.forEach(element => {
      if (this.formGroupDialog.controls[element]) {
        if (this.data.ocultos.includes(element)) {
          this.formGroupDialog.controls[element].disable();

        }
      }
    });

    this.ListadoClaseCompleto


    this.ClaseEnpoint = ClaseVacia;
  }

  ocultarCampos(nombre) {
    if (this.data.ocultos.includes(nombre)) {
      return true
    }
    else {
      return false
    }
  }

  CambioNombre(propiedad){

    var temp=propiedad;
    if (this.data.rutaEndPoint == "#/components/schemas/Contacto") {
     
      if(propiedad=="grupoOrganizacional"){
        temp="Área de Adscripción"
      }

      if(propiedad=="organizacion"){
        temp="Área"

      }

      if(propiedad=="telefono"){
        temp="Teléfono"

      }

      if(propiedad=="correoElectronico"){
        temp="Correo Electrónico"

      }
      if(propiedad=="tratamiento"){
        temp="Grado"

      }

    }
    
    return temp;
  }


  Guardar() {

    if (this.formGroupDialog.invalid) {

      this.formGroupDialog.markAllAsTouched();
      //Aquí va la validación del form
      return
    }
    let peticion: Observable<any>

    let temp = this.formGroupDialog.getRawValue();

    Swal.fire({

      title: 'Espere',
      text: 'Guardando información',
      icon: 'info'

    });

    Swal.showLoading()

    if (this.data.id !== 'new') {
      temp.ctrlCreadoPor = this.usuario.usuario_id;
      temp.ctrlActualizadoPor = this.usuario.usuario_id;
      temp.ctrlActualizado = new Date();
      temp.ctrlCreado = new Date();
      temp.ctrlActivo = true;


    }
    else {
      temp.ctrlActualizadoPor = this.usuario.usuario_id;
      temp.ctrlActualizado = new Date();

      if (this.data.rutaEndPoint == "#/components/schemas/Contacto") {
        temp.dependenciaId = this.usuario.organizacion_remitente_id;
        temp.grupoOrganizacionalId = this.usuario.grupo_organizacional_remitente_id;
      }
    }





    if (this.isSave) {
      peticion = this.dinamicoService.postClase(this.endpointObject.ruta, temp);

    }
    else {
      peticion = this.dinamicoService.putClase(this.endpointObject.ruta, temp, this.data.id);

    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: "ok",
        text: 'Realizado correctamente',
        icon: 'success',
      })

      this.data.respuesta = resp;
      this.dialogRef.close(this.data);

    }, error => {
      Swal.fire({
        title: "fail",
        text: 'Error en la peticion',
        icon: 'error'
      })
    })

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
