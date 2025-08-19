import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Anexo64Mdl, AnexoDocumentoFisico64Mdl } from 'src/app/_modelos/anexo';
import { DialogDinamicoAdjuntos } from 'src/app/_utils/interface/interfaz';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DocumentoService } from 'src/app/_utils/services/Service-Entidades/documento.service';

@Component({
  selector: 'app-visor-adjuntos',
  templateUrl: './visor-adjuntos.component.html',
  styleUrls: ['./visor-adjuntos.component.scss']
})
export class VisorAdjuntosComponent implements OnInit {

  id: any;                           // id del registro documento pasado desde la url del componente
  isLoading: boolean = true;
  pdfFormart: any;
  tipoDocumento: any;
  archivo: any = null;
  mime: any = null;
  nombreArchivo: any = null;

  messages: string[] = ["", ""];

  folio = "";

  listadoFisicos: AnexoDocumentoFisico64Mdl[] = [];
  listado: Anexo64Mdl[] = [];


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

      this.dinamicoService.getListado("/webresources/anexo/documento/" + this.id).subscribe(resp => {
        this.isLoading = false;
        this.listado = resp;
      }, error => {
        this.isLoading = false;
      })
    }
    else {

      this.dinamicoService.getListado("/webresources/anexodocumentofisico/documentoFisico/" + this.id).subscribe(resp => {
        this.isLoading = false;
        this.listadoFisicos = resp;
        try {
          this.folio = "del oficio: " + this.listadoFisicos[0].anexoDocumentoFisico.documentoFisicoId.numeroDocumentoOriginal;
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

}
