import { Component, OnInit } from '@angular/core';
import { ExpenseService, Expense } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts'; // ✅ FIX

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ExpenseFormComponent,
    ExpenseListComponent,
    NgChartsModule // ✅ FIX (IMPORTANT)
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];

  selectedExpense: Expense | null = null;
  selectedDate: string = '';

  totalExpenses = 0;
  monthlyExpenses = 0;

  // Chart configuration
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  public pieChartLabels: string[] = [
    'Food',
    'Transport',
    'Shopping',
    'Bills',
    'Other'
  ];

  public pieChartDatasets = [
    {
      data: [0, 0, 0, 0, 0],
      backgroundColor: [
        '#ff9999',
        '#66b3ff',
        '#99ff99',
        '#ffcc99',
        '#c2c2f0'
      ]
    }
  ];

  public pieChartLegend = true;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.filteredExpenses = data;
        this.calculateStats();
        this.updateChart();
      },
      error: (err) => console.error(err)
    });
  }

  filterByDate(): void {
    if (!this.selectedDate) {
      this.filteredExpenses = this.expenses;
    } else {
      this.filteredExpenses = this.expenses.filter(exp => {
        const expDate = new Date(exp.date).toISOString().substring(0,10);
        return expDate === this.selectedDate;
      });
    }

    this.calculateStats();
    this.updateChart();
  }

  clearDateFilter(): void {
    this.selectedDate = '';
    this.filteredExpenses = this.expenses;
    this.calculateStats();
    this.updateChart();
  }

  calculateStats(): void {
    this.totalExpenses = this.filteredExpenses.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    this.monthlyExpenses = this.filteredExpenses
      .filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === currentMonth &&
               d.getFullYear() === currentYear;
      })
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  updateChart(): void {
    const categories = [
      'Food',
      'Transport',
      'Shopping',
      'Bills',
      'Other'
    ];

    const data = categories.map(cat =>
      this.filteredExpenses
        .filter(e => e.category === cat)
        .reduce((sum, e) => sum + e.amount, 0)
    );

    this.pieChartDatasets = [
      {
        data,
        backgroundColor: [
          '#ff9f43',
          '#00cf68',
          '#00b5ff',
          '#ff3366',
          '#a55eea'
        ]
      }
    ];
  }

  onExpenseAdded(): void {
    this.selectedExpense = null;
    this.loadExpenses();
  }

  onExpenseUpdated(): void {
    this.selectedExpense = null;
    this.loadExpenses();
  }

  onEditExpense(expense: Expense): void {
    this.selectedExpense = expense;
  }

  onExpenseDeleted(id: string): void {
    this.expenseService.deleteExpense(id).subscribe({
      next: () => this.loadExpenses(),
      error: (err) => console.error(err)
    });
  }
}