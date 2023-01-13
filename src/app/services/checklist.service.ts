import { Injectable } from '@angular/core';
import { ChecklistItem } from '../models/checklist_item';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';

export const CHECKLIST_DATA = [
  {
    guid: 'aaa-bbb-ccc-dddd',
    complete: true,
    description: 'Criar um site para o portfolio de um desenvolvedor',
    name: 'Site Portfolio',
    endDate: new Date(),
    startDate: new Date(),
    category: { name: 'Educação', guid: 'aaa-bbb-ccc-dddd' }
  },
  {
    name: 'Clinico Geral',
    complete: false,
    description: 'Ir ao clinico geral',
    endDate: new Date,
    startDate: new Date,
    category: { name: 'Saúde', guid: 'aaa-bbb-ccc-dddd' },
    guid: 'aaa-bbb-ccc-dddd',
  },
  {
    name: 'API do site Angular',
    complete: false,
    description: 'Criar a API springboot do site Angular',
    endDate: new Date,
    startDate: new Date,
    category: { name: 'Trabalho', guid: 'aaa-bbb-ccc-dddd' },
    guid: 'aaa-bbb-ccc-dddd',
  },
];

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  public getChecklist(): Observable<Category[]> {
    return of(CHECKLIST_DATA);
    // return new Observable<Category[]>(observer => {
    //   observer.next(CATEGORY_DATA);
    // });
  }
  constructor() { }
}
