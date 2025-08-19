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
  selector: "app-PO",
  templateUrl: "./PendientesDepartamentos.component.html",
  styleUrls: ["./PendientesDepartamentos.component.scss"],
})
export class RPendientesDeptosComponent implements OnInit {
  Org: OrganizacionMdl = new OrganizacionMdl();
  Orgs: OrganizacionMdl[] = [];
  Orgss: number = 0;

  @ViewChild('selectOrganizasion', { static: false }) organizacion : DropdownComponent;

  formGroup: FormGroup; // forma principal del documento
  pdfFormart: any;
  grupo: any = null;
  usuario: any;
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
      organizacionId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.grupo = this.apiService.getUsuarioToken();
    this.usuario = this.apiService.getCurrentUser();
debugger
    


    this.dinamicoService.getListado("/webresources/organizacion/list/" + this.usuario.grupo_organizacional_remitente_id).subscribe(
      (resp) => {
        debugger
        this.organizacion.listaSelect=resp;
      },
      (error) => {
        Swal.fire({
          title: "fail",
          text: "Error en la peticion",
          icon: "error",
        });
      }
    );

    
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

    new Date().toLocaleDateString();

    debugger;
    var fechaIni: Date = temp.fechaInicio;
    fechaIni.setHours(0);
    fechaIni.setMinutes(1);
  
    var fechaFin: Date = temp.fechaFinal;
    fechaFin.setHours(23);
    fechaFin.setMinutes(59);

    let postObject:any={};

    postObject.fecha_inicial = fechaIni;
    postObject.fecha_final = fechaFin;
    postObject.organizacion = temp.organizacionId.organizacionId;
debugger
    peticion = this.dinamicoService.imprimirReporte("/webresources/documentofisico/reporte/PendientesDepartamentos" , postObject);
  
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
