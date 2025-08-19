import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss']
})
export class PaginadorComponent implements OnInit {

  @Input('page') page: number = 1;
  @Input('registros') registros: number = 50;
  @Output() public change = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  nextPage(){
    this.page=this.page+1;

    let salida:any=[];
    salida.registros=this.registros;
    salida.page=this.page;

    this.change.emit(salida);
  }

  backPage(){
    if(this.page>1){ 
      this.page=this.page-1;
    }

    let salida:any=[];
    salida.registros=this.registros;
    salida.page=this.page;
    
    this.change.emit(salida);

  }

  find(){

    let salida:any=[];
    salida.registros=this.registros;
    salida.page=this.page;
    
    this.change.emit(salida);

  }

}
