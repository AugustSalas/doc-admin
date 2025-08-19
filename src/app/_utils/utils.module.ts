import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';
import { AppService } from './services/app.service';
import { DinamicoService } from './services/dinamico.service';
import { OpenApiService } from './services/open-api.service';
import { AuthenticationService } from './services/authentication.service';
import { NotificacionesService } from './services/notificaciones.service';
import { IntUsuPerService } from './services/Service-Entidades/IntUsuPer';
import { ActorsService } from './services/Service-Entidades/actor.service';
import { BucketEntradaService } from './services/Service-Entidades/BucketEntrada.service';
import { DocumentoService } from './services/Service-Entidades/documento.service';
import { BucketSalidaService } from './services/Service-Entidades/BucketSalida.service';
import { DocPorFirmarService } from './services/Service-Entidades/DocPorFirmar.service';
import { OrganizacionService } from './services/Service-Entidades/Organizacion.service';
import { AnexoService } from './services/Service-Entidades/anexo.service';
import { MembreteService } from './services/Service-Entidades/membrete.service';
import { GrupoOrganizacionalService } from './services/Service-Entidades/grupoOrganizacional.service';
import { DocumentoFisicoService } from './services/Service-Entidades/documentoFisico.service';
import { TrazaInternaService } from './services/Service-Entidades/TrazaInternaService';
import { AnexoDocumentoFisicoService } from './services/Service-Entidades/anexoDocumentoFisico.service';
import { PerfilService } from './services/Service-Entidades/perfil.service';
import { DerechoService } from './services/derecho.service';
import {GrupoEnvioService} from './services/Service-Entidades/GrupoEnvio.service';
import {ContactoService} from './services/Service-Entidades/contacto.service';
import {IndicadorService} from './services/Service-Entidades/Indicador.service';
import { IndicadorDocumentoService } from './services/Service-Entidades/IndicadorDocumento.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    IntUsuPerService,
    ActorsService,
    BucketEntradaService,
    AuthGuard,
    NonAuthGuard,
    AppService,
    DinamicoService,
    OpenApiService,
    AuthenticationService,
    NotificacionesService,
    DocumentoService,
    BucketSalidaService,
    DocPorFirmarService,
    OrganizacionService,
    AnexoService,
    MembreteService,
    GrupoOrganizacionalService,
    DocumentoFisicoService,
    TrazaInternaService,
    AnexoDocumentoFisicoService,
    PerfilService,
    DerechoService,
    GrupoEnvioService,
    ContactoService,
    IndicadorService,
    IndicadorDocumentoService
  ],
})
export class UtilsModule { }
