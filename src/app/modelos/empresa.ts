import { IEmpresas } from '../interfaces/empresas.ts';

export class Empresa implements IEmpresas {
  id?: string;
  nombre?: string;
  representante?: string;
  direccion?: string;
  nit?: string;
  activa?: boolean;
  image?: string;
}
