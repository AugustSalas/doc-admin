import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoEnvioService } from 'src/app/_utils/services/Service-Entidades/GrupoEnvio.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { GrupoEnvioMdl } from 'src/app/_modelos/GrupoEnvio';
import { GrupoOrganizacionalMdl } from 'src/app/_modelos/grupoOrganizacional';
import { OrganizacionMdl } from 'src/app/_modelos/organizacion';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';


@Component({
    selector: 'app-grupoEnvio',
    templateUrl: './grupoEnvio.component.html',
    styleUrls: ['./grupoEnvio.component.scss']
})


export class GrupoEnvioComponent implements OnInit {

    GE: GrupoEnvioMdl = new GrupoEnvioMdl();

    GO: GrupoOrganizacionalMdl = new GrupoOrganizacionalMdl()
    GOs: GrupoOrganizacionalMdl[] = []
    GOss: number = 0;

    ORG: OrganizacionMdl = new OrganizacionMdl()
    ORGS: OrganizacionMdl[] = []
    ORGSS: number = 0;

    grupo: any = null;
    usuario: any;

    formGroup: FormGroup;

    get f() { return this.formGroup.controls; }
    isSave: boolean = true

    constructor(
        private _formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private Route: Router,
        private dinamicoService: DinamicoService,
        private GEService: GrupoEnvioService,
        public apiService: OpenApiService,) {

        this.formGroup = this._formbuilder.group(this.GE);

    }

    ngOnInit() {

        debugger

        this.grupo = this.apiService.getUsuarioToken();
        this.usuario = this.apiService.getCurrentUser();

      

            debugger

        const id = this.route.snapshot.paramMap.get('id')
        if (id !== 'new') {
            this.isSave = false

            this.GEService.GEFind(Number(id)).subscribe((resp: GrupoEnvioMdl) => {

                debugger
                this.GE = resp

                /*var grupoenvio: GrupoEnvioMdl = new GrupoEnvioMdl();
                grupoenvio.grupoOrganizacionalId = this.usuario.grupo_organizacional_remitente_id
                grupoenvio.organizacionId = this.usuario.organizacion_remitente_id*/

                this.formGroup = this._formbuilder.group(this.GE);

            })



        }

    }


    guardarGE() {

        debugger

        if (this.formGroup.invalid) {
            //Aquí va la validación del form
            console.log(this.formGroup)
            console.log('Form no valido')
            return
        }
        let peticion: Observable<any>
        Swal.fire({
            title: 'Espere',
            text: 'Guardando información',
            icon: 'info',
            allowOutsideClick: false
        })

        debugger

        this.GE = this.formGroup.value;
        this.GE.ctrlActivo = true;
        this.GE.ctrlCreadoPor = 1;
        this.GE.ctrlActualizado = new Date();
        this.GE.ctrlActualizadoPor = 1;
        this.GE.grupoOrganizacionalId = this.usuario.grupo_organizacional_remitente_id;
        this.GE.organizacionId = this.usuario.organizacion_remitente_id;
        
        Swal.showLoading()

        if (this.GE.grupoEnvioId) {
            this.GE.ctrlCreado = this.GE.ctrlCreado
            debugger
            peticion = this.GEService.GEEdit(this.GE.grupoEnvioId, this.GE)

            console.log(this.GE)
        }

        else {
            this.GE.ctrlCreado = new Date()
            console.log(this.GE)
            debugger
            peticion = this.GEService.GECreate(this.GE)
        }

        peticion.subscribe(resp => {
            Swal.fire({
                title: this.GE.nombre,
                text: 'Realizado correctamente',
                icon: 'success',
            })
        },

            error => {
                if (error) {

                }

                Swal.fire({
                    title: this.GE.nombre,
                    text: 'error',
                    icon: 'error',
                })
            },

        )


    }

}

