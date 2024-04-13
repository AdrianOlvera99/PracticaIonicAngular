import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  products: any[] = [];
  userId: number | null = null;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error al recuperar los productos:', error);
      }
    });
    this.userId = this.userService.getUserId(); // Obtener el ID del usuario logueado
  }

  addToCart(productId: number) {
    this.shoppingCartService.addToCart(productId).subscribe({
      next: () => {
        console.log('Producto agregado al carrito exitosamente');
      },
      error: (error) => {
        console.error('Error al agregar el producto al carrito:', error);
      }
    });
  }
}
