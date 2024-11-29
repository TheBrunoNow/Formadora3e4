import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoUserPage } from '../page/info-user/info-user.page';
import { AdduserPage } from '../page/adduser/adduser.page';

import { AgendaService } from '../model/agenda/agenda.service';
import { Agenda } from '../model/agenda/agenda';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  agendas: Agenda[] = [];

  constructor(
    private modalController: ModalController,
    private service: AgendaService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.updateAgenda();
  }

  updateAgenda() {
    this.service.getAll().subscribe(
      (response) => {
        this.agendas = response;
      },
      (error) => {
        console.error('Erro ao atualizar a lista:', error);
      }
    );
  }

  async openInfoUserModal(a: any) {
    const modal = await this.modalController.create({
      component: InfoUserPage,
      componentProps: {
        dados: a,
      },
    });
    modal.onDidDismiss().then(() => {
      this.updateAgenda();
    });
    await modal.present();
  }

  async openAddUserModal() {
    const modal = await this.modalController.create({
      component: AdduserPage,
    });
    modal.onDidDismiss().then(() => {
      this.updateAgenda();
    });
    await modal.present();
  }

  logout() {
    localStorage.removeItem('logado');
    this.router.navigate(['/login']);
  }
}
