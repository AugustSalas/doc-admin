import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnexoDocumentoFisico64Mdl } from 'src/app/_modelos/anexo';
import { DocumentoFisico64Mdl } from 'src/app/_modelos/documento';
import { DialogDinamicoAdjuntos } from 'src/app/_utils/interface/interfaz';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DocumentoService } from 'src/app/_utils/services/Service-Entidades/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adjunto-dialog',
  templateUrl: './adjunto-dialog.component.html',
  styleUrls: ['./adjunto-dialog.component.scss']
})
export class AdjuntoDialogComponent implements OnInit {

  ListaAnexo64: AnexoDocumentoFisico64Mdl[] = [];

  id: any;                           // id del registro documento pasado desde la url del componente
  isLoading: boolean = true;

  tipoDocumento: any;
  archivo: any = null;
  mime: any = null;
  nombreArchivo: any = null;
  folio = "";

  documento: any = null;


  constructor(private route: ActivatedRoute,
    public apiService: OpenApiService,        // servicio para comunicar con el openapi.json
    private _formbuilder: FormBuilder,
    private dinamicoService: DinamicoService,   // servicio dinamico que se puede usar en cualquier endpoint
    private router: Router,
    private documentoService: DocumentoService,   // servicio dinamico que se puede usar en cualquier endpoint
    @Inject(MAT_DIALOG_DATA) public data: DialogDinamicoAdjuntos
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
      element.anexoDocumentoFisico.documentoFisicoId = this.documento;
    })

    peticion = this.dinamicoService.postClase("/webresources/documentofisico/minioAnexos", this.ListaAnexo64);

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
}
