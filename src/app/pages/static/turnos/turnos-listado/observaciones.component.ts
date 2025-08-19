import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators,FormBuilder, Form} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {TrazaInternaService} from 'src/app/_utils/services/Service-Entidades/TrazaInternaService';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
 import Swal from 'sweetalert2';
 import {Observable} from 'rxjs';
 import {TrazaInternaMdl} from 'src/app/_modelos/Traza_interna';

 


@Component({
  selector: 'app-turnos-listado',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.scss']
})
export class ObservacionesComponent implements OnInit {

  TI: TrazaInternaMdl = new TrazaInternaMdl()
  
  formGroup: FormGroup;
  
  get f() { return this.formGroup.controls; }
  isSave: boolean = true
 
  constructor(
    private _formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private Route: Router,
    private TIservice: TrazaInternaService,
    public apiService: OpenApiService,
    
    ) { 

      this.formGroup = this._formbuilder.group(this.TI);
    }

  ngOnInit() {

    
      
    //obtengo el parametro en la ruta GET
    const id = this.route.snapshot.paramMap.get('id')
    if(id !== 'new'){
      this.isSave = false
      //Editar
      this.TIservice.TrazaInternaFind(Number(id)).subscribe((resp:TrazaInternaMdl) => {
        
          this.TI = resp

          this.TI.observacionesCierre = "";

          this.formGroup = this._formbuilder.group(this.TI);
          
        })
    }
  }

  //guardarDependencia(form: NgForm){
    CerrarTurno(){
    
      if(this.formGroup.invalid){
      //Aquí va la validación del form
      console.log(this.formGroup)
      console.log('Form no valido')
      return
    }
    let peticion : Observable<any>
    Swal.fire({
      title:'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick:false
    })

    debugger

    this.TI = this.formGroup.value;
    this.TI.ctrlActivo = true;
    this.TI.ctrlCreadoPor =1;
    this.TI.ctrlActualizado = new Date();
    this.TI.ctrlActualizadoPor = 1;
    this.TI.estatusTurnoId = 3
    this.TI.documentoId = null
 
  
    Swal.showLoading()

    debugger

    if(this.TI.trazaInternaId){
      this.TI.ctrlCreado = this.TI.ctrlCreado
      peticion = this.TIservice.TrazainernaEdit(this.TI.trazaInternaId,this.TI)

      console.log(this.TI)
    }

    
    else {
        debugger
      this.TI.ctrlCreado = new Date()
      console.log(this.TI)
      peticion = this.TIservice.TrazaInternaCreate(this.TI)
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title:this.TI.trazaInternaId,
        text:'Realizado correctamente',
        icon:'success',
      })
    },

    error => {
      if(error){

      }

      Swal.fire({
        title:this.TI.trazaInternaId,
        text:'error',
        icon:'error',
      })
    },
    
    )

 
  }

  Redireccionar(): void {
    this.Route.navigate(['/turnos/listaenviados']);
  }


}

