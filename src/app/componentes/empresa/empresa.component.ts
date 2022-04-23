import { Component, OnInit, Input } from '@angular/core';
import { EmpresaService } from '../../servicios/empresa.service';
import { Empresa } from '../../modelos/empresa';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  Dialog: boolean;

  public empresas: Empresa[];

  empresa: Empresa;

  selectedEmpresas: Empresa[];

  submitted: boolean;

  statuses: any[];

  constructor(
    private _empresaService: EmpresaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getAll();

    this.statuses = [
      { label: 'ACTIVA', value: 'true' },
      { label: 'INACTIVA', value: 'false' },
    ];
  }

  getAll() {
    //console.log("antes de actualizar")
    //this.empresas = this._empresaService.getAll();
    this._empresaService.getAll().then((data) => (this.empresas = data));
  }

  openNew() {
    this.empresa = {};
    this.submitted = false;
    this.Dialog = true;
  }

  deleteSelectedEmpresa() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Companies?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.empresas = this.empresas.filter(
          (val) => !this.selectedEmpresas.includes(val)
        );
        this.selectedEmpresas = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Empresas Deleted',
          life: 3000,
        });
      },
    });
  }

  editEmpresa(empresa: Empresa) {
    this.empresa = { ...empresa };
    this.Dialog = true;
  }

  deleteEmpresa(empresa: Empresa) {
    console.log('Dentro de borrar');
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + empresa.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.empresas = this.empresas.filter((val) => val.id !== empresa.id);

        this._empresaService
          .delete(empresa)
          .then((data) => (this.empresas = data));

        this.empresa = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Empresa Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.Dialog = false;
    this.submitted = false;
  }
  saveEmpresa() {
    this.submitted = true;

    if (this.empresa.nombre.trim()) {
      if (this.empresa.id) {
        this._empresaService
          .update(this.empresa)
          .then((data) => (this.empresas = data));

        //this.empresas[this.findIndexById(this.empresa.id)] = this.empresa;

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Empresa Updated',
          life: 3000,
        });
      } else {
        //this.empresa.id = this.createId();
        //this.empresa.image = 'product-placeholder.svg';

        this._empresaService
          .adicionar(this.empresa)
          .then((data) => (this.empresas = data));
        // this.empresas.push(this.empresa);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Empresa Created',
          life: 3000,
        });
      }

      this.empresas = [...this.empresas];
      this.Dialog = false;
      this.empresa = {};
    }
  }
}
