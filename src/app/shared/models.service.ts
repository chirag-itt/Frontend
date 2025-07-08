import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor() { }
}

export interface User {
  id: number;
  username: string;
  fullName: string;
}

export interface StandupEntry {
  id?: number;
  date: string;
  yesterday: string;
  today: string;
  blockers: string;
  userId?: number;
}
