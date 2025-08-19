import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadoComponent } from './componentes-dinamicos/listado/listado.component';
import { FormularioComponent } from './componentes-dinamicos/formulario/formulario.component';
import { MainComponent } from '../main/main.component';
import { BlankComponent } from './blank/blank.component';
import { AuthGuard } from '../_utils/guards/auth.guard';
import { DocumentoFormularioComponent } from './static/documento/documento-formulario/documento-formulario.component';
import { DocumentoListadoComponent } from './static/documento/documento-listado/documento-listado.component';
import { IntermediaComponent } from './static/IntUsuPer/Intermedia/IntUsuPer.component';
import { ActoresComponent } from './static/Actor/Actors/Actor.component';
import { ListadoActorComponent } from './static/Actor/listado-actor/listado-actor.component';
import { ListadoBucketEntradaComponent } from './static/BucketEntrada/BucketEntrada-Listado/bucketEntrada-listado';
import { BucketSalidaListadoComponent } from './static/BucketSalida/bucket-salida-listado/bucket-salida-listado.component';
import { BucketSalidaVisorComponent } from './static/BucketSalida/bucket-salida-visor/bucket-salida-visor.component';
import { BucketEntradaVisorComponent } from './static/BucketEntrada/BucketEntrada-Visor/BucketEntrada-visor.component';
import { UsuarioAsignacionListadoComponent } from './static/IntUsuPer/listado-intermedia/IntUsuPer-listado.component';
import { DocPorFirmarListadoComponent } from './static/DocumentosPorFirmar/Listado docsXfirmar/listadoDocXfirmar.component';
import { OrganizacionComponent } from './static/Organizacion/organizacion/organizacion.component';
import { ListadoOrganizacionComponent } from './static/Organizacion/listado-organizacion/listado-organizacion.component';
import { GrupoOrganizacionalListadoComponent } from './static/grupoOrganizacional/grupo-organizacional-listado/grupo-organizacional-listado.component';
import { GrupoOrganizacionalFormularioComponent } from './static/grupoOrganizacional/grupo-organizacional-formulario/grupo-organizacional-formulario.component';
import { DocumentoRelacionadoListadoComponent } from './static/DocumentoRelacionado/documento-relacionado-listado/documento-relacionado-listado.component';
import { DocumentoRelacionadoFormularioComponent } from './static/DocumentoRelacionado/documento-relacionado-formulario/documento-relacionado-formulario.component';
import { DocumentoFisicoFormularioComponent } from './static/documento/documento-fisico-formulario/documento-fisico-formulario.component';
import { DocumentoFisicoListadoComponent } from './static/documento/documento-fisico-listado/documento-fisico-listado.component';
import { VisorDocXfirmarComponent } from './static/DocumentosPorFirmar/docsXfirmarVisor/docsXfirmar-visor.component';
import { TurnosListadoComponent } from './static/turnos/turnos-listado/turnos-listado.component';
import { TurnosVisorComponent } from './static/turnos/turnosRecibidos-visor/turnos-visor.component';
import { TurnoFormularioComponent } from './static/TurnoFormulario/formulario/turnoFormulario.component';
import { TurnoBucketFormularioComponent } from './static/TurnoFormulario/Turno-Bucket/turno-bucket.component';
import { DocumentoRelacionadoFisicoComponent } from './static/DocumentoRelacionado/documento-relacionado-fisico/documentoRelacionadoFisico.component';
import { PerfilListadoComponent } from './static/perfil/perfil-listado/perfil-listado.component';
import { PerfilFormularioComponent } from './static/perfil/perfil-formulario/perfil-formulario.component';
import { TurnoFormularioTurnoComponent } from './static/TurnoFormulario/Turno_En_Turnos/turno.component';
import { ListadoActorAdministrativosComponent } from './static/Actor/listado-actor-administrativos/listado-actor-administrativos.component';
import { FormularioActorAdministrativosComponent } from './static/Actor/formulario-actor-administrativos/formulario-actor-administrativos.component';
import { DocumentosActivosComponent } from './static/reportes/documentos-activos/documentos-activos.component';
import { TurnosListEnviadosComponent } from './static/turnos/turnos-list-enviados/turnos-list-enviados.component';
import { ObservacionesComponent } from './static/turnos/turnos-listado/observaciones.component';
import { GrupoEnvioComponent } from './static/GrupoEnvio/grupoEnvio-Formulario/grupoEnvio.component';
import { ListadoGrupoEnvioComponent } from './static/GrupoEnvio/grupoEnvio-Listado/grupoEnvio-Listado.component';
import { DocumentosEstatusComponent } from './static/reportes/documentos-estatus/documentos-estatus.component';
import { TrazaInternaComponent } from './static/reportes/traza-interna/traza-interna.component';
import {ListadoBucketEntradaUrgentesComponent} from './static/BucketEntrada/BucketEntradaUrgentes/Listado-BucketEntradaUrgentes/Listado-BEU.component';
import {VideosComponent} from './static/videos/videos.component';
import { EditorComponent } from './static/documento/editor/editor.component';
import {ContactoComponent} from './static/Contacto/contacto/contacto.component';
import {ListadoContactoComponent} from './static/Contacto/Listado-Contacto/Listado-contacto.component';
import {TurnosListCerradoRecibidoComponent} from './static/turnos/TurnoListado-CerradoRecibidos/Turnolistado-cerradorecibidos.component';
import {TurnosListEnAtencionComponent} from './static/turnos/TurnosListado-EnAtencion/TurnosListado-EnAtencion.component';
import {TurnosListCerradosEnviadosComponent} from './static/turnos/TurnoListado-CerradosEnviados/TurnoListado-CerradosEnviados.component';
import {TurnosEnviadosVisorComponent} from './static/turnos/turnosEnviados-visor/turnosEnviados-visor.component'; 
import {TurnosEnAtencionVisorComponent} from './static/turnos/turnosEnAtencion-visor/turnosEnAtencion.component';
import {TurnosCEVisorComponent} from './static/turnos/TurnosCerradosEnviados-Visor/TurnosCE-visor.component';
import {TurnosCRVisorComponent} from './static/turnos/TurnosCerradosRecibidos-Visor/TurnosCR-visor.component';
import {TurnosListadoRespuestasComponent} from './static/turnos/TurnoListado-Respuestas/TurnoListado-Respuestas.component';
import {TurnosRespuestasVisorComponent} from './static/turnos/TurnoVisor-Respuestas/Visor-Respuestas.component';
import { DocumentoFisicoSubidaComponent } from './static/documento/documento-fisico-subida/documento-fisico-subida.component';
import { TurnoEnAtencionComponent } from './static/TurnoFormulario/Turno-EnAtencion/Turno-EnAtencion.component';
import { TurnoRespuestaEAComponent} from './static/TurnoFormulario/Turno-EnAtencion/TurnoRespuestaEA.component';
import {TurnoEnRespuestaComponent} from './static/TurnoFormulario/Turno-EnRespuesta/Turno-EnRespuesta.component';
import {TurnoRespuestaERComponent} from './static/TurnoFormulario/Turno-EnRespuesta/TurnoER-Responder.component';
import {ObservacionesBEComponent} from './static/BucketEntrada/ObservacionesBE/ObservacionesBE.component';
import { ObservacionesBSComponent } from './static/BucketSalida/ObservacionesBS/ObservacionesBS.component';
import { VisorAdjuntosComponent } from './static/turnos/visor-adjuntos/visor-adjuntos.component';
import { VisorDocRelacionadoComponent } from './static/BucketSalida/visor-docRelacionado/visor-docRelacionado.component';
import { DocumentoListadoTurnoComponent } from './static/documento/documento-listado-turno/documento-listado-turno.component';
import {IndicadorComponent} from './static/Indicador/Indicador/Indicador.component';
import {ListadoIndicadorComponent} from './static/Indicador/Listado-Indicador/Listado-Indicador.component';
import { DocumentoIndicadorComponent } from './static/documento/documento-indicador/documento-indicador.component';
import { GrupoOrganizacionalListadoPieComponent } from './static/grupoOrganizacional/grupo-organizacional-listado-pie/grupo-organizacional-listado-pie.component';
import { GrupoOrganizacionalFormularioPieComponent } from './static/grupoOrganizacional/grupo-organizacional-formulario-pie/grupo-organizacional-formulario-pie.component';
import {RGDOComponent} from './static/reportes/ResumenGeneralOficios/ResumenGeneralOficios.component';
import { RPendientesOComponent } from './static/reportes/PendientesOrganizacion/PendientesOrganizacion.component';
import {AcuseComponent} from "./static/reportes/DocumentosSinAcuse/DocumentosSinAcuse.component";
import {RPendientesDeptosComponent} from "./static/reportes/PendientesDepartamentos/PendientesDepartamentos.component";
import {ObservacionesTRComponent} from './static/turnos/turnos-listado/ObservacionesTR.component';
import {ObservacionesTAComponent} from './static/turnos/TurnosListado-EnAtencion/ObservacionesTA.component';
import {ReporteIndicadorComponent} from './static/reportes/Indicadores/ReporteIndicador.component';
import {RIndicadorMensualComponent} from './static/reportes/RIndicadorMensual/RIndicadorMensual.component';
import {CerradosComponent} from './static/reportes/Cerrados/cerrados.component';


const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], component: MainComponent,
    children: [
      { path: '', canActivate: [AuthGuard], component: DashboardComponent },
      { path: 'blank', canActivate: [AuthGuard], component: BlankComponent },
      { path: 'listado/:id', canActivate: [AuthGuard], component: ListadoComponent },
      { path: 'formulario/:clase/:id', canActivate: [AuthGuard], component: FormularioComponent },
    ],
  },

  {
    path: 'documento', canActivate: [AuthGuard], component: MainComponent,
    children: [
      { path: 'formulario/:id', canActivate: [AuthGuard], component: DocumentoFormularioComponent },
      { path: 'lista', canActivate: [AuthGuard], component: DocumentoListadoComponent },
      { path: 'editor', canActivate: [AuthGuard], component: EditorComponent },
    ],
  },

  {
    path: 'documentofisico', canActivate: [AuthGuard], component: MainComponent,
    children: [
      { path: 'formulario/:id', canActivate: [AuthGuard], component: DocumentoFisicoFormularioComponent },
      { path: 'lista', canActivate: [AuthGuard], component: DocumentoFisicoListadoComponent },
      { path: 'formulariosubida/:id', canActivate: [AuthGuard], component: DocumentoFisicoSubidaComponent },
      { path: 'listaturno', canActivate: [AuthGuard], component: DocumentoListadoTurnoComponent },
      { path: 'indicador/:id', canActivate: [AuthGuard], component: DocumentoIndicadorComponent },

    ],
  },


  {
    path: 'documentorelacionado', canActivate: [AuthGuard], component: MainComponent,
    children: [
      { path: 'formulario/:documentoid/:id/:invocador', canActivate: [AuthGuard], component: DocumentoRelacionadoFormularioComponent },
      { path: 'lista', canActivate: [AuthGuard], component: DocumentoRelacionadoListadoComponent },
      { path: 'formulariofisico/:documentofisicoid/:id/:invocador', canActivate: [AuthGuard], component: DocumentoRelacionadoFisicoComponent },

    ],
  },

  {
    path: 'iup', canActivate: [AuthGuard], component: MainComponent,
    children: [
      { path: 'crear/:id', canActivate: [AuthGuard], component: IntermediaComponent },
      { path: 'crear/:id/:local', canActivate: [AuthGuard], component: IntermediaComponent },
      { path: 'lista', canActivate: [AuthGuard], component: UsuarioAsignacionListadoComponent },

    ],
  },

  {
    path: 'actor', canActivate: [AuthGuard], component: MainComponent,
    children: [

      { path: 'crear/:id', canActivate: [AuthGuard], component: ActoresComponent },
      { path: 'lista', canActivate: [AuthGuard], component: ListadoActorComponent },
      { path: 'formulario/:id', canActivate: [AuthGuard], component: FormularioActorAdministrativosComponent },
      { path: 'listaadmin', canActivate: [AuthGuard], component: ListadoActorAdministrativosComponent },

    ],
  },

  {
    path: 'bucket', canActivate: [AuthGuard], component: MainComponent,
    children: [
      { path: 'visor/:tipoDocumento/:id', canActivate: [AuthGuard], component: BucketEntradaVisorComponent },
      { path: 'lista', canActivate: [AuthGuard], component: ListadoBucketEntradaComponent },
      { path: 'formulario/:id', canActivate: [AuthGuard], component: TurnoBucketFormularioComponent },
      { path: 'ListaUrgentes', canActivate: [AuthGuard], component: ListadoBucketEntradaUrgentesComponent },
      { path: 'observacionesBE/:id', canActivate: [AuthGuard], component: ObservacionesBEComponent },
      { path: 'visorAdjuntos/:tipoDocumento/:id', canActivate: [AuthGuard], component: VisorAdjuntosComponent },
    ],
  },

  {
    path: 'bucketsalida', canActivate: [AuthGuard], component: MainComponent,
    children: [
      //{ path: 'crear/:id', canActivate: [AuthGuard], component: ActoresComponent },
      { path: 'lista', canActivate: [AuthGuard], component: BucketSalidaListadoComponent },
      { path: 'visor/:tipoDocumento/:id', canActivate: [AuthGuard], component: BucketSalidaVisorComponent },
      { path: 'formulario/:id', canActivate: [AuthGuard], component: TurnoBucketFormularioComponent },
      { path: 'observacionesBS/:id', canActivate: [AuthGuard], component: ObservacionesBSComponent },
      { path: 'visorAdjuntos/:tipoDocumento/:id', canActivate: [AuthGuard], component: VisorAdjuntosComponent },
      { path: 'visorDocRelacionado/:tipoDocumento/:id', canActivate: [AuthGuard], component: VisorDocRelacionadoComponent },

    ],
  },

  {
    path: 'DocXfirmar', canActivate: [AuthGuard], component: MainComponent,
    children: [
      //{ path: 'crear/:id', canActivate: [AuthGuard], component: ActoresComponent },
      { path: 'lista', canActivate: [AuthGuard], component: DocPorFirmarListadoComponent },
      { path: 'visor/:tipoDocumento/:id', canActivate: [AuthGuard], component: VisorDocXfirmarComponent },
    ],
  },

  {
    path: 'Organizacion', canActivate: [AuthGuard], component: MainComponent,
    children: [
      { path: 'crear/:id', canActivate: [AuthGuard], component: OrganizacionComponent },
      { path: 'lista', canActivate: [AuthGuard], component: ListadoOrganizacionComponent },
    ],
  },

  {
    path: 'reportes', canActivate: [AuthGuard], component: MainComponent,
    children: [
      { path: 'documentosactivos', canActivate: [AuthGuard], component: DocumentosActivosComponent },
      { path: 'documentosestatus', canActivate: [AuthGuard], component: DocumentosEstatusComponent },
      { path: 'documentostraza', canActivate: [AuthGuard], component: TrazaInternaComponent },
      { path: 'rgdo', canActivate: [AuthGuard], component: RGDOComponent },
      { path: 'pendientesorganizacion', canActivate: [AuthGuard], component: RPendientesOComponent },
      { path: 'acuse', canActivate: [AuthGuard], component: AcuseComponent },
      { path: 'PendientesDepartamento', canActivate: [AuthGuard], component: RPendientesDeptosComponent },
      { path: 'Indicadores', canActivate: [AuthGuard], component: ReporteIndicadorComponent },
      { path: 'IndicadorMensual', canActivate: [AuthGuard], component: RIndicadorMensualComponent },//CerradosComponent
      { path: 'Cerrados', canActivate: [AuthGuard], component: CerradosComponent },
    ],
  },


  {
    path: 'grupoorganizacional', canActivate: [AuthGuard], component: MainComponent,
    children: [

      { path: 'formulario/:id', canActivate: [AuthGuard], component: GrupoOrganizacionalFormularioComponent },
      { path: 'formulariopie/:id', canActivate: [AuthGuard], component: GrupoOrganizacionalFormularioPieComponent },
      { path: 'lista', canActivate: [AuthGuard], component: GrupoOrganizacionalListadoComponent },
      { path: 'listapie', canActivate: [AuthGuard], component: GrupoOrganizacionalListadoPieComponent },
    ],
  },
  {
    path: 'turnos', canActivate: [AuthGuard], component: MainComponent,
    children: [

      { path: 'lista', canActivate: [AuthGuard], component: TurnosListadoComponent },
      { path: 'listaenviados', canActivate: [AuthGuard], component: TurnosListEnviadosComponent },
      { path: 'listaCR', canActivate: [AuthGuard], component: TurnosListCerradoRecibidoComponent },
      { path: 'listaEA', canActivate: [AuthGuard], component: TurnosListEnAtencionComponent },
      { path: 'listaCE', canActivate: [AuthGuard], component: TurnosListCerradosEnviadosComponent },
      { path: 'listaRespuestas', canActivate: [AuthGuard], component: TurnosListadoRespuestasComponent },
      { path: 'visor/:tipoDocumento/:id', canActivate: [AuthGuard], component: TurnosVisorComponent },
      { path: 'visorEnviados/:tipoDocumento/:id', canActivate: [AuthGuard], component: TurnosEnviadosVisorComponent },
      { path: 'visorEnAtencion/:tipoDocumento/:id', canActivate: [AuthGuard], component: TurnosEnAtencionVisorComponent },
      { path: 'visorRespuestas/:tipoDocumento/:id', canActivate: [AuthGuard], component: TurnosRespuestasVisorComponent },
      { path: 'visorCE/:tipoDocumento/:id', canActivate: [AuthGuard], component: TurnosCEVisorComponent },
      { path: 'visorCR/:tipoDocumento/:id', canActivate: [AuthGuard], component: TurnosCRVisorComponent },
      { path: 'formulario/:id', canActivate: [AuthGuard], component: TurnoFormularioComponent },
      { path: 'formularios/:id', canActivate: [AuthGuard], component: TurnoFormularioTurnoComponent },
      { path: 'formularioEA/:id', canActivate: [AuthGuard], component: TurnoEnAtencionComponent },
      { path: 'formularioREA/:id', canActivate: [AuthGuard], component: TurnoRespuestaEAComponent },
      { path: 'formularioER/:id', canActivate: [AuthGuard], component: TurnoEnRespuestaComponent },
      { path: 'formularioRER/:id', canActivate: [AuthGuard], component: TurnoRespuestaERComponent },
      { path: 'observaciones/:id', canActivate: [AuthGuard], component: ObservacionesComponent },
      { path: 'visorAdjuntos/:tipoDocumento/:id', canActivate: [AuthGuard], component: VisorAdjuntosComponent },
      { path: 'ObservacionesTR/:id', canActivate: [AuthGuard], component: ObservacionesTRComponent },
      { path: 'ObservacionesTA/:id', canActivate: [AuthGuard], component: ObservacionesTAComponent },
    ],
  },

  {
    path: 'perfil', canActivate: [AuthGuard], component: MainComponent,
    children: [
      { path: 'lista', canActivate: [AuthGuard], component: PerfilListadoComponent },
      { path: 'formulario/:id', canActivate: [AuthGuard], component: PerfilFormularioComponent },
    ],
  },

  {
    path: 'grupoEnvio', canActivate: [AuthGuard], component: MainComponent,
    children: [
      { path: 'lista', canActivate: [AuthGuard], component: ListadoGrupoEnvioComponent },
      { path: 'crear/:id', canActivate: [AuthGuard], component: GrupoEnvioComponent },
    ],
  },

  {
    path: 'contacto', canActivate: [AuthGuard], component: MainComponent,
    children: [

      { path: 'crear/:id', canActivate: [AuthGuard], component: ContactoComponent },
      { path: 'lista', canActivate: [AuthGuard], component: ListadoContactoComponent },
    ],
  },

  {
    path: 'videos', canActivate: [AuthGuard], component: MainComponent,
    children: [
      { path: 'lista', canActivate: [AuthGuard], component: VideosComponent },
    ],
  },

  {
    path: 'indicador', canActivate: [AuthGuard], component: MainComponent,
    children: [

      { path: 'crear/:id', canActivate: [AuthGuard], component: IndicadorComponent },
      { path: 'lista', canActivate: [AuthGuard], component: ListadoIndicadorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
