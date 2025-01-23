import { Injectable } from '@angular/core';
import { IProducts } from '../interfaces/iproducts';
import { PRODUCTOS } from '../db/products.db';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private arrProducts: IProducts [] = [];
  private api = 'https://jsonblob.com/api/1330918993762115584';
  
  constructor() {
   this.arrProducts = [];

   fetch(this.api)
      .then(response => response.json())
      .then(productos => {
        productos.forEach((element: any) => {
          let producto = element as IProducts;
          this.arrProducts.push(producto);
        });
      })
    
  }

  getAllProducts(): IProducts[]{
    return this.arrProducts;
  }

  // async cargaProductos(): Promise<void> {
  //   try {
  //     const response = await fetch(this.api);
  //     this.arrProducts = await response.json();
  //     console.log('Productos cargados:', this.arrProducts);
  //   } catch (error) {
  //     console.error('Error al cargar productos:', error);
  //   }
  // }

  // async getAllProducts(): Promise<IProducts[]>{
   
  //   if (this.arrProducts.length === 0) {
  //     await this.cargaProductos();
  //   }
  //   return this.arrProducts;
  // }
  
}
