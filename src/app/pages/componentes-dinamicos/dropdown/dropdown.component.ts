import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit {

  form: FormGroup = null;
  @Input('valor') valor: any = null;
  @Input('nombreCampo') nombreCampo: string = null;
  @Input('nombre') nombre: string = "nombre";
  @Input('nombreClase') NombreClase: string = null;
  @Input('placeholder') placeholder: string = "Seleccionar";
  @Input('rutaClase') rutaClase: any = null;
  @Input('optionCustom') optionCustom: any[] = null;
  @Input('BusquedaCustom') busquedaCustom: boolean = false;
  @Input('postCustom') postCustom: any = null;
  @Input('camposFiltrados') camposFiltrados: string = null;
  @Input() parentData: any;
  @Input('valorId') valorId: any = null;
  @Output() public editControl = new EventEmitter<any>();

  listaSelect: any[] = null;
  EndPoint: any;
  clase: any = [];
  cols: any[] = [];
  selectedRange = "";

  etiquetaClase: string = "";
  get f() { return this.form.controls; } // para usar a las propiedades del formulario

  constructor(private _formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: OpenApiService,
    private dinamicoService: DinamicoService,
    private router: Router
  ) {
    this.form = this._formbuilder.group({
      kit: ['', [Validators.required]]
    });



  }

  CambiarValor(changes) {
    this.form.controls.kit.setValue(changes.value);
    this.editControl.emit(changes.value);
  }

  ngOnInit() {

    console.log(this.camposFiltrados);
    console.log(this.nombre);

    if (this.camposFiltrados == null) {
      this.camposFiltrados = "value." + this.nombre;
    }


    if (this.busquedaCustom == false) {
      this.form.controls.kit.setValue(this.valor);

      this.EndPoint = this.apiService.BuscarEndpointPorClase(this.rutaClase);
      this.clase = this.apiService.BuscarEndpointClase(this.EndPoint);
      this.cols = this.apiService.ListaCamposClase(this.clase);

      let tempClase = this.apiService.BuscarClase(this.EndPoint);

      if (this.NombreClase) {
      }
      else {
        this.NombreClase = tempClase.clase;
      }

      this.dinamicoService.getListado(this.EndPoint.ruta).subscribe(resp => {

        this.listaSelect = resp;

        if (this.valorId != null && this.valor == null) {

          var temp = this.listaSelect.findIndex(element => element[this.nombreCampo])
          if (temp != null) {
            this.valor = this.listaSelect[temp];
            this.form.controls.kit.setValue(this.valor);
            this.editControl.emit(this.valor);

          }

        }
        console.log(resp);
      })
    }
    else {
      console.log("Busqueda custom");

      if (this.postCustom) {

        this.BusquedaPost(this.postCustom.ruta, this.postCustom.busqueda);

      }


    }

    debugger

    this.etiquetaClase = this.NombreClase;

    var defecto = environment.apiEntidadesCambioNombre.find(element => element.entidad == this.NombreClase)
    if (defecto) {
      debugger
      this.etiquetaClase = defecto.nombre;

    }

  }


  BusquedaPost(ruta: string, busqueda) {
    this.listaSelect = [];
    this.dinamicoService.postClase(ruta, busqueda).subscribe(resp => {

      this.listaSelect = resp;

      console.log(resp);
    })
  }

  BusquedaGet(ruta: string, Arreglo: any[]) {
    this.listaSelect = [];

    this.dinamicoService.getListado(ruta).subscribe(resp => {

      let temp: any[] = [];

      Arreglo.forEach(element => {
        temp.push(element);
      })

      resp.forEach(element => {
        temp.push(element);
      })
      this.listaSelect = temp;


      console.log(resp);
    })
  }

  markFormGroupTouched() {
    if (this.valor[this.nombreCampo] == null) {
      this.valor = null;
    }

    this.form = this._formbuilder.group({
      kit: [this.valor, [Validators.required]]
    });

    (<any>Object).values(this.form.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched();
      }
    });
  }

  AsignarValor() {
    console.log(this.listaSelect);
    console.log("this.listaSelect");

  }
}
