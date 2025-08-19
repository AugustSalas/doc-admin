import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BlankComponent } from "./blank/blank.component";
import { ProfileComponent } from "./profile/profile.component";
import { MainComponent } from "../main/main.component";
import { FooterComponent } from "../main/footer/footer.component";
import { HeaderComponent } from "../main/header/header.component";
import { MenuSidebarComponent } from "../main/menu-sidebar/menu-sidebar.component";
import { MessagesDropdownMenuComponent } from "../main/header/messages-dropdown-menu/messages-dropdown-menu.component";
import { NotificationsDropdownMenuComponent } from "../main/header/notifications-dropdown-menu/notifications-dropdown-menu.component";
import { FormularioComponent } from "./componentes-dinamicos/formulario/formulario.component";
import { ListadoComponent } from "./componentes-dinamicos/listado/listado.component";
import { DropdownComponent } from "./componentes-dinamicos/dropdown/dropdown.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { MaterialModule } from "../_shared/material.module";
import { PrimeNgModule } from "../_shared/primeNg.module";
import { SharedModule } from "../_shared/shared.module";
import { NotificationsUrgentDropdownMenuComponent } from "../main/header/notifications-urgent-dropdown-menu/notifications-urgent-dropdown-menu.component";
import { LoginDropdownMenuComponent } from "../main/header/login-dropdown/login-dropdown.component";
import { DocumentoFormularioComponent } from "./static/documento/documento-formulario/documento-formulario.component";
import { DocumentoListadoComponent } from "./static/documento/documento-listado/documento-listado.component";
import { DialogComponent } from "./static/modal/dialog/dialog.component";
import { DocumentoDialogComponent } from "./static/documento/documento-dialog/documento-dialog.component";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { IntermediaComponent } from "./static/IntUsuPer/Intermedia/IntUsuPer.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { ActoresComponent } from "./static/Actor/Actors/Actor.component";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { ListadoActorComponent } from "./static/Actor/listado-actor/listado-actor.component";
import { ListadoBucketEntradaComponent } from "./static/BucketEntrada/BucketEntrada-Listado/bucketEntrada-listado";
import { BucketSalidaListadoComponent } from "./static/BucketSalida/bucket-salida-listado/bucket-salida-listado.component";
import { BucketSalidaVisorComponent } from "./static/BucketSalida/bucket-salida-visor/bucket-salida-visor.component";
import { BucketEntradaVisorComponent } from "./static/BucketEntrada/BucketEntrada-Visor/BucketEntrada-visor.component";
import { UsuarioAsignacionListadoComponent } from "./static/IntUsuPer/listado-intermedia/IntUsuPer-listado.component";
import { DocPorFirmarListadoComponent } from "./static/DocumentosPorFirmar/Listado docsXfirmar/listadoDocXfirmar.component";
import { OrganizacionComponent } from "./static/Organizacion/organizacion/organizacion.component";
import { ListadoOrganizacionComponent } from "./static/Organizacion/listado-organizacion/listado-organizacion.component";
import { GrupoOrganizacionalListadoComponent } from "./static/grupoOrganizacional/grupo-organizacional-listado/grupo-organizacional-listado.component";
import { GrupoOrganizacionalFormularioComponent } from "./static/grupoOrganizacional/grupo-organizacional-formulario/grupo-organizacional-formulario.component";
import { DocumentoRelacionadoListadoComponent } from "./static/DocumentoRelacionado/documento-relacionado-listado/documento-relacionado-listado.component";
import { DocumentoRelacionadoFormularioComponent } from "./static/DocumentoRelacionado/documento-relacionado-formulario/documento-relacionado-formulario.component";
import { VisorDocXfirmarComponent } from "./static/DocumentosPorFirmar/docsXfirmarVisor/docsXfirmar-visor.component";
import { TurnosListadoComponent } from "./static/turnos/turnos-listado/turnos-listado.component";
import { TurnosVisorComponent } from "./static/turnos/turnosRecibidos-visor/turnos-visor.component";
import { DocumentoBase64Component } from "./static/documento/documento-base64/documento-base64.component";
import { DocumentoFisicoFormularioComponent } from "./static/documento/documento-fisico-formulario/documento-fisico-formulario.component";
import { DocumentoFisicoListadoComponent } from "./static/documento/documento-fisico-listado/documento-fisico-listado.component";
import { DialogDinamicoComponent } from "./componentes-dinamicos/dialog/dialog.component";
import { TurnoFormularioComponent } from "./static/TurnoFormulario/formulario/turnoFormulario.component";
import { TurnoBucketFormularioComponent } from "./static/TurnoFormulario/Turno-Bucket/turno-bucket.component";
import { DocumentoRelacionadoFisicoComponent } from "./static/DocumentoRelacionado/documento-relacionado-fisico/documentoRelacionadoFisico.component";
import { PerfilListadoComponent } from "./static/perfil/perfil-listado/perfil-listado.component";
import { PerfilFormularioComponent } from "./static/perfil/perfil-formulario/perfil-formulario.component";
import { TurnoFormularioTurnoComponent } from "./static/TurnoFormulario/Turno_En_Turnos/turno.component";
import { ListadoActorAdministrativosComponent } from "./static/Actor/listado-actor-administrativos/listado-actor-administrativos.component";
import { FormularioActorAdministrativosComponent } from "./static/Actor/formulario-actor-administrativos/formulario-actor-administrativos.component";
import { DocumentosActivosComponent } from "./static/reportes/documentos-activos/documentos-activos.component";
import { TurnosListEnviadosComponent } from "./static/turnos/turnos-list-enviados/turnos-list-enviados.component";
import { ObservacionesComponent } from "./static/turnos/turnos-listado/observaciones.component";
import { GrupoEnvioComponent } from "./static/GrupoEnvio/grupoEnvio-Formulario/grupoEnvio.component";
import { DocumentosEstatusComponent } from "./static/reportes/documentos-estatus/documentos-estatus.component";
import { TrazaInternaComponent } from "./static/reportes/traza-interna/traza-interna.component";
import { ListadoBucketEntradaUrgentesComponent } from "./static/BucketEntrada/BucketEntradaUrgentes/Listado-BucketEntradaUrgentes/Listado-BEU.component";
import { ListadoGrupoEnvioComponent } from "./static/GrupoEnvio/grupoEnvio-Listado/grupoEnvio-Listado.component";
import { VideosComponent } from "./static/videos/videos.component";
import { EditorComponent } from "./static/documento/editor/editor.component";
import { ContactoComponent } from "./static/Contacto/contacto/contacto.component";
import { ListadoContactoComponent } from "./static/Contacto/Listado-Contacto/Listado-contacto.component";
import { TurnosListCerradoRecibidoComponent } from "./static/turnos/TurnoListado-CerradoRecibidos/Turnolistado-cerradorecibidos.component";
import { TurnosListEnAtencionComponent } from "./static/turnos/TurnosListado-EnAtencion/TurnosListado-EnAtencion.component";
import { TurnosListCerradosEnviadosComponent } from "./static/turnos/TurnoListado-CerradosEnviados/TurnoListado-CerradosEnviados.component";
import { TurnosEnviadosVisorComponent } from "./static/turnos/turnosEnviados-visor/turnosEnviados-visor.component";
import { TurnosEnAtencionVisorComponent } from "./static/turnos/turnosEnAtencion-visor/turnosEnAtencion.component";
import { TurnosCEVisorComponent } from "./static/turnos/TurnosCerradosEnviados-Visor/TurnosCE-visor.component";
import { TurnosCRVisorComponent } from "./static/turnos/TurnosCerradosRecibidos-Visor/TurnosCR-visor.component";
import { TurnosListadoRespuestasComponent } from "./static/turnos/TurnoListado-Respuestas/TurnoListado-Respuestas.component";
import { TurnosRespuestasVisorComponent } from "./static/turnos/TurnoVisor-Respuestas/Visor-Respuestas.component";
import { DocumentoFisicoSubidaComponent } from "./static/documento/documento-fisico-subida/documento-fisico-subida.component";
import { TurnoEnAtencionComponent } from "./static/TurnoFormulario/Turno-EnAtencion/Turno-EnAtencion.component";
import { TurnoRespuestaEAComponent } from "./static/TurnoFormulario/Turno-EnAtencion/TurnoRespuestaEA.component";
import { TurnoEnRespuestaComponent } from "./static/TurnoFormulario/Turno-EnRespuesta/Turno-EnRespuesta.component";
import { TurnoRespuestaERComponent } from "./static/TurnoFormulario/Turno-EnRespuesta/TurnoER-Responder.component";
import { ObservacionesBEComponent } from "./static/BucketEntrada/ObservacionesBE/ObservacionesBE.component";
import { ObservacionesBSComponent } from "./static/BucketSalida/ObservacionesBS/ObservacionesBS.component";
import { VisorAdjuntosComponent } from "./static/turnos/visor-adjuntos/visor-adjuntos.component";
import { AdjuntoDialogComponent } from "./static/documento/adjunto-dialog/adjunto-dialog.component";
import { VisorDocRelacionadoComponent } from "./static/BucketSalida/visor-docRelacionado/visor-docRelacionado.component";
import { DocumentoListadoTurnoComponent } from "./static/documento/documento-listado-turno/documento-listado-turno.component";
import { IndicadorComponent } from "./static/Indicador/Indicador/Indicador.component";
import { ListadoIndicadorComponent } from "./static/Indicador/Listado-Indicador/Listado-Indicador.component";
import { AcuseDialogComponent } from "./static/documento/acuse-dialog/acuse-dialog.component";
import { VisorAcusesComponent } from "./static/turnos/visor-acuses/visor-acuses.component";
import { DocumentoIndicadorComponent } from "./static/documento/documento-indicador/documento-indicador.component";
import { GrupoOrganizacionalListadoPieComponent } from './static/grupoOrganizacional/grupo-organizacional-listado-pie/grupo-organizacional-listado-pie.component';
import { GrupoOrganizacionalFormularioPieComponent } from './static/grupoOrganizacional/grupo-organizacional-formulario-pie/grupo-organizacional-formulario-pie.component';
import {RGDOComponent} from './static/reportes/ResumenGeneralOficios/ResumenGeneralOficios.component';
import { RPendientesOComponent } from "./static/reportes/PendientesOrganizacion/PendientesOrganizacion.component";
import {AcuseComponent} from "./static/reportes/DocumentosSinAcuse/DocumentosSinAcuse.component";
import {RPendientesDeptosComponent} from "./static/reportes/PendientesDepartamentos/PendientesDepartamentos.component";
import {ObservacionesTRComponent} from './static/turnos/turnos-listado/ObservacionesTR.component';
import {ObservacionesTAComponent} from './static/turnos/TurnosListado-EnAtencion/ObservacionesTA.component';
import {ReporteIndicadorComponent} from './static/reportes/Indicadores/ReporteIndicador.component';
import {RIndicadorMensualComponent} from './static/reportes/RIndicadorMensual/RIndicadorMensual.component';
import {CerradosComponent} from './static/reportes/Cerrados/cerrados.component';
import { PaginadorComponent } from './componentes-dinamicos/paginador/paginador.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BlankComponent,
    ProfileComponent,
    FooterComponent,
    HeaderComponent,
    MenuSidebarComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    NotificationsUrgentDropdownMenuComponent,
    LoginDropdownMenuComponent,
    MainComponent,
    FormularioComponent,
    ListadoComponent,
    DropdownComponent,
    DocumentoFormularioComponent,
    DocumentoListadoComponent,
    DialogComponent,
    DocumentoDialogComponent,
    IntermediaComponent,
    ActoresComponent,
    ListadoActorComponent,
    ListadoBucketEntradaComponent,
    BucketSalidaListadoComponent,
    BucketSalidaVisorComponent,
    BucketEntradaVisorComponent,
    UsuarioAsignacionListadoComponent,
    DocPorFirmarListadoComponent,
    OrganizacionComponent,
    ListadoOrganizacionComponent,
    GrupoOrganizacionalListadoComponent,
    GrupoOrganizacionalFormularioComponent,
    DocumentoRelacionadoListadoComponent,
    DocumentoRelacionadoFisicoComponent,
    DocumentoRelacionadoFormularioComponent,
    GrupoOrganizacionalFormularioComponent,
    VisorDocXfirmarComponent,
    TurnosListadoComponent,
    TurnosVisorComponent,
    DocumentoBase64Component,
    DocumentoFisicoFormularioComponent,
    DocumentoFisicoListadoComponent,
    DialogDinamicoComponent,
    TurnosListadoComponent,
    TurnosVisorComponent,
    TurnoFormularioComponent,
    TurnoBucketFormularioComponent,
    TurnoFormularioTurnoComponent,
    PerfilListadoComponent,
    PerfilFormularioComponent,
    ListadoActorAdministrativosComponent,
    FormularioActorAdministrativosComponent,
    DocumentosActivosComponent,
    TurnosListEnviadosComponent,
    ObservacionesComponent,
    GrupoEnvioComponent,
    ListadoGrupoEnvioComponent,
    DocumentosEstatusComponent,
    TrazaInternaComponent,
    ListadoBucketEntradaUrgentesComponent,
    VideosComponent,
    ContactoComponent,
    ListadoContactoComponent,
    TurnosListCerradoRecibidoComponent,
    TurnosListEnAtencionComponent,
    TurnosListCerradosEnviadosComponent,
    TurnosEnviadosVisorComponent,
    TurnosEnAtencionVisorComponent,
    TurnosCEVisorComponent,
    TurnosCRVisorComponent,
    EditorComponent,
    TurnosListadoRespuestasComponent,
    TurnosRespuestasVisorComponent,
    DocumentoFisicoSubidaComponent,
    TurnoEnAtencionComponent,
    TurnoRespuestaEAComponent,
    TurnoEnRespuestaComponent,
    TurnoRespuestaERComponent,
    VisorAdjuntosComponent,
    AdjuntoDialogComponent,
    ObservacionesBEComponent,
    ObservacionesBSComponent,
    VisorDocRelacionadoComponent,
    DocumentoListadoTurnoComponent,
    IndicadorComponent,
    ListadoIndicadorComponent,
    AcuseDialogComponent,
    VisorAcusesComponent,
    DocumentoIndicadorComponent,
    GrupoOrganizacionalListadoPieComponent,
    GrupoOrganizacionalFormularioPieComponent,
    RGDOComponent,
    RPendientesOComponent,
    AcuseComponent,
    RPendientesDeptosComponent,
    ObservacionesTRComponent,
    ObservacionesTAComponent,
    ReporteIndicadorComponent,
    RIndicadorMensualComponent,
    CerradosComponent,
    PaginadorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    PrimeNgModule,
    PagesRoutingModule,
    NgxExtendedPdfViewerModule,
    NgMultiSelectDropDownModule.forRoot(),
    PagesRoutingModule,
    NgxMatSelectSearchModule,
  ],
})
export class PagesModule {}
