import { Injectable, OnInit } from '@angular/core';
import { EMPRESAS } from '../datos/empresa';
import { Empresa } from '../modelos/empresa';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService implements OnInit {
  private empresas: Empresa[];

  ngOnInit() {}

  constructor() {
    this.empresas = EMPRESAS;
  }

  async getAll(): Promise<Empresa[]> {
    //console.log("Antes de get all en empresaService");
    //console.log(this.empresas)
    //console.log(this.empresas)
    return await Promise.all(this.empresas);
  }

  //Buscar por id
  getId(id: string) {
    return this.empresas.filter((fil) => fil.id === id);
  }
  s;
  //adicionar
  async adicionar(dato: Empresa) {
    dato.id = this.createId();
    dato.image = 'product-placeholder.svg';
    this.empresas.push(dato);
    return await Promise.all(this.empresas);
  }

  async update(empresa: Empresa) {
    this.empresas[this.findIndexById(empresa.id)] = empresa;
    return await Promise.all(this.empresas);
  }

  async delete(empresa: Empresa) {
    console.log(empresa);
    this.empresas = this.empresas.filter((val) => val.id !== empresa.id);
    console.log(this.empresas);
    return await Promise.all(this.empresas);
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.empresas.length; i++) {
      if (this.empresas[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
