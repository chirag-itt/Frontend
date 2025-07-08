import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
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
    this.auth.login(this.form.value.username!, this.form.value.password!).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/standup']);
      },
      error: err => {
        this.loading = false;
        this.snack.open(err.error?.message || 'Login failed', 'Close', { duration: 3000 });
      }
    });
  }
}
