import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from "./component/products-list/products-list.component";
import { ProductsFilterComponent } from "./component/products-filter/products-filter.component";
import { PRODUCTOS } from './db/products.db';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Actividad_02_Angular_Jose';
 
}
