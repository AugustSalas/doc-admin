import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { DocumentoIndicadorMdl } from "src/app/_modelos/documentoIndicadorCuestionario";
import { IndicadorMdl } from "src/app/_modelos/Indicador";
import { OpenApiService } from "src/app/_utils/services/open-api.service";
import { DocumentoFisicoService } from "src/app/_utils/services/Service-Entidades/documentoFisico.service";
import { IndicadorService } from "src/app/_utils/services/Service-Entidades/Indicador.service";
import { IndicadorDocumentoService } from "src/app/_utils/services/Service-Entidades/IndicadorDocumento.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-documento-indicador",
  templateUrl: "./documento-indicador.component.html",
  styleUrls: ["./documento-indicador.component.scss"],
})
export class DocumentoIndicadorComponent implements OnInit {
  options = [
    { label: "Si", value: true },
    { label: "No", value: false },
  ];
  data: any[] = [];
  Indicadores: IndicadorMdl[] = [];
  IndicadoresDocumento: DocumentoIndicadorMdl[] = [];
  IndicadoresDocumentoNuevos: DocumentoIndicadorMdl[] = [];

  p: number = 1;
  Ancho = "100%";
  usuario: any;
  documentoFisico: any=null;
  id: string;
  isLoading: boolean = true;

  constructor(
    private indicadorService: IndicadorService,
    private docService: DocumentoFisicoService,
    public apiService: OpenApiService,
    private router: Router,
    private route: ActivatedRoute,
    private indicadorDocumentoService: IndicadorDocumentoService
  ) {}

  ngOnInit(): void {
    this.isLoading= true;

    this.usuario = this.apiService.getCurrentUser();
    const id = this.route.snapshot.paramMap.get("id");
    this.id = id;

    this.docService.DocumentoFind(Number(this.id)).subscribe((resp) => {
      this.documentoFisico = resp;

      this.indicadorService.IndicadorFindall().subscribe((resp) => {
        this.Indicadores = resp.filter((a) => a.ctrlActivo == true);
        debugger;
        this.indicadorDocumentoService
          .IndicadorDocumentoFindByDocumentoFisico(Number(this.id))
          .subscribe((respDoc) => {
            debugger;
            this.IndicadoresDocumento = respDoc;

            let ListaDocIndTemp: DocumentoIndicadorMdl[] = [];

            this.Indicadores.forEach((indicador) => {
              debugger;
              let tempDocInd = this.IndicadoresDocumento.find(
                (indicadorDocumento) =>
                  indicadorDocumento.indicadorId.indicadorId ==
                  indicador.indicadorId
              );

              if (tempDocInd != undefined) {
                ListaDocIndTemp.push(tempDocInd);
              } else {
                let DocInd: DocumentoIndicadorMdl = new DocumentoIndicadorMdl();
                DocInd.indicadorId = indicador;
                DocInd.documentoFisicoId = this.documentoFisico;
                ListaDocIndTemp.push(DocInd);
              }
            });

            this.isLoading= false;
            this.IndicadoresDocumentoNuevos = ListaDocIndTemp;
          });
      });
    });
  }

  guardarIndicadores() {
    debugger;

    /*   if (this.formGroup.invalid) {
      //Aquí va la validación del form
      console.log(this.formGroup)
      console.log('Form no valido')
      return
    } */

    let peticion: Observable<any>;
    Swal.fire({
      title: "Espere",
      text: "Guardando información",
      icon: "info",
      allowOutsideClick: false,
    });

    debugger;

    Swal.showLoading();

    peticion = this.indicadorDocumentoService.IndicadorDocumentoLista(
      this.IndicadoresDocumentoNuevos
    );

    peticion.subscribe(
      (resp) => {
        Swal.fire({
          title: "",
          text: "Realizado correctamente",
          icon: "success",
        });
      },

      (error) => {
        Swal.fire({
          title: "",
          text: "error",
          icon: "error",
        });
      }
    );
  }
}
