import { Component, inject } from '@angular/core';
import { IProducts } from '../../interfaces/iproducts';
import { ProductService } from '../../services/product.service';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { ProductsFilterComponent } from "../products-filter/products-filter.component";
import { IFiltro } from '../../interfaces/ifiltro';
import { ProductsFormComponent } from "../products-form/products-form.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductsCardComponent, ProductsFilterComponent, ProductsFormComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {


  misProductos: IProducts[];
  misProductosLista: IProducts[];
  
  productoSeleccionado: IProducts;
  mostrar: boolean = false;
  despliegueAlta: boolean = false;

  private productsService = inject(ProductService);

  

  constructor(){
    this.misProductos = [];
    this.misProductosLista = [];
    this.productoSeleccionado = {
      _id: "",
      name:"",
      description:"",
      price: 0,
      category: "",
      image:"",
      active: true

    }
  }

  // async ngOnInit(): Promise<void> {
  //   try {
      
  //     this.misProductos = await this.productsService.getAllProducts();
  //     this.misProductosLista = [...this.misProductos]; 
  //   } catch (error) {
  //     console.error('Error al cargar productos:', error);
  //   }
  // }

  ngOnInit(): void{
    this.misProductos = this.productsService.getAllProducts();
    this.misProductosLista = this.misProductos;
    console.log(this.misProductos)
  }

  mostrarDetalle(producto: IProducts){
    this.productoSeleccionado = producto;
    this.mostrar = true;
  }
  ocultarDetalle(){
    this.mostrar = false;
  }

  cierreVentana($event: boolean) {
    this.mostrar = !this.mostrar;
    }

  quitarProducto(productoSeleccionado: IProducts) {
    console.log(this.misProductosLista);
    console.log(productoSeleccionado);
    console.log(productoSeleccionado._id);


    console.log(this.misProductos)


    this.misProductos = this.misProductos.filter(prod => prod._id !== productoSeleccionado._id);
    console.log(this.misProductos)
    this.misProductosLista = [...this.misProductos];
    console.log(this.misProductosLista);
    //this.misProductosLista = [...this.misProductos]
    //this.misProductosLista = this.misProductos.filter(prod => prod.id !== producto.id);

    //this.misProductos = this.misProductos.filter(prod => prod.id !== producto.id);
    //this.misProductosLista = [...this.misProductos]
    this.mostrar = !this.mostrar;
  }

  actualizarLista(filtros: IFiltro): void{
    // console.log(filtros);
    // console.log(this.misProductos);
    // console.log(this.misProductosLista);
    this.misProductosLista = this.filtrarProductos(filtros);
    // console.log(this.misProductosLista);

  }

  filtrarProductos(filtros: IFiltro): IProducts[] {
    return this.misProductos.filter(producto => {
      const descripcion = producto.name ? producto.name.toLowerCase().trim() : '';
      
      
      const coincideCategoria = filtros.categoria ? producto.category === filtros.categoria : true;
      const coincidePalabraClave = filtros.palabraClave 
        ? descripcion.includes(filtros.palabraClave.toLowerCase()) 
        : true;
      const coincidePrecioMin = filtros.precioMin != null ? producto.price >= filtros.precioMin : true;
      const coincidePrecioMax = filtros.precioMax != null ? producto.price <= filtros.precioMax : true;
  
    
      return coincideCategoria && coincidePalabraClave && coincidePrecioMin && coincidePrecioMax;
    });
  }

  cierreAlta($event: boolean) {
    console.log("asdasdasdas")
    this.despliegueAlta = false;
    console.log(this.despliegueAlta);

  }
  anadirProducto(prodAlta:  IProducts) {
    console.log(this.misProductos);
    this.misProductos.push(prodAlta);
    console.log(this.misProductos);
    console.log(this.misProductosLista);
    //this.misProductosLista.push(prodAlta);
    console.log(this.misProductosLista);
    //this.misProductosLista = [...this.misProductos]
    
    this.despliegueAlta = false;
  }
  mostrarAlta($event: MouseEvent) {
    this.despliegueAlta = true;
  }
}
