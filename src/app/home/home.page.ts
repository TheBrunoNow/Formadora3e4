import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoUserPage } from '../page/info-user/info-user.page';
import { AdduserPage } from '../page/adduser/adduser.page';
import { AgendaService } from '../model/agenda/agenda.service';
import { Router } from '@angular/router';
import { Agenda } from '../model/agenda/agenda'; // Importando a interface ou classe Agenda

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  agendas: Agenda[] = []; // Tipando agendas como um array de Agenda

  constructor(
    private modalController: ModalController,
    private service: AgendaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateAgenda();
  }

  updateAgenda() {
    this.service.getAll().subscribe(
      (response: Agenda[]) => { // Especificando que a resposta é um array de Agenda
        this.agendas = response;
      },
      (error) => console.error('Erro ao atualizar a lista:', error)
    );
  }

  async openModal(component: any, props: any = {}) {
    const modal = await this.modalController.create({
      component,
      componentProps: props,
    });
    modal.onDidDismiss().then(() => this.updateAgenda());
    await modal.present();
  }

  openInfoUserModal(a: Agenda) { // Tipando o parâmetro como Agenda
    this.openModal(InfoUserPage, { dados: a });
  }

  openAddUserModal() {
    this.openModal(AdduserPage);
  }

  logout() {
    localStorage.removeItem('logado');
    this.router.navigate(['/login']);
  }
}
