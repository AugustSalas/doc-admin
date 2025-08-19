import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentoService } from 'src/app/_utils/services/Service-Entidades/documento.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';

@Component({
  selector: 'app-documento-relacionado-listado',
  templateUrl: './documento-relacionado-listado.component.html',
  styleUrls: ['./documento-relacionado-listado.component.scss']
})
export class DocumentoRelacionadoListadoComponent implements OnInit {

  cols: any[] = [];
  data: any[] = [];
  Ancho = "100%";
  clase: any = [];
  id = "";
  NombreClase: any;
  NombreClaseSplit: any;

  endpointObject: any;
  endpoint: any;

  constructor(private route: ActivatedRoute,
    private documentoService: DocumentoService,
    private router: Router,
    public apiService: OpenApiService,


  ) { }

  ngOnInit(): void {
    this.endpoint = this.apiService.BuscarEndpointPorClase("#/components/schemas/Documento");
    this.clase = this.apiService.BuscarEndpointClase(this.endpoint);
    this.cols = this.apiService.ListaCamposClase(this.clase);
    this.Ancho = (this.cols.length) * 14 + "%";
    console.log(this.cols);

    this.cols = [{ field: "Acciones", header: "Acciones" },
    { field: "documentoId", header: "Documento Id" },
    { field: "nombreRemitente", header: "Nombre Remitente" }, { field: "organizacionRemitente", header: "Área Remitente" },
    { field: "puestoRemitente", header: "Puesto Remitente" }, { field: "grupoOrganizacionalRemitente", header: "Área de adscripción Remitente" },
    { field: "jsonDestinatario", header: "Json Destinatario" }, { field: "asunto", header: "Asunto" },
    { field: "jsonCcp", header: "Json Ccp" }, { field: "fechaEmision", header: "Fecha Emision" },
    { field: "cadenaFolio", header: "Cadena Folio" }, { field: "instrucciones", header: "Instrucciones" },
    { field: "fechaLimiteRespuesta", header: "Fecha Limite Respuesta" }, { field: "fechaAtencion", header: "Fecha Atencion" },
    { field: "jsonTrazaExterna", header: "Json Traza Externa" }, { field: "jsonTrazaInterna", header: "Json Traza Interna" },
    { field: "requiereRespuesta", header: "Requiere Respuesta" }, { field: "firmado", header: "Firmado" },
    { field: "electronico", header: "Electronico" }, { field: "trazaExternaCollection1", header: "Traza Externa Collection 1" },
    { field: "remitenteId", header: "Remitente Id" }, { field: "documentoRelacionadoId", header: "Documento Relacionado Id" },
    { field: "estatusDocumentoId", header: "Estatus Documento Id" }, { field: "grupoOrganizacionalRemitenteId", header: "Área de adscripción Remitente Id" },
    { field: "organizacionRemitenteId", header: "Área Remitente Id" }, { field: "prioridadId", header: "Prioridad Id" },
    { field: "tipoDocumentoId", header: "Tipo Documento Id" }, { field: "tipoPrivacidadId", header: "Tipo Privacidad Id" }

    ]
    this.documentoService.DocumentoFindall()
      .subscribe(resp => {
        this.data = resp;
      })
  }

  TipoDatoValor(valor, campo) {
    var valorForm: any = [];
    var tipo: any = [];

    try {
      tipo = this.clase.properties[campo].$ref
      valorForm = valor[campo];
    }
    catch{

    }

    if (valorForm == undefined) {
      try {

        tipo = this.clase.properties[campo].type;
        if (tipo == "boolean") {

          if (valor == true) {
            valorForm = "Verdadero";
          }
          else {
            valorForm = "Falso";
          }
        }
        else if (tipo == "string") {

          if (this.clase.properties[campo].format == "date-time") {
            let date = new Date(valor);
            valorForm = date.toLocaleString();
          }
          else {
            valorForm = valor;
          }
        }
        else {
          valorForm = valor;
        }
      } catch (error) {
      }
    }
    return valorForm;
  }

  TipoDatoClase(campo) {

    var valorForm: any = [];
    var tipo: any = [];

    try {
      tipo = this.clase.properties[campo].$ref
      valorForm = "Object";
    }
    catch{

    }

    if (tipo == undefined) {
      try {

        valorForm = this.clase.properties[campo].type;

        if (valorForm == "string") {

          if (this.clase.properties[campo].format == "date-time") {
            valorForm = "Date";

          }
        }

      } catch (error) {

      }
    }
    return valorForm;
  }

  EditarClase(row) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/documento/formulario/' + row.documentoId]));

  }

}
