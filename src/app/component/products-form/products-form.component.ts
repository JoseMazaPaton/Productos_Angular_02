import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProducts } from '../../interfaces/iproducts';
import { validate } from 'uuid';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent {

  @Output() productoAlta: EventEmitter<IProducts> = new EventEmitter;
  @Output() cerrarAlta: EventEmitter<boolean> = new EventEmitter;
  
  modelForm: FormGroup;
  prodAlta: IProducts;

  constructor(){
    this.modelForm = new FormGroup({
      _id: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{24}$/)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(20), Validators.maxLength(255)]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required, Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i)]),
      active: new FormControl(null, [Validators.required])
    }, [])

    this.prodAlta = {
      _id:'',
      name: '',
      description:'',
      price: 0,
      category: '',
      image:'',
      active: true
    };
  }
  
  getDataForm() {
    this.prodAlta = this.modelForm.value as IProducts;
    this.enviarProducto();
  }
 
  enviarProducto(){
    this.productoAlta.emit(this.prodAlta);
  }

  cierreAlta(){
    console.log("Estoy pulsando cierreAlta")
    this.cerrarAlta.emit();
  }

  checkControl(formControlName: string, validador: string): boolean | undefined{
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched; 
  }

}
