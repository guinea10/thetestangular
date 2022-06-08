import { Client } from './client';

export interface Sale {
  idVenta: number;
  idCliente: Client;
  fecha: string;
  nombreCliente: string;
}
