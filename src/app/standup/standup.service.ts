import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StandupEntry } from '../shared/models.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StandupService {
  private api = 'https://127.0.0.1:7149/api/standup';

  constructor(private http: HttpClient) {}

  getAll(): Observable<StandupEntry[]> {
    return this.http.get<StandupEntry[]>(this.api);
  }

  create(entry: StandupEntry): Observable<StandupEntry> {
    return this.http.post<StandupEntry>(this.api, entry);
  }

  update(id: number, entry: StandupEntry): Observable<StandupEntry> {
    return this.http.put<StandupEntry>(`${this.api}/${id}`, entry);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  getWeeklySummary(): Observable<StandupEntry[]> {
    return this.http.get<StandupEntry[]>(`${this.api}/weekly-summary`);
  }

  export(format: 'csv' | 'txt'): Observable<Blob> {
    return this.http.get(`${this.api}/export?format=${format}`, { responseType: 'blob' });
  }
}
