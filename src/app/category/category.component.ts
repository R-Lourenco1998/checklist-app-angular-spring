import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryService } from '../services/category.service';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = [];

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((res: Category[]) => {
      this.dataSource = res;
    });
  }

  public createNewCategory(): void {
    this.dialog
      .open(CategoryEditComponent, {
        disableClose: true,
        data: { actionName: 'Criar' },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.snackBarService.showSnackBar(
            'Categoria criada com sucesso',
            'OK'
          ); //this.snackBarService.showSnackBar('Categoria criada com sucesso');
        } else {
          console.log('Categoria não criada'); //this.snackBarService.showSnackBar('Categoria não criada');
        }
      });
  }

  public editCategory(inputCategory: Category): void {
    this.dialog
      .open(CategoryEditComponent, {
        disableClose: true,
        data: { editableCategory: inputCategory, actionName: 'Editar' },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.snackBarService.showSnackBar(
            'Categoria editada com sucesso',
            'OK'
          ); //this.snackBarService.showSnackBar('Categoria editada com sucesso');
        } else {
          console.log('Categoria não editada'); //this.snackBarService.showSnackBar('Categoria não editada');
        }
      });
  }

  public deleteCategory(category: Category): void {
    this.dialog
      .open(DialogComponent, {
        disableClose: true,
        data: {
          dialogMsg: 'Você tem certeza que gostaria de apagar a categoria?',
          leftButtonLabel: 'Cancelar',
          rightButtonLabel: 'Apagar',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.snackBarService.showSnackBar(
            'Categoria apagada com sucesso',
            'OK'
          );
        } else {
          console.log('Categoria não apagada'); //this.snackBarService.showSnackBar('Categoria não apagada');
        }
      });
  }
}
