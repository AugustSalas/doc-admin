import { Component, OnInit } from "@angular/core";
import { BucketEntradaService } from "../../../../_utils/services/Service-Entidades/BucketEntrada.service";
import { OpenApiService } from "src/app/_utils/services/open-api.service";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { BucketEntradaMdl } from "../../../../_modelos/bucketentrada1";
import {DocumentoFisicoMdl} from "../../../../_modelos/documento"
import { Router } from "@angular/router";
import { BucketEntradaVisorComponent } from "../BucketEntrada-Visor/BucketEntrada-visor.component";
import { MatDialog } from "@angular/material/dialog";
import { VisorAdjuntosComponent } from "../../turnos/visor-adjuntos/visor-adjuntos.component";
import { VisorAcusesComponent } from "../../turnos/visor-acuses/visor-acuses.component";

@Component({
  selector: "app-actor",
  templateUrl: "./bucketEntrada-listado.html",
  styleUrls: ["./bucketEntrada-listado.scss"],
})
export class ListadoBucketEntradaComponent implements OnInit {
  bucket: BucketEntradaMdl = new BucketEntradaMdl();
  data: any[] = [];
  buckets: BucketEntradaMdl[] = [];
  p: number = 1;
  Ancho = "100%";
 
  loading =false;

  cols: any[] = [];

  isSave: boolean = true;
  usuario: any;

  constructor(
    private BEservice: BucketEntradaService,
    private router: Router,
    public dialog: MatDialog,
    public apiService: OpenApiService
  ) {}
 
  ngOnInit() {
    this.usuario = this.apiService.getCurrentUser();
    debugger
    try {
      let perfil = this.usuario.perfil.perfil_nombre;
      if (perfil == "Titular") {
        this.cols= [
          // {field:"bucketEntradaId", header:"Bandeja Entrada"}
          { field: "leido", header: "Leído",  width: '180%' },
          { field: "Acciones", header: "Acciones", width: '400%' },
          { field: "estatus", header: "Estatus", width: '380%' },
          { field: "fechaEntrada", header: "Fecha Recepción", width: '400%' },
          { field: "oficioOriginal", header: "No. oficio original", width: '400%' },
          { field: "documentoAsunto", header: "Asunto", width: '420%' },
          { field: "destinatario", header: "Destinatario", width: '420%' },
          { field: "destinatarioPuesto", header: "Puesto", width: '400%' },
          { field: "folioEntrada", header: "Folio Interno", width: '410%' },
          { field: "prioridad", header: "Prioridad", width: '300%' },
        ];
      }
      else{
        this.cols= [
        //  { field: "leido", header: "Leído",  width: '180%' },
          { field: "Acciones", header: "Acciones", width: '400%' },
          { field: "estatus", header: "Estatus", width: '380%' },
          { field: "fechaEntrada", header: "Fecha Recepción", width: '400%' },
          { field: "oficioOriginal", header: "No. oficio original", width: '400%' },
          { field: "documentoAsunto", header: "Asunto", width: '420%' },
          { field: "destinatario", header: "Destinatario", width: '420%' },
          { field: "destinatarioPuesto", header: "Puesto", width: '400%' },
          { field: "folioEntrada", header: "Folio Interno", width: '410%' },
          { field: "prioridad", header: "Prioridad", width: '300%' },

        ];
      }

      debugger;
    } catch (error) {
      this.cols = [
        // {field:"bucketEntradaId", header:"Bandeja Entrada"},
        { field: "Acciones", header: "Acciones", width: '400%' },
        { field: "estatus", header: "Estatus", width: '380%' },
        { field: "fechaEntrada", header: "Fecha Recepción", width: '400%' },
        { field: "oficioOriginal", header: "No. oficio original", width: '400%' },
        { field: "documentoAsunto", header: "Asunto", width: '420%' },
        { field: "destinatario", header: "Destinatario", width: '420%' },
        { field: "destinatarioPuesto", header: "Puesto", width: '400%' },
        { field: "folioEntrada", header: "Folio Interno", width: '410%' },
        { field: "prioridad", header: "Prioridad", width: '300%' },
      ];
    }

    this.find( 50, 1)
  }

 
  find( registros:number , pagina:number){
    this.loading =true;
    debugger
    let numeroFinal= (registros* pagina) 
    let numeroInicio = numeroFinal - registros

    debugger

 //   this.BEservice.BucketEntradaFindallRange(numeroInicio, numeroFinal - 1).subscribe((resp) => {  //paginador comentado
      this.BEservice.BucketEntradaFindall().subscribe((resp) => {

      this.buckets = resp;
      this.buckets = this.buckets.filter((a) => a.ctrlActivo == true);
      this.data = this.buckets;

   //   this.Ancho = this.cols.length *15 + "%";
      this.data.forEach((element) => {

        try {
          element.fechaEntrada = new Date(
            element.documentoFisicoId.fechaRecepcion
          ).toLocaleDateString();
        } catch {
          element.fechaEntrada = "";
        }

        try {
          element.destinatarioPuesto =
            element.documentoFisicoId.remitenteDestinatarioId.puesto +
            " - " +
            element.documentoFisicoId.remitenteDestinatarioId.dependencia;
        } catch {
          element.destinatarioPuesto = "";
        }

        try {
          element.destinatario =
            element.documentoFisicoId.remitenteDestinatarioId.nombre +
            " " +
            element.documentoFisicoId.remitenteDestinatarioId.apellidoPaterno +
            " " +
            element.documentoFisicoId.remitenteDestinatarioId.apellidoMaterno;
        } catch {
          element.destinatario = "";
        }

        try {
          element.documentoAsunto = element.documentoFisicoId.asunto;
        } catch {
          element.documentoAsunto = "";
        }

        try {
          element.oficioOriginal =
            element.documentoFisicoId.numeroDocumentoOriginal;
        } catch {
          element.oficioOriginal = "";
        }

        try {
          element.estatus = element.documentoFisicoId.estatusDocumentoId.nombre;
        } catch {
          element.estatus = "";
        }

        try {
          element.prioridad = element.documentoFisicoId.prioridadId.nombre;
        } catch {
          element.prioridad = "";
        }
      });

      this.loading =false;

    },
    (error)=>{
      this.loading =false;

    }

    
    );
  }

  toggleBucketEntrada(row) {
    try {
      let perfil = this.usuario.perfil.perfil_nombre;
      if (perfil == "Titular") {
        this.BEservice.LeidoDocumento(Number(row.bucketEntradaId)).subscribe(
          (resp) => {
            row.leido = resp;
          }
        );
      }

      debugger;
    } catch (error) {}
  }

  borrarBucket(buck: BucketEntradaMdl, i: number) {
    Swal.fire({
      title: "Eliminar",
      text: `Eliminará  ${buck.bucketEntradaId}`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        this.buckets = this.buckets.filter(
          (b) => b.bucketEntradaId !== buck.bucketEntradaId
        );
        this.data = this.buckets.filter(
          (b) => b.bucketEntradaId !== buck.bucketEntradaId
        );
        buck.ctrlActivo = false;
        console.log(buck);
        this.BEservice.BucketEntradaRemove(
          buck.bucketEntradaId,
          buck
        ).subscribe();
      }
    });
  }

  visorDocumentosRelacionados(data) {
    debugger;

    this.BEservice.DocumentoRelacionadoFind(
      Number(data.documentoFisicoId.documentoFisicoId)
    ).subscribe((resp: any) => {
      debugger;

      if (resp != null) {

        if (resp.documentoId != null) {
          this.router.navigate([
            "/bucket/visor/documento/",
            resp.documentoId.documentoId,
          ]);
        } else {
          //this.router.navigate(['/bucket/visor/documentoFisico/', data.documentoFisicoId.documentoFisicoId]);
          const dialogRef = this.dialog.open(BucketEntradaVisorComponent, {
            width: "50%",
            height: "90%",
            data: { id: resp.documentoFisicoId },
          });

          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
          });
        }
        
      } else {

        Swal.fire({
          title: data.documentoFisicoId.documentoFisicoId,
          text: "No se encontró un oficio de respuesta",
          icon: "error",
        });

      }
    });
  }

  visorDocumentos(data) {
    if (data.leido == false) {
      this.toggleBucketEntrada(data);
    }

    if (data.documentoId != null) {
      this.router.navigate([
        "/bucket/visor/documento/",
        data.documentoId.documentoId,
      ]);
    } else {
      //this.router.navigate(['/bucket/visor/documentoFisico/', data.documentoFisicoId.documentoFisicoId]);

      const dialogRef = this.dialog.open(BucketEntradaVisorComponent, {
        width: "50%",
        height: "90%",
        data: { id: data.documentoFisicoId.documentoFisicoId },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  visorAdjuntosBE(data) {
    let tipoDoc: String = "";

    if (data.documentoId == null) {
      tipoDoc = "documentoFisico";
    } else {
      tipoDoc = "documento";
    }
    const dialogRef = this.dialog.open(VisorAdjuntosComponent, {
      width: "50%",
      height: "90%",
      data: { id: data.documentoFisicoId.documentoFisicoId, tipoDoc: tipoDoc },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  visorAcuses(data) {
    let tipoDoc: String = "";

    if (data.documentoId == null) {
      tipoDoc = "documentoFisico";
    } else {
      tipoDoc = "documento";
    }
    const dialogRef = this.dialog.open(VisorAcusesComponent, {
      width: "50%",
      height: "90%",
      data: { id: data.documentoFisicoId.documentoFisicoId, tipoDoc: tipoDoc },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  DocRelacionado(data) {
    if (data.documentoId == null) {
      this.router.navigate([
        "/documentorelacionado/formulariofisico/" +
          data.documentoFisicoId.documentoFisicoId +
          "/new/bucketEntrada",
      ]);
    } else {
      this.router.navigate([
        "/documentorelacionado/formulario/",
        data.documentoId.documentoId + "/new/bucketEntrada",
      ]);
    }
  }

  /*Cerrar(bucket):void {

  
        const id = bucket.bucketEntradaId;
    
        if (id !== 'new') {
          this.isSave = false

          debugger
          this.BEservice.BucketEntradaFind(Number(id)).subscribe((resp: BucketEntradaMdl) => {
    
            resp.documentoFisicoId.estatusDocumentoId = 3;
    
            
    
            let peticion: Observable<any>
            Swal.fire({
              title: 'Espere',
              text: 'Guardando información',
              icon: 'info',
              allowOutsideClick: false
            })
    
            debugger
            peticion = this.BEservice.AutorizarEstatus(resp.documentoFisicoId.documentoFisicoId, resp.documentoFisicoId)
           
    
            peticion.subscribe(resp => {
    
    
              this.ngOnInit();
    
              Swal.fire({
                title: id,
                text: 'Realizado correctamente',
                icon: 'success',
              })
            },
    
              error => {
                if (error) {
    
                }
    
                Swal.fire({
                  title:id,
                  text: 'error',
                  icon: 'error',
                })
              },
    
            )
    
    
    
    
          })
    
        }
    
      }*/

  CambEstatus(bucket): void {
    const id = bucket.bucketEntradaId;

    if (id !== "new") {
      this.isSave = false;

      this.BEservice.BucketEntradaFind(Number(id)).subscribe(
        (resp: BucketEntradaMdl) => {
          resp.documentoFisicoId.estatusDocumentoId = 6;

          let peticion: Observable<any>;
          Swal.fire({
            title: "Espere",
            text: "Guardando información",
            icon: "info",
            allowOutsideClick: false,
          });

          peticion = this.BEservice.AutorizarEstatus(
            resp.documentoFisicoId.documentoFisicoId,
            resp.documentoFisicoId
          );

          peticion.subscribe(
            (resp) => {
              this.ngOnInit();

              Swal.fire({
                title: id,
                text: "Realizado correctamente",
                icon: "success",
              });
            },

            (error) => {
              if (error) {
              }

              Swal.fire({
                title: id,
                text: "error",
                icon: "error",
              });
            }
          );
        }
      );
    }
  }
}
