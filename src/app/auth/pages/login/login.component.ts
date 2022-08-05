import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {


  miFormulario: FormGroup = this.fb.group({
    email: ['test1@mail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })


  constructor(private fb: FormBuilder,
              private router: Router,
              private auhtService: AuthService) { }

  login(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
    
    const { email, password } = this.miFormulario.value;

    this.auhtService.login( email,password )
    .subscribe(ok => {
      
      console.log("ok = ",ok)
      if(ok === true){
        this.router.navigateByUrl('/dashboard')
      }else{
        //Mostrar el mensjae de error
        Swal.fire('Error', ok, 'error')
      }
    })

    // this.router.navigateByUrl('/dashboard');
  }

  

}
