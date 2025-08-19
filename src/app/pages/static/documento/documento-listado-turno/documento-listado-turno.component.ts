import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { DocumentoFisicoMdl } from "src/app/_modelos/documento";
import { OpenApiService } from "src/app/_utils/services/open-api.service";
import { DocumentoFisicoService } from "src/app/_utils/services/Service-Entidades/documentoFisico.service";
import Swal from "sweetalert2";
import { AdjuntoDialogComponent } from "../adjunto-dialog/adjunto-dialog.component";

@Component({
  selector: "app-documento-listado-turno",
  templateUrl: "./documento-listado-turno.component.html",
  styleUrls: ["./documento-listado-turno.component.scss"],
})
export class DocumentoListadoTurnoComponent implements OnInit {
  dato: any[] = [];
  data: any[] = [];
  dataDoc: any[] = [];

  Ancho = "90%";
  clase: any = [];
  id = "";
  NombreClase: any;
  NombreClaseSplit: any;
  loading =false;
  loadingdoc =false;

  endpointObject: any;
  endpoint: any;

  cols = [
    //{ field: "trazaInternaId", header: "traza Id" },
    { field: "documento", header: "Folio" },
    //{ field: "documentoOriginal", header: "Oficio Original" },
    //{ field: "estatusdocumento", header: "Estatus Oficio" },
    { field: "organizacionOrigen", header: "Turno Orígen" },
    { field: "organizacionDestino", header: "Turno Destino" },
    { field: "ctrlCreado", header: "Fecha Turno" },
    { field: "estatusturno", header: "Estatus Turno" },
    { field: "observacionesCierre", header: "Observaciones" },
  ];

  colsDoc = [
   // { field: "documentoFisicoId", header: "documento Fisico Id" },
    { field: "asunto", header: "Asunto" },
    { field: "cadenaFolio", header: "Folio Interno" },
    { field: "remitenteDestinatario", header: "Remitente/Destinatario " },
    { field: "estatusDocumento", header: "Estatus Documento" },
    { field: "prioridad", header: "Prioridad" },
    { field: "cadenaFolioRespuesta", header: "Folio Interno Respuesta" },
    { field: "observacionesCierre", header: "Observaciones" },

  ];

  constructor(
    private route: ActivatedRoute,
    private documentoService: DocumentoFisicoService,
    private router: Router,
    public apiService: OpenApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.endpoint = this.apiService.BuscarEndpointPorClase(
      "#/components/schemas/DocumentoFisico"
    );
    this.clase = this.apiService.BuscarEndpointClase(this.endpoint);
  //  this.cols = this.apiService.ListaCamposClase(this.clase);
    this.Ancho = this.cols.length * 6 + "%";
    console.log(this.cols);
  }

  busquedaTurno(valor) {
    this.loading=true;
    this.loadingdoc=true;

    this.data = [ {}];
    this.dataDoc =  [ {}];

    let value: any = {};
    value.numero_documento_original=valor[0];
   // value.numero_documento_original = "ref/2021";

   this.documentoService.DocumentosByNumeroOriginal(value).subscribe((resp) => {
debugger
    let datos=resp;
    datos.forEach((element) => {
    

      try {
        element.remitenteDestinatario = element.remitenteDestinatarioId.puesto+ ": "+ element.remitenteDestinatarioId.nombre + " " + 
                                     element.remitenteDestinatarioId.apellidoPaterno + " " +
                                     element.remitenteDestinatarioId.apellidoMaterno
      } catch{
        element.remitenteDestinatario = "";
      }

      try {
        element.estatusDocumento = element.estatusDocumentoId.nombre;
      } catch {
        element.estatusDocumento = " ";
      }

      try {
        element.prioridad = element.prioridadId.nombre;
      } catch {
        element.prioridad = " ";
      }
    
    });

    this.dataDoc = resp;
    this.loadingdoc=false;

    debugger;
  }, error=>{
    this.loadingdoc=false;

  });

    this.documentoService.DocumentoTurnos(value).subscribe((resp) => {

      let datos=resp;
      datos.forEach((element) => {
        try {
          element.ctrlCreado = new Date(element.ctrlCreado).toLocaleString();
        } catch {
          element.ctrlCreado = " ";
        }

        try {
          element.estatusturno = element.estatusTurnoId.nombre;
        } catch {
          element.estatusturno = "";
        }

        if(element.organizacionIdOrigen !=null){
          try {
            element.organizacionOrigen = element.organizacionIdOrigen.nombre;
          } catch {
            element.organizacioOrigen = " ";

          }
        }
        else{
          try {
            element.organizacionOrigen = element.grupoOrganizacionalIdOrigen.nombre;
          } catch {
            element.organizacioOrigen = " ";
          }

        }
      
        if(element.organizacionIdDestino !=null){
          try {
            element.organizacionDestino = element.organizacionIdDestino.nombre;
          } catch {
            element.organizacioDestino = " ";
          }
        }
        else{

          try {
            element.organizacionDestino = element.grupoOrganizacionalIdDestino.nombre;
          } catch {
            element.organizacioDestino = " ";
          }

        }
       

        if(element.documentoFisicoId!=null){
          try {
            element.documento = element.documentoFisicoId.cadenaFolio;
            element.estatusdocumento = element.documentoFisicoId.estatusDocumentoId.nombre;
          } catch {
            element.documento = " ";
            element.estatusdocumento = " ";
          }
        }
        else{
          try {
            element.documento = element.documentoId.cadenaFolio;
            element.estatusdocumento = element.documentoId.estatusDocumentoId.nombre;

          } catch {
            element.documento = " ";
            element.estatusdocumento = " ";

          }
        }
       
        if(element.documentoFisicoId!=null){
          try {
            element.documentoOriginal = element.documentoFisicoId.numeroDocumentoOriginal;
          } catch {
            element.docudocumentoOriginalmento = " ";
          }
        }
        else{
          try {
            element.documentoOriginal = element.documentoId.numeroDocumentoOriginal;
          } catch {
            element.documentoOriginal = " ";
          }
        }


      });

      

      this.data = resp;
      this.loading=false;

      debugger;
    }, error=>{
      this.loading=false;

    });
  }

  TipoDatoValor(valor, campo) {
    var valorForm: any = [];
    var tipo: any = [];

    try {
      tipo = this.clase.properties[campo].$ref;
      valorForm = valor[campo];
    } catch {}

    if (valorForm == undefined) {
      try {
        tipo = this.clase.properties[campo].type;
        if (tipo == "boolean") {
          if (valor == true) {
            valorForm = "Verdadero";
          } else {
            valorForm = "Falso";
          }
        } else {
          valorForm = valor;
        }
      } catch (error) {}
    }
    return valorForm;
  }

  TipoDatoClase(campo) {
    var valorForm: any = [];
    var tipo: any = [];

    try {
      tipo = this.clase.properties[campo].$ref;
      valorForm = "Object";
    } catch {}

    if (tipo == undefined) {
      try {
        valorForm = this.clase.properties[campo].type;

        if (valorForm == "string") {
          if (this.clase.properties[campo].format == "date-time") {
            valorForm = "Date";
          }
        }
      } catch (error) {}
    }
    return valorForm;
  }

  EditarClase(row) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() =>
        this.router.navigate([
          "/documentofisico/formulario/" + row.documentoFisicoId,
        ])
      );
  }

  borrar(act: any, i: number) {
    Swal.fire({
      title: "Eliminar",
      text: `Eliminará  ${act.nombre}`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.documentoService
          .DocumentoRemove(act.documentoFisicoId)
          .subscribe((resp) => {
            this.ngOnInit();
          });
      }
    });
  }

  visorAdjuntos(data) {
    debugger;
    let tipoDoc: String = "";
    tipoDoc = "documentoFisico";

    var dialogRef = this.dialog.open(AdjuntoDialogComponent, {
      width: "50%",
      height: "90%",
      data: {
        id: data.documentoFisicoId,
        tipoDoc: tipoDoc,
        modal: this.dialog,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
