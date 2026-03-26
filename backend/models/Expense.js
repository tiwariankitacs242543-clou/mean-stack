const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
        },
        amount: {
            type: Number,
            required: [true, 'Please add an amount'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
            enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Other'],
        },
        date: {
            type: Date,
            required: [true, 'Please add a date'],
            default: Date.now,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
