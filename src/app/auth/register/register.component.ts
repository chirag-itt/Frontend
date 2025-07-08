import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    fullName: ['', Validators.required]
  });
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.register(
      this.form.value.username!,
      this.form.value.password!,
      this.form.value.fullName!
    ).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/standup']);
      },
      error: err => {
        this.loading = false;
        this.snack.open(err.error?.message || 'Registration failed', 'Close', { duration: 3000 });
      }
    });
  }
}
