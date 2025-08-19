import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Acuse64Mdl, AcuseDocumentoFisico64Mdl } from 'src/app/_modelos/acuse';
import { DialogDinamicoAdjuntos } from 'src/app/_utils/interface/interfaz';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DocumentoService } from 'src/app/_utils/services/Service-Entidades/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acuse-dialog',
  templateUrl: './acuse-dialog.component.html',
  styleUrls: ['./acuse-dialog.component.scss']
})
export class AcuseDialogComponent implements OnInit  {

  ListaAnexo64: AcuseDocumentoFisico64Mdl[] = [];
  id: any;                           // id del registro documento pasado desde la url del componente
  isLoading: boolean = true;
  tipoDocumento: any;
  archivo: any = null;
  mime: any = null;
  nombreArchivo: any = null;
  folio = "";
  documento: any = null;

  pdfFormart: any;
  messages: string[] = ["", ""];
  listadoFisicos: AcuseDocumentoFisico64Mdl[] = [];
  listado: Acuse64Mdl[] = [];

  constructor(private route: ActivatedRoute,
    public apiService: OpenApiService,        // servicio para comunicar con el openapi.json
    private _formbuilder: FormBuilder,
    private dinamicoService: DinamicoService,   // servicio dinamico que se puede usar en cualquier endpoint
    private router: Router,
    private documentoService: DocumentoService,   // servicio dinamico que se puede usar en cualquier endpoint
    @Inject(MAT_DIALOG_DATA) public data: DialogDinamicoAdjuntos,
  ) {

  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    const tipoDocumento = this.route.snapshot.paramMap.get('tipoDocumento');
    this.id = id;
    this.tipoDocumento = tipoDocumento;
    debugger


    if (this.id == null) {
      this.id = this.data.id
    }

    if (this.tipoDocumento == null) {
      this.tipoDocumento = this.data.tipoDocumento
    }

    if (this.tipoDocumento == null) {
      this.tipoDocumento = this.data.tipoDocumento
    }

    if (tipoDocumento == "documento") {
      this.dinamicoService.getListado("/webresources/anexo/documento/" + this.id).subscribe(resp => {
        this.isLoading = false;
        this.listado = resp;
      }, error => {
        this.isLoading = false;
      })
    }
    else {
      this.dinamicoService.getListado("/webresources/acusedocumentofisico/documentoFisico/" + this.id).subscribe(resp => {
        this.isLoading = false;
        this.listadoFisicos = resp;
        try {
          this.folio = "del oficio: " + this.listadoFisicos[0].acuseDocumentoFisico.documentoFisicoId.numeroDocumentoOriginal;
        }
        catch {
        }

      }, error => {
        this.isLoading = false;
      })
    }

    if (tipoDocumento == "documento") {
      this.dinamicoService.getIndividual("/webresources/documento/", this.id).subscribe(resp => {
        this.isLoading = false;
        this.documento = resp;
        try {
          this.folio = "del oficio: " + this.documento.numeroDocumentoOriginal;
        }
        catch {

        }

      }, error => {
        this.isLoading = false;
      })
    }
    else {
      this.dinamicoService.getListado("/webresources/documentofisico/" + this.id).subscribe(resp => {
        this.isLoading = false;
        this.documento = resp;
        try {
          this.folio = "del oficio: " + this.documento.numeroDocumentoOriginal;
        }
        catch {
        }

      }, error => {
        this.isLoading = false;
      })
    }
  }

  downloadFile(file, nombre) {
    const linkSource = file;
    const downloadLink = document.createElement("a");
    const fileName = nombre;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  GuardarAnexo() { // metodo para persistir tanto el documento, documento original y anexos, en el mismo endpoint

    let peticion: Observable<any>

    if (this.ListaAnexo64.length == 0) {
      Swal.fire({
        title: "Lista adjuntos",
        text: 'Al menos debe tener 1 adjuntos para continuar',
        icon: 'error'
      })
      return
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info'
    });

    this.ListaAnexo64.forEach(element => {
      element.acuseDocumentoFisico.documentoFisicoId = this.documento;
    })

    peticion = this.dinamicoService.postClase("/webresources/documentofisico/minioAcuses", this.ListaAnexo64);

    peticion.subscribe(resp => {

      Swal.fire({
        title: "ok",
        text: 'Realizado correctamente',
        icon: 'success',
      }).then(element => {
        debugger
        this.data.modal.closeAll();
      })


    }, error => {
      Swal.fire({
        title: "fail",
        text: 'Error en la peticion',
        icon: 'error'
      })
    })
  }


  borrar(act: any) {
  debugger
    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${act.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        act.ctrlActivo = false;
        console.log(act)

        this.dinamicoService.putClase("/webresources/acusedocumentofisico", act, act.acuseDocumentoFisicoId).subscribe(resp => {
          console.log(resp);
          this.ngOnInit();

        })


      }
    })
  }

}
