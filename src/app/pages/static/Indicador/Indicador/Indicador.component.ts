import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadorService} from 'src/app/_utils/services/Service-Entidades/Indicador.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { IndicadorMdl } from 'src/app/_modelos/Indicador';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';


@Component({
    selector: 'app-indicador',
    templateUrl: './Indicador.component.html',
    styleUrls: ['./Indicador.component.scss']
})


export class IndicadorComponent implements OnInit {

    indicador: IndicadorMdl = new IndicadorMdl();

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
        private IService: IndicadorService,
        public apiService: OpenApiService,) {

        this.formGroup = this._formbuilder.group(this.indicador);

    }

    ngOnInit() {

        debugger

        this.grupo = this.apiService.getUsuarioToken();
        this.usuario = this.apiService.getCurrentUser();

        
        const id = this.route.snapshot.paramMap.get('id')
        if (id !== 'new') {
            this.isSave = false

            this.IService.IndicadorFind(Number(id)).subscribe((resp: IndicadorMdl) => {

                debugger
                this.indicador = resp

                this.formGroup = this._formbuilder.group(this.indicador);

            })

        }

    }


    guardarIndicador() {

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

        this.indicador = this.formGroup.value;
        this.indicador.ctrlActivo = true;
        this.indicador.ctrlCreadoPor = 1;
        this.indicador.ctrlActualizado = new Date();
        this.indicador.ctrlActualizadoPor = 1;
        this.indicador.grupoOrganizacionalId = this.usuario.grupo_organizacional_remitente_id;
        this.indicador.organizacionId = this.usuario.organizacion_remitente_id
        
        
        Swal.showLoading()

        if (this.indicador.indicadorId) {
            this.indicador.ctrlCreado = this.indicador.ctrlCreado
            debugger
            peticion = this.IService.IndicadorEdit(this.indicador.indicadorId, this.indicador)

            console.log(this.indicador)
        }

        else {
            this.indicador.ctrlCreado = new Date()
            console.log(this.indicador)
            debugger
            peticion = this.IService.IndicadorCreate(this.indicador)
        }

        peticion.subscribe(resp => {
            Swal.fire({
                title: this.indicador.nombre,
                text: 'Realizado correctamente',
                icon: 'success',
            })
        },

            error => {
                if (error) {

                }

                Swal.fire({
                    title: this.indicador.nombre,
                    text: 'error',
                    icon: 'error',
                })
            },

        )


    }

}

