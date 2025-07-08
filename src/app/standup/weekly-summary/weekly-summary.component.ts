import { Component, OnInit } from '@angular/core';
import { StandupService } from '../standup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-weekly-summary',
  templateUrl: './weekly-summary.component.html',
  styleUrls: ['./weekly-summary.component.scss']
})
export class WeeklySummaryComponent implements OnInit {

  public entries: any[] = [];
  loading = false;

  constructor(
    private standup: StandupService,
    private snack: MatSnackBar,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.standup.getWeeklySummary().subscribe({
      next: data => {
        this.entries = data;
        this.loading = false;
      },
      error: () => {
        this.snack.open('Failed to load weekly summary', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  export(type: 'csv' | 'pdf'): void {
    if (type === 'pdf') {
      const doc = new jsPDF();
      const user = this.auth['userSubject']?.value;
      const fullName = user?.fullName || 'User';
      doc.setFontSize(18);
      doc.text('Weekly Standup Report', 14, 18);
      doc.setFontSize(12);
      doc.text(`Name: ${fullName}`, 14, 28);
      doc.text(`Date: ${(new Date()).toLocaleDateString()}`, 14, 36);
      autoTable(doc, {
        startY: 44,
        head: [['Date', 'Yesterday', 'Today', 'Blockers']],
        body: this.entries.map(e => [
          new Date(e.date).toLocaleDateString(),
          e.yesterday,
          e.today,
          e.blockers
        ]),
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [63, 81, 181], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { left: 14, right: 14 }
      });
      doc.save('weekly-summary.pdf');
      return;
    }
    this.standup.export(type).subscribe({
      next: blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `weekly-summary.${type}`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => this.snack.open('Export failed', 'Close', { duration: 3000 })
    });
  }

}
