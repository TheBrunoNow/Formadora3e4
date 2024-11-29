import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AgendaService } from 'src/app/model/agenda/agenda.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.page.html',
  styleUrls: ['./info-user.page.scss'],
})
export class InfoUserPage {
  dados = this.navParams.get('dados');

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private service: AgendaService
  ) {}

  private handleAction(action: string, method: any) {
    method().subscribe(
      (response: any) => {
        console.log(`${action} com sucesso:`, response);
        this.closeModal();
      },
      (error: any) => console.error(`Erro ao ${action} usuário:`, error)
    );
  }

  update() {
    this.handleAction('Atualizar', () => this.service.updateUser(this.dados));
  }

  deleteUser() {
    this.handleAction('Excluir', () => this.service.deleteUser(this.dados.id));
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
