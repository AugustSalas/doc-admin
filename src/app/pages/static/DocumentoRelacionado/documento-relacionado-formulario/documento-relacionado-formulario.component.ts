import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentoFormularioComponent } from '../../documento/documento-formulario/documento-formulario.component';
import { ActivatedRoute } from '@angular/router';
import { DocumentoService } from 'src/app/_utils/services/Service-Entidades/documento.service';

@Component({
  selector: 'app-documento-relacionado-formulario',
  templateUrl: './documento-relacionado-formulario.component.html',
  styleUrls: ['./documento-relacionado-formulario.component.scss']
})
export class DocumentoRelacionadoFormularioComponent implements OnInit, AfterViewInit {

  @ViewChild('documentoFormulario', { static: false }) documentoFormulario: DocumentoFormularioComponent;
  id = "";
  documentoRelacionado: any = [];

  constructor(private route: ActivatedRoute,
    private documentoService: DocumentoService

  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('documentoid');
    const invocador = this.route.snapshot.paramMap.get('invocador');


    this.documentoService.DocumentoFind(Number.parseInt(id)).subscribe(resp => {
      this.documentoRelacionado = resp;

      this.documentoFormulario.documentoRelacionado = this.documentoRelacionado;

      if (invocador == "bucketEntrada") {
        this.documentoFormulario.pathRegreso = "/bucket/lista";
        this.documentoFormulario.pathRegresoMensaje = "Ir a listado Bandeja Entrada";
      }

      // pathRegreso:string="/documento/lista";
      //  pathRegresoMensaje:string="Ir listado documento";
      this.documentoFormulario.ngOnInit();

    });

  }

  ngAfterViewInit() {



  }


}
