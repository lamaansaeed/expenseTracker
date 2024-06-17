const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', expenseRoutes);
app.use(express.static(__dirname));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});