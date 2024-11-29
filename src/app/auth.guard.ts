import { CanActivateFn,Router } from '@angular/router';
import { inject, Inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);

  const msg=localStorage.getItem('logado')
try{
  if(msg==='ativo'){
    return true;
  }else{
    router.navigate(['/login']);
  }
}catch(erro){
  console.log('erro ao validar atividade')
  router.navigate(['/login']);
}

router.navigate(['/login']);
return false
};
