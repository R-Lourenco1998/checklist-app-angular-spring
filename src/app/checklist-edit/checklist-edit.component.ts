import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChecklistItem } from '../models/checklist_item';
@Component({
  selector: 'app-checklist-edit',
  templateUrl: './checklist-edit.component.html',
  styleUrls: ['./checklist-edit.component.css'],
})
export class ChecklistEditComponent implements OnInit {
  public editableItem!: ChecklistItem;
  public actionName: string = 'Editar';
  public checklistItem!: ChecklistItem;

  constructor(
    public modalRef: MatDialogRef<ChecklistEditComponent>,
    private dialogRef: MatDialogRef<ChecklistEditComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any
  ) {
    if (dialogData.UpdatableinputChecklist != null) {
      this.editableItem = dialogData.UpdatableinputChecklist;
    }
    if (dialogData.actionName != null) {
      this.actionName = dialogData.actionName;
    }
    
  }

  public onFormClose($event: any) {
    this.modalRef.close($event);
  }

  ngOnInit(): void {}

  public closeModalWindow($event: any) {
    //TODO: handle action - save/cancel
    if ($event) {
      //save
      this.dialogRef.close();
    } else {
      //cancel
      this.dialogRef.close();
    }
  }
}
