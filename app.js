const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRouter')
const accountRoutes = require('./Routes/account_router');
const transactionRoutes = require('./Routes/transaction_router');

const app = express();

app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);

const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

