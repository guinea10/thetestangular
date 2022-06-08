import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = `${environment.apiUrl}products`;

  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
 
  getProductByID(id: number): Observable<Product> {
    const urlByID = `${this.url}/${id}/`;
    return this.http.get<Product>(urlByID);
  }

  deleteProduct(id: number): Observable<Product> {
    const urlDelete = `${this.url}/${id}/`;
    return this.http.delete<Product>(urlDelete);
  }

  updateProduct(product: Product): Observable<Product> {
    const urlPatch = `${this.url}/${product.idProducto}/`;
    return this.http.patch<Product>(urlPatch, product);
  }

  postProduct(product: Product): Observable<Product> {
    const urlPost = `${this.url}`;
    return this.http.post<Product>(urlPost, product);
  }
}
