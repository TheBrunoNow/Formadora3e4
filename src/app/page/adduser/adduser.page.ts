import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgendaService } from 'src/app/model/agenda/agenda.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage {
  usuario = '';
  email = '';
  telefone = '';

  constructor(
    private modalCtrl: ModalController, 
    private agendaService: AgendaService
  ) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addNew() {
    const newUser = { usuario: this.usuario, email: this.email, telefone: this.telefone };
    this.agendaService.addNew(newUser).subscribe(
      () => this.closeModal(),
      error => console.error('Erro ao adicionar usuário:', error)
    );
  }
}
