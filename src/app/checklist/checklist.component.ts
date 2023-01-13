import { Component, OnInit } from '@angular/core';
import { ChecklistItem } from '../models/checklist_item';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';
import { ChecklistService } from '../services/checklist.service';
import { Category } from '../models/category';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
})
export class ChecklistComponent implements OnInit {
  public dataSource!: Category[];

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

  constructor(
    private dialog: MatDialog,
    private checklist: ChecklistService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.checklist.getChecklist().subscribe((res: Category[]) => {
      this.dataSource = res;
    });
  }

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
      .subscribe((res) => {
        if (res) {
          this.snackBarService.showSnackBar('Tarefa apagada com sucesso', 'OK');
        } else {
          console.log('Tarefa não apagada');
        }
      });
  }

  public updateChecklistItem(checklistItem: ChecklistItem) {
    this.dialog
      .open(ChecklistEditComponent, {
        disableClose: true,
        data: { updatableChecklistItem: checklistItem, actionName: 'Editar' },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.snackBarService.showSnackBar('Tarefa editada com sucesso', 'OK');
        }
      });
  }
}
