import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {
  @Input() expenses: Expense[] = [];
  @Output() expenseDeleted = new EventEmitter<string>();

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseDeleted.emit(id);
    }
  }

    @Output() expenseEdit = new EventEmitter<Expense>();

  onEdit(expense: Expense) {
  this.expenseEdit.emit(expense);
}

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Food': 'fas fa-hamburger',
      'Transport': 'fas fa-car',
      'Shopping': 'fas fa-shopping-bag',
      'Bills': 'fas fa-file-invoice-dollar',
      'Other': 'fas fa-ellipsis-h'
    };
    return icons[category] || 'fas fa-tag';
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Food': '#ff9f43',
      'Transport': '#00cf68',
      'Shopping': '#00b5ff',
      'Bills': '#ff3366',
      'Other': '#a55eea'
    };
    return colors[category] || '#6c757d';
  }
}
