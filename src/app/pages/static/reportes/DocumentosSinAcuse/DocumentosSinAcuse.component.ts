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
  selector: "app-DSA",
  templateUrl: "./DocumentosSinAcuse.component.html",
  styleUrls: ["./DocumentosSinAcuse.component.scss"],
})
export class AcuseComponent implements OnInit {
 

  @ViewChild('selectOrganizasion', { static: false }) organizacion : DropdownComponent;

  formGroup: FormGroup; // forma principal del documento
  pdfFormart: any;
  grupo: any = null;
  usuario: any;
  ListadoContacto: any[] = [];
  ListadoOrganizacion: any[] = [];

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
      //organizacionId: [null, Validators.required],
      organizacion: [null,Validators.required],
    });
  }

  ngOnInit(): void {
    this.grupo = this.apiService.getUsuarioToken();
    this.usuario = this.apiService.getCurrentUser();

    debugger
    
    /*this.dinamicoService.getListado("/webresources/organizacion/list/" + this.usuario.grupo_organizacional_remitente_id).subscribe(
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
    );*/

    //this.dinamicoService.getListado("/webresources/destinatarios/responder").subscribe(respGrupos => {
      this.dinamicoService.getListado("/webresources/grupoorganizacional/listgoo").subscribe(respGrupos => {
      debugger

      this.ListadoOrganizacion = respGrupos;
      
      respGrupos.forEach(element => {
        if (element.organizacion_actor_id == null) {
          element.NombreCompleto = element.nombre_actor + " - " + element.grupo_organizacional_actor;
        } else {
          element.NombreCompleto = element.nombre_actor + " - " + element.organizacion_actor;
        }
      })

      this.ListadoContacto = respGrupos;

    });

    
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

    let postObject:any={};


    debugger
    postObject.organizacion = temp.organizacion.organizacion_actor_id;

    if(postObject.organizacion != null){

    postObject.grupOrganizacional = null;
    
    } else {

      postObject.grupOrganizacional = temp.organizacion.grupo_organizacional_actor_id

  }


debugger
    peticion = this.dinamicoService.imprimirReporte("/webresources/documentofisico/reporte/Acuse" , postObject);
  
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
