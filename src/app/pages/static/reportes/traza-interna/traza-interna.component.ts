import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentoFisicoReporteMdl, DocumentoFisicoTrazaReporteMdl } from 'src/app/_modelos/documento';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-traza-interna',
  templateUrl: './traza-interna.component.html',
  styleUrls: ['./traza-interna.component.scss']
})
export class TrazaInternaComponent implements OnInit {

  formGroup: FormGroup;               // forma principal del documento
  pdfFormart: any;
  get f() { return this.formGroup.controls; } // se usa para aceder facilmente al formgroup principal desde el html

  constructor(public apiService: OpenApiService,
    private _formbuilder: FormBuilder,
    private dinamicoService: DinamicoService,   // servicio dinamico que se puede usar en cualquier endpoint
    private router: Router,
  ) {

    this.formGroup = this._formbuilder.group({
      fechaInicio: [new Date(), Validators.required],
      fechaFinal: [new Date(), Validators.required]

    });
  }

  ngOnInit(): void {

  }

  Pdf() { // metodo para generar el pdf de vista previa

    debugger

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      let temp: string[] = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.controls[key].invalid) {
          temp.push(key);
        }
      });
      //Aquí va la validación del form
      console.log(temp);
      return
    }


    let peticion: Observable<any>

    let temp: any = this.formGroup.value;

    Swal.fire({
      title: 'Espere',
      text: 'Generando el PDF',
      icon: 'info'
    });

    Swal.showLoading()

    new Date().toLocaleDateString()

    debugger
    var fechaIni:Date= temp.fechaInicio;
    fechaIni.setHours(0);
    fechaIni.setMinutes(1);
    var fechaInicial: String = fechaIni.getTime().toString().substr(0, 10)
    var fechaFin:Date= temp.fechaFinal;
    fechaFin.setHours(23);
    fechaFin.setMinutes(59);
    var fechaFinal = fechaFin.getTime().toString().substr(0, 10)

    this.dinamicoService.getListado("/webresources/trazainterna/documentosabiertos/" +
      fechaInicial + "/" + fechaFinal).subscribe(resp => {

        if (resp.length > 0) {

          var lista: DocumentoFisicoTrazaReporteMdl = new DocumentoFisicoTrazaReporteMdl(resp, fechaInicial, fechaFinal);

          peticion = this.dinamicoService.imprimirReporte("/webresources/trazainterna/docabiertos", lista);


          peticion.subscribe(resp => {

            this.pdfFormart = resp;

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

        } else {
          Swal.fire({
            title: "ok",
            text: 'No existen registros en ese rango de fechas',
            icon: 'success',
          })
        }



      })







  }

  downloadFile(file, nombre) {
    const linkSource = file;
    const downloadLink = document.createElement("a");
    const fileName = nombre;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}

