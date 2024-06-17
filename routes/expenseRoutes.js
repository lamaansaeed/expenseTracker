const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expensecontroller');

router.get('/expenses', expenseController.getAllExpenses);
router.post('/expenses', expenseController.addExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);
router.put('/expenses/:id', expenseController.updateExpense);

module.exports = router;
