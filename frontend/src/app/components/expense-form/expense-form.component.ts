
import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExpenseService, Expense } from '../../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnChanges {

  @Output() expenseAdded = new EventEmitter<void>();
  @Output() expenseUpdated = new EventEmitter<void>();
  @Input() expense: Expense | null = null;

  expenseForm: FormGroup;
  editingExpenseId: string | null = null;

  categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];
  isLoading = false;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {

    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['Food', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      description: ['']
    });

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['expense'] && this.expense) {

      this.editingExpenseId = this.expense._id || null;

      this.expenseForm.patchValue({
        title: this.expense.title,
        amount: this.expense.amount,
        category: this.expense.category,
date: new Date(this.expense.date).toISOString().substring(0,10),
        description: this.expense.description
      });

    }

  }

  onSubmit() {

    if (this.expenseForm.invalid) return;

    this.isLoading = true;

    if (this.editingExpenseId) {

      this.expenseService.updateExpense(this.editingExpenseId, this.expenseForm.value)
        .subscribe({
          next: () => {
            this.resetForm();
            this.expenseUpdated.emit();
            this.isLoading = false;
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
          }
        });

    } else {

      this.expenseService.addExpense(this.expenseForm.value)
        .subscribe({
          next: () => {
            this.resetForm();
            this.expenseAdded.emit();
            this.isLoading = false;
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
          }
        });

    }

  }

  resetForm() {

    this.editingExpenseId = null;

    this.expenseForm.reset({
      category: 'Food',
      date: new Date().toISOString().substring(0,10)
    });

  }

}

