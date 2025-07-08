import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StandupService } from '../standup.service';
import { StandupEntry } from '../../shared/models.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-standup-form',
  templateUrl: './standup-form.component.html',
  styleUrls: ['./standup-form.component.scss']
})
export class StandupFormComponent implements OnChanges {
  @Input() entry: StandupEntry | null = null;
  @Output() saved = new EventEmitter<void>();

  form = this.fb.group({
    date: [new Date().toISOString().substring(0, 10), Validators.required],
    yesterday: ['', Validators.required],
    today: ['', Validators.required],
    blockers: ['']
  });
  loading = false;

  constructor(private fb: FormBuilder, private standup: StandupService, private snack: MatSnackBar) {}

  ngOnChanges() {
    if (this.entry) {
      this.form.patchValue(this.entry);
    } else {
      this.form.reset({
        date: new Date().toISOString().substring(0, 10),
        yesterday: '',
        today: '',
        blockers: ''
      });
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    const data: StandupEntry = {
      ...this.form.value,
      date: this.form.value.date ? String(this.form.value.date) : new Date().toISOString().substring(0, 10)
    } as StandupEntry;
    if (this.entry && this.entry.id) {
      this.standup.update(this.entry.id, data).subscribe({
        next: () => {
          this.snack.open('Entry updated', 'Close', { duration: 2000 });
          this.saved.emit();
          this.loading = false;
        },
        error: () => {
          this.snack.open('Update failed', 'Close', { duration: 2000 });
          this.loading = false;
        }
      });
    } else {
      this.standup.create(data).subscribe({
        next: () => {
          this.snack.open('Entry added', 'Close', { duration: 2000 });
          this.saved.emit();
          this.loading = false;
        },
        error: () => {
          this.snack.open('Add failed', 'Close', { duration: 2000 });
          this.loading = false;
        }
      });
    }
  }
}
