// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-signup',
//   standalone:true,
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css'],
//   imports:[CommonModule, FormsModule, ReactiveFormsModule],
// })
// export class SignupComponent {
//   signupForm: FormGroup;
//   passwordStrength: string = '';
//   showPasswordHint: boolean = false;

//   email = '';
//   password = '';
//   errorMessage = '';

//   constructor(private fb: FormBuilder,private authService: AuthService) {
//     this.signupForm = this.fb.group({
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, this.validatePassword]],
//       confirmPassword: ['', Validators.required]
//     }, { validator: this.passwordsMatch });
//   }

//   validatePassword(control: any) {
//     const password = control.value;
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return regex.test(password) ? null : { invalidPassword: true };
//   }

//   passwordsMatch(group: FormGroup) {
//     const password = group.get('password')?.value;
//     const confirmPassword = group.get('confirmPassword')?.value;
//     return password === confirmPassword ? null : { passwordsMismatch: true };
//   }

//   checkPasswordStrength() {
//     const password = this.signupForm.get('password')?.value;
//     if (!password) {
//       this.passwordStrength = '';
//       return;
//     }
//     if (password.length < 8) {
//       this.passwordStrength = 'weak';
//     } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
//       this.passwordStrength = 'strong';
//     } else {
//       this.passwordStrength = 'medium';
//     }
//   }

//   onSubmit() {
//     if (this.signupForm.valid) {
//       console.log('Form Submitted', this.signupForm.value);
//     }
//   }
//   async signUp() {
//     try {
//       const user = await this.authService.signUp(this.email, this.password);
//       console.log('Sucsessfull:', user);
//       alert('Sucsessfull!');
//     } catch (error: any) {
//       this.errorMessage = error.message;
//       console.error('Hata:', error);
//     }
//   }
// }

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class SignupComponent {
  signupForm: FormGroup;
  passwordStrength: string = '';
  showPasswordHint: boolean = false;

  email: string = '';
  password: string = '';
  user: any = null;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.validatePassword]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordsMatch }
    );
  }

  async signUp() {
    try {
      await this.authService.signUp(this.email, this.password);
      alert('Registration completed successfully!');
    } catch (error) {
      alert('Error')
    }
  }

  validatePassword(control: any) {
    const password = control.value;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password) ? null : { invalidPassword: true };
  }
  passwordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
  checkPasswordStrength() {
    const password = this.signupForm.get('password')?.value;
    if (!password) {
      this.passwordStrength = '';
      return;
    }
    if (password.length < 8) {
      this.passwordStrength = 'weak';
    } else if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)
    ) {
      this.passwordStrength = 'strong';
    } else {
      this.passwordStrength = 'medium';
    }
  }
  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
    }
  }
}
