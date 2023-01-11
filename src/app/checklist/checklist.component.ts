import { Component, OnInit } from '@angular/core';
import { CATEGORY_DATA } from '../category/category.component';
import { ChecklistItem } from '../models/checklist_item';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';

export const CHECKLIST_DATA = [
  {
    name: 'Site Portfolio',
    complete: true,
    description: 'Criar um site para o portfolio de um desenvolvedor',
    endDate: Date.now(),
    startDate: Date.now(),
    category: CATEGORY_DATA.find((x) => x.name == 'Educação'),
    guid: 'aaa-bbb-ccc-dddd',
  },
  {
    name: 'Clinico Geral',
    complete: false,
    description: 'Ir ao clinico geral',
    endDate: Date.now(),
    startDate: Date.now(),
    category: CATEGORY_DATA.find((x) => x.name == 'Saúde'),
    guid: 'aaa-bbb-ccc-dddd',
  },
  {
    name: 'API do site Angular',
    complete: false,
    description: 'Criar a API springboot do site Angular',
    endDate: Date.now(),
    startDate: Date.now(),
    category: CATEGORY_DATA.find((x) => x.name == 'Trabalho'),
    guid: 'aaa-bbb-ccc-dddd',
  },
];

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
})
export class ChecklistComponent implements OnInit {
  public dataSource = CHECKLIST_DATA;

  public displayedColumns: string[] = [
    'id',
    'name',
    'complete',
    'description',
    'startDate',
    'endDate',
    'category',
    'actions',
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  createNewItem() {
    console.log('Criar novo item na checklist');

    this.dialog
      .open(ChecklistEditComponent, {
        disableClose: true,
        data: { actionName: 'Criar' },
      })
      .afterClosed()
      .subscribe((resp) => {
        console.log('Fechando modal de crianção');
      });
  }

  public updateCompleteStatus(status: boolean) {
    console.log(`Status alterado ${status}`);
  }

  public deleteChecklistItem(checklistItem: ChecklistItem) {
    console.log('deletar item na checklist');

    this.dialog
      .open(DialogComponent, {
        disableClose: true,
        data: {
          dialogMsg: 'Você tem certeza que gostaria de apagar essa tarefa?',
          leftButtonLabel: 'Cancelar',
          rightButtonLabel: 'Apagar',
        },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          console.log('Tarefa apagada com sucesso');
        } else {
          console.log('Tarefa não apagada');
        }
      });
  }

  public updateChecklistItem(checklistItem: ChecklistItem) {
    this.dialog
    .open(ChecklistEditComponent, {
      disableClose: true,
      data: {
        dialogMsg: 'Você tem certeza que gostaria de apagar essa tarefa?',
        leftButtonLabel: 'Cancelar',
        rightButtonLabel: 'Apagar',
      },
    })
    .afterClosed()
    .subscribe((resp) => {
      if (resp) {
        console.log('Tarefa apagada com sucesso');
      } else {
        console.log('Tarefa não apagada');
      }
    });
  }
}
