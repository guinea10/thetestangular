import { Product } from './product';
import { Sale } from './sale';

export interface DetailSale {
    idDetalleVenta: number;
    idVenta: Sale;
    idProducto: Product;
}
