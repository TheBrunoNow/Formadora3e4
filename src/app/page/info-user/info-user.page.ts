import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { AgendaService } from 'src/app/model/agenda/agenda.service';
@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.page.html',
  styleUrls: ['./info-user.page.scss'],
})
export class InfoUserPage implements OnInit {
  dados: any;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private service: AgendaService
  ) {
    this.dados = this.navParams.get('dados');
  }

  update() {
    this.service.updateUser(this.dados).subscribe(
      (response) => {
        console.log('Usuário atualizado com sucesso:', response);
        this.closeModal();
      },
      (error) => {
        console.error('Erro ao atualizar usuário:', error);
      }
    );
  }

  deleteUser() {
    this.service.deleteUser(this.dados.id).subscribe(
      (response) => {
        console.log('Usuário excluído com sucesso:', response);
        this.closeModal();
      },
      (error) => {
        console.error('Erro ao excluir usuário:', error);
      }
    );
  }
  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
