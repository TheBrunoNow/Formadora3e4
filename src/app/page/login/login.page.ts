import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseloginService } from 'src/app/model/firebaselogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email = '';
  senha = '';
  mensagem = '';

  constructor(private service: FirebaseloginService, private router: Router) {}

  login() {
    this.mensagem = '';

    if (!this.email || !this.senha) {
      this.mensagem = 'Por favor, preencha os campos';
      return;
    }

    this.service.login(this.email, this.senha)
      .then(() => {
        localStorage.setItem('logado', 'ativo');
        this.router.navigate(['/']);
      })
      .catch(() => this.mensagem = 'Erro ao fazer login');
  }
}
