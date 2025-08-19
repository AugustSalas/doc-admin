import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { DocumentoFisicoService } from 'src/app/_utils/services/Service-Entidades/documentoFisico.service';
import { DocumentoFisicoFormularioComponent } from '../../documento/documento-fisico-formulario/documento-fisico-formulario.component';
import { DocumentoFisicoMdl, DocumentoChipModel } from 'src/app/_modelos/documento';
import { FormBuilder } from '@angular/forms';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';

@Component({
  selector: 'app-documento-relacionado-fisico',
  templateUrl: './documentoRelacionadoFisico.component.html',
  styleUrls: ['./documentoRelacionadoFisico.component.scss']
})
export class DocumentoRelacionadoFisicoComponent implements OnInit, AfterViewInit {

  @ViewChild('docFor', { static: false }) documentoFormulario: DocumentoFisicoFormularioComponent;

  id = "";
  documentoRelacionado: any = [];
  endpoint;

  Clase: any;
  edicionRegistro: DocumentoFisicoMdl;
  Cpp: any[] = [];
  destinatarios: any[] = [];

  isSave: boolean = true


  constructor(private route: ActivatedRoute,
    private documentoService: DocumentoFisicoService,
    private _formbuilder: FormBuilder,
    private dinamicoService: DinamicoService,
  ) { }

  ngOnInit(): void {



  }

  ngAfterViewInit() {

    const id = this.route.snapshot.paramMap.get('documentofisicoid');
    const invocador = this.route.snapshot.paramMap.get('invocador');


    this.documentoService.DocumentoFind(Number.parseInt(id)).subscribe(resp => {

      this.documentoRelacionado = resp;

      this.documentoFormulario.documentoRelacionado = this.documentoRelacionado;

      if (invocador == "bucketEntrada") {
        this.documentoFormulario.pathRegreso = "/bucket/lista";
        this.documentoFormulario.pathRegresoMensaje = "Ir a listado Bandeja Entrada";
      }

      this.documentoFormulario.formGroup.controls.entradaSalida.setValue("S");
      debugger

      this.documentoFormulario.formGroup.controls.documentoFisicoRelacionadoId.setValue(this.documentoRelacionado);

      var jsonCPP: string = this.documentoRelacionado.jsonCcp;
      jsonCPP = this.replaceAll(jsonCPP, "destinatario", "remitente");

      this.documentoFormulario.formGroup.controls.jsonCcp.setValue(jsonCPP);
      this.documentoFormulario.edicionRegistro.jsonCcp = jsonCPP;

      var jtemp = JSON.parse(this.documentoRelacionado.jsonDestinatarioRemitente);
     
      var jdes = this.documentoFormulario.destinatariosList.find(element => element.destinatario_id= jtemp.actor[0].destinatario_id)
      this.documentoFormulario.formGroup.controls.jsonDestinatarioRemitente.setValue(jdes);

      debugger
      resp.remitenteDestinatarioId.NombreCompleto = resp.remitenteDestinatarioId.puesto + ".- " + resp.remitenteDestinatarioId.nombre + " " + resp.remitenteDestinatarioId.apellidoPaterno + " " + 
      resp.remitenteDestinatarioId.apellidoMaterno + ".- " + resp.remitenteDestinatarioId.dependencia;
      this.documentoFormulario.formGroup.controls.remitenteDestinatarioId.setValue(resp.remitenteDestinatarioId);

      
      this.documentoFormulario.cargaRemitenteDestinatarioJson();

    });

    debugger
    this.documentoFormulario.CambEstatus();

  }

  replaceAll(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }

  
}
