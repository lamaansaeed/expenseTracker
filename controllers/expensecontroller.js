const db = require('../db/db');

exports.getAllExpenses = (req, res) => {
  const sql = 'SELECT * FROM expense';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

exports.addExpense = (req, res) => {
    console.log("i am here 1");
  const { expense, description, category } = req.body;
  const sql = 'INSERT INTO expense (expense, description, category) VALUES (?, ?, ?)';
  db.query(sql, [expense, description, category], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.deleteExpense = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM expense WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.updateExpense = (req, res) => {
  const { id } = req.params;
  const { expense, description, category } = req.body;
  const sql = 'UPDATE expense SET expense = ?, description = ?, category = ? WHERE id = ?';
  db.query(sql, [expense, description, category, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};
