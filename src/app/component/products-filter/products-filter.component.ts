import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IFiltro } from '../../interfaces/ifiltro';

@Component({
  selector: 'app-products-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.css'
})
export class ProductsFilterComponent {

  @Output() filtroProducto: EventEmitter<IFiltro> = new EventEmitter;
  
  filtros: IFiltro;
  
  constructor(){
    this.filtros = {
      categoria: '',
      palabraClave: '',
      precioMin: null,
      precioMax: null
    }
  }

  


  getDataForm(miFormulario: NgForm) {
    console.log(this.filtros.precioMin)
    this.filtros.precioMin = miFormulario.value.precioMin === '' ? null : miFormulario.value.precioMin;
    console.log(this.filtros.precioMin)
    this.filtros.precioMax = miFormulario.value.precioMax === '' ? null : miFormulario.value.precioMax;

    
    this.filtros = {
      ...this.filtros,
      categoria: miFormulario.value.categoria || '',  
      palabraClave: miFormulario.value.palabraClave || '', 
    };

    console.log(this.filtros)
    this.enviarFiltro();
  }


  enviarFiltro(){
    console.log(this.filtros)
    this.filtroProducto.emit(this.filtros);
  }

  resetFiltros(miFormulario: NgForm) {
    
    this.filtros = {
      categoria: '',
      palabraClave: '',
      precioMin: null,
      precioMax: null
    };

    miFormulario.resetForm();
    this.enviarFiltro();
  }

  quitarFiltro(filtro: string | number, miFormulario: NgForm){ 
    //this.filtros[filtro] = null;
    miFormulario.controls[filtro].reset();
    this.getDataForm(miFormulario); }
}
