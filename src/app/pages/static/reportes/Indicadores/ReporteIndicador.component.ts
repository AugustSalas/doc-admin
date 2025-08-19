import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  FormBuilder,
  Form,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OpenApiService } from "src/app/_utils/services/open-api.service";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { OrganizacionMdl } from "src/app/_modelos/organizacion";
import { DocumentoFisicoReporteMdl } from "src/app/_modelos/documento";
import { DinamicoService } from "src/app/_utils/services/dinamico.service";
import { DropdownComponent } from "src/app/pages/componentes-dinamicos/dropdown/dropdown.component";

@Component({
  selector: 'app-RGO',
  templateUrl: './ReporteIndicador.component.html',
  styleUrls: ['./ReporteIndicador.component.scss']
})

export class ReporteIndicadorComponent implements OnInit {
 

  formGroup: FormGroup; // forma principal del documento
  pdfFormart: any;
  
  get f() {
    return this.formGroup.controls;
  } // se usa para aceder facilmente al formgroup principal desde el html

  constructor(
    public apiService: OpenApiService,
    private _formbuilder: FormBuilder,
    private dinamicoService: DinamicoService, // servicio dinamico que se puede usar en cualquier endpoint
    private router: Router
  ) {
    this.formGroup = this._formbuilder.group({
      fechaInicio: [new Date(), Validators.required],
      fechaFinal: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  Pdf() {
    // metodo para generar el pdf de vista previa
    debugger;

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      let temp: string[] = [];
      Object.keys(this.formGroup.controls).forEach((key) => {
        if (this.formGroup.controls[key].invalid) {
          temp.push(key);
        }
      });
      //Aquí va la validación del form
      console.log(temp);
      return;
    } 

    let peticion: Observable<any>;

    let temp: any = this.formGroup.value;

    Swal.fire({
      title: "Espere",
      text: "Generando el PDF",
      icon: "info",
    });

    Swal.showLoading();

   
    debugger;
    var fechaIn:string= temp.fechaInicio.toLocaleDateString('es-ES') + " 00:01:00";
    var fechaFi:string=  temp.fechaFinal.toLocaleDateString('es-ES') + " 23:59:00";

    let postObject:timedoc=new timedoc();

    postObject.fechaInicio = fechaIn;
    postObject.fechaFinal = fechaFi;
   
debugger
    peticion = this.dinamicoService.imprimirReporte("/webresources/documentofisico/reporte/Indicadores" , postObject);
  
 //   this.Org.organizacionId = Number(this.Org.organizacionId);

    peticion.subscribe(
      (resp) => {
        this.pdfFormart = resp;

        Swal.fire({
          title: "ok",
          text: "Realizado correctamente",
          icon: "success",
        });
      },
      (error) => {
        Swal.fire({
          title: "fail",
          text: "Error en la peticion",
          icon: "error",
        });
      }
    );

    /*} else {
              Swal.fire({
                title: "ok",
                text: 'No existen registros en ese rango de fechas',
                icon: 'success',
              })
            }*/
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

export class timedoc {

  fechaInicio:  any ;
  fechaFinal:  any ;
 

}
