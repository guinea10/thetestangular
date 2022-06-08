import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/shared/models/sale';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  url = `${environment.apiUrl}sale`;

  constructor(private http: HttpClient) {}

  getSale(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.url);
  }
}
