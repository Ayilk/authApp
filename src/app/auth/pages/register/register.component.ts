import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {

  

  miFormulario: FormGroup = this.fb.group({
    name: ['Valeria', [Validators.required]],
    email: ['valeria@mail.com', [Validators.required, Validators.email]],
    password: ['246810', [Validators.required, Validators.minLength(6)]]
  })


  constructor(private fb: FormBuilder,
              private router: Router,
              private  authService: AuthService) { }

  registro(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);

    const { name, email, password } = this.miFormulario.value;

    this.authService.register(name, email,password )
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
