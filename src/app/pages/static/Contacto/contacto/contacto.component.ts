import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactoService} from 'src/app/_utils/services/Service-Entidades/contacto.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ContactoSMdl } from 'src/app/_modelos/ContactoSS';
import { TratamientoMdl } from 'src/app/_modelos/Tratamiento';
import { TipoContactoMdl} from 'src/app/_modelos/TipoContacto';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';


@Component({
    selector: 'app-contacto',
    templateUrl: './contacto.component.html',
    styleUrls: ['./contacto.component.scss']
})


export class ContactoComponent implements OnInit {

    Contacto: ContactoSMdl = new ContactoSMdl();

    TC: TipoContactoMdl = new TipoContactoMdl()
    TCs: TipoContactoMdl[] = []
    TCss: number = 0;

    Tratamiento: TratamientoMdl = new TratamientoMdl()
    Tratamientos: TratamientoMdl[] = []
    Tratamientoss: number = 0;

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
        private ContactoService: ContactoService,
        public apiService: OpenApiService,) {

        this.formGroup = this._formbuilder.group(this.Contacto);

    }

    ngOnInit() {

        debugger

        this.grupo = this.apiService.getUsuarioToken();
        this.usuario = this.apiService.getCurrentUser();

        this.ContactoService.GetTC()
        .subscribe(res => {
          
          this.TCs = res
        })
  
        this.ContactoService.GetTratamiento()
        .subscribe(res => {
          
          this.Tratamientos = res
        })

      

            debugger

        const id = this.route.snapshot.paramMap.get('id')
        if (id !== 'new') {
            this.isSave = false

            this.ContactoService.ContactoFind(Number(id)).subscribe((resp: ContactoSMdl) => {

                debugger
                this.Contacto = resp

                this.Contacto.tipoContactoId = this.Contacto.tipoContactoId.tipoContactoId;
                this.Contacto.tratamientoId = this.Contacto.tratamientoId.tratamientoId;


                this.formGroup = this._formbuilder.group(this.Contacto);

            })



        }

    }


    guardarContacto() {

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

        this.Contacto = this.formGroup.value;
        this.Contacto.ctrlActivo = true;
        this.Contacto.ctrlCreadoPor = 1;
        this.Contacto.ctrlActualizado = new Date();
        this.Contacto.ctrlActualizadoPor = 1;
        this.Contacto.grupoOrganizacionalId = this.usuario.grupo_organizacional_remitente_id;
        this.Contacto.tratamientoId = Number(this.Contacto.tratamientoId);
        this.Contacto.tipoContactoId = Number(this.Contacto.tipoContactoId)
        
        Swal.showLoading()

        if (this.Contacto.contactoId) {
            this.Contacto.ctrlCreado = this.Contacto.ctrlCreado
            debugger
            peticion = this.ContactoService.ContactoEdit(this.Contacto.contactoId, this.Contacto)

            console.log(this.Contacto)
        }

        else {
            this.Contacto.ctrlCreado = new Date()
            console.log(this.Contacto)
            debugger
            peticion = this.ContactoService.ContactoCreate(this.Contacto)
        }

        peticion.subscribe(resp => {
            Swal.fire({
                title: this.Contacto.nombre,
                text: 'Realizado correctamente',
                icon: 'success',
            })
        },

            error => {
                if (error) {

                }

                Swal.fire({
                    title: this.Contacto.nombre,
                    text: 'error',
                    icon: 'error',
                })
            },

        )


    }

}

