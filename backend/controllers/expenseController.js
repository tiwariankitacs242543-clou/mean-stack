const Expense = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Public (TEMP)
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Public (TEMP)
const createExpense = async (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body;

        if (!title || !amount || !category) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const expense = new Expense({
            title,
            amount,
            category,
            date,
            description,
        });

        const createdExpense = await expense.save();

        res.status(201).json(createdExpense);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Public (TEMP)
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Public (TEMP)
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await expense.deleteOne();

        res.json({ message: 'Expense removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
};