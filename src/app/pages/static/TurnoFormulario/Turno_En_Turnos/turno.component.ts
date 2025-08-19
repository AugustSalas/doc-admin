import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  FormBuilder,
  Form,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TrazaInternaService } from "src/app/_utils/services/Service-Entidades/TrazaInternaService";
import { OpenApiService } from "src/app/_utils/services/open-api.service";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { TrazaInternaMdl } from "src/app/_modelos/Traza_interna";
import { DocumentoMdl } from "src/app/_modelos/documento";
import { EstatusTurnoMdl } from "src/app/_modelos/EstatusTurno";
import { GrupoOrganizacionalMdl } from "src/app/_modelos/grupoOrganizacional";
import { OrganizacionMdl } from "src/app/_modelos/organizacion";
import { BucketEntradaMdl } from "src/app/_modelos/bucketentrada1";
import { DinamicoService } from "src/app/_utils/services/dinamico.service";

@Component({
  selector: "app-turno",
  templateUrl: "./turno.component.html",
  styleUrls: ["./turno.component.scss"],
})
export class TurnoFormularioTurnoComponent implements OnInit {
  data: any[] = null;

  cols: any[] = [
    { field: "trazaInternaId", header: "Turno" },
    { field: "estatus", header: "Estatus del Turno" },
    { field: "OrigenNombre", header: "Área que Turna" },
    { field: "DestinoNombre", header: "Área Destino" },
    { field: "numeroDocumentoOriginal", header: "No. oficio original" },
    { field: "documentoAsunto", header: "Asunto Oficio" },
    { field: "cadenaFolio", header: "Folio Interno" },
    { field: "fechaTurno", header: "Fecha del Turno" },
    { field: "agrupador", header: "Volante de Referencia" },
  ];

  TI: TrazaInternaMdl = new TrazaInternaMdl();
  trazaInterna: TrazaInternaMdl = new TrazaInternaMdl();

  documento: DocumentoMdl = new DocumentoMdl();
  documentos: DocumentoMdl[] = [];
  documentoss: number = 0;

  bucket: BucketEntradaMdl = new BucketEntradaMdl();
  buckets: BucketEntradaMdl[] = [];
  bucketss: number = 0;

  ET: EstatusTurnoMdl = new EstatusTurnoMdl();
  ETs: EstatusTurnoMdl[] = [];
  ETss: number = 0;

  GO: GrupoOrganizacionalMdl = new GrupoOrganizacionalMdl();
  GOs: GrupoOrganizacionalMdl[] = [];
  GOss: number = 0;

  organizacion: OrganizacionMdl = new OrganizacionMdl();
  organizacions: OrganizacionMdl[] = [];
  organizacionss: number = 0;

  ListadoContacto: any[] = [];
  grupo: any = null;

  ListadoOrganizacion: any[] = [];

  formGroup: FormGroup;

  get f() {
    return this.formGroup.controls;
  }
  isSave: boolean = true;

  constructor(
    private _formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dinamicoService: DinamicoService,
    private TIservice: TrazaInternaService,
    public apiService: OpenApiService
  ) {
    this.formGroup = this._formbuilder.group(this.TI);
    //this.formGroup.controls.grupoOrganizacionalIdOrigen.setValue(this.TI.grupoOrganizacionalIdOrigen);
    //this.formGroup.controls.organizacionIdOrigen.setValue(this.TI.organizacionIdOrigen);
  }

  ngOnInit() {
    this.grupo = this.apiService.getUsuarioToken();

    const id = this.route.snapshot.paramMap.get("id");
    if (id !== "new") {
      this.isSave = false;
      //Editar

      this.TIservice.TrazaInternaFind(Number(id)).subscribe(
        (resp: TrazaInternaMdl) => {
          this.trazaInterna = resp;

          let endpointActor = this.apiService.BuscarEndpointPorClase(
            "#/components/schemas/Actor"
          );

          this.dinamicoService
            .getIndividual(endpointActor.ruta, 1)
            .subscribe((resp) => {
              this.organizacion = resp;
            });

          //  this.dinamicoService.getListado("/webresources/organizacion/list/"+ this.grupo.grupo_organizacional_remitente_id ).subscribe(resp => {
          //Nuevo endpoint, sólo para turnar hacia GO - ORG
          this.dinamicoService
            .getListado("/webresources/destinatarios/turnar")
            .subscribe((resp) => {
              this.ListadoOrganizacion = resp;
              resp.forEach((element) => {
                element.NombreCompleto =
                  element.puesto_destinatario +
                  " - " +
                  element.nombre_destinatario;
              });
              this.ListadoContacto = resp;
            });

          var trazaInterna: TrazaInternaMdl = new TrazaInternaMdl();

          trazaInterna.documentoFisicoId = resp.documentoFisicoId;

          /* Valida si GO origen y destino son diferentes (Para identificar si el turno proviene de GO hacia otro GO, o es dentro del mismo GO)
           */
          //Si origen y destino son iguales
          if (
            resp.grupoOrganizacionalIdOrigen.grupoOrganizacionalId ==
            resp.grupoOrganizacionalIdDestino.grupoOrganizacionalId
          ) {
            //Asigna GO origen a origen
            trazaInterna.grupoOrganizacionalIdOrigen =
              resp.grupoOrganizacionalIdOrigen;
            this.formGroup.controls.grupoOrganizacionalIdOrigen.setValue(
              trazaInterna.grupoOrganizacionalIdOrigen
            );
          } else {
            //Asigna GO destino al origen
            trazaInterna.grupoOrganizacionalIdOrigen =
              resp.grupoOrganizacionalIdDestino;
            this.formGroup.controls.grupoOrganizacionalIdOrigen.setValue(
              trazaInterna.grupoOrganizacionalIdOrigen
            );
          }

          //Obtiene ORG origen
          trazaInterna.organizacionIdOrigen = resp.organizacionIdDestino;
          this.formGroup.controls.organizacionIdOrigen.setValue(
            trazaInterna.organizacionIdOrigen
          );
          trazaInterna.mensaje = "";
          //trazaInterna.instrucciones = "";

          this.formGroup = this._formbuilder.group(trazaInterna);
        }
      );
    }
  }

  consultaTurnos(event) {
    debugger;
    this.data = null;
    let temp: any = {};

    temp.documento_id = null;
    temp.documento_fisico_id = this.trazaInterna.documentoFisicoId.documentoFisicoId;

    temp.grupo_organizacional_id_origen = this.grupo.grupo_organizacional_remitente_id;
    temp.organizacion_id_origen = this.grupo.organizacion_remitente_id;

    temp.grupo_organizacional_id_destino =
      event.value.grupo_organizacional_destinatario_id;
    temp.organizacion_id_destino = event.value.organizacion_destinatario_id;

    this.TIservice.TrazaInternaBuscarTurno(temp).subscribe(
      (resp) => {
        debugger;

        resp.forEach((element) => {
          try {
            //Valida si organizacionorigen es nulo, toma el campo grupo organizacional origen
            if (element.organizacionIdOrigen == null) {
              element.OrigenNombre = element.grupoOrganizacionalIdOrigen.nombre;
            } else {
              // Toma el  organizacionOrigen
              element.OrigenNombre = element.organizacionIdOrigen.nombre;
            }
          } catch {
            element.OrigenNombre = "";
          }

          try {
            element.cadenaFolio = element.documentoFisicoId.cadenaFolio;
          } catch {
            element.cadenaFolio = "";
          }

          try {
            element.numeroDocumentoOriginal =
              element.documentoFisicoId.numeroDocumentoOriginal;
          } catch {
            element.numeroDocumentoOriginal = "";
          }

          try {
            element.documentoAsunto = element.documentoFisicoId.asunto;
          } catch {
            element.documentoAsunto = "";
          }

          try {
            element.fechaTurno = new Date(
              element.ctrlCreado
            ).toLocaleDateString();
          } catch {
            element.fechaTurno = "";
          }

          try {
            //Valida si organizacionorigen es nulo, toma el campo grupo organizacional origen
            if (element.organizacionIdDestino == null) {
              element.DestinoNombre =
                element.grupoOrganizacionalIdDestino.nombre;
            } else {
              // Toma el  organizacionOrigen
              element.DestinoNombre = element.organizacionIdDestino.nombre;
            }
          } catch {
            element.DestinoNombre = "";
          }

          try {
            if (element.estatusTurnoId.nombre == "Turnado") {
              element.estatus = "Recibido";
            } else {
              element.estatus = element.estatusTurnoId.nombre;
            }

            //Valida si organizacionorigen es nulo, toma el campo grupo organizacional origen
          } catch {
            element.estatus = "";
          }

          try {
            element.agrupador = element.agrupador + "/" + "2021";
          } catch {
            element.agrupador = "";
          }
        });

        if (resp.length == 0) {
         /* Swal.fire({
            title: "Turnos",
            text: "No se encontraron turnos relacionados",
            icon: "info",
            allowOutsideClick: false,
          });*/

          this.data = null;
        } else {
          Swal.fire({
            title: "Turnos",
            text:
              "Se encontraron turnos relacionados y se muestran en la tabla inferior",
            icon: "info",
            allowOutsideClick: false,
          });

          this.data = resp;
        }

       
      },
      (error) => {
        Swal.fire({
          title: "Error",
          text: "Error al consultar los turnos relacionados",
          icon: "info",
          allowOutsideClick: false,
        });

        this.data = null;
      }
    );
  }
  CambResp(): void {
    debugger;
    const id = this.route.snapshot.paramMap.get("id");
    if (id !== "new") {
      this.isSave = false;
      debugger;
      //Editar

      this.TIservice.TrazaInternaFind(Number(id)).subscribe(
        (resp: TrazaInternaMdl) => {
          debugger;
          resp.estatusTurnoId = 4;

          let peticion: Observable<any>;
          Swal.fire({
            title: "Espere",
            text: "Guardando información",
            icon: "info",
            allowOutsideClick: false,
          });

          debugger;
          peticion = this.TIservice.AutorizarEstatus(resp.trazaInternaId, resp);

          peticion.subscribe(
            (resp) => {
              Swal.fire({
                title: this.TI.trazaInternaId,
                text: "Realizado correctamente",
                icon: "success",
              });
            },

            (error) => {
              if (error) {
              }

              Swal.fire({
                title: this.TI.trazaInternaId,
                text: "error",
                icon: "error",
              });
            }
          );

          this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => {
              this.router.navigate(["/turnos/lista"]);
            });
        }
      );
    }
  }

  guardarTurno() {
    debugger;

    if (this.formGroup.invalid) {
      let temp: string[] = [];
      //Aquí va la validación del form
      console.log(this.formGroup);
      console.log("Form no valido");
      return;
    }
    let peticion: Observable<any>;

    Swal.fire({
      title: "Espere",
      text: "Guardando información",
      icon: "info",
      allowOutsideClick: false,
    });

    debugger;
    let temp: TrazaInternaMdl = this.formGroup.value;

    //Valida si es enviado por una org, setea el id
    if (temp.organizacionIdOrigen != null) {
      temp.organizacionIdOrigen = temp.organizacionIdOrigen.organizacionId;
    }
    temp.trazaInternaId = null;

    temp.ctrlActivo = true;
    temp.ctrlCreadoPor = 1;
    temp.ctrlActualizado = new Date();
    temp.ctrlActualizadoPor = 1;
    temp.estatusTurnoId = 1;
    temp.agrupador = 1;
    temp.documentoId = null;
    temp.ctrlCreado = new Date();

    // temp.organizacionIdDestino = Number(this.organizacion.organizacionId)

    // var test:OrganizacionMdl=temp.organizacionIdDestino;
    //  temp.organizacionIdDestino=test;
    ////// temp.organizacionIdDestino=temp.organizacionIdDestino.organizacionId;
    //temp.organizacionIdDestino=this.ListadoOrganizacion.find(element=>element.organizacionId=temp.organizacionIdDestino.organizacionId)
    //var temp2=this.ListadoOrganizacion.find(element=>element.organizacionId=temp.organizacionIdDestino.organizacionId)

    /* Validaciones para identificar si el destinarario es GO - ORG  */

    // Si trae no datos organización_destino, asigna los valores seleccionados a GO destino y nullea organización_destino
    if (temp.organizacionIdDestino.organizacion_destinatario_id == null) {
      temp.grupoOrganizacionalIdDestino = temp.organizacionIdDestino;
      temp.organizacionIdDestino = null;
    } else {
      //Si no, es una organización y obtiene el ID
      temp.organizacionIdDestino =
        temp.organizacionIdDestino.organizacion_destinatario_id;
    }

    //Valida si viene nulo el GO destino, toma el GO origen y lo asigna a destino
    if (
      temp.grupoOrganizacionalIdDestino.grupo_organizacional_destinatario_id ==
      null
    ) {
      temp.grupoOrganizacionalIdDestino =
        temp.grupoOrganizacionalIdOrigen.grupoOrganizacionalId;
    } else {
      temp.grupoOrganizacionalIdDestino =
        temp.grupoOrganizacionalIdDestino.grupo_organizacional_destinatario_id;
    }

    Swal.showLoading();

    debugger;
    this.TI.ctrlCreado = new Date();
    console.log(this.TI);
    peticion = this.TIservice.TrazaInternaCreate(temp);

    peticion.subscribe(
      (resp) => {
        Swal.fire({
          title: this.TI.trazaInternaId,
          text: "Realizado correctamente",
          icon: "success",
        });
        this.CambResp();
      },

      (error) => {
        if (error) {
        }

        Swal.fire({
          title: this.TI.trazaInternaId,
          text: "error",
          icon: "error",
        });
      }
    );
  }
}
