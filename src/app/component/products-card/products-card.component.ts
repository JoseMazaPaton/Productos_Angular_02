import { Component, EventEmitter, Input, Output} from '@angular/core';
import { IProducts } from '../../interfaces/iproducts';

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.css'
 
})
export class ProductsCardComponent {


  @Input() miProducto!: IProducts;
  @Output() botonCerrar: EventEmitter<boolean> = new EventEmitter;
  @Output() botonEliminar: EventEmitter<any> = new EventEmitter;

  

  cerrarVentana() {
    this.botonCerrar.emit();
  }

  eliminarProducto() {
    this.botonEliminar.emit(this.miProducto);
  }
}
