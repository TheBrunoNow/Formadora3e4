import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseloginService } from 'src/app/model/firebaselogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  senha: string = '';
  mensagem: string = '';
  constructor(private service: FirebaseloginService, private router: Router) {}
  ngOnInit(): void {}
  login() {
    if (this.email && this.senha) {
      this.service
        .login(this.email, this.senha)
        .then(() => {
          localStorage.setItem('logado', 'ativo');
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.log('Erro ao fazer login', error);
          this.mensagem = 'Erro ao fazer login';
        });
    } else {
      this.mensagem = ' Por favor, preencha os campos';
    }
  }
}
