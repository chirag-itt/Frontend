import { Component, OnInit } from '@angular/core';
import { StandupService } from '../standup.service';
import { StandupEntry } from '../../shared/models.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-standup-list',
  templateUrl: './standup-list.component.html',
  styleUrls: ['./standup-list.component.scss']
})
export class StandupListComponent implements OnInit {
  entries: StandupEntry[] = [];
  loading = false;
  editing: StandupEntry | null = null;

  constructor(private standup: StandupService, private snack: MatSnackBar) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.standup.getAll().subscribe({
      next: data => {
        this.entries = data;
        this.loading = false;
      },
      error: () => {
        this.snack.open('Failed to load entries', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  edit(entry: StandupEntry) {
    this.editing = { ...entry };
  }

  onSaved() {
    this.editing = null;
    this.load();
  }

  delete(id: number) {
    if (!confirm('Delete this entry?')) return;
    this.standup.delete(id).subscribe({
      next: () => {
        this.snack.open('Entry deleted', 'Close', { duration: 2000 });
        this.load();
      },
      error: () => this.snack.open('Delete failed', 'Close', { duration: 2000 })
    });
  }
}
