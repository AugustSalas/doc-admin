import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { FormBuilder } from '@angular/forms';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { DocumentoService } from 'src/app/_utils/services/Service-Entidades/documento.service';
import { DialogDinamicoData } from 'src/app/_utils/interface/interfaz';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-macro',
  templateUrl: './TurnosCR-visor.component.html',
  styleUrls: ['./TurnosCR-visor.component.scss']
})

export class TurnosCRVisorComponent implements OnInit {

  id: any;                           // id del registro documento pasado desde la url del componente
  isSave: boolean = true;
  pdfFormart: any;
  tipoDocumento: any;
  archivo: any = null;
  mime: any = null;
  nombreArchivo: any = null;


  constructor(private route: ActivatedRoute,
    public apiService: OpenApiService,        // servicio para comunicar con el openapi.json
    private _formbuilder: FormBuilder,
    private dinamicoService: DinamicoService,   // servicio dinamico que se puede usar en cualquier endpoint
    private router: Router,
    private documentoService: DocumentoService,   // servicio dinamico que se puede usar en cualquier endpoint
    @Inject(MAT_DIALOG_DATA) public data: DialogDinamicoData
  ) {

  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    const tipoDocumento = this.route.snapshot.paramMap.get('tipoDocumento');



    this.id = id;
    this.tipoDocumento = tipoDocumento;

    
    if (this.id == null) {
      this.id = this.data.id
    }
    debugger

    if (tipoDocumento == "documento") {
      this.documentoService.DocumentoFind(Number.parseInt(id)).subscribe(resp => {

        this.dinamicoService.imprimirReporte("/webresources/documento/reporte", resp).subscribe(resp => {
          this.pdfFormart = resp;

        })

      }, error => {

      })
    }
    else {

      this.dinamicoService.getIndividual("/webresources/documentofisicooriginal/minio", this.id).subscribe(resp => {
        /*    this.dinamicoService.getIndividual("/webresources/documentofisicooriginal/minio", this.id).subscribe(resp => {
         
           }, error => {
   
           }) */

        if (resp.anexo.mime == "application/pdf") {
          this.pdfFormart = resp.base64;
        }
        else {
          this.archivo = resp.base64;
          this.mime = resp.anexo.mime;
          this.nombreArchivo = resp.anexo.nombreArchivoOriginal;


        }


      }, error => {

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

