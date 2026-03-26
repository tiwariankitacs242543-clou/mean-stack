const express = require('express');
const router = express.Router();
const {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
} = require('../controllers/expenseController');

// ❌ Removed protect middleware

router.route('/').get(getExpenses).post(createExpense);

router
    .route('/:id')
    .put(updateExpense)
    .delete(deleteExpense);

module.exports = router;