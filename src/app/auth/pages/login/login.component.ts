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
    email: ['valeria@mail.com', [Validators.required, Validators.email]],
    password: ['246810', [Validators.required, Validators.minLength(5)]]
  })


  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }


  login( ){
    console.log('value',this.miFormulario.value);
    console.log('valid',this.miFormulario.valid);
    
    const { email, password } = this.miFormulario.value;

    this.authService.login( email,password )
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
