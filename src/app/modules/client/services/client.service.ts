import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) { }

  getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }
 
  getClientByID(id: number): Observable<Client> {
    const urlByID = `${this.url}/${id}/`;
    return this.http.get<Client>(urlByID);
  }

  deleteClient(id: number): Observable<Client> {
    const urlDelete = `${this.url}/${id}/`;
    return this.http.delete<Client>(urlDelete);
  }

  updateClient(client: Client): Observable<Client> {
    const urlPatch = `${this.url}/${client.idCliente}/`;
    return this.http.patch<Client>(urlPatch, client);
  }

  postClient(client: Client): Observable<Client> {
    const urlPost = `${this.url}`;
    return this.http.post<Client>(urlPost, client);
  }
}
