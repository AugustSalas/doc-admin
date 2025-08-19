import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DocumentoFisicoService } from 'src/app/_utils/services/Service-Entidades/documentoFisico.service';
import { DocumentoFisicoMdl } from 'src/app/_modelos/documento';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AdjuntoDialogComponent } from '../adjunto-dialog/adjunto-dialog.component';
import { AcuseDialogComponent } from '../acuse-dialog/acuse-dialog.component';

@Component({
  selector: 'app-documento-fisico-listado',
  templateUrl: './documento-fisico-listado.component.html',
  styleUrls: ['./documento-fisico-listado.component.scss']
})
export class DocumentoFisicoListadoComponent implements OnInit {

  cols: any[] = [];
  dato: any[] = [];
  data: DocumentoFisicoMdl[] = [];
  Ancho = "100%";
  clase: any = [];
  id = "";
  NombreClase: any;
  NombreClaseSplit: any;

  endpointObject: any;
  endpoint: any;
  loading =false;

  constructor(private route: ActivatedRoute,
    private documentoService: DocumentoFisicoService,
    private router: Router,
    public apiService: OpenApiService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.endpoint = this.apiService.BuscarEndpointPorClase("#/components/schemas/DocumentoFisico");
    this.clase = this.apiService.BuscarEndpointClase(this.endpoint);
    this.cols = this.apiService.ListaCamposClase(this.clase);
    this.Ancho = (this.cols.length) * 6 + "%";
    console.log(this.cols);

    this.cols = [{ field: "Acciones", header: "Acciones" },
    { field: "numeroDocumentoOriginal", header: "Oficio Original" },
    { field: "asunto", header: "Asunto" },
    { field: "remitenteDestinatarioId", header: "Puesto Remitente/Destinatario" },
    { field: "cadenaFolio", header: "Folio Interno" },
    { field: "ctrlCreado", header: "Fecha Creación" },
    { field: "entradaSalida", header: "Tipo Correspondencia" },
    { field: "tipoDocumentoId", header: "Tipo Documento" },
    { field: "prioridadId", header: "Prioridad" },
      //  { field: "tipoPrivacidadId", header: "Privacidad" }
    ]
   
    this.find( 50, 1)
  }

  find( registros:number , pagina:number){
    this.loading =true;
    debugger
    let numeroFinal= (registros* pagina) 
    let numeroInicio = numeroFinal - registros

    debugger

 //   this.documentoService.DocumentoFindallRange(numeroInicio, numeroFinal - 1)  //paginador comentado
 this.documentoService.DocumentoFindall() 
    .subscribe(resp => {
      this.data = resp;
      this.data = this.data.filter(a => a.ctrlActivo == true)

      this.dato = this.data;
      this.dato.forEach(element => {

        try {
          element.organizacionDestinoId = element.organizacionDestinoId.organizacionId
        } catch {
          element.organizacionDestinoId = " ";
        }

        try {
          element.remitenteDestinatarioId = element.remitenteDestinatarioId.puesto
        } catch {
          element.remitenteDestinatarioId = " ";
        }

        try {
          element.prioridadId = element.prioridadId.nombre
        } catch {
          element.prioridadId = "";
        }

        try {
          element.tipoDocumentoId = element.tipoDocumentoId.nombre
        } catch {
          element.tipoDocumentoId = "";
        }

        try {
          element.ctrlCreado = new Date(element.ctrlCreado).toLocaleDateString();
        } catch {
          element.ctrlCreado = "";
        }

      })

      this.loading =false;

    },
    (error)=>{
      this.loading =false;

    })
  }

  TipoDatoValor(valor, campo) {
    var valorForm: any = [];
    var tipo: any = [];

    try {
      tipo = this.clase.properties[campo].$ref
      valorForm = valor[campo];
    }
    catch {

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
    catch {

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
      this.router.navigate(['/documentofisico/formulario/' + row.documentoFisicoId]));
  }

  borrar(act: any, i: number) {

    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${act.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {

        this.documentoService.DocumentoRemove(act.documentoFisicoId)
          .subscribe(resp => {
            this.ngOnInit();

          })


      }
    })
  }

  visorAdjuntos(data) {
    debugger
    let tipoDoc: String = "";
    tipoDoc = "documentoFisico";


    var dialogRef = this.dialog.open(AdjuntoDialogComponent, {
      width: '50%',
      height: '90%',
      data: { id: data.documentoFisicoId, tipoDoc: tipoDoc , modal: this.dialog},
    });


    

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  visorAcuses(data) {
    debugger
    let tipoDoc: String = "";
    tipoDoc = "documentoFisico";


    var dialogRef = this.dialog.open(AcuseDialogComponent, {
      width: '50%',
      height: '90%',
      data: { id: data.documentoFisicoId, tipoDoc: tipoDoc , modal: this.dialog},
    });
 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}
